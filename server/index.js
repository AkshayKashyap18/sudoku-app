const express = require("express");
const cors = require("cors");
const { generateSudoku, solveSudoku } = require("./sudoku");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Store the original puzzle server-side
let originalPuzzle = null;

// Route to generate a new Sudoku puzzle
app.get("/generate", (req, res) => {
  originalPuzzle = generateSudoku(); // Save the original puzzle
  res.json({ puzzle: originalPuzzle });
});

// Route to solve the submitted Sudoku puzzle
app.post("/solve", (req, res) => {
  const { puzzle } = req.body;
  const solution = solveSudoku(puzzle);
  res.json({ solution });
});

// Route to check if the user's current board is correct
app.post("/check", (req, res) => {
  const { puzzle } = req.body;

  if (!originalPuzzle) {
    return res
      .status(400)
      .json({ error: "No original puzzle available to validate." });
  }

  const correctSolution = solveSudoku(originalPuzzle); // Solve based on the original

  const isCorrect =
    puzzle.length === correctSolution.length &&
    correctSolution.every((val, idx) => val === puzzle[idx]);

  res.json({ isCorrect });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
