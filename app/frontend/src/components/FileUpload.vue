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
          class="w-100"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup></script>
<style></style>
