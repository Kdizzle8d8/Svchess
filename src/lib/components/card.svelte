<script lang="ts">
  import type { Card } from "../../routes/cards";

  export let card: Card;

  const suitEmoji = {
    hearts: "♥️",
    diamonds: "♦️",
    clubs: "♣️",
    spades: "♠️",
  };

  const textColor = card.suit === "hearts" || card.suit === "diamonds" ? "text-red-500" : "text-black";
</script>

<div 
  class={`relative w-[100px] h-[140px] bg-white rounded-lg border border-gray-200 
          p-2 flex justify-center items-center shadow-md ${textColor} hover:shadow-lg 
          transition-shadow duration-200`}
>
  <div class="absolute top-2 left-2">
    {suitEmoji[card.suit as keyof typeof suitEmoji]}
  </div>
  
  <div class="text-3xl font-bold">
    {card.rank}
  </div>
  
  <div class="absolute bottom-2 right-2">
    {suitEmoji[card.suit as keyof typeof suitEmoji]}
  </div>
</div> 