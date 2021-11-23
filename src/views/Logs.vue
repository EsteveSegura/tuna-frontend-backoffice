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
    <div class="tables" v-else v-for="item in logs" :key="item.id">
      <h1 style="text-align: center;">{{ item._id }}</h1>
      <h3 style="text-align: center;">{{ item.createdAt }}</h3>
      <table>
        <caption>
          <div style="font-size: 24px">Agent</div>
        </caption>
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Id</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="Title">{{ item.user.user }}</td>
            <td data-label="Due Date">{{ item.user.id }}</td>
          </tr>
        </tbody>
      </table>

      <table>
        <caption>
          <div style="font-size: 20px">Original Sound</div>
        </caption>
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Tags</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col">Soundboard</th>
            <th scope="col">Image</th>
            <th scope="col">Sound</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="Title">{{ item.sound.oldTitle }}</td>
            <td data-label="Title">{{ item.sound.oldTags.join(", ") }}</td>
            <td data-label="Title">{{ item.sound.oldDescription }}</td>
            <td data-label="Title">{{ item.sound.oldCategory }}</td>
            <td data-label="Title">{{ item.sound.soundBoard }}</td>
            <td data-label="Title">{{ item.sound.oldImageUrl }}</td>
            <td data-label="Title">{{ item.sound.soundUrl }}</td>
          </tr>
        </tbody>
      </table>

      <table>
        <caption>
          <div style="font-size: 20px">Sound edited by agent</div>
        </caption>
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Tags</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col">Soundboard</th>
            <th scope="col">Image</th>
            <th scope="col">Sound</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="Title">{{ item.sound.newTitle }}</td>
            <td data-label="Title">{{ item.sound.newTags.join(", ") }}</td>
            <td data-label="Title">{{ item.sound.newDescription }}</td>
            <td data-label="Title">{{ item.sound.newCategory }}</td>
            <td data-label="Title">{{ item.sound.soundBoard }}</td>
            <td data-label="Title">{{ item.sound.newImageUrl }}</td>
            <td data-label="Title">{{ item.sound.soundUrl }}</td>
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
      loading: true,
      logs: [],
    };
  },
  async mounted() {
    const logs = await axios.get(`${process.env.VUE_APP_BASE_URL}/logs/all`);

    this.logs = logs.data.logs;
    this.loading = false;
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
