import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import css from "../styles/page.module.css";

export default function Home() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      <main className={css.main} style={{ flex: 1 }}>
        {/* Hero section */}
        <section className={css.hero}>
          <h1 className={css.title}>TaskFlow</h1>
          <p className={css.subtitle}>
            Organize your day, manage tasks efficiently, and get more done.
          </p>
          <Link to="/task">
            <button className={css.ctaButton}>Create your first task</button>
          </Link>
        </section>

        {/* Features section */}
        <section className={css.features}>
          <div className={css.featureCard}>
            <h3>Simplicity</h3>
            <p>
              An intuitive interface for quickly adding and editing your tasks.
            </p>
          </div>
          <div className={css.featureCard}>
            <h3>Organization</h3>
            <p>Group tasks by categories and priorities to stay focused.</p>
          </div>
          <div className={css.featureCard}>
            <h3>Productivity</h3>
            <p>
              Track your progress and complete tasks every day with confidence.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className={css.howItWorks}>
          <h2>How TaskFlow works</h2>
          <div className={css.steps}>
            <div className={css.step}>
              <span className={css.stepNumber}>1</span>
              <h4>Create tasks</h4>
              <p>
                Add new tasks with a title and details in just a few clicks.
              </p>
            </div>
            <div className={css.step}>
              <span className={css.stepNumber}>2</span>
              <h4>Manage & organize</h4>
              <p>Update, delete, and sort tasks to keep your workflow clean.</p>
            </div>
            <div className={css.step}>
              <span className={css.stepNumber}>3</span>
              <h4>Track progress</h4>
              <p>Mark tasks as completed and stay focused on your goals.</p>
            </div>
          </div>
        </section>

        {/* Demo section */}
        <section className={css.demo}>
          <h2>Your tasks for today</h2>
          <div className={css.taskPreview}>
            <p>Task 1: Learn a new React feature</p>
            <p>Task 2: Fix a bug in TaskFlow</p>
          </div>
          <Link to="/task">
            <button className={css.ctaButton}>Go to task list</button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
