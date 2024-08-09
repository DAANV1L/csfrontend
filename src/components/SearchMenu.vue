<template>
    <div>
        <input type="text" v-model="searchQuery" placeholder="Search..." />
        <button @click="search">Search</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchQuery: ""
        };
    },
    methods: {
        search() {
            // Perform search logic here
            console.log("Searching for:", this.searchQuery);
        }
    }
};
</script>

<style>

</style>