<template>
  <div>
    <div class="Locations">
        <table class="locationblock">
          <tr>
            <th style="width: 100px;">Location ID: <br> {{ IDVALUE }}</th>
            <img v-bind:src="IMAGE" style="width: 150px; height: 150px;">
            <th style="width: 300px;">Name: <br>  {{ NAME }}</th>
            <th style="width: 300px;">Description: <br>
              {{ DESCRIPTION }}
            </th>
            <th style="width: 300px;">Price: <br>  € {{ PRICE }}</th>
            <th style="width: 300px;">Category: <br>  {{ CATEGORY }}</th>
            <th style="width: 200px;">
              Stars <br> {{ STARS }}
            </th>
            <th>
              <button @click="NextPage()">
                Book now!
              </button>
            </th>
          </tr>
        </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchLocation',
  props: {
    IDVALUE: Number,
    IMAGE: Image,
    NAME: String,
    DESCRIPTION: String,
    PRICE: Number,
    CATEGORY: String,
    STARS: Number
  },
  methods: {
    NextPage(){
      this.$router.push('/location/' + this.IDVALUE);
    }
  },
}
</script>

<style>
.Locations {
  display: flex;
  flex-direction: row;
  height: 150px;
  border: black 1px solid;
  margin: 5px;
  background: rgb(199, 244, 199);
}
button {
  background-color: #56b059;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  margin: 4px 2px;
  cursor: pointer;
  height: 50px;
  width: 120px;
}
button:hover {
  background-color: #45a049;
}
</style>