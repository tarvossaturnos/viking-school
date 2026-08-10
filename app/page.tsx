"use client";

import { useMemo } from "react";
import { phraseBank } from "../data/phrase-bank";

type Phrase = (typeof phraseBank)[number];

const DAILY_PHRASES = 1;

function osloDateKey() {
  const dateParts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Oslo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const part = (type: Intl.DateTimeFormatPartTypes) =>
    dateParts.find((entry) => entry.type === type)?.value ?? "";

  return `${part("year")}-${part("month")}-${part("day")}`;
}

function makeSeed(value: string) {
  return [...value].reduce(
    (hash, character) => (Math.imul(hash ^ character.charCodeAt(0), 16777619) >>> 0),
    2166136261,
  );
}

function selectPhrases(seed: number): Phrase[] {
  let current = seed || 1;
  const used = new Set<number>();

  while (used.size < DAILY_PHRASES) {
    current = (Math.imul(1664525, current) + 1013904223) >>> 0;
    used.add(current % phraseBank.length);
  }

  return [...used].map((index) => phraseBank[index]);
}

export default function Home() {
  const dateKey = useMemo(osloDateKey, []);
  const phrases = useMemo(() => selectPhrases(makeSeed(dateKey)), [dateKey]);

  return (
    <main className="site-shell">
      <section className="lesson-wrap" aria-labelledby="lesson-title">
        <div className="sword-memorial" aria-label="De drie zwaarden van Noorwegen">
          <span className="sword sword-left" />
          <span className="sword sword-centre" />
          <span className="sword sword-right" />
          <span className="rock-base" />
        </div>

        <header className="lesson-header">
          <p className="eyebrow">NORSK · FRA NUL</p>
          <h1 id="lesson-title" className="visually-hidden">Noorse zin van vandaag</h1>
        </header>

        <div className="lesson-stamp" aria-label="Les van vandaag">
          <span className="stamp-dot" />
          ZIN VAN VANDAAG
        </div>

        <ol className="phrase-list" aria-live="polite">
          {phrases.map((phrase, index) => (
            <li className="phrase-card" key={phrase.id}>
              <div>
                <p className="phrase-norwegian" lang="no">{phrase.norwegian}</p>
                <p className="phrase-dutch" lang="nl">{phrase.dutch}</p>
              </div>
            </li>
          ))}
        </ol>

        <footer className="lesson-footer">
          <div className="lesson-note">
            <span aria-hidden="true">✦</span>
            <p>Morgen wacht een nieuwe zin.</p>
          </div>
        </footer>
      </section>

      <p className="corpus-note">1.000 korte zinnen · één per dag</p>
    </main>
  );
}
