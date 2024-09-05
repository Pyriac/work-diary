import { Outlet } from "react-router-dom";

import Nav_bar from "./components/Nav_bar";

import "./assets/styles/app.css";
import "./assets/styles/home.css";
import "./assets/styles/card.css";

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
