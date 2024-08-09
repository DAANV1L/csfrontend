<template>
    <div class="container">
        <div class="search-bar">
            <Searchbar 
                :searchbartext="searchText" 
                :categoryselected="selectedCategory"
                @update:searchbartext="searchText = $event"
                @update:categoryselected="selectedCategory = $event"
                @search="handleSearch"
                />
        </div>
        <div class="content">
            <SearchLocation v-for="location in Searchbarlocations" :key="location.id" :IDVALUE="location.id" :NAME="location.locationName" :IMAGE="location.imageData" :DESCRIPTION="location.description" :PRICE="location.pricePerNight" :CATEGORY="location.categoryID" :STARS="getrating(location.id)"/>
        </div>
    </div>
</template>

<script>
import SearchLocation from '../components/SearchLocation.vue';
import Searchbar from '../components/searchbar.vue';

export default {
    name: 'SearchView',
    components: {
        SearchLocation,
        Searchbar
    },
    data(){
        return {
            locations: [],
            ratings: [],
            Searchbarlocations: [],
            searchText: '',
            selectedCategory: ''
        }
    },
    async mounted() {
        this.locations = await this.fetchlocations();
        this.ratings = await this.fetchrating();
        this.uniformreview();
        console.log(this.ratings);
        this.handleSearch({ text: '', category: '' });
    },
    methods: {
        fetchlocations(){
            return fetch('https://localhost:5001/api/Location')
            .then(response => response.json())
            .then(data => {
                return data;
            });
        },
        fetchrating(){
            return fetch('https://localhost:5001/api/Review')
            .then(response => response.json())
            .then(data => {
                return data;
            });
        },
        uniformreview(){
            const newratings = [];
            this.ratings.forEach(rating => {
                if (newratings.some(newrating => newrating.locationID === rating.locationID)){
                    const newrating = newratings.find(newrating => newrating.locationID === rating.locationID);
                    newrating.rating = (newrating.rating + rating.rating) / 2;
                    return;
                }
                const newrating = {
                    locationID: rating.locationID,
                    rating: rating.rating
                };
                newratings.push(newrating);
            });
            this.ratings = newratings;
        },
        getrating(ID){
            var rate = 'No rating!';
            this.ratings.forEach(rating => {
                console.log(rating.locationID, ID, '--');
                if (rating.locationID === ID){
                    console.log("catched", rating.rating);
                    rate = rating.rating;
                    return rate;
                }
            });
            return rate;
        },
        handleSearch({ text, category }) {
            this.Searchbarlocations = this.locations;
            if (text == '' && category == ''){return;}
            if (text != ''){
                this.Searchbarlocations = this.Searchbarlocations.filter(location => location.locationName.toLowerCase().includes(text.toLowerCase()));
            }
            if (category != ''){
                this.Searchbarlocations = this.Searchbarlocations.filter(location => location.categoryID == category);
                console.log(category, 'selected category');
            }

        }
    }
}
</script>

<style>
.container {
    display: flex;
    flex-direction: column;
}

.search-bar {
    flex: 0 0 auto; 
    border: 1px solid black;
    margin: 10px;
}

.content {
    flex: 1 1 auto;
    margin: 10px;
}
</style>