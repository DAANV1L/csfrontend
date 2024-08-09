<template>
    <div>
      <input 
        type="text" 
        placeholder="Search..." 
        v-model="localSearchbartext" 
        @input="updateSearchbartext"
      />
      <select 
        v-model="localCategoryselected" 
        @change="updateCategoryselected"
      >
        <option value="">All</option>
        <option value="1">Forest</option>
        <option value="2">Mountain</option>
        <option value="3">Sea</option>
        <option value="4">Lake</option>
        <!-- Add more options as needed -->
      </select>
      <button @click="emitSearch">Search</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SearchBar',
    props: {
      searchbartext: String,
      categoryselected: String,
    },
    data() {
      return {
        localSearchbartext: this.searchbartext,
        localCategoryselected: this.categoryselected,
      };
    },
    methods: {
      updateSearchbartext() {
        this.$emit('update:searchbartext', this.localSearchbartext);
      },
      updateCategoryselected() {
        this.$emit('update:categoryselected', this.localCategoryselected);
      },
      emitSearch() {
        this.$emit('search', {
          text: this.localSearchbartext,
          category: this.localCategoryselected,
        });
      }
    },
    watch: {
      searchbartext(newValue) {
        this.localSearchbartext = newValue;
      },
      categoryselected(newValue) {
        this.localCategoryselected = newValue;
      }
    }
  }
  </script>
  