import { Outlet } from "react-router-dom";

import Nav_bar from "./components/Nav_bar";

import "./assets/styles/app.css";

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
