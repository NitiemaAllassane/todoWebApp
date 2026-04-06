export type TaskCategories = "personal" | "work" | "shopping" | "health";
export type TaskPriority = "low" | "medium" | "high";
export type SearchCategories = "allCategorie" | "personal" | "work" | "shopping" | "health";

export interface Todo {
  id: number;
  isDone: boolean;
  text: string;
  category: TaskCategories;
  priority: TaskPriority;
}

export interface TaskProps extends Todo {
  onTaskfinish: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string) => void;
}


export interface TaskEditorProps {
  taskId: number;
  isTaskDone: boolean;
  taskText: string;
  handleTaskFinish: (id: number) => void;
  editTask: (id: number, text: string) => void;
  onCancel: () => void;
}