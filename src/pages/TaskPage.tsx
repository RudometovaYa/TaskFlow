import React, { useMemo, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import TaskList from "../components/TaskList/TaskList";
import SearchBox, { type SearchMode } from "../components/SearchBox/SearchBox";
import Pagination from "../components/Pagination/Pagination";
import Modal from "../components/Modal/Modal";
import TaskForm from "../components/TaskForm/TaskForm";
import Loader from "../components/Loader/Loader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";

import { fetchTasks } from "../services/taskService";
import css from "../styles/App.module.css";

const TaskPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [searchMode, setSearchMode] = useState<SearchMode>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [debouncedQuery] = useDebounce(query, 500);
  const safeQuery = debouncedQuery.trim();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks", safeQuery, currentPage],
    queryFn: () => fetchTasks(safeQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  const handleSearch = (value: string, mode: SearchMode) => {
    setQuery(value);
    setSearchMode(mode);
    setCurrentPage(1);
  };

  const filteredTasks = useMemo(() => {
    if (!data?.notes) return [];

    const q = safeQuery.toLowerCase();
    if (!q) return data.notes;

    return data.notes.filter((task) => {
      switch (searchMode) {
        case "title":
          return task.title.toLowerCase().includes(q);

        case "content":
          return task.content.toLowerCase().includes(q);

        case "tag":
          return task.tag.toLowerCase().includes(q);

        default:
          return (
            task.title.toLowerCase().includes(q) ||
            task.content.toLowerCase().includes(q) ||
            task.tag.toLowerCase().includes(q)
          );
      }
    });
  }, [data?.notes, safeQuery, searchMode]);

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

          <SearchBox onSearch={handleSearch} />
        </header>

        {isLoading && <Loader />}
        {isError && <ErrorMessage />}

        {filteredTasks.length > 0 && <TaskList tasks={filteredTasks} />}

        {filteredTasks.length === 0 && !isLoading && <p>No tasks found.</p>}

        {pageCount > 1 && (
          <Pagination
            pageCount={pageCount}
            currentPage={currentPage - 1}
            onPageChange={(page) => setCurrentPage(page + 1)}
          />
        )}

        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <TaskForm onCancel={() => setIsModalOpen(false)} />
          </Modal>
        )}
      </main>

      <Footer />
      <Toaster position="top-right" />
    </div>
  );
};

export default TaskPage;
