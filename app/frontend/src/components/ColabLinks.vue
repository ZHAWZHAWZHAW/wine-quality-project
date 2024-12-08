<template>
  <div>
    <!-- Prerequisites Card with Kaggle API Token -->
    <v-card
      subtitle="Kaggle API Token"
      title="Prerequisites"
      class="mb-2"
      variant="outlined"
      color="grey-lighten-1"
    >
      <v-card-text>
        <p>
          Bevor die Jupyter Notebooks ausgeführt werden können, muss ein kaggle
          API Token vorhanden sein!
        </p>
        <p>
          Gehen Sie dafür auf die
          <a href="https://www.kaggle.com" target="_blank">Kaggle</a> Webseite,
          und loggen Sie sich ein.
        </p>
        <v-row class="mt-3">
          <v-col>Klicken Sie auf "Settings" oder "Einstellungen"</v-col>
          <v-col
            ><v-img
              src="../assets/kaggle_profile.png"
              alt="Kaggle Profile"
              height="200px"
          /></v-col>
        </v-row>
        <v-row
          ><v-col
            ><p>Scrollen Sien runter, bis sie zum API Tab kommen.</p>
            <p>
              Klicken sie auf "Create New Token" und speichern sie das
              "kaggle.json"
            </p></v-col
          ><v-col><v-img src="../assets/kaggle_api_token.png" /></v-col></v-row
        ><v-row
          ><v-col
            ><p>
              Sobald Sie das kaggle.json runtergeladen haben, können sie die
              Schritte 1 - 6 unter "Google Colab Links" ausführen
            </p></v-col
          ></v-row
        >
        <v-row class="mt-2"
          ><v-col
            ><v-alert color="info">
              <p>Info:</p>
              <p>
                Beim ausführen der Notebooks, werden sie aufgefordert
                Berechtigungen auf ihr Google Drive zu erteilen.
              </p>
              <p>
                Diese werden benötigt, um die Files speichern zu können.
              </p></v-alert
            ></v-col
          ></v-row
        >
      </v-card-text>
    </v-card>

    <!-- Expansion Panel for Colab Links -->
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-title color="orange-lighten-3"
          >Google Colab Links</v-expansion-panel-title
        >
        <v-expansion-panel-text>
          <v-list lines="two">
            <v-list-item
              v-for="(linkObj, index) in colabLinks"
              :key="index"
              :title="'Schritt ' + (index + 1)"
            >
              <v-list-item-subtitle class="mt-2"> </v-list-item-subtitle>
              <a :href="linkObj.link" target="_blank">{{
                linkObj.description
              }}</a>
            </v-list-item>
          </v-list>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <!-- Final step with zip upload -->
    <v-card
      subtitle="Damit die Flask app die ML Modelle nutzten kann, müssen diese hochgeladen werden."
      title=".zip upload"
      class="mb-2 mt-2"
      variant="outlined"
      color="grey-lighten-1"
    >
      <v-card-text>
        <p>
          Nachdem Schritt 6 erfolgreich erledigt wurde, sollten sie in ihrem
          "downloads" folder ein file mit dem Namen "wine_project_artifacts.zip"
          haben
        </p>
        <p>Laden sie dieses File bitte hoch.</p>
        <FileUpload />
      </v-card-text>
    </v-card>
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
        // Fetching Colab links from the backend
        const response = await fetch("/get_colab_links"); // Backend API URL
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json(); // Parse the response JSON
        this.colabLinks = data; // Store the Colab links and descriptions
      } catch (error) {
        console.error("Error fetching links:", error); // Handle error
      }
    },
  },
};
</script>

<style scoped>
/* Styling as needed */
</style>
