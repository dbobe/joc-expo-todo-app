import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";

interface TodoTaskProps {
  title: string;
  dueDate: string;
}

export default function TodoTask({ title, dueDate }: TodoTaskProps) {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <View style={styles.container}>
      <Checkbox
        value={isChecked}
        onValueChange={setIsChecked}
        color={isChecked ? "#4630EB" : undefined}
      />
      <View>
        <Text style={[styles.title, isChecked && styles.checked]}>{title}</Text>
        <Text style={[styles.dueDate, isChecked && styles.checked]}>
          {dueDate}
        </Text>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="pencil" size={16} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]}>
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
