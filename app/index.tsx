import TodoTask from "@/components/todo-task";
import { Ionicons } from "@expo/vector-icons";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const tasks = [
  {
    id: 1,
    title: "Task 1",
    dueDate: "02/06/2025",
  },
  {
    id: 2,
    title: "Task 2",
    dueDate: "02/06/2025",
  },
];

export default function Index() {
  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TodoTask title={item.title} dueDate={item.dueDate} />
        )}
        ListEmptyComponent={<Text>No tasks found</Text>}
      />
      <TouchableOpacity style={styles.fab} onPress={() => alert("FAB Pressed")}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  task: {
    flexDirection: "row",
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "#3b82f6",
    padding: 16,
    borderRadius: 32,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
