import { Tabs } from "expo-router";
import { View, StyleSheet } from "react-native";
import { TabBarIcon } from "../../components/TabBarIcon";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          color: "#D9A8FF",
        },
        tabBarStyle: {
          position: "absolute",
          bottom: 5,
          left: 20,
          right: 20,
          height: 60,
          borderRadius: 50,
          backgroundColor: "#4a004a",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 10,
        },
        tabBarActiveTintColor: "#FF66FF",
        tabBarInactiveTintColor: "#D9A8FF",
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          tabBarLabel: "Home",
        }}
      />

      {/* Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          tabBarLabel: "Profile",
        }}
      />

      {/* Message Tab */}
      <Tabs.Screen
        name="message"
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="commenting" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  centerButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: [{ translateX: -25 }],
    backgroundColor: "#9c27b0",
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
});
