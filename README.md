# 🧩 Sudoku Solver Web App

A full-stack Sudoku game built using **React** (frontend) and **Node.js + Express** (backend). It allows users to play Sudoku, solve it using an AI backend, check their answers, and preview the solution using different "Show Answer" modes.

---

## 🌟 Features

- ✅ Generate a new Sudoku puzzle
- ✏️ Fill the board with your own inputs
- 🤖 Solve puzzle instantly using the backend
- 🔍 Check if your solution is correct
- 👀 Show Answer Modes:
  - **Temporary Peek** – Press and hold to temporarily view solution
  - **Overlay Highlight** – Faded preview of correct answers
  - **Fill Missing Only** – Only fill the empty cells with correct values

---

## 🛠️ Tech Stack

| Layer      | Technology     |
|------------|----------------|
| Frontend   | React, Tailwind CSS |
| Backend    | Node.js, Express |
| Solver Logic | JavaScript Sudoku Solver |
| Communication | Axios (REST API) |
| Styling    | Tailwind CSS |

---

## 🧱 Project Structure
```
sudoku-app/
├── client/ # React frontend
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ │ └── SudokuBoard.jsx
│ │ └── App.jsx
│ └── package.json
├── server/ # Node.js backend
│ ├── index.js # Express API
│ └── sudoku.js # Solver logic
├── .gitignore
├── README.md
└── package.json (if using mono repo)
```


---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/sudoku-app.git
cd sudoku-app
```

### 2.Setup the Backend
```
cd server
npm install
node index.js
```
This will start the backend at:
📡 http://localhost:5000

### 3. Setup the Frontend
```
cd ../client
npm install
npm run dev
```
This will start the React frontend at:
🌐 http://localhost:5173 (or another Vite port)

## 🧠 Sudoku Solver Logic
- The solveSudoku(puzzle) function is a recursive backtracking algorithm that:
- Parses the 1D array into a 9x9 matrix
- Finds the next empty cell
- Tries digits 1–9
- Validates row, column, and 3x3 grid
- Recursively solves the board
- Returns the solution as a flattened array

## ⚙️ .gitignore Sample
```
# Node.js
node_modules/
.env

# React build
client/dist/
client/build/

# Logs
npm-debug.log*

# System
.DS_Store

# IDE
.vscode/
.idea/
```
## 🔧 API Endpoints
| Endpoint    | Method | Description                       |
| ----------- | ------ | --------------------------------- |
| `/generate` | GET    | Returns a new puzzle              |
| `/solve`    | POST   | Solves the given puzzle           |
| `/check`    | POST   | Compares board with true solution |

## 🙋‍♂️ Author
Akshay Kashyap M

