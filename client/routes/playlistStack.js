import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
//import MyPlaylist from '../pages/MyPlaylist';
import Playlist from "../components/Playlist";
import MyPlaylist from "../pages/myPlaylist";
import { Song } from "../components/Song";
import AddNewPlaylist from "../pages/addNewPlaylist";
import Search from "../components/Search";

const Stack = createStackNavigator();

const PlaylistStack = () => {
  return (
    <Stack.Navigator initialRouteName="MyPlaylist" >
      <Stack.Screen screenOptions={{ headerShown: false,  tabBarStyle: {  display: "none",}, }}
        name="MyPlaylist"
        component={MyPlaylist}
        options={{ title: "My Playlist" }}
      />
      <Stack.Screen
        name="Playlist"
        component={Playlist}
        options={{ title: "Playlist" }}
      />
      <Stack.Screen
        name="addNewPlaylist"
        component={AddNewPlaylist}
        options={{ title: "createNew" }}
      />
      <Stack.Screen
        name="searchSong"
        component={Search}
        options={{ title: "searchSong" }}
      />
      <Stack.Screen name="Song" component={Song} options={{ title: "Song" }} />
    </Stack.Navigator>
  );
};

export default PlaylistStack;
