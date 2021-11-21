<template>
  <div class="login">
    <h1>Login</h1>
    <form v-on:submit.prevent>
      <input type="text" class="input-text" v-model="user" placeholder="agent" />
      <input type="password" class="input-text" v-model="password" placeholder="password" />
      <input type="submit" class="submit" value="Login" v-on:click="login" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data: function () {
    return {
      user: "",
      password: "",
    };
  },
  methods: {
    login: async function () {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/users/",
          {
            username: this.user,
            password: this.password,
          }
        );

        localStorage.token = response.data.token;
        localStorage.user = this.user;
        this.$router.push('SoundBoards')
      } catch (error) {
        localStorage.removeItem("token"); 
        localStorage.removeItem("user"); 
        alert("Wrong user or password")
      }
    },
  },
};
</script>

<style scoped>
.input-text {
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 10px;
  width: 100%;
  box-sizing: border-box;
  color: #2c3e50;
  font-size: 13px;
}

.submit {
  width: 100px;
  background: #27ae60;
  font-weight: bold;
  color: white;
  border: 0 none;
  border-radius: 1px;
  cursor: pointer;
  padding: 10px 5px;
  margin: 10px 5px;
}
</style>
