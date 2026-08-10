import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { getDailyLesson } from "../api/norsk-data.js";
import { phraseBank } from "../data/phrase-bank.js";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders one compact daily Norwegian sentence", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Norsk fra nul/i);
  assert.match(html, /NORSK · FRA NUL/);
  assert.match(html, /ZIN VAN VANDAAG/);
  assert.match(html, /Morgen wacht een nieuwe zin\./);
  assert.doesNotMatch(html, /Één klein stukje Noors/);
  assert.doesNotMatch(html, /Oefen een ander setje/);
});

test("keeps exactly 1000 ultra-short beginner translations", () => {
  assert.equal(phraseBank.length, 1000);

  for (const phrase of phraseBank) {
    assert.ok(phrase.norwegian.split(" ").length <= 4, phrase.norwegian);
    assert.ok(phrase.dutch.split(" ").length <= 4, phrase.dutch);
  }
});

test("provides one stable sentence per Oslo day for TRMNL", async () => {
  const date = new Date("2026-08-10T12:00:00.000Z");
  const lesson = getDailyLesson(date);
  const repeatLesson = getDailyLesson(date);
  const layout = await readFile(new URL("../trmnl-layout.html", import.meta.url), "utf8");

  assert.equal(lesson.phrases.length, 1);
  assert.deepEqual(lesson, repeatLesson);
  assert.equal(lesson.no1, lesson.phrases[0].norwegian);
  assert.equal(lesson.nl1, lesson.phrases[0].dutch);
  assert.match(layout, /\{\{ no1 \}\}/);
  assert.match(layout, /\{\{ nl1 \}\}/);
  assert.doesNotMatch(layout, /\{\{ no2 \}\}|\{\{ no3 \}\}/);
  assert.match(layout, /class="sword sword-left"/);
  assert.match(layout, /class="sword sword-centre"/);
  assert.match(layout, /class="sword sword-right"/);
  assert.doesNotMatch(layout, /⚔/);
});
