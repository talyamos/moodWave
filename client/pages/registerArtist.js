import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Picker,
  DatePickerIOS,
} from "react-native";
import { MultipleSelectList } from "react-native-dropdown-select-list";

const ArtistRegistration = ({ navigation }) => {
  const [artistData, setArtistData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    genres: [],
    image: "",
    country: "",
    birthDate: new Date(),
    image: "",
  });
  const [selectedGen, setSelectedGen] = React.useState([]);

  const dataGenges = [
    { key: "1", value: "Pop" },
    { key: "2", value: "Rock" },
    { key: "3", value: "Hip Hop" },
    { key: "4", value: "Electronic" },
    { key: "5", value: "Country" },
    { key: "6", value: "Jazz" },
    { key: "7", value: "Blues" },
    { key: "8", value: "Classical" },
    { key: "9", value: "Metal" },
    { key: "10", value: "Funk" },
    { key: "11", value: "Soul" },
    { key: "12", value: "Rap" },
    { key: "13", value: "Mizrahi" },
    { key: "14", value: "Israeli" },
  ];

  const handleRegister = async () => {
    try {
      const response = await fetch(
        "http://192.168.0.179:3000/api/v1/artists/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(artistData),
        }
      );

      if (response.status === 201) {
        // Registration successful, handle accordingly
        alert("Artist registered successfully");
        navigation.navigate("ArtistLogin");
      } else {
        // Registration failed, handle accordingly
        console.error("Failed to register artist:", response.statusText);
      }
    } catch (error) {
      console.error("Error during artist registration:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer1}>
        <Button
          title="Go To Login"
          onPress={() => {
            navigation.navigate("ArtistLogin");
          }}
          buttonStyle={styles.searchButton}
          containerStyle={styles.buttonContainerStyle}
          titleStyle={styles.searchButtonText}
        />
      </View>

      <Text style={styles.label}>First Name</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="white"
        placeholder="Enter your first name"
        onChangeText={(text) =>
          setArtistData({ ...artistData, firstName: text })
        }
      />

      <Text style={styles.label}>Last Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your last name"
        placeholderTextColor="white"
        onChangeText={(text) =>
          setArtistData({ ...artistData, lastName: text })
        }
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="white"
        onChangeText={(text) => setArtistData({ ...artistData, email: text })}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="white"
        secureTextEntry
        onChangeText={(text) =>
          setArtistData({ ...artistData, password: text })
        }
      />

      <Text style={styles.label}>Genres</Text>

      <View style={{ backgroundColor: "white" }}>
        <MultipleSelectList
          setSelected={(val) => setSelectedGen(val)}
          data={dataGenges}
          save="value"
          onSelect={() => setArtistData({ ...artistData, genres: selectedGen })}
          label="Genres"
          // boxStyles={{backgroundColor:"black"}}
          // inputStyles={{color:"white"}}
          // placeholderTextColor="white"
        />
      </View>
      {/* Image upload field (you can use a library for image uploading) */}

      <Text style={styles.label}>Country</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your country"
        placeholderTextColor="white"
        onChangeText={(text) => setArtistData({ ...artistData, country: text })}
      />

      <Text style={styles.label}>Birth Date</Text>
      <TextInput
        style={styles.input}
        placeholder="Birth Date"
        placeholderTextColor="white"
        onChangeText={(text) =>
          setArtistData({ ...artistData, birthDate: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Image"
        placeholderTextColor="white"
        onChangeText={(text) => setArtistData({ ...artistData, image: text })}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Register"
          buttonStyle={styles.searchButton}
          containerStyle={styles.buttonContainerStyle}
          titleStyle={styles.searchButtonText}
          onPress={handleRegister}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  whiteText: {
    color: "white",

    // Add any other styles you need
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "black",
  },
  buttonContainer1: {
    backgroundColor: "purple",
    borderRadius: 10, // Set the border radius
    overflow: "hidden", // Ensure the border radius is applied correctly
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0.1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },

  buttonContainer: {
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

  searchButton: {
    backgroundColor: "purple",
    color: "black",
  },
  searchButtonText: {
    color: "white",
  },
  buttonContainerStyle: {
    borderRadius: 10, // Set the border radius
    overflow: "hidden", // Ensure the border radius is applied correctly
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "purple",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  datePicker: {
    marginBottom: 15,
  },
});

export default ArtistRegistration;
