import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message'; // Correct import
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* Expo Router Stack Navigation */}
        <Stack
          screenOptions={{ headerShown: false }}
          initialRouteName="index"
        >
          <Stack.Screen name="(tabs)/home" options={{ headerShown: true }} />
          <Stack.Screen name="CustomHeader" options={{ headerShown: true }} />
          <Stack.Screen name="(tabs)/profile" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)/meesage" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/singup" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
        </Stack>

        {/* Toast Component */}
        <Toast />
      </GestureHandlerRootView>
  );
}