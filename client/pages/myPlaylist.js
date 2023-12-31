import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
// import DataContext from "../context/data";
import { FormContext } from "../context/data";
import Search from "../components/Search";
import { AntDesign } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";

//import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

export default function MyPlaylist({ navigation }) {
  const {
    searchQuery,
    setSearchQuery,
    playlists,
    setPlaylists,
    setSonglist,
    songlist,
    currentUser,
    setPlaylistName,
  } = useContext(FormContext);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getPlaylists();
      // Your code to update the screen when it gains focus
      // This will run every time the screen comes into focus
    }, [])
  );

  // useEffect(() => {
  //   getPlaylists();
  //   return () => {};
  // }, []);
  const getPlaylists = async () => {
    const res = await fetch(
      `http://192.168.0.179:3000/api/v1/playlists/allPlaylists`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );
    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(errorData || "server error occurred");
    }
    const data = await res.json();
    if (data.length == 0) {
      setMessage("your playlists is empty, lets create some!");
    }
    console.log(data);
    setPlaylists(data);
    setFilter(data);
  };

  const addNewPlaylist = () => {
    console.log("addNewPlaylis");
    navigation.navigate("addNewPlaylist");
  };

  const selectPlaylist = async (item) => {
    // console.log(item +"nm,n,n");
    // Alert.alert("selectPlaylist")
    await setSonglist(item);
    navigation.navigate("Playlist", { playlist: item.songs });
    //return <PlaylistStack playlistFromTheList={item} />;
  };

  const handleSearch = (text) => {
    setSearchQuery(text);

    const filteredList = playlists.filter((playlist) =>
      playlist.name.toLowerCase().includes(text.toLowerCase())
    );

    setFilter(filteredList);
  };

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery]);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search playlist"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>
        <View style={styles.viewCoterte}>
          <Text style={styles.playlistCoteret}>MY PLAYLISTS:</Text>
        </View>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.viewFlat}>
          <FlatList
            data={filter}
            numColumns={2}
            renderItem={({ item }) => (
              <View style={styles.viewItem}>
                <ImageBackground
                  source={{
                    uri: "https://images.pexels.com/photos/534283/pexels-photo-534283.jpeg?auto=compress&cs=tinysrgb&w=600",
                  }}
                  style={styles.backgroundImage}
                  imageStyle={styles.imageStyle}
                >
                  <Text
                    onPress={() => {
                      setPlaylistName(item.name);
                      setSonglist(item.songs);
                      navigation.navigate("Playlist");
                      // setTimeout(() => {
                      // }, 2000);
                    }}
                    style={styles.item}
                  >
                    {item.name}
                  </Text>
                </ImageBackground>
              </View>
            )}
          />
        </View>
        {/* <View style={styles.viewCoterte}>
          <Text style={styles.playlistCoteret}>MY FAVORITS:</Text>
        </View> */}
        <AntDesign
          name="pluscircleo"
          size={50}
          color="#fff"
          onPress={addNewPlaylist}
          style={styles.iconView}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "purple",
    borderRadius: 10, // Set the border radius
    overflow: "hidden", // Ensure the border radius is applied correctly
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5, // Set the shadow for Android
  },
  container: {
    flex: 1,
    position: "relative",

    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "black",
  },
  searchInput: {
    borderRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    backgroundColor: "black",
    borderColor: "white",
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  viewCoterte: {
    paddingTop: 13,
  },
  viewFlat: {
    flexDirection: "row",
    justifyContent: "space-between",

    width: 350,
  },
  iconView: {
    paddingTop: 580,
    paddingLeft: 25,
    position: "absolute",
  },
  playlistCoteret: {
    fontSize: 24,
    fontWeight: "bold",
    // paddingTop:20,
    color: "purple",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    textAlign: "center",
    borderColor: "white",
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  message: {
    // paddingTop: 50,
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  item: {
    flex: 1,
    color: "#fff",
    padding: 20,

    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  viewItem: {
    width: 150,
    height: 150,

    borderRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    margin: 12,
  },
  backgroundImage: {
    width: "100%", // Set the width to 100%
    height: "100%", // Set the height to 100%
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    borderRadius: 10,
    resizeMode: "cover", // Maintain aspect ratio
  },
});
