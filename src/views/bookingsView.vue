<template>
  <div>
    <h1>
      New and old bookings
    </h1>
    <bookingscomponent 
      v-for="booking in bookings" 
      :key="booking.id" 
      :LocationID="booking.locationID" 
      :checkindate="booking.checkInDate.split('T')[0]" 
      :NumberOfNights="booking.numberOfNights" 
      :img="booking.image" 
    />
  </div>
</template>

<script>
import bookingscomponent from '../components/BookingsComponent.vue';

export default {
  name: 'BookingsView',
  components: {
    bookingscomponent,
  },
  data() {
    return {
      bookings: [],
      userID: -1,
    };
  },
  async mounted() {
    this.cookie = JSON.parse(atob(document.cookie.split('.')[1].split('.')[0]));
    this.userID = this.cookie.sub.split(":")[1].split("=")[1];
    await this.fetchBookings();
  },
  methods: {
    async fetchBookings() {
      try {
        const response = await fetch('https://localhost:5001/api/Booking/GetUserBooking' + this.userID);
        const data = await response.json();

        // Fetch images for each booking
        const bookingsWithImages = await Promise.all(data.map(async (booking) => {
          const image = await this.getSingleLocationId(booking.locationID);
          console.log(image);
          return { ...booking, image };
        }));

        this.bookings = bookingsWithImages;
        console.log(this.bookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    },
    async getSingleLocationId(locationID) {
      try {
        const response = await fetch(`https://localhost:5001/api/Location/GetImageData${locationID}`);
        const data = await response.text();
        return data;  
      } catch (error) {
        console.error('Error fetching location data:', error);
        return '';  
      }
    },
  },
};
</script>

<style>

</style>
