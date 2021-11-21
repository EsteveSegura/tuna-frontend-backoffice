<template>
  <div class="home">
    <div class="loader" v-if="loading">
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <table v-else>
      <caption>
        <b>{{ querySoundboard }}</b>
      </caption>
      <thead>
        <tr>
          <th scope="col">Soundboard Name</th>
          <th scope="col">Category</th>
          <th scope="col">Audio</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in sounds" :key="item.id">
          <td data-label="Title">
            <router-link :to="{ name: 'Sound', params: { id: item.id } }">
              {{ item.oldTitle }}
            </router-link>
          </td>
          <td data-label="Category">{{ item.oldCategory }}</td>
          <td data-label="Audio"><audio :src="item.soundUrl" controls /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data: function () {
    return {
      sounds: [],
      querySoundboard: this.$route.query.soundboard,
      loading: true,
    };
  },
  async mounted() {
    const response = await axios.get(
      `http://localhost:3000/api/v1/sounds/soundboard?soundBoard=${this.$route.query.soundboard}`
    );
    this.sounds = response.data.sounds;

    const fixUrl = this.sounds.map((el) => {
      el.soundUrl = `https://storage.googleapis.com/sounds-ugc/${el.soundUrl}`;
      return el;
    });

    this.loading = false;
    this.sounds = fixUrl;
  },
};
</script>

<style scoped>
.home{
  padding: 0 4%;
}
.loader {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: stretch;
  align-items: center;
  width: 100%;
  height: 90vh;
}

.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #000;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #000 transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
}

table caption {
  font-size: 1.5em;
  margin: 0.5em 0 0.75em;
}

table tr {
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  padding: 0.35em;
}

table th,
table td {
  padding: 0.625em;
  text-align: center;
}

table th {
  font-size: 0.85em;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
</style>
