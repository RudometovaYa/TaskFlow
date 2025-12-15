import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import TaskPage from "../src/pages/TaskPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task" element={<TaskPage />} />
      </Routes>
    </Router>
  );
};

export default App;
