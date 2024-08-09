<template>
    <div>
      <TopBannerVue/>
      <div class="account">
          <h1>Account</h1>
          <div class="account-info">
              <form     style="    display: flex; flex-direction: column;">
                  <label for="username">Username:</label>
                  <input type="text" id="username" name="username" v-model="username">
                  <label for="email">Email:</label>
                  <input type="text" id="firstName" name="firstName" v-model="firstName">
                  <label for="email">FirstName:</label>
                  <input type="text" id="email" name="email" v-model="email">
                  <label for="email">LastName:</label>
                  <input type="text" id="lastName" name="lastName" v-model="lastName">
                  <label for="phone">Phone number:</label>
                  <input type="text" id="phone" name="phone" v-model="phone">
                  <label for="address">Address:</label>
                  <input type="text" id="address" name="address" v-model="address" >
                  <label for="usertype">User Type:</label>
                  <select v-model="userType" @change="userTypeChange">
                      <option value="1">Home Owner</option>
                      <option value="0">Default User</option>
                  </select>
                  <button @click="updateAccount" style="margin-top: 10px;">Update</button>
                  <button @click="logoutbutton" style="margin-top: 10px;">
                  Logout
                  </button>
              </form>
              
          </div>
      </div>
    </div>
  </template>
  
  
<script>
  
  export default{
      components: {
        
      },
      data(){
          return {
              id: -1,
              username: '',
              email: '',
              phone: '',
              address: '',
              firstName: '',
              lastName: '',
              userType: '',
              datatable: [],
          }
      },
      
      async mounted(){
          if (document.cookie == '') {
              this.$router.push({ name: 'login' });
          }
            
            this.cookie = JSON.parse(atob(document.cookie.split('.')[1].split('.')[0]))
            this.id = this.cookie['sub'].split(":")[1].split("=")[1]
            const data = await this.getAccountInfo();
            const personalData = data.find(x => x.id == this.id);            
            this.username = personalData.userName;
            this.email = personalData.email;
            this.phone = personalData.phoneNumber;
            this.address = personalData.address;
            this.firstName = personalData.firstName;
            this.lastName = personalData.lastName;
            this.userType = personalData.userType;
        },
      methods:{
        async getAccountInfo(){
            return fetch('https://localhost:5001/api/User/') 
            .then(response => response.json())
            .then(data => {
                return data;
            });
        },
          async updateAccount(){
              console.log("update account")
              await fetch('https://localhost:5001/api/User/Update?id='+this.id, {
                  method: 'PUT',
                  headers: {
                      'accept': 'application/json',
                      'Content-Type': 'application/json',
                      // 'Authorization': 'Bearer ' + document.cookie
                  },
                  body: JSON.stringify({
                      address: this.address,
                      email: this.email,
                      firstName: this.firstName,
                      lastName: this.lastName,
                      password: "nofillin!",
                      phoneNumber: this.phone,
                      userName: this.username,
                      userType: this.userType
                  })
              })
              .then(response => {
                  return response.json();
              })
              .then(data => {
                  console.log(data);
              })
              .catch(error => console.error('Error:', error));
            this.getAccountInfo();
          },
          logoutbutton(event){
              event.preventDefault();
              this.removecookie();
              
  
              setTimeout(() => {
                  this.$router.push({ name: 'login' });
              }, 1000);
          },
          userTypeChange(){
              
          },
          removecookie(){
            document.cookie = 'cookieName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          }
      
      }
  
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