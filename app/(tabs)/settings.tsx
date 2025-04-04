import { View, Text, StyleSheet, Alert } from "react-native";
import CusButton from "@/components/CusButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const Settings = () => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "false");
      Alert.alert("Logged out", "Bạn đã đăng xuất thành công.");
      router.replace("/login");
    } catch (error) {
      console.error("Lỗi khi lưu trạng thái đăng xuất:", error);
      Alert.alert("Lỗi", "Không thể đăng xuất. Vui lòng thử lại.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Tài khoản</Text>
        <CusButton
          text="Đăng xuất"
          backgroundColor="#e74c3c"
          textColor="#fff"
          handleClickBtn={handleLogout}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f4f8",
    marginTop: 50,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#2c3e50",
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
    color: "#34495e",
  },
});

export default Settings;
