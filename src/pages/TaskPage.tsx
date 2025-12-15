import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import TaskList from "../components/TaskList/TaskList";
import { fetchTasks } from "../services/taskService";
import Loader from "../components/Loader/Loader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import Pagination from "../components/Pagination/Pagination";
import Modal from "../components/Modal/Modal";
import TaskForm from "../components/TaskForm/TaskForm";

import css from "../styles/App.module.css"; // Перевір, що файл існує

const TaskPage: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [debouncedQuery] = useDebounce(query, 500);
  const safeQuery = debouncedQuery.trim();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks", safeQuery, currentPage],
    queryFn: () => fetchTasks(safeQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  const handleSearch = (value: string) => {
    setQuery(value);
    setCurrentPage(1);
  };

  const pageCount = data?.totalPages ?? 0;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      <main className={css.app} style={{ flex: 1, padding: "32px" }}>
        <header className={css.toolbar}>
          <button className={css.button} onClick={() => setIsModalOpen(true)}>
            Create task +
          </button>

          {pageCount > 1 && (
            <Pagination
              pageCount={pageCount}
              currentPage={currentPage - 1}
              onPageChange={(page) => setCurrentPage(page + 1)}
            />
          )}

          <div className={css.searchBox}>
            <input
              type="text"
              placeholder="Search tasks..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </header>

        {isLoading && <Loader />}
        {isError && <ErrorMessage />}

        {data && data.notes.length > 0 && <TaskList tasks={data.notes} />}

        {data && data.notes.length === 0 && <p>No tasks found.</p>}

        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <TaskForm onCancel={() => setIsModalOpen(false)} />
          </Modal>
        )}
      </main>
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default TaskPage;
