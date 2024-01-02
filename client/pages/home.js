import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Search from "../components/Search";
import * as Location from "expo-location";
import { FormContext } from "../context/data";

export default function Home({ navigation }) {
  const { setSonglist } = useContext(FormContext);

  const [weather, setWeather] = useState(null);
  const [holiday, setHoliday] = useState(null);
  const [ganers, setGaners] = useState([
    "Rock",
    "Pop",
    "Hip Hop",
    "Jazz",
    "Blues",
    "Country",
    "Electronic",
    "Classical",
    "Metal",
    "Funk",
    "Soul",
    "Rap",
    "Mizrahi",
    "Israeli",
  ]);

  const showPosition = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;
      const API_KEY = "82f507439bcd18bdb3e41b067a1564ad";
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

      const response = await fetch(apiUrl);
      const weatherData = await response.json();
      console.log("Current weather data:", weatherData.weather[0].description);
      setWeather(weatherData.weather[0].description);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const CurrentHoliday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Note: JavaScript months are zero-based
    const day = today.getDate();

    const apiUrl = `https://www.hebcal.com/converter?cfg=json&gy=${year}&gm=${month}&gd=${day}&g2h=1`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("Today's Jewish date:", data.hebrew);
        console.log("Today's Jewish holiday(s):", data.holidays);
        setHoliday(data.holidays);
      })
      .catch((error) =>
        console.error("Error fetching Jewish calendar data:", error)
      );
  };

  useEffect(() => {
    showPosition();
    CurrentHoliday();
  }, []);

  const fetchSongsByWeather = async () => {
    try {
      const response = await fetch(
        `http://192.168.0.128:3000/api/v1/songs/songByPeriodTag/${weather}`
      );
      const data = await response.json();

      setSonglist(data);
      console.log(data);
      navigation.navigate("Playlist");
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchSongsByHoliday = async () => {
    try {
      const response = await fetch(
        `http://192.168.0.128:3000/api/v1/songs/songByPeriodTag/${holiday}`
      );
      const data = await response.json();

      setSonglist(data);
      console.log(data);
      navigation.navigate("Playlist");
    } catch (error) {
      console.log(error.message);
    }
  };

  const selectGaner = async (event, item) => {
    event.persist();
    try {
      const res = await fetch(
        `http://192.168.0.128:3000/api/v1/songs/songByGenre/${item}`
      );
      const data = await res.json();
      console.log(data);
      setSonglist(data);
      navigation.navigate("Playlist");
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    console.log("selectGaner", item);
  };

  const viewGaners = (item) => {
    let url = `../assets/HipHop.jpg`;
    // if (item == "Hip Hop") {
    //   url = "../assets/HipHop.jpg";
    // } else url = "https://images.pexels.com/photos/811838/pexels-photo-811838.jpeg?auto=compress&cs=tinysrgb&w=600";
   
    return (
      // <View style={styles.viewItem}>
      <ImageBackground
        source={require(url)}
        style={styles.viewItem}
        resizeMode="cover"
      >
        <Text
          onPress={(event) => selectGaner(event, item)}
          style={styles.genreText}
        >
          {item}
        </Text>
      </ImageBackground>
      // </View>
    );
  };

  return (
    <View style={styles.container}>
      <Search />
      <Text style={styles.albomsCoteret}>OUR CATEGORIES</Text>

      <View style={styles.item1}>
        <View style={styles.viewItem}>
          <Text onPress={fetchSongsByWeather} style={styles.genreText}>
            Weather- {weather}
          </Text>
        </View>

        <View style={styles.viewItem}>
          <Text onPress={fetchSongsByHoliday} style={styles.genreText}>
            Holiday- {holiday}
          </Text>
        </View>
      </View>

      <FlatList
        numColumns={2}
        
        data={ganers}
        renderItem={({ item }) => viewGaners(item)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  // stam: {
  //   backgroundColor: "black",
  //   // justifyContent: "space-between",
  // },
  albomsCoteret: {
    paddingLeft: 15,
    fontSize: 20,
  },
  genreText: {
    fontSize: 24,
    backgroundColor: "white",
    borderRadius: 5,
    paddingRight: 10,
    paddingLeft: 10,
  },
  item1: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewItem: {
    backgroundColor: "red",
    borderRadius: 15,
    marginTop: 24,
    padding: 10,
    marginHorizontal: 10,
    width: 150,
    height: 100,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  genreImg: {
    // flex: 1,
    borderRadius: 100,
    width: 150,
    height: 100,
  },
});
