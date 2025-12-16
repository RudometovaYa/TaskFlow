import css from "./SearchBox.module.css";
import { useState } from "react";
import type { ChangeEvent } from "react";

export type SearchMode = "all" | "title" | "content" | "tag";
export type TaskTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

interface SearchBoxProps {
  onSearch: (value: string, mode: SearchMode) => void;
}

const PLACEHOLDERS: Record<SearchMode, string> = {
  all: "Search in title, content or tag...",
  title: "Search by title...",
  content: "Search by content...",
  tag: "Search by tag...",
};

const TAGS: TaskTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const [value, setValue] = useState("");
  const [mode, setMode] = useState<SearchMode>("all");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onSearch(newValue, mode);
  };

  const handleModeChange = (newMode: SearchMode) => {
    setMode(newMode);
    onSearch(value, newMode);
    setDropdownOpen(newMode === "tag");
  };

  const handleTagSelect = (tag: TaskTag) => {
    setValue(tag);
    onSearch(tag, "tag");
    setDropdownOpen(false);
  };

  return (
    <div className={css.wrapper}>
      <input
        className={css.input}
        type="text"
        value={value}
        placeholder={PLACEHOLDERS[mode]}
        onChange={handleInputChange}
        autoComplete="off"
        onFocus={() => mode === "tag" && setDropdownOpen(true)}
        onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
      />

      <div className={css.modes}>
        <label>
          <input
            type="radio"
            checked={mode === "all"}
            onChange={() => handleModeChange("all")}
          />
          All
        </label>

        <label>
          <input
            type="radio"
            checked={mode === "title"}
            onChange={() => handleModeChange("title")}
          />
          Title
        </label>

        <label>
          <input
            type="radio"
            checked={mode === "content"}
            onChange={() => handleModeChange("content")}
          />
          Content
        </label>

        <label>
          <input
            type="radio"
            checked={mode === "tag"}
            onChange={() => handleModeChange("tag")}
          />
          Tag
        </label>
      </div>

      {/* Dropdown для тегів */}
      {dropdownOpen && (
        <ul className={css.dropdown}>
          {TAGS.map((tag) => (
            <li
              key={tag}
              className={css.dropdownItem}
              onMouseDown={() => handleTagSelect(tag)}
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
