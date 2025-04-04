import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storeIsLogin, getIsLogin } from "@/logic/async_storage";
export default function RootLayout() {
  
  useEffect(() => {
    const checkLogin = async () => {
      let isLoggedIn = await getIsLogin();

      
      if (isLoggedIn === null) {
        await storeIsLogin("false");
        isLoggedIn = "false";  
      }

     
      if (isLoggedIn === "true") {
        router.replace("/(tabs)/home");  
      } else {
        router.replace("/(auth)/login");  
      }
    };

    checkLogin();
  }, []); 

  return (
    <Stack>
      <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
    </Stack>
  );
}
