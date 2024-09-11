import { Outlet } from "react-router-dom";

import Nav_bar from "./components/Nav_bar";

import "./assets/styles/app.css";
import "./assets/styles/home.css";
import "./assets/styles/big-card.css";
import "./assets/styles/little-card.css";
import "./assets/styles/task-detail.css";

function App() {
  return (
    <>
      <Nav_bar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
export default App;
