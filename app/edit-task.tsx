import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { getTaskById, Task } from "@/database/operations";
import TodoForm from "@/components/todo-form";

export default function EditTaskPage() {
  const { id } = useLocalSearchParams();
  const db = useSQLiteContext();
  const [task, setTask] = useState<Task | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTask = async () => {
      const fetchedTask = await getTaskById(db, Number(id));
      setTask(fetchedTask);
      setIsLoading(false);
    };
    loadTask();
  }, [id]);

  if (isLoading) {
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>;
  }

  if (!task) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Task not found</Text>
      </View>
    );
  }

  return <TodoForm task={task} />;
}

const styles = StyleSheet.create({});
