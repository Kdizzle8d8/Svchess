<script lang="ts">
  import type { Card } from "../../routes/cards";
  import { twMerge } from "tailwind-merge";

  interface Props {
    card: Card;
    index?: number;
    class?: string;
    onclick: any;
  }
  let { card, index = 0, class: propStyle = '', onclick }: Props = $props();

  const baseClass = $derived(`
    relative w-[100px] h-[140px] bg-white rounded-lg 
    border border-gray-200 p-2 
    transition-all duration-100 flex justify-center 
    items-center shadow-md
    ${card.selected ? 'translate-y-[-40px] translate-x-[-4px]' : 'hover:translate-y-[-10px] hover:translate-x-[-2px]'}`
  )
  const suitEmoji = {
    hearts: "♥️",
    diamonds: "♦️",
    clubs: "♣️",
    spades: "♠️",
  };

  const textColor =$derived( card.suit === "hearts" ? "text-red-500" : card.suit === "diamonds" ? "text-red-400" : card.suit === "clubs" ? "text-gray-600" : "text-black")


  const finalClass = $derived( twMerge(baseClass, textColor, propStyle))

</script>

<button 
  class={finalClass}
  {onclick}
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
</button>
