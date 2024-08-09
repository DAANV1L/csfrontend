<template>
  <div id="tablediv">
    <table class="bookingstable" style="width: 80%;">
      <tr class="bookingstabletr">
        <th class="bookingstable">
            <img :src="img" alt="image" style="width: 100px; height: 100px; border-radius: 50px; margin-top: 10px;"/>
        </th>
        <th class="bookingstable">Unique LocationID: {{ LocationID }}</th>
        <th class="bookingstable">Check In Date: {{ checkindate }}</th>
        <th class="bookingstable">Number of Nights: {{ NumberOfNights }}</th>
        <th class="bookingstable">have a nice stay :)</th>
      </tr>
    </table>
  </div>
</template>

<script>

export default {
  name: 'BookingsComponent',
  props: {
    LocationID: Number,
    checkindate: String,
    NumberOfNights: Number,
    img: String
  },
  created() {
  
  },
  methods: {
    
  }
}


</script>

<style>
.bookingstable {
  
  background-color: #347f45;
  height: 80px;
  color: white;
  text-align: center;
  border-radius: 20px;
}
.bookingstable{
  border-collapse: collapse;
  margin: 5px;
}
.bookingstabletr{
  border: 1px solid #ddd;
  padding: 8px;
}
#tablediv{
  display: flex;
  justify-content: center;
}
</style>