import React from "react";
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";

const dummyLocations = [
  { id: "1", name: "Venice Beach", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/9e/84/3b/caption.jpg?w=1200&h=-1&s=1&cx=2732&cy=1820&chk=v1_33f460616b63c6dc85e3" },
  { id: "2", name: "Wax Museum", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/82/c5/5a/hollywood-wax-museum.jpg?w=1200&h=-1&s=1" },
  { id: "3", name: "Hardrock Casino", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo8T6znPLfoAzmuED3ngiIStRNzawykvjU1w&s" },
  { id: "4", name: "Nashville Aquarium", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnrOWnUjYKV7soGVPP5-2d5nIQ6u50hAjH3g&s" },
];

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      
      {/* Full-Width Header */}
      <View style={styles.header}>
        <Image source={{ uri: "https://photosnow.org/wp-content/uploads/2024/04/cute-girl-pic_11.jpg" }} style={styles.profileImage} />
        <View>
          <Text style={styles.userName}>Doja Cat</Text>
          <TouchableOpacity style={styles.statusButton}>
            <Text style={styles.statusText}>Online</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Location List */}
      <FlatList
        data={dummyLocations}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#1a001a", 
    paddingTop: 80, // Push content below the header
  },
  header: { 
    position: "absolute", 
    top: 0, 
    left: 0, 
    right: 0, 
    flexDirection: "row", 
    alignItems: "center", 
    padding: 15, 
    backgroundColor: "#4a004a",
    zIndex: 10,
  },
  profileImage: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  userName: { fontSize: 18, color: "#fff", fontWeight: "bold" },
  statusButton: { backgroundColor: "green", padding: 5, borderRadius: 10, marginTop: 5 },
  statusText: { color: "#fff", fontSize: 12,marginLeft: 10, },
  listContainer: { paddingTop: 30, paddingHorizontal: 10 }, 
  card: { flexDirection: "row", alignItems: "center", padding: 15, backgroundColor: "#4a004a", borderRadius: 10, marginBottom: 10 },
  cardImage: { width: 50, height: 50, borderRadius: 10, marginRight: 15 },
  cardTitle: { fontSize: 16, color: "#fff" },
});

