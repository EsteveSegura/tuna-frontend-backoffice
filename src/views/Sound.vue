<template>
  <div class="container">
    <article class="card card--1">
      <div class="card__img">
        <img :src="sound.oldImageUrl" alt="" srcset="" />
      </div>
      <a href="#" class="card_link">
        <div class="card__img--hover"></div>
      </a>
      <audio style="margin-top: 20px" :src="sound.soundUrl" controls />
      <div class="card__info">
        <h3 class="card__title">Title: {{ sound.oldTitle }}</h3>
        <div class="card__category">Category: {{ sound.oldCategory }}</div>
        <div class="card__description">
          Description: {{ sound.oldDescription }}
        </div>
        <span class="card__by">Tags:
            <span class="colors" v-for="item in sound.oldTags" :key="item.id">
              {{ item }}
            </span>
          </span>
      </div>
    </article>
    <!--
    <div class="container-old">
      <audio :src="sound.soundUrl" controls />
      <div class="field">
        <h2>id</h2>
        {{ sound.id }}
      </div>
    </div>
    -->
    <div class="container-new">
      <h1>Update Sound</h1>
      <form v-on:submit.prevent>
        <input
          type="text"
          class="input-text"
          v-model="title"
          placeholder="title"
        />
        <input
          type="text"
          class="input-text"
          v-model="category"
          placeholder="category"
          disabled
        />
        <textarea
          type="text"
          class="input-text large"
          v-model="description"
          placeholder="description"
        />
        <input
          type="text"
          class="input-text"
          v-model="image"
          placeholder="image url"
        />
        <input
          type="text"
          class="input-text"
          v-model="tags"
          v-on:keyup="updateTag"
          placeholder="tags"
        />
        <div v-if="tags">
          <span class="new-tags" v-for="item in displayTags" :key="item.id">
            {{item.trim()}} 
          </span>
        </div>
        <input
          type="submit"
          class="submit"
          value="Edit"
          v-on:click="updateSound"
        />
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data: function () {
    return {
      sound: {},
      title: "",
      tags: "",
      category: "",
      description: "",
      image: "",
      displayTags: "",
    };
  },
  async mounted() {
    const response = await axios.get(
      `http://localhost:3000/api/v1/sounds/find/${this.$route.params.id}`
    );

    this.sound = response.data.sound;
    this.sound.oldImageUrl = `https://storage.googleapis.com/images-ugc/${this.sound.oldImageUrl}`;
    this.sound.soundUrl = `https://storage.googleapis.com/sounds-ugc/${this.sound.soundUrl}`;
    this.category = this.sound.oldCategory;
  },
  methods: {
    updateTag(){
      this.displayTags = this.trimTags(this.tags).split('-')
    },
    trimTags(tags){
      const splitTags = tags.split(",")
      const trimTags = splitTags.map(el => `${el.trim()}`)
      const cleanTags = trimTags.filter( el => el != "")
      return cleanTags.join("-")
    },
    async updateSound() {
      try {
        await axios.put(
          `http://localhost:3000/api/v1/sounds/${this.sound.id}`,
          {
            title: this.title,
            tags: this.trimTags(this.tags),
            category: this.category,
            description: this.description,
            image: this.image,
          }
        );

        this.$router.back();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Roboto", sans-serif;
  box-sizing: border-box;
}

.large{
   height: 100px;
}
.container {
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: stretch;
  align-items: start;
}

.container-new {
  width: 40%;
}

h2 {
  margin: 0;
}
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
  margin: 10px 5px 10px 0px;
}

.new-tags{
  background-color: #27ae60;
  color: white;
  padding: 5px 6px 5px 6px;
  margin: 10px 10px 10px 0px;
  
}

/* CARD */

.cards {
  width: 100%;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  -webkit-justify-content: center;
  max-width: 820px;
}

.card__img {
  width: 100%;
}

.card__img img {
  width: 100%;
}

.card {
  margin-right: 25px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0, 1);
  background-color: #fff;
  width: 33.3%;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 13px 13px 30px -7px rgba(0, 0, 0, 0.2);
}

.card__info {
  z-index: 2;
  background-color: #fff;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  padding: 16px 24px 24px 24px;
}

.card__category {
  margin-bottom: 12px;
  font-weight: 700;
}

.card__description {
  margin-bottom: 10px;
  font-size: 15px;
  font-weight: 500;
}

.card__title {
  font-size: 22px;
  margin-top: 5px;
  font-weight: 700;
  margin-bottom: 10px;
}

.card__by {
  font-size: 15px;
  font-weight: 500;
}

.colors {
  font-weight: 600;
  text-decoration: none;
  background-color: rgb(59, 59, 59);
  margin-right: 9px;
  color: #f3f3f3;
  padding: 0 3px 0 6px;
}
</style>
