import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { getAuth, signOut } from "firebase/auth";

export default function CustomHeader() {
  const navigation = useNavigation();
  const route = useRoute();
  const router = useRouter();
  const auth = getAuth();

  // Logout Function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login"); // Redirect to login after successful logout
    } catch (error) {
      Alert.alert("Logout Failed", error.message); // Show error in alert
    }
  };

  return (
    <View style={styles.header}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <FontAwesome name="arrow-left" size={20} color="white" />
      </TouchableOpacity>

      {/* Page Name */}
      <Text style={styles.title}>{route.name}</Text>

      {/* Logout Button */}
      <TouchableOpacity onPress={handleLogout} style={styles.rightButton}>
        <FontAwesome name="sign-out" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: "10%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    width: "100%",
    paddingTop: 3,
    backgroundColor: "#6200EE",
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
