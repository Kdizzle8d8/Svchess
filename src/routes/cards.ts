export type Card = {
  id: string;
  suit: string;
  rank: string;
  drawable: boolean;
  chips: number;
  multiplier: number;
  selected: boolean;
  discarding?: boolean;
  foil?: false;
  polychrome?: false;
  multcard?: false;
};

const suits = ["hearts", "diamonds", "clubs", "spades"];
const ranks = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

export const rankToValue = (rank: string): number => {
  if (rank === "A") return 11;
  if (["J", "Q", "K"].includes(rank)) return 10;
  return parseInt(rank);
};

let cardIdCounter = 0;

export const createDeck = (): Card[] =>
  suits.flatMap((suit) =>
    ranks.map((rank) => ({
      id: `${cardIdCounter++}`, // Use the counter for incremental IDs
      suit,
      rank,
      chips: rankToValue(rank),
      multiplier: 1,
      drawable: true,
      foil: false,
      selected: false,
      polychrome: false,
      multcard: false,
    }))
  );

export const createCard = (suit: string, rank: string): Card => ({
  id: `${cardIdCounter++}`, // Use the counter for incremental IDs
  suit,
  rank,
  chips: rankToValue(rank),
  multiplier: 1,
  drawable: true,
  foil: false,
  selected: false,
  polychrome: false,
  multcard: false,
});

const suitOrder = ["hearts", "diamonds", "clubs", "spades"];
const rankOrder = [
  "A",
  "K",
  "Q",
  "J",
  "10",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
];

export const sortByRank = (cards: Card[]): Card[] => {
  return [...cards].sort((a, b) => {
    return rankOrder.indexOf(a.rank) - rankOrder.indexOf(b.rank);
  });
};

export const sortBySuit = (cards: Card[]): Card[] => {
  return [...cards].sort((a, b) => {
    // First compare suits
    const suitDiff = suitOrder.indexOf(a.suit) - suitOrder.indexOf(b.suit);
    if (suitDiff !== 0) return suitDiff;

    // If suits are equal, compare ranks
    return rankOrder.indexOf(a.rank) - rankOrder.indexOf(b.rank);
  });
};
