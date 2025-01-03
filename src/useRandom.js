
import { useState } from "react";


export const useRandom = (min, max) => {
  const [randomNumber, setRandomNumber] = useState(null);

  const generateRandom = () => {
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    setRandomNumber(random);
  };

  return [randomNumber, generateRandom];
};