import { SQLiteDatabase } from "expo-sqlite";

export interface Task {
  id?: number;
  title: string;
  dueDate: Date;
  completed: boolean;
}

export const createDbIfNeeded = async (db: SQLiteDatabase) => {
  console.log("Creating database if needed");
  try {
    const response = await db.execAsync(`
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                dueDate DATE NOT NULL,
                completed BOOLEAN NOT NULL DEFAULT FALSE
            )
            `);
    console.log("Database created", response);
  } catch (error) {
    console.error("Error creating database", error);
  }
};

export async function getAllTasks(db: SQLiteDatabase): Promise<Task[]> {
  try {
    const response = await db.getAllAsync<Task>(
      "SELECT * FROM tasks ORDER BY completed ASC, date(dueDate) ASC"
    );
    return response;
  } catch (error) {
    console.error("Error getting all tasks", error);
    return [];
  }
}

export async function getTaskById(
  db: SQLiteDatabase,
  id: number
): Promise<Task | undefined> {
  try {
    const response = await db.getFirstAsync<Task>(
      "SELECT * FROM tasks WHERE id = ?",
      [id]
    );
    return response || undefined;
  } catch (error) {
    console.error("Error getting task by id", error);
    return undefined;
  }
}

export async function addTask(db: SQLiteDatabase, task: Task): Promise<void> {
  console.log("Adding task", task);
  try {
    await db.runAsync(
      "INSERT INTO tasks (title, dueDate, completed) VALUES (?, ?, ?)",
      [task.title, task.dueDate.toISOString(), task.completed]
    );
    console.log("Task added successfully");
  } catch (error) {
    console.error("Error adding task", error);
  }
}

export async function updateTask(
  db: SQLiteDatabase,
  id: number,
  task: Task
): Promise<void> {
  console.log("Updating task", task);
  try {
    await db.runAsync(
      "UPDATE tasks SET title = ?, dueDate = ?, completed = ? WHERE id = ?",
      [task.title, task.dueDate.toISOString(), task.completed, id]
    );
    console.log("Task updated successfully");
  } catch (error) {
    console.error("Error updating task", error);
  }
}

export async function deleteTask(
  db: SQLiteDatabase,
  id: number
): Promise<void> {
  console.log("Deleting task", id);
  try {
    await db.runAsync("DELETE FROM tasks WHERE id = ?", [id]);
  } catch (error) {
    console.error("Error deleting task", error);
  }
}
