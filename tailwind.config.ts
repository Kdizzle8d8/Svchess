import aspectRatio from "@tailwindcss/aspect-ratio";
import containerQueries from "@tailwindcss/container-queries";
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {},
  },
  safelist: [
    {
      pattern: /grid-cols-./,
    },
  ],

  plugins: [containerQueries, aspectRatio],
} as Config;
