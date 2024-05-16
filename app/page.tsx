"use client";
import { useState, useEffect } from "react";
import { VscListSelection } from "react-icons/vsc";
import { BsSkipForwardCircleFill } from "react-icons/bs";
import { IoSendSharp } from "react-icons/io5";
import { GoMilestone } from "react-icons/go";
import { FcCancel } from "react-icons/fc";
import { MdOutlineCheckCircle } from "react-icons/md";

const levels = [
  { tagline: "Just Do It", brand: "NIKE" },
  { tagline: "I'm Lovin' It", brand: "MCDONALDS" },
  { tagline: "Think Different", brand: "APPLE" },
  { tagline: "Because You're Worth It", brand: "LOREAL" },
  { tagline: "The Ultimate Driving Machine", brand: "BMW" },
  { tagline: "Open Happiness", brand: "COCA-COLA" },
  { tagline: "The Quicker Picker Upper", brand: "BOUNTY" },
  { tagline: "Have it Your Way", brand: "BURGER KING" },
  { tagline: "Melts in Your Mouth, Not in Your Hands", brand: "M&M'S" },
  { tagline: "It Gives You Wings", brand: "RED BULL" },
  { tagline: "Taste the Rainbow", brand: "SKITTLES" },
  // Add more levels here
];

const getRandomLetters = (brand: string): string[] => {
  const brandLetters = brand.split("");
  const extraLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    .split("")
    .filter((letter) => !brandLetters.includes(letter))
    .sort(() => 0.5 - Math.random())
    .slice(0, 5); // Add 5 random letters
  return [...brandLetters, ...extraLetters].sort(() => 0.5 - Math.random());
};

