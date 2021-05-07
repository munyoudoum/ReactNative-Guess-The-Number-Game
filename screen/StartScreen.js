import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Audio } from "expo-av";

export default function StartScreen() {
  const generateNumber = () => {
    return Math.floor(Math.random() * 100) + 1;
  };
  const sound = new Audio.Sound();
  const [number, setNumber] = useState("");
  const [MagicNumber, setMagicNumber] = useState(generateNumber());
  const [DisplayText, setDisplayText] = useState(
    "Choose a number from 1 to 100"
  );

  const guessNumber = async () => {
    const temp = parseInt(number);
    if (temp > MagicNumber) {
      setDisplayText("Guess Lower!");
    } else if (temp < MagicNumber) {
      setDisplayText("Guess Higher!");
    } else {
      setDisplayText("You guess the right number!");
      await sound.loadAsync(require("../assets/correct-buzzer.mp3"));
      await sound.playAsync();
      // Your sound is playing!

      // Don't forget to unload the sound from memory
      // when you are done using the Sound object
      // await sound.unloadAsync();
    }
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <View style={styles.card}>
          <Text style={{ fontSize: 15 }}>{DisplayText}</Text>
          <TextInput
            textAlign={"center"}
            value={number}
            style={styles.numberField}
            onChangeText={(n) => setNumber(n.replace(/[^0-9]/g, ""))}
            keyboardType="numeric"
          />
          <View style={styles.buttonContainer}>
            <View style={styles.buttonWidth}>
              <Button onPress={guessNumber} title="Guess" />
            </View>
            <View style={styles.buttonWidth}>
              <Button
                title="Reset"
                color="red"
                onPress={() => {
                  setNumber("");
                  setMagicNumber(generateNumber());
                  setDisplayText("Choose a number from 1 to 100");
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  card: {
    width: "90%",
    margin: 5,
    borderRadius: 10,
    padding: 30,
    backgroundColor: "lightgray",
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    justifyContent: "center",
    alignItems: "center",
    elevation: 12,
  },
  numberField: {
    borderColor: "black",
    width: 40,
    borderBottomWidth: 1,
    padding: 2,
    marginVertical: 10,
  },
  buttonWidth: { width: 100 },
  buttonContainer: {
    justifyContent: "space-around",
    flexDirection: "row",
    width: "100%",
  },
});
