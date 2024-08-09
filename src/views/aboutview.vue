<template>
    <div class="home">
        <div class="background-image">
        </div>
        <div class="content">
            <h1>About Us</h1>
        <p>Welcome to our website! We are a team of passionate individuals dedicated to providing the best camping experiences.</p>
        <p>Our mission is to connect campers with their ideal camping spots, making it easier for them to plan their outdoor adventures.</p>
        <p>Feel free to explore our website and discover the amazing camping destinations we have to offer.</p>
        </div>        
    </div>
    
</template>

<script>
export default {
    name: 'AboutView',
}
</script>

<style scoped>
.home {
    text-align: center;
    margin-top: 20px;
    
}
.background-image {
    position: relative;
    top: -20px;
    text-align: center;
    color: white;
    background-size: cover;
    background-position: center;
    width: 99vw;
    height: 100vh; 
    background-image: url('../assets/927-1690x1000.jpg');
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