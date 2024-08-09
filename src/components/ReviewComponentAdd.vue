<template>
  <div class="reviewview" >
    <form style="display: flex; margin: 5px;">
      <p style="color: gold; font-weight: bold; font-size: large;">Stars:</p>
      <select style="width: 40px;" name="valueselect" id="valueselect">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <p>review:</p>
      <input type="text" placeholder="Add Review" name="review" id="review" />
      <button  @click="AddReviewButton">
        Add Review
      </button>
      <p style="color: red;"> {{ addinfo }}</p>
    </form>
  </div>
</template>

<script>


export default {
  data() {
    return{
      addinfo: '',
    }
  },
    props: {
        Name: String,
    },
    methods: {
      async AddReviewButton(){
        this.valueselect = document.getElementById("valueselect").value;
        this.review = document.getElementById("review").value;
        if (this.review === ''){
          this.addinfo = 'Please add a review';
        }
        console.log(this.$route.params.id)
        console.log("add review button clicked")
        await fetch('https://localhost:5001/api/Review', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          locationID: this.$route.params.location,
          rating: this.valueselect,
          review: this.review,
          userID: this.Name
        })
        })
        .then(response => {
          return response.text();
        })
        .then(data => {return data})
        .catch(error => console.error('Error:', error))
      }
    },
}
</script>

<style>
.reviewview{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin: 10px;
    padding: 10px;
    border: 1px solid black;
    border-radius: 5px;
    width: 90%;
    background-color: #f2f2f2;
}
</style>