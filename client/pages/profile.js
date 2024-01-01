import React, { useContext } from "react";
import { Text, View, Image, StyleSheet, Button } from "react-native";
import { FormContext } from "../context/data";

export default function Profile() {
  const { currentUser, setCurrentUser } = useContext(FormContext);
  const pressHandler = () => {
    setCurrentUser({});
    alert("go to login page");
  };

  return (
    <View style={styles.mainContainer}>
      <Image
        style={styles.img}
        source={require(`../assets/default-profile.jpg`)}
      />
      <View style={styles.container}>
        <Text style={styles.title}>{currentUser.user.userName}</Text>
        <Text style={styles.details}>{currentUser.user.email}</Text>
        <Text style={styles.details}>{currentUser.user.country}</Text>
      </View>
      <Button style={styles.btn} title="Log Out" onPress={pressHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  title: {
    fontWeight: "bold",
    fontSize: 50,
  },
  details: {
    fontSize: 20,
  },
  btn: {
    marginTop: 26,
  },
});
