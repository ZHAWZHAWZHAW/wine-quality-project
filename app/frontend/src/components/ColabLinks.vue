<!-- __frontend/ColabLinks.vue -->

<template>
  <div>
    <h1>Colab Links</h1>
    <ul>
      <li v-for="(linkObj, index) in colabLinks" :key="index">
        <a :href="linkObj.link" target="_blank">{{ linkObj.description }}</a>
        <!-- Display description -->
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colabLinks: [], // Store the links and descriptions here
    };
  },
  mounted() {
    this.fetchColabLinks();
  },
  methods: {
    async fetchColabLinks() {
      try {
        // Using fetch API to get data from backend
        const response = await fetch("http://localhost:5000/get_colab_links"); // URL for the backend API
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json(); // Parse the JSON response
        this.colabLinks = data; // Store the links and descriptions
      } catch (error) {
        console.error("Error fetching links:", error); // Handle error
      }
    },
  },
};
</script>

<style scoped>
/* Add some styling as needed */
</style>
