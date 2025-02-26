import TodoTask from "@/components/todo-task";
import { getAllTasks, Task } from "@/database/operations";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  SectionList,
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
  const db = useSQLiteContext();
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const tasks = await getAllTasks(db);
    setTasks(tasks);
  };

  const sections = [
    {
      title: "Pending Tasks",
      data: tasks.filter((task) => !task.completed),
    },
    {
      title: "Completed Tasks",
      data: tasks.filter((task) => task.completed),
    },
  ];

  return (
    <View style={styles.container}>
      {/* <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TodoTask task={item} onDelete={fetchTasks} />
        )}
        ListEmptyComponent={<Text>No tasks found</Text>}
      /> */}
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoTask task={item} onDelete={fetchTasks} />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View className="bg-gray-100 px-4 py-2">
            <Text className="text-lg font-bold">{title}</Text>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/new-task")}
      >
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
