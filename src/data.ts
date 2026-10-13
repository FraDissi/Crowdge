export type Project = {
  id: string;
  title: string;
  creator: string;
  category: string;
  image: string;
  raised: number;
  goal: number;
  backers: number;
  days: number;
  share: number;
  minimum: number;
  stage: string;
  tagline: string;
  description: string;
  color: string;
};
export const projects: Project[] = [
  {
    id: "echoes-of-orion",
    title: "Echoes of Orion",
    creator: "Nova Studio",
    category: "Gaming",
    image: "photo-1446776811953-b23d57bd21aa",
    raised: 68400,
    goal: 100000,
    backers: 342,
    days: 18,
    share: 20,
    minimum: 50,
    stage: "In development",
    tagline: "A small studio. An infinite universe.",
    description:
      "A story-driven exploration game about finding your place among the stars. Help an independent team bring a beautifully atmospheric universe to life, with hand-built worlds, an original score, and choices that stay with you.",
    color: "#9a8af1",
  },
  {
    id: "midnight-tapes",
    title: "Midnight Tapes",
    creator: "Sofia Laurent",
    category: "Music",
    image: "photo-1516280440614-37939bbacd81",
    raised: 24750,
    goal: 30000,
    backers: 186,
    days: 9,
    share: 15,
    minimum: 25,
    stage: "Production ready",
    tagline: "Some stories sound better after midnight.",
    description:
      "An independent debut album of late-night soul and intimate electronic soundscapes. Funding supports studio sessions, mixing, mastering, and a first run of physical records.",
    color: "#cc876b",
  },
  {
    id: "beyond-the-alps",
    title: "Beyond the Alps",
    creator: "Luca & Emma",
    category: "Film",
    image: "photo-1464822759023-fed622ff2c3b",
    raised: 42600,
    goal: 60000,
    backers: 214,
    days: 24,
    share: 20,
    minimum: 50,
    stage: "In development",
    tagline: "Beyond the summit, a story worth telling.",
    description:
      "A documentary about the people keeping mountain communities alive. Follow a year of changing seasons, extraordinary landscapes, and ordinary acts of resilience in the European Alps.",
    color: "#8fb0b4",
  },
  {
    id: "building-from-zero",
    title: "Building from Zero",
    creator: "Alex Chen",
    category: "Content",
    image: "photo-1497366754035-f200968a6e72",
    raised: 18200,
    goal: 25000,
    backers: 128,
    days: 12,
    share: 15,
    minimum: 25,
    stage: "Production ready",
    tagline: "The honest story behind the first step.",
    description:
      "A documentary series following independent makers as they turn an idea into their first real business. An honest look at craft, uncertainty, and the work behind a breakthrough.",
    color: "#c6a77b",
  },
  {
    id: "paper-worlds",
    title: "Paper Worlds",
    creator: "Maya Ellis",
    category: "Publishing",
    image: "photo-1507842217343-583bb7270b66",
    raised: 11700,
    goal: 20000,
    backers: 94,
    days: 32,
    share: 15,
    minimum: 20,
    stage: "Concept",
    tagline: "A collection of places that only exist on paper.",
    description:
      "An illustrated anthology of imagined cities by independent writers and artists. Funding covers fair contributor fees, editing, and the first print edition.",
    color: "#c8ac79",
  },
  {
    id: "objects-of-tomorrow",
    title: "Objects of Tomorrow",
    creator: "Atelier Forma",
    category: "Other",
    image: "photo-1494438639946-1ebd1d20bf85",
    raised: 31500,
    goal: 45000,
    backers: 157,
    days: 21,
    share: 20,
    minimum: 50,
    stage: "In development",
    tagline: "Everyday objects, thoughtfully reimagined.",
    description:
      "A small collection of considered objects exploring new uses for reclaimed materials. Support prototyping, tooling, and the first independent production run.",
    color: "#a5b19b",
  },
];
export const categories = [
  "All projects",
  "Music",
  "Gaming",
  "Film",
  "Content",
  "Publishing",
  "Other",
];
export const money = (n: number) =>
  new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
export const cover = (p: Project, w = 900) => `/images/${p.image}.jpg`;
export const percent = (p: Project) => Math.round((p.raised / p.goal) * 100);
export function readLocal<T>(key: string, fallback: T): T {
  try {
    return JSON.parse(localStorage.getItem(key) || "null") ?? fallback;
  } catch {
    return fallback;
  }
}
export function saveLocal(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}
