<template>

    <div class="home">
        <div class="background-image">
        </div>
        <div class="content">
            <h1>Welcome to CampSpot</h1>
        <p>This is your first step into discovering your new adventure.</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomeView',
}
</script>

<style scoped>
.home {
    text-align: center;
    margin-top: 20px;
    
}
.background-image {
    position: relative;
    text-align: center;
    color: white;
    background-size: cover;
    background-position: center;
    width: 99vw;
    height: 100vh; 
    background-image: url('../assets/380-1690x1000.jpg');
}
.content {
    position: absolute;
    top: -900px;
    position: relative;
    z-index: 2; 
    color: black; 
    padding: 20px; 
}
</style>