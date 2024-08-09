<template>
  <div class="container">
    
    <div class="loginelement">
        <h2>Login</h2>
        <input type="text" v-model="Email" placeholder="Email" required>
        <input type="password" v-model="Password" placeholder="Password" required>
        <button type="submit" @click="LoginButton()">Login</button>
    </div>
    <div class="createaccount" >
        <h2>Create Account</h2>
        <input type="text" v-model="userName" placeholder="Username" required>
        <input type="text" v-model="Email" placeholder="Email" required>
        <input type="password" v-model="Password" placeholder="Password" required>
        <input type="text" v-model="firstName" placeholder="First Name" required>
        <input type="text" v-model="lastName" placeholder="Last Name" required>
        <input type="text" v-model="address" placeholder="Address" required>
        <input type="text" v-model="phoneNumber" placeholder="Phone Number" required>
        <button type="submit" @click="CreateAccount()">Create Account</button>
    </div>
    
  </div>
</template>

<script>
export default {
    name: 'LoginView',
    mounted() {
        if (document.cookie != '') {
            this.$router.push({ name: 'account' });
        }
    },
    methods: {
        async LoginButton(){
            console.log("button clicked :)");
            try{

            var emailpassword = this.Email + ":" + this.Password;
            emailpassword = btoa(emailpassword);
            
            
            const accestoken = await fetch('https://localhost:5001/api/User/Login', {
                method: 'POST',
                headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                emailpassword 
            )
            })
                .then(response => {
                return response.text();
                })
                .then(data => {return data})
                .catch(error => console.error('Error:', error));
            
            if (accestoken.includes("Unauthorized") ) {
                alert("Invalid login")
                return
            }
            else {
                document.cookie = accestoken;
            }
            

            this.cookie = JSON.parse(atob(document.cookie.split('.')[1].split('.')[0]))
            console.log(this.cookie['sub'])
            if (document.cookie != null){
                this.$router.go(0);
            }
        }
        catch{
            console.log('failed')
        }
        },
        async CreateAccount() {
                try {
                    const newUser = {
                        userType: 0,
                        email: this.Email,
                        userName: this.userName,
                        firstName: this.firstName,
                        lastName: this.lastName,
                        password: this.Password,
                        address: this.address,
                        phoneNumber: this.phoneNumber
                    };

                    const response = await fetch('https://localhost:5001/api/User', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newUser)
                    });

                    if (response.ok) {
                        alert('Account created successfully');
                        this.$router.go(0);
                        this.$router.push('/login');
                    } else {
                        alert('Failed to create account');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }
    }
}
</script>

<style>

.loginelement{
    width: 400px;
    justify-content: center;
    display: flex;
    margin: 10px;
    flex-direction: column;}
.createaccount{
    width: 400px;
    justify-content: center;
    display: flex;
    margin: 10px;
    flex-direction: column;
}
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

</style>