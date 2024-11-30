<script lang="ts">
  import type { Blind } from "../../routes/blinds";
  import type { Hand } from "../../routes/hands";
  import ScoreBoard from "./scoreBoard.svelte";

  let { hand, blind }: { hand: Hand; blind: Blind } = $props();
</script>

<div
  class="flex shadow-lg p-2 h-min rounded-lg border-2 border-blue-700 flex-col absolute text-white items-center gap-2 w-[15rem] left-2 bg-gray-800"
>
  <div
    class={` ${blind.colors.accent} font-bold w-full h-min text-center rounded-lg px-4 py-1 text-lg`}
  >
    {blind.name}
  </div>
  <div
    class="bg-gray-900 w-full mr-2 my-auto mx-auto rounded-lg shadow-md px-8 py-2 flex flex-col"
  >
    <label class="text-xs mx-auto">Score at least</label>
    <p class="text-red-500 mx-auto text-lg font-bold">40,0000</p>
    <span class="inline-flex mb-0 m-auto text-sm">
      <p>Reward:</p>
      <p class="text-yellow-500">&nbsp; $$$</p>
    </span>
  </div>
  <div class="w-full rounded-lg shadow-md bg-gray-900 font-bold flex">
    <span class="mx-auto flex flex-col">
      <span>Round</span>
      <span>Score</span>
    </span>

    <p
      class="text-red-500 bg-gray-700 rounded-lg px-2 py-1 m-auto text-lg font-bold"
    >
      5,000
    </p>
  </div>
  <ScoreBoard {hand}></ScoreBoard>
  <div class="grid grid-cols-2 grid-rows-3">
    <div class="bg-gray-900 rounded-lg shadow-sm flex flex-col px-2 py-1">
      <label class="text-xs font-bold">Hands</label>
      <div
        class="bg-gray-800 text-blue-500 h-full text-center text-xl font-bold rounded-lg"
      >
        0
      </div>
    </div>
  </div>
</div>
