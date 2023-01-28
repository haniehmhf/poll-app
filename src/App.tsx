import React from "react";
import VoteContext from "./context/VoteContext";
import VotePage from "./components/VotePage";
import { ToastContainer } from "react-toastify";
import "./App.css";

function App() {
  return (
    <div className="app">
      <VoteContext>
        <VotePage />
      </VoteContext>
      <ToastContainer newestOnTop hideProgressBar autoClose={1500} />
    </div>
  );
}

export default App;
