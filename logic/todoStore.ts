import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToDo } from '@/types/toDo';

const getToDos = async (): Promise<ToDo[]> => {
  try {
    const todos = await AsyncStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
  } catch (error) {
    console.error("Error getting todos: ", error);
    return [];
  }
};


const saveToDos = async (todos: ToDo[]) => {
  try {
    await AsyncStorage.setItem('todos', JSON.stringify(todos));
  } catch (error) {
    console.error("Error saving todos: ", error);
  }
};


const addToDo = async (newToDo: ToDo) => {
  const todos = await getToDos();
  const updatedTodos = [...todos, newToDo];
  await saveToDos(updatedTodos);
};


const updateToDoStatus = async (newToDo: ToDo) => {
    const todos = await getToDos();
    const updatedTodos = todos.map((todo) =>
      todo.id === newToDo.id ? newToDo : todo
    );
    await saveToDos(updatedTodos);
  };
  

const deleteToDo = async (id: number) => {
  const todos = await getToDos();
  const updatedTodos = todos.filter(todo => todo.id !== id);
  await saveToDos(updatedTodos);
};
export {saveToDos, addToDo, getToDos, deleteToDo, updateToDoStatus};