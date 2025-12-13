import css from "./NoteList.module.css";
import type { Task } from "../../types/task";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../../services/taskService";

interface TasksListProps {
  tasks: Task[];
}

export default function TasksList({ tasks }: TasksListProps) {
  const queryClient = useQueryClient();

  const deleteTaskMutation = useMutation({
    mutationFn: (id: number) => deleteTask(id),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const handleDelete = (id: number) => {
    deleteTaskMutation.mutate(id);
  };

  return (
    <ul className={css.list}>
      {tasks.map((task) => (
        <li key={task.id} className={css.listItem}>
          <h2 className={css.title}>{task.title}</h2>
          <p className={css.content}>{task.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{task.tag}</span>
            <button
              className={css.button}
              onClick={() => handleDelete(task.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
