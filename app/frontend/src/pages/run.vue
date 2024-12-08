<template>
  <v-container>
    <h1 class="mb-3">Wine Quality Checker</h1>
    <Alert v-if="errorMessage" />
    <WineCheckerForm v-else />
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      plots: {}, // Object to store folder names and image files
      errorMessage: null, // Store error message if folder not found
    };
  },
  mounted() {
    this.fetchPlots();
  },
  methods: {
    async fetchPlots() {
      try {
        const response = await fetch("/get_plots");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // Check for error message from backend
        if (data.error) {
          this.errorMessage = data.error;
        } else {
          this.plots = data; // Store the plot data
        }
      } catch (error) {
        console.error("Error fetching plot data:", error);
        this.errorMessage = "An error occurred while fetching the plot data.";
      }
    },
  },
};
</script>
