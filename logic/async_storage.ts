import AsyncStorage from "@react-native-async-storage/async-storage";

const storeIsLogin = async (value?: string) => {
    try {
      await AsyncStorage.setItem('isLoggedIn', value || "false");
    } catch (e) {
      console.log(e);
    }
  };
  const getIsLogin = async () => {
    try {
      const value = await AsyncStorage.getItem('isLoggedIn');
      return value;
    } catch (e) {
      console.log(e);
      return null;
    }
  };
export {storeIsLogin, getIsLogin}