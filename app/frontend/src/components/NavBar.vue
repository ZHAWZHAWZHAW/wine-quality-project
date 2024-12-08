<template>
  <v-navigation-drawer>
    <v-list>
      <v-list-item> </v-list-item>
    </v-list>
    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item title="Instructions" value="Home" :to="'/'"></v-list-item>
      <v-list-item
        title="Exploration"
        value="exploration"
        :to="'/exploration'"
      ></v-list-item>
      <v-list-item
        title="Data Analysis"
        value="data_analysis"
        :to="'/data_analysis'"
      ></v-list-item>
      <v-list-item
        title="Feature Selection"
        value="feature_selection"
        :to="'/feature_selection'"
      ></v-list-item>
      <v-list-item title="Model" value="model" :to="'/model'"></v-list-item>
      <v-list-item title="XAI" value="xai" :to="'/xai'"></v-list-item>
      <v-list-item
        title="Our Project"
        value="project"
        :to="'/project'"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
