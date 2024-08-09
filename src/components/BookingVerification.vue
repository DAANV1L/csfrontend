<template>
  <div style="margin: 20px; width: 1500px;">
    <div style="width: 450px; float:left; margin:10px;" >
        <h1>{{ locationdetails.locationName }}</h1>
        <img :src="locationdetails.imageData" alt="location image" style="width: 400px; height: 400px;">
        <h1>
            
        </h1>
    </div>
    <div style="width: 31%; float:left; margin:10px">
      <h2>description</h2>
        <p>
            {{ locationdetails.description }}
        </p>
        <h2>Reviews</h2>
        <reviews v-for="review in reviews" :key="review.id" :Name="review['userID']" :Stars="review['rating']" :Description="review['review']"/>
        <ReviewComponent :Name="this.id" v-if="id>0"/>
   </div>
   <div style="width: 31%; float:left; margin:10px">
        <h2>
            Check Dates
        </h2>
        <VueDatePicker v-model="date" range :enable-time-picker="false" :disabled-dates="disabledDates" @update:model-value="FormData()"/>
        
        <h2>
            from til:
        </h2>
        <h3>
            {{ date }}
        </h3>
        <button @click="ConfirmBooking()" v-if="id>0" >Submit</button>
        <button @click="ConfirmBooking()" v-if="id<0">please Login</button>
   </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import ReviewComponent from '../components/ReviewComponentAdd.vue';
import reviews from '../components/ReviewComponent.vue';

const date = ref();


export default {
    components: {
        VueDatePicker,
        ReviewComponent,
        reviews
        
    },
    data(){
        return {
            locationID: this.$route.params.location,
            locationdetails: [],
            REVIEWS: [],
            date: date,
            disabledDates: ref(['2024-08-08', '2024-08-10']),
            checkInDate: '',
            checkOutDate: '',
            cookie: '',
            id: -1,
            reviews: []
        }
    },
    async mounted(){
        this.locationdetails = await this.fetchlocation(this.locationID)
        this.disabledDates = await this.fetchbookeddates()
        this.uniformdisableddate(this.disabledDates)
        console.log(this.disabledDates)
        try{
            this.cookie = JSON.parse(atob(document.cookie.split('.')[1].split('.')[0]))
            this.id = this.cookie['sub'].split(":")[1].split("=")[1]
        }
        catch{
            this.id = -1
        }
        this.reviews = await this.fetchReviews()
        this.reviews = this.reviews.filter(review => review['locationID'] == this.locationID)
        
    },
    methods: {
     fetchlocation(locationID){
         return fetch('https://localhost:5001/api/Location/GetLocation' + locationID)
         .then(response => response.json())
         .then(data => {
             return data;
         });
     },
     fetchbookeddates(){
         return fetch('https://localhost:5001/api/Booking/GetBooking' + this.locationID)
         .then(response => response.json())
         .then(data => {
             return data;
         });
     },
     uniformdisableddate(bookings) {
            const multipleDates = []
            for (let i = 0; i < bookings.length; i++) {
                const booking = bookings[i];
                const amountofdays = booking['numberOfNights']
                const Checkindate = booking['checkInDate']
                for (let i = 0; i <= amountofdays; i++) {
                    var date = new Date(Checkindate)
                    date.setDate(date.getDate() + i)
                    multipleDates.push(date.toISOString().split('T')[0])
                }
                
            }
            this.disabledDates = multipleDates;
        }, 
        FormData(){
            console.log(this.date[0], '--')
            this.checkInDate = this.date[0]
            this.checkOutDate = this.date[1]
            console.log(this.checkInDate, '---')

        },
        ConfirmBooking(){
            if (ref(this.checkInDate) == null || ref(this.checkOutDate) == null){
                alert('Please select a date')
                return
            }
            const checkIn = new Date(this.checkInDate);
            const checkOut = new Date(this.checkOutDate);
            const timeDiff = Math.abs(checkOut.getTime() - checkIn.getTime());
            const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))+1;
            this.PostBooking(daysDiff, this.locationID, this.checkInDate)
        },
        async PostBooking(daysDiff, locationID, checkInDate){ {
            await fetch('https://localhost:5001/api/Booking', {
                method: 'POST',
                headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + document.cookie
                },
                body: JSON.stringify({
                "userID": this.id,
                "LocationID": locationID,
                "numberOfNights": daysDiff,
                "checkInDate": checkInDate
                })
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.myObject = data;
            })
            .catch(error => console.error('Error:', error));
        }
    },
    fetchReviews(){
        return fetch('https://localhost:5001/api/Review')
        .then(response => response.json())
        .then(data => {
            return data;
        });
    },
},
}
</script>

<style>

</style>