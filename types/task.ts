export interface Task {
  id: number;
  title: string;
  content: string;
  tag: TaskTag;
  createdAt: string;
  updatedAt: string;
}

export type TaskTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface NewTaskData {
  title: string;
  content: string;
  tag: TaskTag;
}
