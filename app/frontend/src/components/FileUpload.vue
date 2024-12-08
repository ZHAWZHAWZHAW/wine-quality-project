<template>
  <v-container>
    <!-- File input row -->
    <v-row class="w-100">
      <v-col cols="12" md="8">
        <v-file-input
          v-model="file"
          label="Choose a file"
          accept=".zip"
          show-size
        />
      </v-col>
    </v-row>

    <!-- Upload Button -->
    <v-row class="w-100 mt-4">
      <v-col cols="12" md="8">
        <v-btn
          class="w-33"
          :disabled="!file"
          color="primary"
          @click="uploadFile"
        >
          Upload
        </v-btn>
      </v-col>
      <v-col cols="12">
        <!-- Snackbar for Success or Error Message -->
        <v-snackbar
          v-model="snackbar.show"
          :color="snackbar.success ? 'green' : 'red'"
          top
          timeout="3000"
        >
          {{ snackbar.message }}
          <template #action>
            <v-btn color="white" text @click="snackbar.show = false"
              >Close</v-btn
            >
          </template>
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const file = ref(null); // Store the file selected by the user

// Snackbar state for displaying success/error messages
const snackbar = ref({
  show: false,
  message: "",
  success: true,
});

// Upload file method
const uploadFile = async () => {
  if (!file.value) return; // If no file is selected, do nothing

  const formData = new FormData();
  formData.append("file", file.value); // Append the file to FormData

  try {
    const response = await fetch("/upload_zip", {
      method: "POST",
      body: formData, // Send the file in the body of the request
    });

    if (!response.ok) {
      throw new Error("File upload failed");
    }

    const data = await response.json();
    snackbar.value = {
      show: true,
      message: "File uploaded successfully!",
      success: true,
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    snackbar.value = {
      show: true,
      message: "Error uploading file.",
      success: false,
    };
  }
};
</script>

<style scoped>
/* You can add styles for the component if needed */
</style>
