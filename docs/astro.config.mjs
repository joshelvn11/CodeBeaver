import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  server: {
    host: true, // This allows the server to be accessible on your local network
  },
  integrations: [
    starlight({
      title: "CodeBeaver",
      social: {
        github: "https://github.com/withastro/starlight",
      },
      sidebar: [
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Example Guide", link: "/guides/example/" },
          ],
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
        {
          label: "TypeScript",
          autogenerate: { directory: "typescript" },
        },
        {
          label: "React",
          autogenerate: { directory: "react" },
        },
        {
          label: "React Native",
          autogenerate: { directory: "react-native" },
        },
        {
          label: "Django",
          autogenerate: { directory: "django" },
        },
      ],
    }),
  ],
});
