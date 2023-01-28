import React from "react";
import VoteContext from "./context/VoteContext";
import VotePage from "./components/VotePage";
import "./App.css";

function App() {
  return (
    <div className="app">
      <VoteContext>
        <VotePage />
      </VoteContext>
    </div>
  );
}

export default App;
