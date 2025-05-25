import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground 
      source={{ uri: "https://static1.anpoimages.com/wordpress/wp-content/uploads/2022/07/googleMapsTricksHero.jpg" }} 
      style={styles.background}
    >
      <View style={styles.overlay}>
        
        <Text style={styles.heading}>🌍 Welcome to Stizi 🚀</Text>

        <Text style={styles.title}>Your Smart Map Companion</Text>
        <Text style={styles.description}>
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => router.push("/(auth)/signup")}>
          <Text style={styles.buttonText}>Get Started with stizi</Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent overlay
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#00FF7F", 
    textAlign: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: "#D3D3D3",
    textAlign: "center",
    marginBottom: 25,
  },
  button: {
    backgroundColor: "#00BFFF", 
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
