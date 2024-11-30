<script lang="ts">
  import PlayingCard from "$lib/components/playingCard.svelte";
  import { crossfade, scale } from "svelte/transition";
  import {
    createCard,
    createDeck,
    sortByRank,
    sortBySuit,
    type Card,
  } from "./cards";
  import { quintOut } from "svelte/easing";
  import { flip } from "svelte/animate";
  import { getHandType, hands, type Hand } from "./hands";
  import ScoreBoard from "$lib/components/scoreBoard.svelte";
  import Sidebar from "$lib/components/sidebar.svelte";
  const maxSelected = 5;
  let deck = $state(createDeck());
  let handSize = $state(7);
  let maxHands = $state(4);
  let maxDiscards = $state(4);
  let hand = $state<Card[]>([]);
  let drawableCards = $derived.by(() => {
    return deck.filter((c) => c.drawable);
  });

  const drawCard = () => {
    const randomIndex = Math.floor(Math.random() * drawableCards.length);
    console.log(randomIndex);
    const card = drawableCards[randomIndex];
    console.log(card);
    card.drawable = false;
    return card;
  };

  const drawHand = () => {
    hand = [];
    setTimeout(() => {
      hand = Array.from({ length: handSize }, () => drawCard());
    }, 400);
  };

  const discard = async () => {
    const selectedCount = selectedCards.length;
    hand = hand.filter((card) => !card.selected);
    const newCards = Array.from({ length: selectedCount }, () => drawCard());
    hand = [...hand, ...newCards];
  };

  let tempClass = $derived("grid-cols-" + handSize);
  let currentSort = $state("rank");
  let sortedHand = $derived(
    currentSort === "suit" ? sortBySuit(hand) : sortByRank(hand)
  );
  const selectedCards = $derived(hand.filter((c) => c.selected));
  const handType: Hand | undefined = $derived.by(() => {
    return hands.find((c) => c.name == getHandType(selectedCards));
  });
  $inspect(hand);
</script>

<div class="pl-10 h-full w-full grid place-items-center bg-green-900">
  <Sidebar
    blind={{
      name: "Small Blind",
      chips: 10000,
      reward: 6,
      colors: { primary: "bg-blue-700", accent: "bg-blue-500" },
    }}
    hand={handType}
  ></Sidebar>
  <div class="flex flex-col items-center gap-4">
    <div class="grid h-[140px] grid-cols-7">
      {#each sortedHand as card, i (card.id)}
        <div transition:scale animate:flip={{ duration: 200 }}>
          <PlayingCard
            onclick={() => {
              if (selectedCards.length < 5 || card.selected) {
                card.selected = !card.selected;
              }
            }}
            class="ml-[-10px]"
            {card}
            index={i}
          />
        </div>
      {/each}
    </div>
    <div class="flex gap-2">
      <button
        class="bg-red-400 text-white w-32 h-14 rounded-lg"
        onclick={drawHand}>Draw Hand</button
      >
      <button
        onclick={discard}
        class="bg-red-400 text-white w-32 h-14 rounded-lg"
        >Discard
      </button>
      <button
        onclick={() => (currentSort = "rank")}
        class="bg-red-400 text-white w-32 h-14 rounded-lg">Rank</button
      >
      <button
        onclick={() => (currentSort = "suit")}
        class="bg-red-400 text-white w-32 h-14 rounded-lg"
        >suit
      </button>
    </div>
  </div>
</div>
