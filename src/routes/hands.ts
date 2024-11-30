import { rankToValue, type Card } from "./cards.ts";

export type HandType =
  | "Royal Flush"
  | "Straight Flush"
  | "Four of a Kind"
  | "Full House"
  | "Flush"
  | "Straight"
  | "Three of a Kind"
  | "Two Pair"
  | "Pair"
  | "High Card"
  | "Five of a Kind"
  | "Flush House"
  | "Flush Five"
  | "None";

const isConsecutive = (ranks: number[]): boolean => {
  const sorted = [...ranks].sort((a, b) => a - b);
  // Handle Ace-low straight (A,2,3,4,5)
  if (ranks.includes(14) && ranks.includes(2)) {
    const aceLowStraight = [2, 3, 4, 5, 14];
    return ranks.every((rank) => aceLowStraight.includes(rank));
  }
  // Normal straight check
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] !== sorted[i - 1] + 1) return false;
  }
  return true;
};

export const getHandType = (cards: Card[]): HandType => {
  if (cards.length === 1) return "High Card";
  if (cards.length > 5) throw new Error("Maximum 5 cards allowed");

  // Get rank counts and check for flush
  const rankCounts: { [key: string]: number } = {};
  const suits = new Set();
  const rankValues: number[] = [];

  cards.forEach((card) => {
    rankCounts[card.rank] = (rankCounts[card.rank] || 0) + 1;
    suits.add(card.suit);
    rankValues.push(rankToValue(card.rank));
  });

  const isFlush = suits.size === 1 && cards.length == 5;
  const isStraight = isConsecutive(rankValues) && cards.length == 5;

  // Check for Royal Flush
  if (
    isFlush &&
    isStraight &&
    Math.max(...rankValues) === 14 &&
    Math.min(...rankValues) === 10
  ) {
    return "Royal Flush";
  }

  // Check for Straight Flush
  if (isFlush && isStraight) {
    return "Straight Flush";
  }

  // Check for Four of a Kind
  if (Object.values(rankCounts).includes(4)) {
    return "Four of a Kind";
  }

  // Check for Full House
  if (
    Object.values(rankCounts).includes(3) &&
    Object.values(rankCounts).includes(2)
  ) {
    return "Full House";
  }

  // Check for Flush
  if (isFlush) {
    return "Flush";
  }

  // Check for Straight
  if (isStraight) {
    return "Straight";
  }

  // Check for Three of a Kind
  if (Object.values(rankCounts).includes(3)) {
    return "Three of a Kind";
  }

  // Check for Two Pair
  const pairs = Object.values(rankCounts).filter((count) => count === 2).length;
  if (pairs === 2) {
    return "Two Pair";
  }

  // Check for Pair
  if (pairs === 1) {
    return "Pair";
  }

  // If nothing else matches
  return "None";
};

export type Hand = {
  name: HandType;
  chips: number;
  mult: number;
};

export const hands: Hand[] = [
  {
    name: "High Card",
    chips: 5,
    mult: 1,
  },
  {
    name: "Pair",
    chips: 10,
    mult: 2,
  },
  {
    name: "Two Pair",
    chips: 20,
    mult: 2,
  },
  {
    name: "Three of a Kind",
    chips: 30,
    mult: 3,
  },
  {
    name: "Straight",
    chips: 30,
    mult: 4,
  },
  {
    name: "Flush",
    chips: 35,
    mult: 4,
  },
  {
    name: "Full House",
    chips: 40,
    mult: 4,
  },
  {
    name: "Four of a Kind",
    chips: 60,
    mult: 7,
  },
  {
    name: "Straight Flush",
    chips: 100,
    mult: 8,
  },
  {
    name: "Royal Flush",
    chips: 100,
    mult: 8,
  },
  {
    name: "None",
    chips: 0,
    mult: 0,
  },
];

// Secret poker hands
export const secretHands: Hand[] = [
  {
    name: "Five of a Kind",
    chips: 120,
    mult: 12,
  },
  {
    name: "Flush House",
    chips: 140,
    mult: 14,
  },
  {
    name: "Flush Five",
    chips: 160,
    mult: 16,
  },
];
