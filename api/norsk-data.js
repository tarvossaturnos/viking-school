import { phraseBank } from "../data/phrase-bank.js";

const DAILY_PHRASES = 1;

function dateKeyInOslo(date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Oslo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const value = (type) => parts.find((part) => part.type === type)?.value ?? "";
  return `${value("year")}-${value("month")}-${value("day")}`;
}

function hash(value) {
  return [...value].reduce(
    (result, character) => (Math.imul(result ^ character.charCodeAt(0), 16777619) >>> 0),
    2166136261,
  );
}

function phrasesForSeed(seed) {
  let current = seed || 1;
  const used = new Set();

  while (used.size < DAILY_PHRASES) {
    current = (Math.imul(1664525, current) + 1013904223) >>> 0;
    used.add(current % phraseBank.length);
  }

  return [...used].map((index) => phraseBank[index]);
}

export function getDailyLesson(date = new Date()) {
  const dateKey = dateKeyInOslo(date);
  const phrases = phrasesForSeed(hash(dateKey));

  return {
    title: "Norsk fra nul",
    date: dateKey,
    level: "Starter niveau",
    phrase_count: phraseBank.length,
    phrases,
    no1: phrases[0].norwegian,
    nl1: phrases[0].dutch,
  };
}
