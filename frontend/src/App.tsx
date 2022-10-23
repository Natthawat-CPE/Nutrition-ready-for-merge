import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Manage from "./components/Manage";
export default function App() {
  return (
    <Router>
      <div>
        <Manage />
      </div>
    </Router>
  );
}
