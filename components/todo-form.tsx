import {
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addTask, Task, updateTask } from "@/database/operations";
import { useSQLiteContext } from "expo-sqlite";
import { router } from "expo-router";

interface TodoFormProps {
  task?: Task;
}

export default function TodoForm({ task }: TodoFormProps) {
  const [title, setTitle] = useState(task?.title || "");
  const [dueDate, setDueDate] = useState<Date>(
    task?.dueDate ? new Date(task.dueDate) : new Date()
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  const db = useSQLiteContext();

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  const handleSubmit = () => {
    if (title.trim()) {
      const newTask: Task = {
        title: title.trim(),
        dueDate: dueDate,
        completed: false,
      };

      if (task && task.id) {
        updateTask(db, task.id, newTask);
      } else {
        addTask(db, newTask);
      }
      setTitle("");
      setDueDate(new Date());
      router.push("/");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Add a new task"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      {/* <TextInput placeholder="Set a due date" style={styles.input} /> */}
      {Platform.OS === "ios" ? (
        <DateTimePicker
          value={dueDate}
          mode="date"
          onChange={handleDateChange}
        />
      ) : (
        <>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.dateButton}
          >
            <Text>Set Due Date: {dueDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dueDate}
              mode="date"
              onChange={handleDateChange}
            />
          )}
        </>
      )}
      {/* <DateTimePicker value={dueDate} onChange={handleDateChange} /> */}
      <Button
        title={task ? "Update Task" : "Add Task"}
        onPress={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  dateButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});