export default function Home() {
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [userInput, setUserInput] = useState<string[]>(
    Array(levels[currentLevel].brand.length).fill("")
  );
  const [attempts, setAttempts] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [letters, setLetters] = useState<string[]>(
    getRandomLetters(levels[0].brand)
  );
  const [selectedLetters, setSelectedLetters] = useState<boolean[]>(
    Array(letters.length).fill(false)
  );
  const [showLevelInput, setShowLevelInput] = useState<boolean>(false);
  const [levelInput, setLevelInput] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  useEffect(() => {
    const newLetters = getRandomLetters(levels[currentLevel].brand);
    setLetters(newLetters);
    setSelectedLetters(Array(newLetters.length).fill(false));
    setUserInput(Array(levels[currentLevel].brand.length).fill(""));
  }, [currentLevel]);

  const handleInputChange = (index: number, letter: string) => {
    const newInput = [...userInput];
    newInput[index] = letter;
    setUserInput(newInput);
  };

  const handleLetterClick = (index: number, letter: string) => {
    const firstEmptyIndex = userInput.indexOf("");
    if (firstEmptyIndex !== -1) {
      handleInputChange(firstEmptyIndex, letter);
      const newSelectedLetters = [...selectedLetters];
      newSelectedLetters[index] = true;
      setSelectedLetters(newSelectedLetters);
    }
  };

  const handleBackButton = () => {
    const lastFilledIndex = userInput.findIndex((letter) => letter === "");
    const lastIndex =
      lastFilledIndex === -1 ? userInput.length - 1 : lastFilledIndex - 1;

    if (lastIndex >= 0) {
      const newInput = [...userInput];
      const letterToRemove = newInput[lastIndex];
      newInput[lastIndex] = "";
      setUserInput(newInput);

      const letterIndex = letters.findIndex(
        (letter, idx) => letter === letterToRemove && selectedLetters[idx]
      );
      if (letterIndex !== -1) {
        const newSelectedLetters = [...selectedLetters];
        newSelectedLetters[letterIndex] = false;
        setSelectedLetters(newSelectedLetters);
      }
    }
  };

  const checkAnswer = () => {
    if (userInput.join("") === levels[currentLevel].brand) {
      setScore(score + (5 - attempts)); // Example scoring system
      setIsCorrect(true);
      setShowModal(true);
    } else {
      setIsCorrect(false);
      setAttempts(attempts + 1);
      setShowModal(true);
    }
  };

  const handleNextLevel = () => {
    setCurrentLevel(currentLevel + 1);
    setAttempts(0);
    setShowModal(false);
  };

  const handleRetry = () => {
    setShowModal(false);
  };

  const skipLevel = () => {
    setCurrentLevel(currentLevel + 1);
    setAttempts(0);
  };

  const handleLevelInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLevelInput(e.target.value);
  };

  const handleLevelSelect = () => {
    const level = parseInt(levelInput) - 1;
    if (level >= 0 && level < levels.length) {
      setCurrentLevel(level);
      setAttempts(0);
    }
    setShowLevelInput(false);
    setLevelInput("");
  };

  const renderInputBoxes = () => {
    return userInput.map((letter, index) => (
      <input
        key={index}
        type="text"
        maxLength={1}
        value={letter}
        readOnly
        className="border border-gray-500 w-10 h-10 text-center py-1 m-1 rounded-md"
      />
    ));
  };

  const renderLetterOptions = () => {
    return letters.map((letter, index) => (
      <button
        key={index}
        onClick={() =>
          !selectedLetters[index] && handleLetterClick(index, letter)
        }
        className={`border border-gray-500 px-2 py-1 m-1 rounded-lg ${
          selectedLetters[index] ? "bg-gray-500 text-white" : ""
        }`}
      >
        {letter}
      </button>
    ));
  };

  return (
    <div className="flex flex-col justify-center h-screen py-2 w-screen items-center">
      <div className="md:w-1/4 w-full p-4 flex h-full justify-end items-center flex-col gap-4">
        <p className="mt-4">Score</p>
        <p className="text-3xl">{score}</p>
        <p className="text-xs">Attempts: {attempts}</p>
        <h1 className="text-4xl font-bold mb-4 shadow-xl rounded-md p-2">
          Guess the Brand
        </h1>
        <p className="mb-4 ">Level {currentLevel + 1}</p>
        <p className="text-2xl font-semibold">
          {levels[currentLevel]?.tagline}
        </p>
        <div className="flex mb-4 gap-2 items-center">
          <div className="flex flex-wrap items-center justify-center">
            {renderInputBoxes()}
          </div>
        </div>

        <div className="flex flex-wrap justify-center">
          {renderLetterOptions()}
          <button
            onClick={handleBackButton}
            className="bg-yellow-500 text-white px-4 py-2 m-1 rounded-md"
          >
            Back
          </button>
        </div>

        <div className="mt-4 w-full flex justify-between gap-3">
          {!showLevelInput && (
            <button
              onClick={() => setShowLevelInput(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md w-full flex items-center justify-center gap-2"
            >
              Select Level <VscListSelection className="text-2xl" />
            </button>
          )}

          {showLevelInput && (
            <div className="mt-4 flex items-center w-full justify-center gap-2">
              <input
                type="number"
                value={levelInput}
                onChange={handleLevelInputChange}
                className="border border-gray-500 px-2 py-1 rounded-md w-full"
                placeholder="Enter level number"
              />
              <button
                onClick={handleLevelSelect}
                className="bg-blue-500 text-white px-4 py-2 rounded-md w-full flex justify-center items-center gap-2"
              >
                Go to Level
                <GoMilestone className="text-2xl" />
              </button>
            </div>
          )}

          {!showLevelInput && (
            <button
              onClick={skipLevel}
              className="bg-red-500 text-white px-4 py-2  rounded-md w-full flex justify-center items-center gap-2"
            >
              Skip <BsSkipForwardCircleFill className="text-2xl" />
            </button>
          )}
        </div>

        <div className="flex justify-between w-full">
          <button
            onClick={checkAnswer}
            className="bg-green-500 text-white px-4 py-2 rounded-md w-full flex justify-center items-center gap-2"
          >
            Submit
            <IoSendSharp className="text-2xl" />
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-md shadow-md text-center">
            {isCorrect ? (
              <>
                <h2 className="text-2xl font-bold mb-4 flex justify-center items-center gap-2">
                  Correct! <MdOutlineCheckCircle className="text-green-600" />
                </h2>
                <div className="flex flex-col justify-center items-center">
                  <h2>{levels[currentLevel]?.tagline}</h2>
                  <h1 className="flex text-2xl font-semibold">
                    {levels[currentLevel].brand}
                  </h1>
                </div>

                <button
                  onClick={handleNextLevel}
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Next Level
                </button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4 flex justify-center items-center gap-2">
                  Incorrect <FcCancel />
                </h2>
                <button
                  onClick={handleRetry}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                >
                  Retry
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
