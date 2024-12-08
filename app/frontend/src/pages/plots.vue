<template>
  <v-container>
    <div>
      <h1 class="mb-3">Plots</h1>

      <!-- Show alert if plots folder is not found -->
      <Alert v-if="errorMessage" />

      <!-- Show plots if they exist -->
      <v-expansion-panels v-if="!errorMessage">
        <v-expansion-panel
          v-for="(files, folder) in plots"
          :key="folder"
          class="mt-2"
        >
          <v-expansion-panel-title>{{ folder }}</v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-row
              v-for="file in files"
              :key="file"
              class="d-flex align-center justify-center w-100"
            >
              <v-col>
                <v-img
                  :src="`/plots/${folder}/${file}`"
                  :alt="file"
                  class="w-50"
                ></v-img>
              </v-col>
            </v-row>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
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
