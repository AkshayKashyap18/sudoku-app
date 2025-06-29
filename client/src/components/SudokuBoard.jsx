import React from "react";

const SudokuBoard = ({
  board,
  initialBoard,
  onChange,
  solutionOverlay = [],
}) => {
  const cellSize = "w-12 h-12"; // Cell dimensions

  return (
    <div className="inline-block">
      {/* Sudoku Grid */}
      <div className="grid grid-cols-9 bg-gray-900 p-[3px] rounded-2xl shadow-2xl relative">
        {board.map((value, index) => {
          const row = Math.floor(index / 9);
          const col = index % 9;
          const isInitial = initialBoard[index] !== null;
          const overlayVal = solutionOverlay[index];

          // Border styling for 3x3 subgrids
          const borderStyles = [
            row % 3 === 0
              ? "border-t-4 border-black"
              : "border-t border-gray-400",
            col % 3 === 0
              ? "border-l-4 border-black"
              : "border-l border-gray-400",
            row === 8 ? "border-b-4 border-black" : "border-b border-gray-400",
            col === 8 ? "border-r-4 border-black" : "border-r border-gray-400",
          ].join(" ");

          return (
            <div key={index} className={`relative ${cellSize}`}>
              <input
                type="text"
                maxLength="1"
                value={value === null ? "" : value}
                readOnly={isInitial}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || /^[1-9]$/.test(val)) {
                    onChange(index, val);
                  }
                }}
                className={`text-center text-lg font-bold absolute top-0 left-0 w-full h-full z-10
                  focus:outline-none focus:ring-2 focus:ring-indigo-400
                  ${
                    isInitial
                      ? "bg-gray-300 text-gray-800"
                      : "bg-white text-indigo-600 hover:bg-indigo-50"
                  }
                  ${borderStyles}`}
              />
              {/* Overlay solution value (faint) */}
              {overlayVal &&
                !isInitial &&
                (value === null || value !== overlayVal) && (
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 z-0 select-none pointer-events-none">
                    {overlayVal}
                  </span>
                )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SudokuBoard;
