// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  preset: "cloudflare_module",
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      title: "Opus Primis",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: "" },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      ],
      htmlAttrs: {
        lang: "pt-BR",
        class: "h-full bg-gray-50 ",
      },
      bodyAttrs: {
        class: "h-full",
      },
    },
  },
  components: ["~/components", { path: "~/components/ui", pathPrefix: false }],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt"],
});
