import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import { signInWithEmailAndPassword, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
import Toast from 'react-native-toast-message';

export default function Loginscreen() {
    const [input, setInput] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isEmailLogin, setIsEmailLogin] = useState(false);

    function handleSignIn() {
        if (input !== "" && (isEmailLogin ? password !== "" : true)) {
            setLoading(true);
            if (isEmailLogin) {
                signInWithEmailAndPassword(auth, input, password)
                    .then(async (userCredential) => {
                        await AsyncStorage.setItem("info", JSON.stringify(userCredential.user.uid));
                        Toast.show({ type: 'success', text1: 'Login Successful!', text2: 'Welcome back!' });
                        setInput("");
                        setPassword("");
                        router.push("/(tabs)/home");
                    })
                    .catch((error) => {
                        Toast.show({ type: 'error', text1: 'Error logging in', text2: 'Check your credentials.' });
                    })
                    .finally(() => setLoading(false));
            } else {
                signInWithPhoneNumber(auth, input)
                    .then((confirmationResult) => {
                        Toast.show({ type: 'success', text1: 'OTP Sent!', text2: 'Check your messages.' });
                    })
                    .catch((error) => {
                        Toast.show({ type: 'error', text1: 'Error', text2: 'Invalid phone number.' });
                    })
                    .finally(() => setLoading(false));
            }
        } else {
            Toast.show({ type: 'error', text1: 'Invalid Input', text2: 'Fill in all fields.' });
        }
    }

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.heading}>Log In</Text>
                <Text style={styles.subheading}>Welcome back! Please sign in to continue.</Text>

                <TextInput
                    style={styles.input}
                    placeholder={isEmailLogin ? "Enter your email" : "Enter your phone number"}
                    placeholderTextColor="#BBB"
                    keyboardType={isEmailLogin ? "email-address" : "phone-pad"}
                    onChangeText={setInput}
                    value={input}
                />

                {isEmailLogin && (
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.inputWithIcon}
                            placeholder="Enter your password"
                            placeholderTextColor="#BBB"
                            secureTextEntry={!showPassword}
                            onChangeText={setPassword}
                            value={password}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <FontAwesome name={showPassword ? "eye-slash" : "eye"} size={24} color="#BBB" />
                        </TouchableOpacity>
                    </View>
                )}

                <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                    {loading ? <ActivityIndicator size={24} color="#FFF" /> : <Text style={styles.buttonText}>{isEmailLogin ? "Sign In with Email" : "Sign In with Phone"}</Text>}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setIsEmailLogin(!isEmailLogin)}>
                    <Text style={styles.switchText}>{isEmailLogin ? "Use Phone Number Instead" : "Use Email Instead"}</Text>
                </TouchableOpacity>
            </View>

            <Toast />
        </View>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F8FAFC", padding: 20 },
    container: { width: "100%", maxWidth: 400, paddingHorizontal: 20, paddingVertical: 30, borderRadius: 15, backgroundColor: "#FFFFFF", elevation: 5, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
    logo: { width: 100, height: 100, resizeMode: "contain", marginBottom: 15, alignSelf: "center" },
    heading: { fontSize: 26, color: "#1F2937", fontWeight: "bold", marginBottom: 10, textAlign: "center" },
    subheading: { fontSize: 16, color: "#6B7280", marginBottom: 20, textAlign: "center" },
    input: { width: "100%", padding: 14, marginBottom: 15, borderColor: "#9CA3AF", borderWidth: 1, borderRadius: 8, backgroundColor: "#FFF", fontSize: 16 },
    passwordContainer: { flexDirection: "row", alignItems: "center", width: "100%", borderColor: "#9CA3AF", borderWidth: 1, borderRadius: 8, backgroundColor: "#FFF", marginBottom: 15, paddingRight: 10 },
    inputWithIcon: { flex: 1, padding: 14, fontSize: 16 },
    button: { width: "100%", paddingVertical: 14, backgroundColor: "#3B82F6", borderRadius: 25, alignItems: "center", marginVertical: 20 },
    buttonText: { fontSize: 18, color: "#FFF", fontWeight: "bold" },
    switchText: { textAlign: "center", color: "#3B82F6", fontWeight: "bold", marginTop: 10 }
});
