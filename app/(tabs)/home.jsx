import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Header from "../../components/header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, addDoc, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../../utils/firebase";

const db = getFirestore(app);

export default function HomeScreen() {
  const [location, setLocation] = useState(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [stampName, setStampName] = useState("");
  const [stamps, setStamps] = useState([]);
  const [homeLocation, setHomeLocation] = useState(null);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    checkAndRequestLocation();
    fetchStamps();
  }, []);

  // Function to request location permission and track user location
  const checkAndRequestLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setPermissionDenied(true);
      return;
    }
    setPermissionDenied(false);

    let storedHomeLocation = await AsyncStorage.getItem("homeLocation");

    // If home location is not saved, set the current location as home
    if (!storedHomeLocation) {
      let initialLocation = await Location.getCurrentPositionAsync({});
      let homeCoords = initialLocation.coords;
      setHomeLocation(homeCoords);
      await AsyncStorage.setItem("homeLocation", JSON.stringify(homeCoords));

      // Save home location in Firebase
      await addDoc(collection(db, "stamps"), {
        name: "Home",
        latitude: homeCoords.latitude,
        longitude: homeCoords.longitude,
      });
    } else {
      setHomeLocation(JSON.parse(storedHomeLocation));
    }

    // Start tracking user location
    const locationSubscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
        distanceInterval: 5,
      },
      (newLocation) => {
        setLocation(newLocation.coords);
      }
    );
    setSubscription(locationSubscription);
  };

  // Cleanup function to remove location tracking when component unmounts
  useEffect(() => {
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [subscription]);

  // Fetch saved stamps from Firebase
  const fetchStamps = async () => {
    const querySnapshot = await getDocs(collection(db, "stamps"));
    const fetchedStamps = querySnapshot.docs.map((doc) => doc.data());
    setStamps(fetchedStamps);
  };

  // Open modal to enter stamp name
  const handleStampLocation = async () => {
    if (!location || !homeLocation) return;
    setModalVisible(true);
  };

  // Save new stamp in Firebase
  const saveStamp = async () => {
    if (!stampName.trim()) return;
    await addDoc(collection(db, "stamps"), {
      name: stampName,
      latitude: location.latitude,
      longitude: location.longitude,
    });
    setModalVisible(false);
    setStampName("");
    fetchStamps(); 
  };

  return (
    <View style={styles.container}>
      <Header style={styles.Header} />
      {/* locaion permission denied so button display */}
      {permissionDenied ? (
        <View style={styles.permissionContainer}>
          <Text style={styles.text}>Location permission is required!</Text>
          <Button title="Grant Permission" onPress={checkAndRequestLocation} />
        </View>
      ) : location ? (
        <>
        {/* map rending */}
          <MapView
            style={styles.map}
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            {/* Current Location Marker (Red) */}
            <Marker
              coordinate={location}
              title="Your Current Location"
              pinColor="red"
            />

            {/* Home Location Marker (Green) */}
            {homeLocation && (
              <Marker
                coordinate={homeLocation}
                title="Home Location"
                pinColor="green"
              />
            )}

            {/* Other Stamps */}
            {stamps.map((stamp, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: stamp.latitude,
                  longitude: stamp.longitude,
                }}
              >
                <View style={styles.markerContainer}>
                  <Text style={styles.markerText}>{stamp.name}</Text>
                </View>
              </Marker>
            ))}
          </MapView>

          {/* button to stamp location */}
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={handleStampLocation}
          >
            <Text style={styles.floatingButtonText}>📍 Stamp Location</Text>
          </TouchableOpacity>

          {/* Modal to enter stamp name */}
          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
          >
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Enter Stamp Name:</Text>
              <TextInput
                style={styles.input}
                placeholder="Stamp Name"
                value={stampName}
                onChangeText={setStampName}
              />
              <Button title="Save" onPress={saveStamp} />
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
            </View>
          </Modal>
        </>
      ) : (
        <Text style={styles.text}>Fetching location...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  Header: { position: "absolute", top: 0, width: "100%" },
  map: { width: "100%", height: "100%" },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: { fontSize: 16, marginBottom: 10 },
  markerContainer: { backgroundColor: "red", padding: 5, borderRadius: 5 },
  markerText: { color: "white", fontWeight: "bold", textAlign: "center" },
  floatingButton: {
    position: "absolute",
    top: 90,
    right: 5,
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
  },
  floatingButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 20,
  },
  modalText: { fontSize: 18, color: "white", marginBottom: 10 },
  input: {
    borderBottomWidth: 1,
    width: "80%",
    marginBottom: 10,
    padding: 5,
    backgroundColor: "white",
  },
});
