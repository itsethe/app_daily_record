import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Button from "./Components/Buttons";

export default function App() {
  const [mode, setMode] = useState("text"); // "text" | "photo"
  const [note, setNote] = useState("");
  const [photoUri, setPhotoUri] = useState(null);

  const pickImage = async () => {
    setMode("photo");

    const { status } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access photos is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
      setNote(""); // clear text if switching modes
    }
  };

  const handleTyping = (text) => {
    setMode("text");
    setNote(text);
    setPhotoUri(null); // clear photo if switching modes
  };

  return (
    <ScrollView contentContainerStyle={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Daily Record</Text>
        <Text style={styles.date}>Jan X</Text>
      </View>

      {/* Input Card */}
      <View style={styles.card}>
        {mode === "photo" ? (
          <View style={styles.photoBox}>
            {photoUri ? (
              <Image source={{ uri: photoUri }} style={styles.photo} />
            ) : (
              <Text style={{ color: "#888" }}>No photo selected</Text>
            )}
          </View>
        ) : (
          <TextInput
            style={styles.input}
            placeholder="Write something..."
            value={note}
            onChangeText={handleTyping}
            multiline
          />
        )}
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="Upload Photo" onPress={pickImage} />
        <Button title="Submit" onPress={() => console.log({ mode, note, photoUri })} />
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 60,
    paddingBottom: 60,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
  },
  date: {
    fontSize: 18,
    color: "#666",
    marginTop: 8,
  },

  card: {
    width: "85%",
    borderRadius: 24,
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },

  photoBox: {
    height: 280,
    borderRadius: 18,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  photo: {
    width: "100%",
    height: "100%",
  },

  input: {
    minHeight: 160,
    backgroundColor: "#f7f7f7",
    borderRadius: 16,
    padding: 14,
    fontSize: 16,
    textAlignVertical: "top",
  },

  buttonContainer: {
    alignItems: "center",
    gap: 16,
  },
});
