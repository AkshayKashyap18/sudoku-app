// server/sudoku.js
const sudoku = require("sudoku");

function generateSudoku() {
  const puzzle = sudoku.makepuzzle();
  return puzzle.map((cell) => (cell === null ? null : cell + 1));
}

function solveSudoku(puzzle) {
  const raw = puzzle.map((cell) => (cell === null ? null : cell - 1));
  const solution = sudoku.solvepuzzle(raw);
  return solution.map((cell) => cell + 1);
}

module.exports = { generateSudoku, solveSudoku };
