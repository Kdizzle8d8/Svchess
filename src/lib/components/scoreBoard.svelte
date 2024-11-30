<script lang="ts">
  import type { Hand } from "../../routes/hands";

  let { hand }: { hand: Hand | undefined } = $props();
</script>

<div
  class="bg-gray-900 w-full p-4 grid grid-rows-2 text-white font-bold rounded-lg"
>
  <h1 class="text-lg w-full text-center text-white font-bold">{hand?.name}</h1>
  <div
    class="grid w-full place-items-center"
    style="grid-template-columns: 1fr auto 1fr"
  >
    <div class="bg-blue-500 rounded-lg text-lg w-full py-2 px-2 pl-5 text-end">
      {hand?.chips}
    </div>
    <div class="text-lg text-red-500 font-bold rounded-lg text-center px-1">
      X
    </div>
    <div class="bg-red-500 text-lg rounded-lg w-full py-2 px-2 text-start">
      {hand?.mult}
    </div>
  </div>
</div>
