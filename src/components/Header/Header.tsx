import { Link } from "react-router-dom";
import css from "./Header.module.css";

export default function Header() {
  return (
    <header className={css.header}>
      <Link to="/" aria-label="Home" className={css.logo}>
        TaskFlow
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/task">Tasks</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
