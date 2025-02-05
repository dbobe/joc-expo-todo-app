import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Task Manager" }} />
      <Stack.Screen name="new-task" options={{ title: "New Task" }} />
      <Stack.Screen name="edit-task" options={{ title: "Edit Task" }} />
    </Stack>
  );
}
