const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    video: false,
    retries: 1,
    env: {
      seasonsPage: "/",
    },
    supportFile: false,
  },
});
