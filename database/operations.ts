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
