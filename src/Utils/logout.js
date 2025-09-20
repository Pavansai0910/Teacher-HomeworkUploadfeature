import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function checkAuthentication() {
  const storedDate = await AsyncStorage.getItem("loginDate");
  console.log("storedDate", storedDate);
  if (!storedDate) return false; // No login date found

  const loginDate = new Date(storedDate);
  const expiryDate = new Date(loginDate);
  expiryDate.setDate(loginDate.getDate() + 19);

  return new Date() < expiryDate; // Returns `true` if still valid
} 