import { getDailyLesson } from "./norsk-data.js";

export default function handler(_request, response) {
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Cache-Control", "s-maxage=14400, stale-while-revalidate=86400");
  return response.status(200).json(getDailyLesson());
}
