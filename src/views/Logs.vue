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
    <div v-else>
      <div class="downloadBtn">
        <input
          type="submit"
          class="btn"
          value="Download CSV"
          v-on:click="jsonToCsvDownload"
        />
      </div>
        <div style="text-align:center;font-size:10px;">Only the last 15 movements are shown, to see all movements please download the CSV by clicking on the button above this text.</div>
      <div class="tables" v-for="item in logs" :key="item.id">
        <h1 style="text-align: center">{{ item._id }}</h1>
        <h3 style="text-align: center">{{ item.createdAt }}</h3>
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
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";

export default {
  name: "Home",
  data: function () {
    return {
      loading: true,
      logs: [],
      dataCsv: [],
    };
  },
  async mounted() {
    const logs = await axios.get(`${process.env.VUE_APP_BASE_URL}/logs/all`);

    this.logs = _.take(logs.data.logs,15);
    const formatCsv = logs.data.logs.map((el) => {
      const newData = {
        date: el.createdAt,
        logId: el._id,
        agentName: el.user.user,
        agentId: el.user.id,
        soundFile: el.sound.soundUrl,
        soundOwnerId: el.sound.ownerId,
        soundBoard: el.sound.soundBoard,
        originalSoundId: el.sound._id,
        originalTitle: el.sound.oldTitle,
        originalTags: el.sound.oldTags.join("-"),
        originalCategory: el.sound.oldCategory,
        originalDescription: el.sound.oldDescription,
        originalImage: el.sound.oldImageUrl,
        newTitle: el.sound.newTitle,
        newTags: el.sound.newTags.join("-"),
        newDescription: el.sound.newDescription,
        newImageUrl: el.sound.newImageUrl,
      };

      return newData;
    });

    this.dataCsv = formatCsv;

    this.loading = false;
  },
  methods: {
    jsonToCsvDownload() {
      let json = this.dataCsv;
      let fields = Object.keys(json[0]);
      let replacer = function (key, value) {
        return value === null ? "" : value;
      };
      let csv = json.map((row) => {
        return fields
          .map(function (fieldName) {
            return JSON.stringify(row[fieldName], replacer);
          })
          .join(",");
      });
      csv.unshift(fields.join(",")); // add header column
      csv = csv.join("\r\n");

      const anchor = document.createElement("a");
      anchor.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
      anchor.target = "_blank";
      anchor.download = `LOGS_${Date.now()}.csv`;
      anchor.click();
    },
  },
};
</script>

<style scoped>
.downloadBtn{
      display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-flex-wrap: nowrap;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-align-content: stretch;
    -ms-flex-line-pack: stretch;
    align-content: stretch;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
}
.btn {
  width: 120px;
  background: #27ae60;
  font-weight: bold;
  color: white;
  border: 0 none;
  border-radius: 1px;
  cursor: pointer;
  padding: 10px 5px;
  margin: 10px auto;
}

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
