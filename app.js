const sentences = window.NORWEGIAN_SENTENCES;

if (!Array.isArray(sentences) || sentences.length !== 1000) {
  throw new Error("The sentence source must contain exactly 1,000 entries.");
}

function osloDateKey() {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Oslo", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date());
  const value = (type) => parts.find((part) => part.type === type).value;
  return `${value("year")}-${value("month")}-${value("day")}`;
}

function hash(text) { return [...text].reduce((value, char) => (Math.imul(value ^ char.charCodeAt(0), 16777619) >>> 0), 2166136261); }

const seed = hash(osloDateKey());
const index = ((Math.imul(1664525, seed) + 1013904223) >>> 0) % sentences.length;
const today = sentences[index];

document.querySelector("#norwegian").textContent = today.norwegian;
document.querySelector("#english").textContent = today.english;
