import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function CustomHeader() {
  const navigation = useNavigation();
  const route = useRoute(); // Current screen ka name get karne ke liye

  return (
    <View style={styles.header}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <FontAwesome name="arrow-left" size={20} color="white" />
      </TouchableOpacity>

      {/* Page Name */}
      <Text style={styles.title}>{route.name}</Text>

      {/* Optional: Add right side button */}
      <TouchableOpacity onPress={() => alert("Settings Clicked")} style={styles.rightButton}>
        <FontAwesome name="cog" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: "20%",
    width: "100%",
    paddingTop: 80,
    backgroundColor: "#6200EE", // Purple Theme
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    elevation: 4,
  },
  backButton: {
    padding: 10,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  rightButton: {
    padding: 10,
  },
});
