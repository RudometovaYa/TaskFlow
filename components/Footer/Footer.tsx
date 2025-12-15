import css from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} TaskFlow. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Yana Rudometova</p>
          <p>
            Contact us:
            <a href="mailto:develop@taskflow.app">develop@taskflow.app</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
