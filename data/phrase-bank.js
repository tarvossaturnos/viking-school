const subjects = [
  { norwegian: "Jeg", dutch: "Ik" },
  { norwegian: "Du", dutch: "Jij" },
  { norwegian: "Vi", dutch: "Wij" },
  { norwegian: "Han", dutch: "Hij" },
  { norwegian: "Hun", dutch: "Zij" },
];

const verbs = [
  { norwegian: "ser", dutch: ["zie", "ziet", "zien", "ziet", "ziet"] },
  { norwegian: "har", dutch: ["heb", "hebt", "hebben", "heeft", "heeft"] },
  { norwegian: "får", dutch: ["krijg", "krijgt", "krijgen", "krijgt", "krijgt"] },
  { norwegian: "tar", dutch: ["neem", "neemt", "nemen", "neemt", "neemt"] },
  { norwegian: "kjøper", dutch: ["koop", "koopt", "kopen", "koopt", "koopt"] },
  { norwegian: "finner", dutch: ["vind", "vindt", "vinden", "vindt", "vindt"] },
  { norwegian: "holder", dutch: ["houd", "houdt", "houden", "houdt", "houdt"] },
  { norwegian: "velger", dutch: ["kies", "kiest", "kiezen", "kiest", "kiest"] },
];

const nouns = [
  { norwegian: "en bok", dutch: "een boek" },
  { norwegian: "en penn", dutch: "een pen" },
  { norwegian: "en nøkkel", dutch: "een sleutel" },
  { norwegian: "en kopp", dutch: "een kop" },
  { norwegian: "en billett", dutch: "een kaartje" },
  { norwegian: "en veske", dutch: "een tas" },
  { norwegian: "en pose", dutch: "een zak" },
  { norwegian: "en jakke", dutch: "een jas" },
  { norwegian: "en stol", dutch: "een stoel" },
  { norwegian: "en lampe", dutch: "een lamp" },
  { norwegian: "en klokke", dutch: "een klok" },
  { norwegian: "en avis", dutch: "een krant" },
  { norwegian: "en flaske", dutch: "een fles" },
  { norwegian: "en telefon", dutch: "een telefoon" },
  { norwegian: "en skjorte", dutch: "een shirt" },
  { norwegian: "en dør", dutch: "een deur" },
  { norwegian: "en kake", dutch: "een taart" },
  { norwegian: "en pizza", dutch: "een pizza" },
  { norwegian: "en suppe", dutch: "een soep" },
  { norwegian: "en boks", dutch: "een doos" },
  { norwegian: "et eple", dutch: "een appel" },
  { norwegian: "et kart", dutch: "een kaart" },
  { norwegian: "et bilde", dutch: "een foto" },
  { norwegian: "et glass", dutch: "een glas" },
  { norwegian: "et brev", dutch: "een brief" },
];

/**
 * Zelfstandig beginnerscorpus: 5 onderwerpen × 8 werkwoorden × 25 woorden.
 * Elke invoer blijft in beide talen maximaal vier woorden lang.
 */
export const phraseBank = subjects.flatMap((subject, subjectIndex) =>
  verbs.flatMap((verb) =>
    nouns.map((noun) => ({
      id: `${subjectIndex}-${verb.norwegian}-${noun.norwegian}`,
      norwegian: `${subject.norwegian} ${verb.norwegian} ${noun.norwegian}`,
      dutch: `${subject.dutch} ${verb.dutch[subjectIndex]} ${noun.dutch}`,
    })),
  ),
);

if (phraseBank.length !== 1000) {
  throw new Error(`Expected 1000 phrases, received ${phraseBank.length}.`);
}
