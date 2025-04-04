import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import CusButton from "@/components/CusButton";
import { router } from "expo-router";
import { ToDo } from "@/types/toDo";
import { useState, useCallback } from "react";
import { getToDos } from "@/logic/todoStore";
import { useFocusEffect } from "@react-navigation/native";

const Home = () => {
    const [toDoList, setToDoList] = useState<ToDo[]>([]);

    // Load dữ liệu mỗi khi màn hình được focus lại
    useFocusEffect(
        useCallback(() => {
            const fetchToDos = async () => {
                const storedToDos = await getToDos();
                setToDoList(storedToDos);
            };

            fetchToDos();
        }, [])
    );

    const handleClickBtn = () => {
        router.push("/(tabs)/home/createNew");
    };

    const handlePressCard = (id: string | number) => {
        router.push(`/(tabs)/home/details/${id}`);
    };

    return (
        <View style={styles.container}>
            <View style={styles.groupBtn}>
                <CusButton text="Create" handleClickBtn={handleClickBtn} />
            </View>

            <FlatList
                data={toDoList}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handlePressCard(item.id)}>
                        <View style={styles.card}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.description}>{item.description}</Text>
                            <Text style={styles.status}>
                                {item.status ? "✅ Completed" : "⏳ In Progress"}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f8f9fa",
        marginTop: 20,
    },
    groupBtn: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginBottom: 20,
    },
    card: {
        backgroundColor: "white",
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    description: {
        fontSize: 14,
        color: "#555",
        marginVertical: 5,
    },
    status: {
        fontSize: 12,
        color: "#007bff",
    },
});

export default Home;
