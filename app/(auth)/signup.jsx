import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  PermissionsAndroid,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../utils/firebase";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, doc, setDoc } from "firebase/firestore";
import Toast from "react-native-toast-message";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Location from "expo-location";

const SignUpScreen = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);

  // 📍 Get User Location Function
  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          type: "error",
          text1: "Location Permission Denied",
          text2: "Enable location to continue.",
        });
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const handleSignup = async () => {
    if (email !== "" && password !== "" && location) {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;

          Toast.show({
            type: "success",
            text1: "Account Created",
            text2: "Welcome to Tasbeeh & Prayer App!",
          });

          const userData = {
            email: email,
            name: name,
            uid: user.uid,
            latitude: location.latitude,
            longitude: location.longitude,
          };

          await AsyncStorage.setItem("info", JSON.stringify(userData));

          await setDoc(doc(collection(db, "users"), user.uid), userData);

          router.push("/(tabs)/home");
          setName("");
          setEmail("");
          setPassword("");
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          Toast.show({
            type: "error",
            text1: "Signup Failed",
            text2: error.message,
          });
        });
    } else {
      Toast.show({
        type: "error",
        text1: "Invalid Input",
        text2: "Please fill out all fields and allow location access.",
      });
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Image
          source={{ uri: "https://www.shutterstock.com/shutterstock/videos/3484165189/thumb/1.jpg?ip=x480" }}
          style={styles.logo}
        />
        <Text style={styles.heading}>Create an Account</Text>
        <Text style={styles.subheading}>Sign up to start your prayer journey</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#A9A9A9"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#A9A9A9"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputWithIcon}
            placeholder="Password"
            placeholderTextColor="#A9A9A9"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <FontAwesome name={showPassword ? "eye-slash" : "eye"} size={20} color="#A9A9A9" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
          {loading ? (
            <ActivityIndicator size={25} color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Already have an account? {" "}
          <Text style={styles.linkText} onPress={() => router.push("/login")}>
            Log In
          </Text>
        </Text>

        <Toast />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F3E0",
    padding: 20,
  },
  container: {
    width: "100%",
    maxWidth: 400,
    padding: 25,
    borderRadius: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    elevation: 5,
  },
  logo: {
    width: 130,
    height: 120,
    resizeMode: "contain",
    marginBottom: 15,
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#4A7C59",
    marginBottom: 5,
    textAlign: "center",
  },
  subheading: {
    fontSize: 15,
    color: "#777",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 12,
    borderColor: "#4A7C59",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#FFF",
    marginBottom: 12,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderColor: "#4A7C59",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#FFF",
    paddingRight: 10,
    marginBottom: 12,
  },
  inputWithIcon: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  button: {
    width: "100%",
    paddingVertical: 14,
    backgroundColor: "#4A7C59",
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  footerText: {
    fontSize: 14,
    color: "#000",
    marginTop: 10,
  },
  linkText: {
    color: "#4A7C59",
    fontWeight: "bold",
  },
});

export default SignUpScreen;
