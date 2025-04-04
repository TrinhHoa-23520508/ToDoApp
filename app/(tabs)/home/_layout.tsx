import { Stack } from "expo-router";

export default function HomeStackLayout() {
  return (
    <Stack >
      <Stack.Screen name="index" options={{headerShown: false, title:"home"}} />
      <Stack.Screen name="details/[id]" options={{ title: "Todo Detail" }} />
      <Stack.Screen name = "createNew" options={{title: ""}}/>
    </Stack>
  );
}
