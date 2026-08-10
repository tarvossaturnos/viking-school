// Precies 1.000 korte zinnen: 5 onderwerpen × 8 werkwoorden × 25 woorden.
const subjects = [["Jeg", "Ik"], ["Du", "Jij"], ["Vi", "Wij"], ["Han", "Hij"], ["Hun", "Zij"]];
const verbs = [["ser", ["zie", "ziet", "zien", "ziet", "ziet"]], ["har", ["heb", "hebt", "hebben", "heeft", "heeft"]], ["får", ["krijg", "krijgt", "krijgen", "krijgt", "krijgt"]], ["tar", ["neem", "neemt", "nemen", "neemt", "neemt"]], ["kjøper", ["koop", "koopt", "kopen", "koopt", "koopt"]], ["finner", ["vind", "vindt", "vinden", "vindt", "vindt"]], ["holder", ["houd", "houdt", "houden", "houdt", "houdt"]], ["velger", ["kies", "kiest", "kiezen", "kiest", "kiest"]]];
const nouns = [["en bok", "een boek"], ["en penn", "een pen"], ["en nøkkel", "een sleutel"], ["en kopp", "een kop"], ["en billett", "een kaartje"], ["en veske", "een tas"], ["en pose", "een zak"], ["en jakke", "een jas"], ["en stol", "een stoel"], ["en lampe", "een lamp"], ["en klokke", "een klok"], ["en avis", "een krant"], ["en flaske", "een fles"], ["en telefon", "een telefoon"], ["en skjorte", "een shirt"], ["en dør", "een deur"], ["en kake", "een taart"], ["en pizza", "een pizza"], ["en suppe", "een soep"], ["en boks", "een doos"], ["et eple", "een appel"], ["et kart", "een kaart"], ["et bilde", "een foto"], ["et glass", "een glas"], ["et brev", "een brief"]];

const phraseBank = subjects.flatMap(([noSubject, nlSubject], subjectIndex) => verbs.flatMap(([noVerb, nlVerbs]) => nouns.map(([noNoun, nlNoun]) => ({ norwegian: `${noSubject} ${noVerb} ${noNoun}`, dutch: `${nlSubject} ${nlVerbs[subjectIndex]} ${nlNoun}` }))));

function osloDateKey() {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone:"Europe/Oslo", year:"numeric", month:"2-digit", day:"2-digit" }).formatToParts(new Date());
  const value = (type) => parts.find((part) => part.type === type).value;
  return `${value("year")}-${value("month")}-${value("day")}`;
}

function hash(value) { return [...value].reduce((result, character) => (Math.imul(result ^ character.charCodeAt(0), 16777619) >>> 0), 2166136261); }

const seed = hash(osloDateKey());
const index = ((Math.imul(1664525, seed) + 1013904223) >>> 0) % phraseBank.length;
document.querySelector("#norwegian").textContent = phraseBank[index].norwegian;
document.querySelector("#dutch").textContent = phraseBank[index].dutch;
