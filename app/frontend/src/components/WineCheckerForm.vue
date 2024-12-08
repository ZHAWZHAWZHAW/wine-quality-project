<template>
  <div>
    <v-form @submit.prevent="submitForm" ref="form">
      <v-row>
        <!-- Dynamic Fields for Wine Features -->
        <v-col v-for="field in fields" :key="field" cols="12" sm="6" md="4">
          <v-text-field
            v-model="formData[field]"
            :label="field.replace('_', ' ').toUpperCase()"
            :placeholder="'Enter ' + field.replace('_', ' ')"
            :type="getFieldType(field)"
            :rules="[rules.required]"
          />
        </v-col>

        <!-- Select Model -->
        <v-col cols="12">
          <v-select
            v-model="formData.model"
            :items="models"
            label="Select Model"
            :rules="[rules.required]"
          />
        </v-col>

        <v-col cols="12" class="d-flex justify-start mt-4">
          <v-btn type="submit" color="primary" large class="w-33"
            >Predict</v-btn
          >
        </v-col>
      </v-row>
    </v-form>

    <v-row v-if="predictions">
      <v-col cols="12">
        <v-card>
          <v-card-title>Prediction Results</v-card-title>
          <v-card-text>
            <v-list lines="two">
              <v-list-item v-for="(result, model) in predictions" :key="model">
                <v-list-item-title v-if="Object.keys(predictions).length === 1"
                  >Model: {{ formData.model }}</v-list-item-title
                >
                <v-list-item-title v-else>Model: {{ model }}</v-list-item-title>
                <v-list-item-text
                  >Result: {{ result }}</v-list-item-text
                ></v-list-item
              >
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="shap_data" class="mt-5">
      <v-row class="w-100 mb-5">
        <v-col><h1>XAI Techniques</h1></v-col>
      </v-row>
      <v-expansion-panels>
        <v-expansion-panel
          v-for="(result, model) in shap_data"
          :key="model"
          class="mt-2"
        >
          <v-expansion-panel-title>
            Model: {{ model }}
          </v-expansion-panel-title>
          <v-expansion-panel-text v-if="result">
            <v-row
              v-for="(img, data) in result"
              :key="data"
              class="w-100 d-flex mt-5"
            >
              <v-col
                ><h3>{{ data }} Plot</h3>
                <v-img :src="'data:image/png;base64,' + img" class="w-100" />
              </v-col>
            </v-row>
          </v-expansion-panel-text>
          <v-expansion-panel-text v-else
            >No Plot available</v-expansion-panel-text
          >
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        "fixed_acidity",
        "volatile_acidity",
        "citric_acid",
        "chlorides",
        "free_sulfur_dioxide",
        "density",
        "sulphates",
        "alcohol",
      ],
      formData: {
        fixed_acidity: "",
        volatile_acidity: "",
        citric_acid: "",
        chlorides: "",
        free_sulfur_dioxide: "",
        density: "",
        sulphates: "",
        alcohol: "",
        model: "Random Forest",
      },
      models: ["Random Forest", "Logistic Regression", "SVC", "All"],
      predictions: null, // For storing predictions from the backend
      shap_data: null,
      errorMessage: null, // For error handling
      rules: {
        required: (value) => !!value || "This field is required",
      },
    };
  },
  methods: {
    // Handle form submission
    async submitForm() {
      this.shap_data = null;
      try {
        const response = await fetch("/predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.formData),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch prediction.");
        }

        const data = await response.json();
        if (data.error) {
          this.errorMessage = data.error;
          this.predictions = null;
          this.shap_data = null;
        } else {
          this.errorMessage = null;
          // Check if predictions is an object (for multiple models) or a single value
          if (data.predictions) {
            this.predictions = data.predictions; // Store predictions for all models
          } else if (data.prediction) {
            this.predictions = { Prediction: data.prediction }; // Store single prediction
          }
          this.shap_data = data.shap_data;
        }
      } catch (error) {
        this.errorMessage = "An error occurred while fetching the prediction.";
        this.shap_data = null;
        console.error(error);
      }
    },

    // Determine input field type (e.g., number, text)
    getFieldType(field) {
      return [
        "density",
        "alcohol",
        "fixed_acidity",
        "volatile_acidity",
        "citric_acid",
        "chlorides",
        "free_sulfur_dioxide",
        "sulphates",
      ].includes(field)
        ? "number"
        : "text";
    },
  },
};
</script>

<style scoped>
.v-btn {
  text-transform: none;
}
</style>
