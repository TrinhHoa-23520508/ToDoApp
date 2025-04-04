import { View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback, Alert } from "react-native";
import CusInput from "@/components/CusInput";
import { useState, useEffect } from "react";
import Checkbox from "expo-checkbox";
import CusButton from "@/components/CusButton";
import { ToDo } from "@/types/toDo";
import { updateToDoStatus, deleteToDo, getToDos } from "@/logic/todoStore";
import { router, useLocalSearchParams } from "expo-router";

const ToDoDetail = () => {
  const params = useLocalSearchParams();
  const id = Number(params.id); 

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const storedToDos = await getToDos();
      const currentToDo = storedToDos.find((item) => item.id === id);
      if (currentToDo) {
        setTitle(currentToDo.title);
        setDescription(currentToDo.description||"");
        setStatus(currentToDo.status);
      }
    };
    fetchData();
  }, [id]);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleClickUpdateBtn = async () => {
    if (title.trim() === "" || description.trim() === "") {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const updatedToDo: ToDo = {
      id,
      title,
      description,
      status,
    };

    await updateToDoStatus(updatedToDo);
    alert("✅ Cập nhật thành công!");
    router.replace("/(tabs)/home");
  };

  const handleClickDeleteBtn = () => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc muốn xóa todo này không?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: async () => {
            await deleteToDo(id);
            alert("🗑️ Đã xóa thành công!");
            router.replace("/(tabs)/home");
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View>
          <View style={styles.group}>
            <Text style={styles.label}>Tiêu đề</Text>
            <CusInput value={title} setValue={setTitle} />
          </View>

          <View style={styles.group}>
            <Text style={styles.label}>Mô tả</Text>
            <CusInput value={description} setValue={setDescription} height={100} />
          </View>

          <View style={styles.statusGroup}>
            <Text style={styles.label}>Trạng thái</Text>
            <Checkbox
              value={status}
              onValueChange={setStatus}
              style={styles.checkBox}
              color={status ? "#27ae60" : undefined}
            />
            <Text style={styles.statusText}>
              {status ? "Đã hoàn thành" : "Đang thực hiện"}
            </Text>
          </View>

          <View style={styles.btnGroup}>
            <CusButton text="Update" backgroundColor="#F1C40F" handleClickBtn={handleClickUpdateBtn} />
            <CusButton text="Delete" backgroundColor="#E74C3C" handleClickBtn={handleClickDeleteBtn} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 40,
    backgroundColor: "#f4f6f8",
  },
  group: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "600",
    color: "#34495e",
  },
  statusGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  checkBox: {
    marginHorizontal: 10,
    width: 24,
    height: 24,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  btnGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 15,
  },
});

export default ToDoDetail;
