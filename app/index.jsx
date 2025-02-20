import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <ImageBackground 
      source={{ uri: "https://www.shutterstock.com/shutterstock/videos/3484165189/thumb/1.jpg?ip=x480" }} 
      style={styles.background}
    >
      <View style={styles.overlay}>
        
        <Text style={styles.heading}>✨ Assalamu Alaikum ✨</Text>

        <Text style={styles.title}>Tasbeeh aur Namaz App mein Khush Aamdeed</Text>


        <TouchableOpacity style={styles.button} onPress={() => router.push("/(tabs)/home")}>
          <Text style={styles.buttonText}>Get Started</Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark semi-transparent overlay
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFD700", // Gold color for heading
    textAlign: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
  },
  description: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginBottom: 15,
  },
  footerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFD700",
    textAlign: "center",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#FFA500",
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