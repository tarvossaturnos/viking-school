import { getDailyLesson } from "./norsk-data.js";

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character]);
}

export default function handler(_request, response) {
  const lesson = getDailyLesson();
  const phrases = lesson.phrases
    .map(
      (phrase) => `
        <li class="phrase-card">
          <div>
            <p class="phrase-norwegian" lang="no">${escapeHtml(phrase.norwegian)}</p>
            <p class="phrase-dutch" lang="nl">${escapeHtml(phrase.dutch)}</p>
          </div>
        </li>`,
    )
    .join("");

  const html = `<!doctype html>
<html lang="nl">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Norsk fra nul</title>
    <style>
      * { box-sizing: border-box; }
      html, body { width: 100%; height: 100%; margin: 0; overflow: hidden; }
      body { color: #17211d; background: #f4f1e9; font-family: Georgia, "Times New Roman", serif; }
      .layout { position: relative; width: 100%; height: 100%; overflow: hidden; padding: 5.8% 8%; }
      .layout::before { content: ""; position: absolute; inset: 2.4%; border: 1px solid rgba(49,91,74,.18); pointer-events: none; }
      .eyebrow { margin: 0 0 1.6%; color: #315b4a; font-family: Arial, sans-serif; font-size: clamp(8px, 1.3vw, 11px); font-weight: 800; letter-spacing: .19em; }
      .stamp { position: absolute; top: 7.5%; right: 8%; color: #315b4a; font-family: Arial, sans-serif; font-size: clamp(7px, 1.1vw, 10px); font-weight: 800; letter-spacing: .14em; }
      .stamp::before { content: ""; display: inline-block; width: .75em; height: .75em; margin-right: .55em; border-radius: 50%; background: #e4a63e; }
      .phrases { position: relative; z-index: 1; width: 76%; margin: 8% 0 0; padding: 0; list-style: none; }
      .phrase-card { display: block; padding: 4% 0; border-top: 1px solid #d9d6ce; }
      .phrase-card:last-child { border-bottom: 1px solid #d9d6ce; }
      .phrase-norwegian, .phrase-dutch { margin: 0; }
      .phrase-norwegian { font-size: clamp(24px, 5.2vw, 43px); line-height: 1.05; font-weight: 700; letter-spacing: -.035em; }
      .phrase-dutch { margin-top: .3em; color: #617068; font-family: Arial, sans-serif; font-size: clamp(13px, 2.4vw, 20px); }
      .footer { position: absolute; bottom: 5.8%; left: 8%; color: #617068; font-size: clamp(8px, 1.45vw, 12px); }
      .footer span { color: #e4a63e; font-size: 1.25em; }
      .swords { position: absolute; right: 4%; bottom: 5%; width: 15%; height: 28%; opacity: .3; }
      .sword { position: absolute; bottom: 18%; left: 49%; width: 6%; height: 73%; border-radius: 6px 6px 1px 1px; background: #254739; transform-origin: bottom center; }
      .sword::before { content: ""; position: absolute; left: 50%; bottom: -12%; width: 260%; height: 6%; border-radius: 6px; background: #254739; transform: translateX(-50%); }
      .sword::after { content: ""; position: absolute; left: 50%; bottom: -30%; width: 160%; height: 20%; border-radius: 3px 3px 8px 8px; background: #254739; transform: translateX(-50%); }
      .left { height: 55%; transform: rotate(-33deg); } .middle { height: 83%; } .right { height: 55%; transform: rotate(33deg); }
      .rock { position: absolute; bottom: 4%; left: 23%; width: 54%; height: 18%; border-radius: 55% 48% 18% 25%; background: #254739; }
    </style>
  </head>
  <body>
    <main class="layout">
      <p class="eyebrow">NORSK · FRA NUL</p>
      <p class="stamp">ZIN VAN VANDAAG</p>
      <ol class="phrases">${phrases}</ol>
      <p class="footer"><span>✦</span> Morgen wacht een nieuwe zin.</p>
      <div class="swords" aria-hidden="true"><i class="sword left"></i><i class="sword middle"></i><i class="sword right"></i><i class="rock"></i></div>
    </main>
  </body>
</html>`;

  response.setHeader("Content-Type", "text/html; charset=utf-8");
  response.setHeader("Cache-Control", "s-maxage=14400, stale-while-revalidate=86400");
  return response.status(200).send(html);
}
