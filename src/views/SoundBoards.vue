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
        <b>SoundBoards</b>
      </caption>
      <thead>
        <tr>
          <th scope="col">Soundboard Name</th>
          <th scope="col">Refined Sounds</th>
          <th scope="col">Not Refined Sounds</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in soundboardsWithCounter" :key="item.soundBoard">
          <td data-label="Account">
            <router-link
              :to="{
                path: 'soundboard',
                query: { soundboard: item.soundBoard },
              }"
            >
              <b>{{ item.soundBoard }}</b>
            </router-link>
          </td>
          <td data-label="Due Date">{{ item.refinedCount }}</td>
          <td data-label="Due Date">{{ item.notRefinedCount }}</td>
        </tr>
      </tbody>
    </table>
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
      soundboards: [
        "Meme Sounds - Soundboard",
        "Soundboard buttons - Soundboard",
        "E-girl - Soundboard",
        "OOF - Soundboard",
        "Among Us - Soundboard",
        "Goku - Soundboard",
        "Epic Trolling - Soundboard",
        "South Park - Soundboard",
        "Anime - Soundboard",
        "Donald Trump - Soundboard",
        "Cursing - Soundboard",
        "Dank Memes - Soundboard",
        "Sound Effects - Soundboard",
        "Gordon Ramsay - Soundboard",
        "Game of Thrones - Soundboard",
        "Shia LaBeouf - Soundboard",
        "Scary - Soundboard",
        "Arnold Schwarzenegger - Soundboard",
        "SpongeBob - Soundboard",
        "DJ Khaled - Soundboard",
        "Mean Girls - Soundboard",
        "Barney Stinson - Soundboard",
        "Star Wars - Soundboard",
        "Marvel - Soundboard",
        "Ninja Fortnite - Soundboard",
        "Eminem memes - Soundboard",
        "Russian Memes - Soundboard",
        "Zlatan - Soundboard",
        "Hentai - Soundboard",
        "Earrape Sounds - Soundboard",
        "Tiger King (Joe Exotic) - Soundboard",
        "Fortnite - Soundboard",
        "Walt Disney - Soundboard",
        "Orgasm sounds - Soundboard",
        "Dank Memes 2020 - Soundboard",
        "Discord - Soundboard",
        "Corona Virus - Soundboard",
        "Joe Biden - Soundboard",
        "Valorant - Soundboard",
        "Reactions - Soundboard",
        "Minecraft - Soundboard",
        "Jojo’s Bizarre Adventure - Soundboard",
        "Meme Sounds 2020 - Soundboard",
        "Boondocks - Soundboard",
        "Mac Miller - Soundboard",
        "Onii Chan - Soundboard",
        "Travis Scott - Soundboard",
        "Vine Memes - Soundboard",
        "Jett - Soundboard",
        "Grubhub - Soundboard",
        "Roblox - Soundboard",
        "Coffin Dance - Soundboard",
        "Eren Yeager (Attack On Titan) - Soundboard",
        "Patrick - That's a... - Soundboard",
        "MrBeast - Soundboard",
        "James Charles - Soundboard",
        "One piece - Soundboard",
        "Uchiha Sasuke - Soundboard",
        "Rick Astley - Soundboard",
        "Twitch Memes - Soundboard",
        "Pikachu - Soundboard",
        "Spooky Halloween - Soundboard",
        "Mario Kart - Soundboard",
        "Windows - Soundboard",
        "Droids (Star Wars) - Soundboard",
        "Jack Sparrow - Soundboard",
        "Eminem - Soundboard",
        "TikTok Music 2020 - Soundboard",
        "Toy Story - Soundboard",
        "Technoblade - Soundboard",
        "Hello - Soundboard",
        "Horror - Soundboard",
        "CSGO - Soundboard",
        "Thomas Tank Engine - Meme - Soundboard",
        "Conor Mcgregor - Soundboard",
        "Cypher - Soundboard",
        "Football - Soundboard",
        "Rainbow Six - Soundboard",
        "Frozen - Soundboard",
        "Christmas classics - Soundboard",
        "Screaming - Soundboard",
        "Dr DisRespect - Soundboard",
        "Phoenix - Soundboard",
        "Ringtones - Soundboard",
        "Clash of clans - Soundboard",
        " xQcOW (Félix Lengyel) - Soundboard",
        "Martien Meiland - Soundboard",
        "Omen - Soundboard",
        "Tetris - Soundboard",
        "Peaky Blinders - Soundboard",
        "My Hero Academia - Soundboard",
        "Anime opening songs - Soundboard",
        "Best Fart Sounds - Soundboard",
        "Lightsaber sounds - Soundboard",
        "Sova - Soundboard",
        "Lamar Davis (GTA V) - Soundboard",
        "One Punch Man - Soundboard",
        "6IX9INE - Soundboard",
        "League of Legends - Soundboard",
        "Lil Nas - Soundboard",
        "Joe Pesci - Soundboard",
        "Baldi's Basics - Soundboard",
        "Stormtrooper - Soundboard",
        "Thanos (Marvel) - Soundboard",
        "Aphmau - Soundboard",
        "Pennywise IT - Soundboard",
        "Dolphin - Soundboard",
        "Yoshi - Soundboard",
        "Coca Cola Meme - Soundboard",
        "Kanye West - Soundboard",
        "Gun Sounds - Soundboard",
        "Vegeta - Soundboard",
        "Scyther - Soundboard",
        "Deadpool - Soundboard",
        "Bitch - Jesse Pinkman - Soundboard",
        "Epic Fail Sounds - Soundboard",
        "Ben Kenobi - Soundboard",
        "Raze - Soundboard",
        "Epic Farts - Soundboard",
        "Spongebob - Soundboard",
        "Twitch - Soundboard",
        "Wii Sports Resorts - Soundboard",
        "Sage - Soundboard",
        "Samuel L. Jackson - Soundboard",
        "Luigi - Soundboard",
        "Halloween songs - Soundboard",
        "Hayley Smith - Soundboard",
        "Spotify - Soundboard",
        "Karen - Soundboard",
        "Explosion - Soundboard",
        "Paris Hilton - Soundboard",
        "Top 10 ringtones - Soundboard",
        "Larry King - Soundboard",
        "The Mandalorian - Soundboard",
        "Team Fortress 2 - Soundboard",
        "The Seven Deadly Sins - Soundboard",
        "Darth Vader - Soundboard",
        "Pokemon Go - Soundboard",
        "Oscars 2020 - Soundboard",
        "Family guy - Soundboard",
        "Azealia Banks - Soundboard",
        "First Presidential Debate 2020 - Soundboard",
        "Warhammer 40k: Space Marine - Soundboard",
        "Duke Nukem 3D - Soundboard",
        "Viper - Soundboard",
        "God of War - Soundboard",
        "Der Untergang (Downfall) - Soundboard",
        "Comeback King Disses - Soundboard",
        "Quick responses - Soundboard",
        "Rocket League - Soundboard",
        "Homer - Soundboard",
        "The Simpsons - Soundboard",
        "Han Solo - Soundboard",
        "Internetgekkies - Soundboard",
        "Morgan Freeman - Soundboard",
        "Randy Savage - Soundboard",
        "Nederlandse memes - Soundboard",
        "Iron man - Soundboard",
        "Formula 1 - Soundboard",
        "Keanu Reeves - Soundboard",
        "Audience reactions - Soundboard",
        "Slack - Soundboard",
        "Post Malone - Soundboard",
        "Pick up lines - Soundboard",
        "Fallout: New Vegas - Soundboard",
        "Michael Jackson - Soundboard",
        "Denzel Washington - Soundboard",
        "R2D2 - Soundboard",
        "Japanese Ringtones - Soundboard",
        "Jeremy Clarkson - Soundboard",
        "Gachi - Soundboard",
        "Vehicles and Aircraft SFX - Soundboard",
        "Taylor Swift - Soundboard",
        "Peter Griffin - Soundboard",
        "The Rock - Soundboard",
        "Rick Sanchez - Soundboard",
        "Gary Vaynerchuk - Soundboard",
        "Quagmire - Soundboard",
        "Dogs Barking - Soundboard",
        "Pacman - Soundboard",
        "Lord of the Rings - Soundboard",
        "Cash register - Soundboard",
        "Obama - Soundboard",
        "Owl - Soundboard",
        "Lenny Telemarketing Troll - Soundboard",
        "Nicki Minaj - Soundboard",
        "Ash and Pikachu - Soundboard",
        "Hunt: Showdown - Soundboard",
        "Meowth - Soundboard",
        "Amazon Alexa Device - Soundboard",
        "Ted - Soundboard",
        "Apex Legends Pathfinder - Soundboard",
        "Thanos beatbox - Soundboard",
        "Bulbasaur - Soundboard",
        "Cyberpunk 2077 - Soundboard",
        "Dr. Fauci - Soundboard",
        "DJ scratch sounds - Soundboard",
        "Breach - Soundboard",
        "Madagascar - Soundboard",
        "Jabba The Hutt - Soundboard",
        "Mickey Mouse South Park - Soundboard",
        "Minions - Soundboard",
        "Squidward - Soundboard",
        "Borat - Soundboard",
        "Charmeleon - Soundboard",
        "Dua Lipa - Soundboard",
        "The Angry Grandpa - Soundboard",
        "Comedians - Soundboard",
        "Brawl Stars - Soundboard",
        "Eric Cartman - Soundboard",
        "Alligator - Soundboard",
        "Leopard - Soundboard",
        "Justin Bieber - Soundboard",
        "Togepi - Soundboard",
        "Overwatch - Soundboard",
        "Trevor Philips - Soundboard",
        "PewDiePie - Soundboard",
        "Skype Sound Effects - Soundboard",
        "Dr. Phil - Soundboard",
        "Valtteri Bottas - Soundboard",
        "Yo Mama - Soundboard",
        "Cat Sounds - Soundboard",
        "Too Hot To Handle - Soundboard",
        "Towelie, South Park - Soundboard",
        "Michael Scott - Soundboard",
        "World of Warcraft - Soundboard",
        "Jimmy Carr - Soundboard",
        "Gears of War 2 - Soundboard",
        "Yu-Gi-Oh! - Soundboard",
        "Lil Wayne - Soundboard",
        "Mr. T - Soundboard",
        "Barack Obama - Soundboard",
        "Nickelodeon - Soundboard",
        "Thor: Ragnarok - Soundboard",
        "Bitch - Soundboard",
        "Freddy Krueger - Soundboard",
        "Anakin Skywalker - Soundboard",
        "Melania Trump - Soundboard",
        "Joe Biden 2 - Soundboard",
        "Email notifications - Soundboard",
        "Dilophosaurus - Soundboard",
        "Mortal Kombat - Soundboard",
        "Stranger Things - Soundboard",
        "Scarface - Soundboard",
        "Laugh tracks - Soundboard",
        "Bane - Soundboard",
        "Harry Potter 1 - Soundboard",
        "Red Dead Redemption - Soundboard",
        "Bender - Soundboard",
        "Ozzy Man Reviews - Soundboard",
        "Tourette’s Guy - Soundboard",
        "Brimstone - Soundboard",
        "Santa Claus - Soundboard",
        "Chucky - Soundboard",
        "Kill La Kill - Soundboard",
        "Lil Jon - Soundboard",
        "PSY - Soundboard",
        "Stephen Curry - Soundboard",
        "Daniel Ricciardo - Soundboard",
        "Cheering and applause - Soundboard",
        "Announcements - Soundboard",
        "Bill Burr - Soundboard",
        "Walter White - Soundboard",
        "Finding Nemo - Soundboard",
        "Plankton - Soundboard",
        "John Lewis - Soundboard",
        "Mass effect - Soundboard",
        "Weepinbell - Soundboard",
        "Quake - Soundboard",
        "GTA 4 - Soundboard",
        "Yoda - Soundboard",
        "Kimi Raikkonen - Soundboard",
        "Watto - Soundboard",
        "Butters Stotch, South Park - Soundboard",
        "Poliwhirl - Soundboard",
        "Lady Gaga - Soundboard",
        "Bernie Sanders - Soundboard",
        "Stan Marsh, South Park - Soundboard",
        "Hulk Hogan - Soundboard",
        "Ice age - Soundboard",
        "Dr Evil - Soundboard",
        "Angry cat - Soundboard",
        "Leonardo DiCaprio - Soundboard",
        "Prank Call Sounds: Dr. Phil - Soundboard",
        "Villager - Soundboard",
        "Avatar: the Last Airbender - Soundboard",
        "Captain America: The Winter Soldier - Soundboard",
        "Boba Fett - Soundboard",
        "Fireworks - Soundboard",
        "Scooby Doo - Soundboard",
        "Judge Judy - Soundboard",
        "Animal Sound Effects - Soundboard",
        "Car horn sounds - Soundboard",
        "Transformers - Soundboard",
        "Beugelsdijk - Soundboard",
        "StarCraft - Soundboard",
        "Britney Spears - Soundboard",
        "Lil Xan - Soundboard",
        "Sirens and alarms - Soundboard",
        "Davy Jones - Soundboard",
        "Andrew Gillum - Soundboard",
        "Captain America - Soundboard",
        "Klaus - Soundboard",
        "Halo Grunts - Soundboard",
        "Snatch - Soundboard",
        "Bruno Mars - Soundboard",
        "Diddy Kong - Soundboard",
        "Hanukkah - Soundboard",
        "Full Metal Jacket - Soundboard",
        "Jack Black - Soundboard",
        "Stan Smith - Soundboard",
        "Morty Smith - Soundboard",
        "Warcraft 2 - Soundboard",
        "Angry Francis - Soundboard",
        "George W. Bush - Soundboard",
        "Cricket sounds - Soundboard",
        "Wasteland 3 - Soundboard",
        "Kabouter Wesley - Soundboard",
        "Halo Marine - Soundboard",
        "Tiger Woods, South Park - Soundboard",
        "Harry Potter 5 - Soundboard",
        "Geralt of Rivia - Soundboard",
        "Roger Smith - Soundboard",
        "Elizabeth Warren - Soundboard",
        "Philip Rivers - Soundboard",
        "Harley Quinn - Soundboard",
        "Jeb Bush - Soundboard",
        "Philip J. Fry - Soundboard",
        "Will Ferrell - Soundboard",
        "Adam Sandler - Soundboard",
        "Killer Instinct - Soundboard",
        "Rallo Tubbs - Soundboard",
        "Samuel L Jackson - Soundboard",
        "Spiderman: Marvel vs Capcom - Soundboard",
        "Gandalf - Soundboard",
        "Hetalia - Soundboard",
        "Christian Bale - Soundboard",
        "Alakazam - Soundboard",
        "Marilyn Monroe - Soundboard",
        "RollerCoaster Tycoon 2 - Soundboard",
        "James Bond - Soundboard",
        "PC Principal, South Park - Soundboard",
        "Ruth Bader Ginsburg - Soundboard",
        "Tennis - Soundboard",
        "Kenny, South Park - Soundboard",
        "Kenku - Soundboard",
        "Leela - Soundboard",
        "Sorry and apology - Soundboard",
        "Satan, South Park - Soundboard",
        "Dr. Zoidberg - Soundboard",
        "Elmo - Soundboard",
        "Mr Meeseeks - Soundboard",
        "Star Trek - Soundboard",
        "Mourinho - Soundboard",
        "Floyd Mayweather - Soundboard",
        "Francine Smith - Soundboard",
        "Jack Nicholson - Soundboard",
        "Summer Smith - Soundboard",
        "Jynx - Soundboard",
        "Little Britain - Soundboard",
        "Amy Wong - Soundboard",
        "Gintama - Soundboard",
        "Thanksgiving - Soundboard",
        "Cleveland Brown - Soundboard",
        "Arctic Monkeys - Soundboard",
        "Manchester United - Soundboard",
        "Chess - Soundboard",
        "Anton Chigurh - Soundboard",
        "Jimmy O Yang - Soundboard",
        "Usain Bolt - Soundboard",
        "Walrus - Soundboard",
        "Olaf Frozen - Soundboard",
        "Ted Cruz - Soundboard",
        "Deer sounds - Soundboard",
        "Harrison, South Park - Soundboard",
        "David Lee Roth - Soundboard",
        "Batman (1966) - Soundboard",
        "Al Gore - Soundboard",
        "Jerry Smith - Soundboard",
        "Mitt Romney - Soundboard",
        "Mulan - Soundboard",
        "Chelsea - Soundboard",
        "Professor Farnsworth - Soundboard",
        "Tristana - League of Legends - Soundboard",
        "Joe Frazier - Soundboard",
        "Dick Cheney - Soundboard",
        "Nadal - Soundboard",
        "Tom Cruise, South Park - Soundboard",
        "S.T.A.L.K.E.R. Bandits - Soundboard",
        "Michael Bloomberg - Soundboard",
        "David Letterman - Soundboard",
        "Beth Smith - Soundboard",
        "Thierry Baudet - Soundboard",
        "Redd Foxx - Soundboard",
      ],
      soundboardsSplited: _.chunk(this.soundboards, 10),
      soundboardsWithCounter: [],
    };
  },
  methods: {
    async load(val) {
      for (let [i, chunks] of this.soundboardsSplited.entries()) {
        console.log(i, val);
        if (i == val) {
          for (let sb of chunks) {
            const response = await axios.get(
              `${process.env.VUE_APP_BASE_URL}/sounds/soundboard/count?soundBoard=${sb}`
            );

            console.log(this.soundboardsWithCounter);
            this.soundboardsWithCounter.push({
              soundBoard: response.config.url.split("=")[1],
              refinedCount: response.data.refinedCount,
              notRefinedCount: response.data.notRefinedCount,
            });
          }
        }
      }
    },
  },
  async mounted() {
    this.soundboardsSplited = _.chunk(this.soundboards, 20);

    
    await this.load(0);
    setTimeout(async() => {
      for(let i = 1 ; i < this.soundboardsSplited.length; i++){
        await this.load(i);
      }
    },5000)

    this.loading = false;
  },
};
</script>

<style scoped>
.home {
  padding: 0 5%;
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
