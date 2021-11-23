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
    <div class="tables" v-else>
      <table>
        <caption>
          <div style="font-size: 30px"><b>Not Refined Sounds</b></div>
          {{querySoundboard}} 
          <div style="font-size:16px; margin-top: 15px;"><b style="font-size:9px">Refined</b> {{stringRefined}} <b style="font-size:9px">NotRefined</b></div>
        </caption>
        <thead>
          <tr>
            <th scope="col">Sound Name</th>
            <th scope="col">Category</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in notRefinedSounds" :key="item.id">
            <td data-label="Title">
              <span v-if="item.newTitle && !item.isRefined">⚡</span>
              <router-link :to="{ name: 'Sound', params: { id: item.id } }">
                {{ item.oldTitle }} 
              </router-link>
              <span v-if="item.newTitle && !item.isRefined">⚡</span>
            </td>
            <td data-label="Category">{{ item.oldCategory }}</td>
          </tr>
        </tbody>
      </table>

      <table>
        <caption>
          <div style="font-size: 30px"><b>Refined Sounds</b></div>
          {{
            querySoundboard
          }}
        </caption>
        <thead>
          <tr>
            <th scope="col">Sound Name</th>
            <th scope="col">Category</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in refinedSounds" :key="item.id">
            <td data-label="Title">
              <router-link :to="{ name: 'Sound', params: { id: item.id } }">
                {{ item.oldTitle }}
              </router-link>
            </td>
            <td data-label="Category">{{ item.oldCategory }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data: function () {
    return {
      sounds: [],
      notRefinedSounds: [],
      refinedSounds: [],
      querySoundboard: this.$route.query.soundboard,
      loading: true,
      counter: null,
      stringRefined: 0,
    };
  },
  async mounted() {
    const response = await axios.get(
      `${process.env.VUE_APP_BASE_URL}/sounds/soundboard?soundBoard=${this.$route.query.soundboard}`
    );
    this.sounds = response.data.sounds;

    const fixUrl = this.sounds.map((el) => {
      el.soundUrl = `https://storage.googleapis.com/sounds-ugc/${el.soundUrl}`;
      return el;
    });

    const notRefinedSounds = fixUrl.filter((el) => !el.isRefined);
    this.notRefinedSounds = notRefinedSounds;

    const refinedSounds = fixUrl.filter((el) => el.isRefined);
    this.refinedSounds = refinedSounds;

    this.loading = false;
    this.sounds = fixUrl;

    const counter = await axios.get(
      `${process.env.VUE_APP_BASE_URL}/sounds/soundboard/count?soundBoard=${this.querySoundboard}`
    );

    this.counter = counter.data;
    this.stringRefined = `${counter.data.refinedCount}/${counter.data.refinedCount + counter.data.notRefinedCount}`
  },
};
</script>

<style scoped>
.home {
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
