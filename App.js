import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import StartScreen from "./screen/StartScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <Header title="Guess a number" />
      <StatusBar style="auto" />
      <StartScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
