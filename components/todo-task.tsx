import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";
import { deleteTask, Task, updateTask } from "@/database/operations";
import { useSQLiteContext } from "expo-sqlite";
import { router } from "expo-router";
interface TodoTaskProps {
  task: Task;
  onDelete: () => void;
}

export default function TodoTask({ task, onDelete }: TodoTaskProps) {
  const db = useSQLiteContext();
  const [isChecked, setIsChecked] = useState(task.completed || false);

  return (
    <View style={styles.container}>
      <Checkbox
        value={isChecked}
        color={isChecked ? "#4630EB" : undefined}
        onValueChange={(newValue) => {
          setIsChecked(newValue);
          updateTask(db, task.id!, {
            ...task,
            completed: newValue,
            dueDate: new Date(task.dueDate),
          });
          onDelete();
        }}
      />
      <View>
        <Text style={[styles.title, isChecked && styles.checked]}>
          {task.title}
        </Text>
        <Text style={[styles.dueDate, isChecked && styles.checked]}>
          Due Date:{new Date(task.dueDate).toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push(`/edit-task?id=${task.id}`)}
        >
          <Ionicons name="pencil" size={16} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => {
            deleteTask(db, task.id!);
            onDelete();
          }}
        >
          <Ionicons name="trash" size={16} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dueDate: {
    fontSize: 12,
    color: "#555",
  },
  checked: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 8,
    marginLeft: "auto",
  },
  button: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: "skyblue",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButton: {
    backgroundColor: "red",
  },
});
