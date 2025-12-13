import axios from "axios";
import type { Task } from "../types/task";

const API_TOKEN = import.meta.env.VITE_TASKFLOW_TOKEN;

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

interface FetchTasksProps {
  tasks: Task[];
  page: number;
  perPage: number;
  totalPages: number;
}

export const fetchTasks = async (
  search: string,
  page: number = 1,
  perPage: number = 12
): Promise<FetchTasksProps> => {
  const params: Record<string, string | number> = {
    page: page.toString(),
    perPage: perPage.toString(),
  };

  if (search.trim() !== "") {
    params.search = search;
  }

  const response = await axios.get<FetchTasksProps>(`/notes`, {
    params,
    headers: { Authorization: `Bearer ${API_TOKEN}` },
  });

  return response.data;
};

interface CreateTaskProps {
  title: string;
  content: string;
  tag: string;
}

export const createTask = async (taskData: CreateTaskProps): Promise<Task> => {
  const response = await axios.post<Task>(`/notes`, taskData, {
    headers: { Authorization: `Bearer ${API_TOKEN}` },
  });
  return response.data;
};

export const deleteTask = async (id: number): Promise<Task> => {
  const response = await axios.delete<Task>(`/notes/${id}`, {
    headers: { Authorization: `Bearer ${API_TOKEN}` },
  });
  return response.data;
};
