// SelectedLettersDisplay.js

import React from "react";

const SelectedLettersDisplay = ({
  selectedLetters,
}: {
  selectedLetters: string[];
}) => {
  return (
    <div className="my-4">
      <h2 className="text-lg font-semibold">Selected Letters:</h2>
      <p className="text-xl">{selectedLetters.join("")}</p>
    </div>
  );
};

export default SelectedLettersDisplay;
