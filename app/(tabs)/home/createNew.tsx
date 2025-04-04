import { View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback } from "react-native";
import CusInput from "@/components/CusInput";
import { useState } from "react";
import Checkbox from 'expo-checkbox';
import CusButton from "@/components/CusButton";
import { ToDo } from "@/types/toDo";
import { generateUniqueId } from "@/logic/generateID";
import { addToDo } from "@/logic/todoStore";
import { router } from "expo-router";

const createNewToDo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleClickAddBtn = () => {
    if (title.trim() === "") {
      alert("Title không được để trống!");
    } else {
      if (description.trim() === "") {
        alert("Description không được để trống!");
      } else {
        const toDo: ToDo = {
          id: generateUniqueId(),
          title: title,
          description: description,
          status: status,
        };

        addToDo(toDo);
        router.replace("/(tabs)/home");
      }
    }
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={dismissKeyboard} accessible={false}>
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
            <CusButton text="Add" backgroundColor="#27ae60" handleClickBtn={handleClickAddBtn} />
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
    justifyContent: "flex-end",
    marginTop: 20,
  },
});

export default createNewToDo;
