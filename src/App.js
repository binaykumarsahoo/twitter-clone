import React from "react";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import "./App.css";
import Widgets from "./Widgets";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <>
          {/* Sidebar */}
          <Sidebar />

          {/* Feed */}
          <Feed />

          {/* Widgets */}
          <Widgets />
        </>
      )}
    </div>
  );
}

export default App;
