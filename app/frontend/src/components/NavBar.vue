<template>
  <v-navigation-drawer>
    <v-list>
      <v-list-item> </v-list-item>
    </v-list>
    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        title="Instructions"
        value="Home"
        :to="'/'"
        active-color="secondary"
      >
        <template v-slot:prepend>
          <v-icon icon="mdi-menu" color="secondary"></v-icon>
        </template>
      </v-list-item>
      <v-list-item
        title="Plots"
        value="plots"
        :to="'/plots'"
        active-color="secondary"
        ><template v-slot:prepend>
          <v-icon icon="mdi-image" color="warning"></v-icon> </template
      ></v-list-item>
      <v-list-item title="App" value="run" :to="'/run'" active-color="secondary"
        ><template v-slot:prepend>
          <v-icon icon="mdi-play" color="primary"></v-icon> </template
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
