import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import { collection, getDocs, getFirestore, onSnapshot } from "firebase/firestore";
import { app } from "../../utils/firebase"; // Firebase config import karo

const db = getFirestore(app);

export default function MessageScreen() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const fetchedUsers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(fetchedUsers);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
        <Header style={styles.Header}/>
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.userItem}>
            <Image source={{ uri: item.profilePic || "https://via.placeholder.com/50" }} style={styles.profileImage} />
            <View>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.lastMessage}>{item.lastMessage || "Tap to chat"}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
</>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },
  Header:{position:"absolute",top:0,width:"100%",},
  userItem: { flexDirection: "row", alignItems: "center", padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  profileImage: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  userName: { fontSize: 16, fontWeight: "bold" },
  lastMessage: { fontSize: 14, color: "gray" },
});
