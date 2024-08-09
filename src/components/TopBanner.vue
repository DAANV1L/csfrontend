<template>
    <div class="div">
        <div id="topbannerdiv">
            <div id="title">
                CampSpot
            </div>
            <div id="pages">
                <router-link class="router-link" to="/home">Home</router-link>
                <router-link class="router-link" to="/about">About</router-link>
                <router-link class="router-link" to="/search">Search</router-link>
                <router-link class="router-link" to="bookings" id="bookingsrouterz" v-if="UserIsLogedin()">Bookings</router-link>
                <router-link class="router-link" to="PersonalLocationChange" id="" v-if="UserIsLogedin()">PersonalLocations</router-link>
            </div>
            <div style="right: 100px;">
                
                <router-link class="router-link" to="account" id="Account" v-if="UserIsLogedin()">Account</router-link>
                <router-link class="router-link" to="login" id="Login" v-if="UserIsLogedin()-1">Login</router-link>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    name: 'TopBanner',
    methods: {
        UserIsLogedin(){
            if (document.cookie.length > 2){
                return true
            }
            else return false
        }
    }
}

</script>

<style>

#topbannerdiv {
    display: flex;
    background-color: #1c6114df;
    padding: 10px;
    color: white;
    justify-content: space-between;
}
#title {
    font-size: 20px;
    font-weight: bold;
}
#pages {
    display: flex;
    align-items: center;
}

.router-link {
    color: white;
    text-decoration: none;
    font-weight: bold;
    padding-right: 10px;
    font-size: 20px;
}

.router-link:hover {
    text-decoration: underline;
}

#account {
    font-size: 20px;
    font-weight: bold;
}

</style>