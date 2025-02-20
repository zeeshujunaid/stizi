import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function HomeScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Location permission denied");
        return;
      }

      getCurrentLocation();
      addFakeUsers();

      // Location update har 5 second me
      const interval = setInterval(() => {
        getCurrentLocation();
      }, 5000);

      return () => clearInterval(interval);
    })();
  }, []);

  // ✅ Fake users ko manually add karna
  const addFakeUsers = () => {
    setUsers([
      { id: "1", name: "Ali", latitude: 24.8607, longitude: 67.0011 },
      { id: "2", name: "Ahmed", latitude: 24.8612, longitude: 67.0025 },
      { id: "3", name: "Zain", latitude: 24.8598, longitude: 67.0030 },
      { id: "4", name: "Usman", latitude: 24.8620, longitude: 67.0040 },
      { id: "5", name: "Hassan", latitude: 24.8585, longitude: 67.0050 },
    ]);
  };

  // ✅ Current user location fetch karna
  const getCurrentLocation = async () => {
    try {
      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);
    } catch (error) {
      setErrorMsg("Error fetching location");
    }
  };

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {/* ✅ Apni location ka marker (Blue) */}
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Your Location"
            pinColor="blue"
          />

          {/* ✅ Fake users ka marker (Red) */}
          {users.map((user) => (
            <Marker
              key={user.id}
              coordinate={{
                latitude: user.latitude,
                longitude: user.longitude,
              }}
              title={user.name}
              pinColor="red"
            />
          ))}
        </MapView>
      ) : (
        <ActivityIndicator size="large" color="blue" />
      )}
      {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  error: {
    color: "red",
    fontSize: 16,
    marginTop: 10,
  },
});
