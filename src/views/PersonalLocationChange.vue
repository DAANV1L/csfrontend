<template>
  <div>
    <h1>
      Personal Location Change
    </h1>
    <div class="account-info"> 
      <form style="display: flex; flex-direction: column; flex-wrap: nowrap; justify-content: center; align-items: center;" >
        <img :src="imageData" alt="image" style="width: 200px; height: 200px;">
        <label for="file">Please insert .jpg image 200px x 200px</label>
        <input type="file" id="imagedatafile" @change="makeimagetobase64">
        <label>LocationID: {{ locationID }}</label>
        <label for="locationName">Location Name:</label><br>
        <input type="text" id="locationName" name="locationName" v-model="locationName"><br>
        <label for="description">Description:</label><br>
        <input type="text" id="description" name="description" v-model="description"><br>
        <label for="pricePerNight">Price Per Night:</label><br>
        <input type="number" id="pricePerNight" name="pricePerNight" v-model="pricePerNight"><br>
        <label for="categoryID">Category ID:</label><br>
        <!-- <input type="number" id="categoryID" name="categoryID" v-model="categoryID"><br> -->
        <select v-model="categoryID" style="width: 170px;">
            <option value="0">Forest</option>
            <option value="1">Mountain</option>
            <option value="2">Sea</option>
            <option value="3">Lake</option>
        </select>
        <button v-if="this.locationID == 0" @click="Createlocation()">Create</button>
        <button type="submit" @click="submitinfoupdate" style="margin-top: 10px;" v-if="this.locationID != 0">Update</button>
        <button @click="deleteLocation" style="background-color: red; margin-top: 10px;">Delete</button>
        
        <p>{{ information }}</p>
      </form>
    </div>
    
  </div>
</template>

<script>
export default {
  data()
  {
    return {
      locations: [],
      userID: 0,
      personallocation: [],
      locationID: 0,
      locationName: "",
      description: "",
      pricePerNight: 0,
      categoryID: 0,
      imageData: "",
    }

  },
  async mounted(){
    this.cookie = JSON.parse(atob(document.cookie.split('.')[1].split('.')[0]))
    this.userID = this.cookie['sub'].split(":")[1].split("=")[1]
    
    this.locations = await this.getUserLocation()
    this.personallocation = this.locations.find(location => location.userID == this.userID);
    if (this.personallocation != undefined){
      this.locationID = this.personallocation.id;
      this.locationName = this.personallocation.locationName;
      this.description = this.personallocation.description;
      this.pricePerNight = this.personallocation.pricePerNight;
      this.categoryID = this.personallocation.categoryID;
      this.imageData = this.personallocation.imageData;
    }
    
  },
  methods:{
    getUserLocation(){
            return fetch('https://localhost:5001/api/Location')
            .then(response => response.json())
            .then(data => {
                return data;
            });
    },
    async submitinfoupdate(event) {
      event.preventDefault();
      try {
        const requestData = {
          imageData: this.imageData,
          userID: 7,
          locationName: this.locationName,
          description: this.description,
          pricePerNight: this.pricePerNight,
          categoryID: this.categoryID
        };
        const response = await fetch(`https://localhost:5001/api/Location/UpdateLocation?id=${this.locationID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestData)
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.information = "Location updated successfully!";
        const data = await response.json();
        console.log(data);
        
      } catch (error) {
        console.error('Failed to update location:', error);
        this.information = "Failed to update location!";
      }
    },
    async deleteLocation(event) {
      event.preventDefault();
      
      try {
        const response = await fetch(`https://localhost:5001/api/Location/RemoveLocation?id=${this.locationID}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.$router.go(0);
        const data = await response.json();
        console.log(data);
        this.information = "Location deleted successfully!";
      } catch (error) {
        console.error('Failed to delete location:', error);
      }
    },
    makeimagetobase64(e){
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        this.imageData = e.target.result;
      }
    },
    Createlocation(){
      fetch('https://localhost:5001/api/Location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          imageData: this.imageData,
          userID: this.userID,
          locationName: this.locationName,
          description: this.description,
          pricePerNight: this.pricePerNight,
          categoryID: this.categoryID
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        this.information = "Location created successfully!";
        this.$router.go(0);
      })
      .catch((error) => {
        console.error('Error:', error);
        this.information = "Failed to create location!";
      });
    }



  },
  
}


</script>

<style>
.account{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
    padding: 10px;
    border: 1px solid black;
    border-radius: 5px;
    background-color: #f2f2f2;
}
</style>