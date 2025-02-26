import { createDbIfNeeded } from "@/database/operations";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import "../global.css";

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="tasks.db" onInit={createDbIfNeeded}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Task Manager" }} />
        <Stack.Screen name="new-task" options={{ title: "New Task" }} />
        <Stack.Screen name="edit-task" options={{ title: "Edit Task" }} />
      </Stack>
    </SQLiteProvider>
  );
}
