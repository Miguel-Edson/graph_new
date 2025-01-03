// useRandom.ts
import { useMemo } from "react";
import { faker } from "@faker-js/faker"; // Importando o faker para gerar dados fictícios

// Função para gerar uma cor aleatória no formato hexadecimal
const randomColor = () => {
  const randomColorValue = Math.floor(Math.random() * 16777215).toString(16); // Gera uma cor hexadecimal aleatória
  return `#${randomColorValue.padStart(6, '0')}`;
};

// Função hook que retorna as funções aleatórias
export const useRandom = () => {
  return useMemo(() => ({
    faker,          // Retorna o faker para gerar dados fictícios
    randomColor,    // Retorna a função para gerar uma cor aleatória
  }), []);
};
