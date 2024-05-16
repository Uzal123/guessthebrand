// LetterGrid.js

import React from "react";

const LetterGrid = ({
  letters,
  onClick,
}: {
  letters: string[];
  onClick: (letter: string) => void;
}) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {letters.map((letter, index) => (
        <button
          key={index}
          className="bg-gray-200 text-lg font-semibold p-2 rounded"
          onClick={() => onClick(letter)}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default LetterGrid;
