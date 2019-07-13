<template>
  <div class="home text-center h-100 d-flex align-items-center">
    <div class="container pt-4 pb-4">
      <h1 class="mb-3">Technical task</h1>
      <form @submit="checkForm">
        <div v-if="errors.length" class="alert alert-danger text-left" role="alert">        
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
          </ul>
        </div>

        <div class="form-group">
        <input class="form-control" v-model="name" placeholder="Enter your name">
        </div>
        <div class="form-group">
          <select class="form-control" v-model="selected">
            <option disabled value="">Choose text</option>
            <option v-for="option in options" v-bind:value="option.id" v-bind:key="option.id">
              {{ option.title }}
            </option>
          </select>
        </div>

        <input class="btn btn-primary" type="submit" value="Start">  
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Home',
  data: function() {
    return {
      name: '',
      selected: '',
      options: [],
      errors:[],
    }
  },
  mounted() {  
    axios.get("https://printful.com/test-quiz.php?action=quizzes").then(response => {
      this.options = response.data;
    });
  },
  methods: {
    checkForm: function (e) {
      if (this.name && this.selected) {
        this.start();
        return true;
      }

      this.errors = [];

      if (!this.name) {
        this.errors.push('Name required.');
      }
      if (!this.selected) {
        this.errors.push('Quiz type required.');
      }

      e.preventDefault();
    },
    start: function () {
      this.$router.push({ name: 'questions', params: { name: this.name, test: this.selected } })
    }
  }
}
</script>
