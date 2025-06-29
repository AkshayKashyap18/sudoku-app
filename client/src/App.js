import React, { useEffect, useState } from "react";
import axios from "axios";
import SudokuBoard from "./components/SudokuBoard";

function App() {
  const [board, setBoard] = useState([]);
  const [initialBoard, setInitialBoard] = useState([]);
  const [solutionOverlay, setSolutionOverlay] = useState([]);
  const [backupBoard, setBackupBoard] = useState([]);

  const fetchNewGame = async () => {
    try {
      const res = await axios.get("http://localhost:5000/generate");
      const puzzle = res.data.puzzle;
      setBoard([...puzzle]);
      setInitialBoard([...puzzle]);
      setSolutionOverlay([]);
    } catch (err) {
      alert("Failed to fetch puzzle.");
    }
  };

  useEffect(() => {
    fetchNewGame();
  }, []);

  const handleChange = (index, value) => {
    const newBoard = [...board];
    newBoard[index] = value === "" ? null : parseInt(value);
    setBoard(newBoard);
  };

  const handleSolve = async () => {
    try {
      const res = await axios.post("http://localhost:5000/solve", {
        puzzle: board,
      });
      setBoard(res.data.solution);
    } catch (err) {
      alert("Unable to solve the puzzle.");
    }
  };

  const handleCheck = async () => {
    try {
      const res = await axios.post("http://localhost:5000/check", {
        puzzle: board,
      });
      alert(res.data.isCorrect ? "✅ Correct!" : "❌ Incorrect!");
    } catch (err) {
      alert("Unable to check solution.");
    }
  };

  // 👆 Press-and-hold peek
  const handlePeekDown = async () => {
    try {
      setBackupBoard([...board]);
      const res = await axios.post("http://localhost:5000/solve", {
        puzzle: board,
      });
      setBoard(res.data.solution);
    } catch (err) {
      alert("Failed to show peek.");
    }
  };

  const handlePeekUp = () => {
    setBoard([...backupBoard]);
  };

  const handleOverlayMode = async () => {
    try {
      const res = await axios.post("http://localhost:5000/solve", {
        puzzle: board,
      });
      setSolutionOverlay(res.data.solution);
    } catch (err) {
      alert("Failed to show overlay.");
    }
  };

  const handleFillMissingCells = async () => {
    try {
      const res = await axios.post("http://localhost:5000/solve", {
        puzzle: board,
      });
      const filledBoard = board.map((val, i) =>
        val === null ? res.data.solution[i] : val
      );
      setBoard(filledBoard);
    } catch (err) {
      alert("Failed to fill missing cells.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">🧩 Sudoku Game</h1>

      {/* Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={fetchNewGame}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          New Game
        </button>
        <button
          onClick={handleSolve}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Solve
        </button>
        <button
          onClick={handleCheck}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Check Solution
        </button>
      </div>

      {/* Sudoku Board */}
      <SudokuBoard
        board={board}
        initialBoard={initialBoard}
        onChange={handleChange}
        solutionOverlay={solutionOverlay}
      />

      {/* Show Answer Modes */}
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onMouseDown={handlePeekDown}
          onMouseUp={handlePeekUp}
          onMouseLeave={handlePeekUp} // Optional: stop peek if mouse leaves
          className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500"
        >
          👁 Hold to Peek
        </button>

        <button
          onClick={handleOverlayMode}
          className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
        >
          👓 Overlay Highlight
        </button>

        <button
          onClick={handleFillMissingCells}
          className="px-4 py-2 bg-indigo-400 text-white rounded hover:bg-indigo-500"
        >
          ✨ Fill Missing Cells
        </button>
      </div>
    </div>
  );
}

export default App;
