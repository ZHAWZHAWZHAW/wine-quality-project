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
      errorMessage: null, // For error handling
      rules: {
        required: (value) => !!value || "This field is required",
      },
    };
  },
  methods: {
    // Handle form submission
    async submitForm() {
      try {
        const response = await fetch("http://localhost:5000/predict", {
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
        } else {
          this.errorMessage = null;
          // Check if predictions is an object (for multiple models) or a single value
          if (data.predictions) {
            this.predictions = data.predictions; // Store predictions for all models
          } else if (data.prediction) {
            this.predictions = { Prediction: data.prediction }; // Store single prediction
          }
        }
      } catch (error) {
        this.errorMessage = "An error occurred while fetching the prediction.";
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
