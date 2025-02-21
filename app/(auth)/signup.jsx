import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { app } from "../../utils/firebase"; // Firebase configuration
import { useRouter } from "expo-router";

// Initialize Firebase Auth and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export default function SignupScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [step, setStep] = useState("phone"); // Tracks signup steps ('phone', 'email', 'name')
  const [signupMode, setSignupMode] = useState("phone"); // Determines signup method

  // ✅ Handles Email Signup & Saves User Data to Firestore
  const signupWithEmail = async () => {
    try {
      // Create user with email & password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: user.email,
      });

      // Show success message and navigate to home screen
      Alert.alert("Signup Successful", "Your account has been created!");
      router.push("/(tabs)/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to</Text>
      <Text style={styles.headingsecond}>STIZI</Text>

      {/* Phone Signup Section */}
      {signupMode === "phone" && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter Phone Number"
            keyboardType="phone-pad"
            value={email} // Using the same state for simplicity
            onChangeText={setEmail}
          />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Email Signup - Step 1: Email & Password */}
      {signupMode === "email" && step === "email" && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => setStep("name")}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/(auth)/login")}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Email Signup - Step 2: Name Input */}
      {step === "name" && signupMode === "email" && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter Your Name"
            value={name}
            onChangeText={setName}
          />
          <TouchableOpacity style={styles.button} onPress={signupWithEmail}>
            <Text style={styles.buttonText}>Complete Signup</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Toggle between Phone & Email Signup */}
      <TouchableOpacity
        onPress={() => {
          setSignupMode(signupMode === "phone" ? "email" : "phone");
          setStep("email");
        }}
      >
        <Text style={styles.link}>
          {signupMode === "phone" ? "Signup with Email" : "Signup with Phone"}
        </Text>
      </TouchableOpacity>

      {/* App Description */}
      <Text style={styles.description}>
        Stizi shares the same ecosystem as Sidenote, with both apps using the
        same login for a seamless experience.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#6200EE",
    alignItems: "center",
    gap: 40,
  },
  heading: { fontSize: 20, fontWeight: "bold", color: "#fff", marginTop: 20 },
  headingsecond: {
    fontSize: 44,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
    width: "70%",
    textAlign: "center",
  },
  input: {
    width: "90%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 30,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "50%",
  },
  buttonText: { color: "#fff", fontSize: 16 },
  link: { marginTop: 10, textDecorationLine: "underline", color: "#fff" },
  description: { marginTop: 20, textAlign: "center", color: "#fff" },
});
