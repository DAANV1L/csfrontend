<template>
  <div>
      <TopBanner/>
      
      <div class="container">
          <router-view></router-view>
      </div>
  </div>
</template>


<script>
import TopBanner from './components/TopBanner.vue';

export default {
  name: 'app',
  components: {
      TopBanner
  },
  data() {
      return {
          userid: -1,
      }
  },
}

</script>