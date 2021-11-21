<template>
  <div id="app">
    <div id="nav">
      <router-link to="/soundboards">SoundBoards</router-link>
      <div v-on:click="logout" class="logout">Logout</div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data: function () {
    return {
      isAuthenticated: localStorage.token !== undefined,
      userAuth: localStorage.user,
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.$router.push('/')
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap");
body {
  font-family: "Roboto", sans-serif;
  margin: 0;
}

.logout {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: underline;
  cursor: pointer;
}

#nav {
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-flex-wrap: nowrap;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-align-content: stretch;
  -ms-flex-line-pack: stretch;
  align-content: stretch;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
  background-color: #27ae60;
  padding: 20px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #2c3e50;
}
</style>
