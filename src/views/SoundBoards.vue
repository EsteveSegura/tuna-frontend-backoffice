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
          <th scope="col">Sounds</th>
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
          <td data-label="Due Date">{{ item.count }}</td>
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
      loading: true,
      soundboards: [
        "Anime - Soundboard",
        "Jojo’s Bizarre Adventure - Soundboard",
        "Eren Yeager (Attack On Titan) - Soundboard",
        "Hentai - Soundboard",
        "Uchiha Sasuke - Soundboard",
        "Onii Chan - Soundboard",
        "Goku - Soundboard",
        "One piece - Soundboard",
        "One Punch Man - Soundboard",
        "Pikachu - Soundboard",
        "My Hero Academia - Soundboard",
        "Anime opening songs - Soundboard",
        "Vegeta - Soundboard",
        "Alligator - Soundboard",
        "The Seven Deadly Sins - Soundboard",
        "Meowth - Soundboard",
        "Togepi - Soundboard",
        "Yu-Gi-Oh! - Soundboard",
        "Avatar: the Last Airbender - Soundboard",
        "Ash and Pikachu - Soundboard",
        "Charmeleon - Soundboard",
        "Kill La Kill - Soundboard",
        "Bulbasaur - Soundboard",
        "Gintama - Soundboard",
        "Weepinbell - Soundboard",
        "Hetalia - Soundboard",
        "Poliwhirl - Soundboard",
        "Jynx - Soundboard",
        "Alakazam - Soundboard",
        "Scyther - Soundboard",
        "Meme Sounds - Soundboard",
        "Meme Sounds 2020 - Soundboard",
        "Dank Memes - Soundboard",
        "Dank Memes 2020 - Soundboard",
        "Russian Memes - Soundboard",
        "Earrape Sounds - Soundboard",
        "Patrick - That's a... - Soundboard",
        "Coffin Dance - Soundboard",
        "Thomas Tank Engine - Meme - Soundboard",
        "Eminem memes - Soundboard",
        "Baldi's Basics - Soundboard",
        "Corona Virus - Soundboard",
        "Internetgekkies - Soundboard",
        "OOF - Soundboard",
        "Twitch - Soundboard",
        "Twitch Memes - Soundboard",
        "Epic Fail Sounds - Soundboard",
        "Vine Memes - Soundboard",
        "Karen - Soundboard",
        "Announcements - Soundboard",
        "Grubhub - Soundboard",
        "Coca Cola Meme - Soundboard",
        "Soundboard buttons - Soundboard",
        "Among Us - Soundboard",
        "Minecraft - Soundboard",
        "Fortnite - Soundboard",
        "CSGO - Soundboard",
        "Valorant - Soundboard",
        "Rainbow Six - Soundboard",
        "Roblox - Soundboard",
        "Mario Kart - Soundboard",
        "Luigi - Soundboard",
        "Team Fortress 2 - Soundboard",
        "Duke Nukem 3D - Soundboard",
        "Pacman - Soundboard",
        "Clash of clans - Soundboard",
        "Wii Sports Resorts - Soundboard",
        "Overwatch - Soundboard",
        "Lamar Davis (GTA V) - Soundboard",
        "World of Warcraft - Soundboard",
        "Warhammer 40k: Space Marine - Soundboard",
        "Yoshi - Soundboard",
        "Cyberpunk 2077 - Soundboard",
        "Apex Legends Pathfinder - Soundboard",
        "Jett - Soundboard",
        "Phoenix - Soundboard",
        "StarCraft - Soundboard",
        "Mortal Kombat - Soundboard",
        "Sova - Soundboard",
        "Raze - Soundboard",
        "Omen - Soundboard",
        "GTA 4 - Soundboard",
        "God of War - Soundboard",
        "Sage - Soundboard",
        "Diddy Kong - Soundboard",
        "Rocket League - Soundboard",
        "Brawl Stars - Soundboard",
        "Cypher - Soundboard",
        "Trevor Philips - Soundboard",
        "Viper - Soundboard",
        "League of Legends - Soundboard",
        "Hunt: Showdown - Soundboard",
        "Pokemon Go - Soundboard",
        "Red Dead Redemption - Soundboard",
        "S.T.A.L.K.E.R. Bandits - Soundboard",
        "Warcraft 2 - Soundboard",
        "Tetris - Soundboard",
        "Fallout: New Vegas - Soundboard",
        "Breach - Soundboard",
        "Brimstone - Soundboard",
        "Halo Grunts - Soundboard",
        "Tristana - League of Legends - Soundboard",
        "Villager - Soundboard",
        "Halo Marine - Soundboard",
        "Quake - Soundboard",
        "RollerCoaster Tycoon 2 - Soundboard",
        "Killer Instinct - Soundboard",
        "Wasteland 3 - Soundboard",
        "Spiderman: Marvel vs Capcom - Soundboard",
        "Kenku - Soundboard",
        "Mass effect - Soundboard",
        "Chess - Soundboard",
        "Gears of War 2 - Soundboard",
        "E-girl - Soundboard",
        "Ninja Fortnite - Soundboard",
        "Dr DisRespect - Soundboard",
        "MrBeast - Soundboard",
        "Technoblade - Soundboard",
        "James Charles - Soundboard",
        "PewDiePie - Soundboard",
        "The Angry Grandpa - Soundboard",
        "Yo Mama - Soundboard",
        " xQcOW (Félix Lengyel) - Soundboard",
        "Tourette’s Guy - Soundboard",
        "Aphmau - Soundboard",
        "Gary Vaynerchuk - Soundboard",
        "Angry Francis - Soundboard",
        "Ozzy Man Reviews - Soundboard",
        "Borat - Soundboard",
        "Prank Call Sounds: Dr. Phil - Soundboard",
        "Jack Black - Soundboard",
        "Joe Pesci - Soundboard",
        "Jimmy Carr - Soundboard",
        "Bill Burr - Soundboard",
        "Comedians - Soundboard",
        "Jimmy O Yang - Soundboard",
        "Redd Foxx - Soundboard",
        "David Letterman - Soundboard",
        "Star Wars - Soundboard",
        "Droids (Star Wars) - Soundboard",
        "Arnold Schwarzenegger - Soundboard",
        "Marvel - Soundboard",
        "Morgan Freeman - Soundboard",
        "Pennywise IT - Soundboard",
        "Iron man - Soundboard",
        "Thanos (Marvel) - Soundboard",
        "Yoda - Soundboard",
        "The Rock - Soundboard",
        "Stormtrooper - Soundboard",
        "Michael Scott - Soundboard",
        "Toy Story - Soundboard",
        "Samuel L. Jackson - Soundboard",
        "Minions - Soundboard",
        "Darth Vader - Soundboard",
        "Thor: Ragnarok - Soundboard",
        "R2D2 - Soundboard",
        "Lord of the Rings - Soundboard",
        "Der Untergang (Downfall) - Soundboard",
        "Deadpool - Soundboard",
        "Mr. T - Soundboard",
        "Transformers - Soundboard",
        "Scarface - Soundboard",
        "Jabba The Hutt - Soundboard",
        "Full Metal Jacket - Soundboard",
        "Frozen - Soundboard",
        "Bane - Soundboard",
        "Horror - Soundboard",
        "Walt Disney - Soundboard",
        "Captain America: The Winter Soldier - Soundboard",
        "Han Solo - Soundboard",
        "Jack Sparrow - Soundboard",
        "Watto - Soundboard",
        "Dr Evil - Soundboard",
        "Ben Kenobi - Soundboard",
        "Ted - Soundboard",
        "Madagascar - Soundboard",
        "Chucky - Soundboard",
        "Harry Potter 1 - Soundboard",
        "Anakin Skywalker - Soundboard",
        "Gandalf - Soundboard",
        "Olaf Frozen - Soundboard",
        "Leonardo DiCaprio - Soundboard",
        "Captain America - Soundboard",
        "Ice age - Soundboard",
        "Finding Nemo - Soundboard",
        "Adam Sandler - Soundboard",
        "Jack Nicholson - Soundboard",
        "James Bond - Soundboard",
        "Harry Potter 5 - Soundboard",
        "Davy Jones - Soundboard",
        "Christian Bale - Soundboard",
        "Snatch - Soundboard",
        "Batman (1966) - Soundboard",
        "Samuel L Jackson - Soundboard",
        "Harley Quinn - Soundboard",
        "Marilyn Monroe - Soundboard",
        "Will Ferrell - Soundboard",
        "Keanu Reeves - Soundboard",
        "Shia LaBeouf - Soundboard",
        "Denzel Washington - Soundboard",
        "Anton Chigurh - Soundboard",
        "Mulan - Soundboard",
        "Oscars 2020 - Soundboard",
        "TikTok Music 2020 - Soundboard",
        "Travis Scott - Soundboard",
        "Michael Jackson - Soundboard",
        "6IX9INE - Soundboard",
        "Nicki Minaj - Soundboard",
        "Kanye West - Soundboard",
        "Rick Astley - Soundboard",
        "Eminem - Soundboard",
        "Lil Nas - Soundboard",
        "Lil Wayne - Soundboard",
        "Thanos beatbox - Soundboard",
        "Post Malone - Soundboard",
        "Lil Jon - Soundboard",
        "DJ Khaled - Soundboard",
        "Justin Bieber - Soundboard",
        "Taylor Swift - Soundboard",
        "Britney Spears - Soundboard",
        "Dua Lipa - Soundboard",
        "Lil Xan - Soundboard",
        "Mac Miller - Soundboard",
        "Bruno Mars - Soundboard",
        "Japanese Ringtones - Soundboard",
        "Azealia Banks - Soundboard",
        "PSY - Soundboard",
        "David Lee Roth - Soundboard",
        "Paris Hilton - Soundboard",
        "Lady Gaga - Soundboard",
        "Arctic Monkeys - Soundboard",
        "Halloween songs - Soundboard",
        "Donald Trump - Soundboard",
        "Joe Biden - Soundboard",
        "Obama - Soundboard",
        "Barack Obama - Soundboard",
        "Bernie Sanders - Soundboard",
        "Ted Cruz - Soundboard",
        "First Presidential Debate 2020 - Soundboard",
        "Joe Biden 2 - Soundboard",
        "Melania Trump - Soundboard",
        "George W. Bush - Soundboard",
        "Dr. Fauci - Soundboard",
        "Mitt Romney - Soundboard",
        "Thierry Baudet - Soundboard",
        "Al Gore - Soundboard",
        "John Lewis - Soundboard",
        "Dick Cheney - Soundboard",
        "Michael Bloomberg - Soundboard",
        "Elizabeth Warren - Soundboard",
        "Jeb Bush - Soundboard",
        "Ruth Bader Ginsburg - Soundboard",
        "Andrew Gillum - Soundboard",
        "Gordon Ramsay - Soundboard",
        "Martien Meiland - Soundboard",
        "Gachi - Soundboard",
        "Judge Judy - Soundboard",
        "Dr. Phil - Soundboard",
        "Lenny Telemarketing Troll - Soundboard",
        "Nederlandse memes - Soundboard",
        "Pick up lines - Soundboard",
        "Quick responses - Soundboard",
        "Santa Claus - Soundboard",
        "Freddy Krueger - Soundboard",
        "Comeback King Disses - Soundboard",
        "Scary - Soundboard",
        "Kabouter Wesley - Soundboard",
        "Larry King - Soundboard",
        "Sorry and apology - Soundboard",
        "Thanksgiving - Soundboard",
        "Christmas classics - Soundboard",
        "Hanukkah - Soundboard",
        "SpongeBob - Soundboard",
        "South Park - Soundboard",
        "Peaky Blinders - Soundboard",
        "The Simpsons - Soundboard",
        "Game of Thrones - Soundboard",
        "Tiger King (Joe Exotic) - Soundboard",
        "Peter Griffin - Soundboard",
        "Mean Girls - Soundboard",
        "Spongebob - Soundboard",
        "Eric Cartman - Soundboard",
        "Family guy - Soundboard",
        "The Mandalorian - Soundboard",
        "Boondocks - Soundboard",
        "Mickey Mouse South Park - Soundboard",
        "Bitch - Jesse Pinkman - Soundboard",
        "Jeremy Clarkson - Soundboard",
        "Homer - Soundboard",
        "Butters Stotch, South Park - Soundboard",
        "Plankton - Soundboard",
        "Squidward - Soundboard",
        "Towelie, South Park - Soundboard",
        "Elmo - Soundboard",
        "Rick Sanchez - Soundboard",
        "Bender - Soundboard",
        "Walter White - Soundboard",
        "Scooby Doo - Soundboard",
        "PC Principal, South Park - Soundboard",
        "Dr. Zoidberg - Soundboard",
        "Stranger Things - Soundboard",
        "Cleveland Brown - Soundboard",
        "Nickelodeon - Soundboard",
        "Kenny, South Park - Soundboard",
        "Stan Marsh, South Park - Soundboard",
        "Boba Fett - Soundboard",
        "Satan, South Park - Soundboard",
        "Philip J. Fry - Soundboard",
        "Mr Meeseeks - Soundboard",
        "Morty Smith - Soundboard",
        "Geralt of Rivia - Soundboard",
        "Star Trek - Soundboard",
        "Tom Cruise, South Park - Soundboard",
        "Too Hot To Handle - Soundboard",
        "Tiger Woods, South Park - Soundboard",
        "Quagmire - Soundboard",
        "Francine Smith - Soundboard",
        "Barney Stinson - Soundboard",
        "Harrison, South Park - Soundboard",
        "Professor Farnsworth - Soundboard",
        "Summer Smith - Soundboard",
        "Hayley Smith - Soundboard",
        "Jerry Smith - Soundboard",
        "Stan Smith - Soundboard",
        "Little Britain - Soundboard",
        "Roger Smith - Soundboard",
        "Klaus - Soundboard",
        "Leela - Soundboard",
        "Amy Wong - Soundboard",
        "Beth Smith - Soundboard",
        "Rallo Tubbs - Soundboard",
        "Epic Trolling - Soundboard",
        "Sound Effects - Soundboard",
        "Discord - Soundboard",
        "Orgasm sounds - Soundboard",
        "Dolphin - Soundboard",
        "Best Fart Sounds - Soundboard",
        "Reactions - Soundboard",
        "Epic Farts - Soundboard",
        "Cat Sounds - Soundboard",
        "Gun Sounds - Soundboard",
        "Screaming - Soundboard",
        "Spotify - Soundboard",
        "Animal Sound Effects - Soundboard",
        "Cursing - Soundboard",
        "Amazon Alexa Device - Soundboard",
        "Explosion - Soundboard",
        "Windows - Soundboard",
        "Dogs Barking - Soundboard",
        "Ringtones - Soundboard",
        "Bitch - Soundboard",
        "Hello - Soundboard",
        "Leopard - Soundboard",
        "Owl - Soundboard",
        "Spooky Halloween - Soundboard",
        "Lightsaber sounds - Soundboard",
        "Angry cat - Soundboard",
        "Skype Sound Effects - Soundboard",
        "Walrus - Soundboard",
        "DJ scratch sounds - Soundboard",
        "Dilophosaurus - Soundboard",
        "Top 10 ringtones - Soundboard",
        "Vehicles and Aircraft SFX - Soundboard",
        "Cash register - Soundboard",
        "Slack - Soundboard",
        "Cheering and applause - Soundboard",
        "Fireworks - Soundboard",
        "Audience reactions - Soundboard",
        "Laugh tracks - Soundboard",
        "Sirens and alarms - Soundboard",
        "Cricket sounds - Soundboard",
        "Car horn sounds - Soundboard",
        "Email notifications - Soundboard",
        "Deer sounds - Soundboard",
        "Formula 1 - Soundboard",
        "Conor Mcgregor - Soundboard",
        "Randy Savage - Soundboard",
        "Football - Soundboard",
        "Hulk Hogan - Soundboard",
        "Stephen Curry - Soundboard",
        "Kimi Raikkonen - Soundboard",
        "Manchester United - Soundboard",
        "Daniel Ricciardo - Soundboard",
        "Valtteri Bottas - Soundboard",
        "Nadal - Soundboard",
        "Zlatan - Soundboard",
        "Mourinho - Soundboard",
        "Chelsea - Soundboard",
        "Tennis - Soundboard",
        "Floyd Mayweather - Soundboard",
        "Beugelsdijk - Soundboard",
        "Joe Frazier - Soundboard",
        "Usain Bolt - Soundboard",
        "Philip Rivers - Soundboard",
      ],
      soundboardsWithCounter: [],
    };
  },
  async mounted() {
    let counterPromises = [];

    for (let sb of this.soundboards) {
      counterPromises.push(
        axios.get(
          `http://localhost:3000/api/v1/sounds/soundboard/count?soundBoard=${sb}`
        )
      );
    }

    Promise.all(counterPromises).then((values) => {
      let data = values.map((el) => {
        return {
          soundBoard: el.config.url.split("=")[1],
          count: el.data.count,
        };
      });

      this.loading = false
      this.soundboardsWithCounter = data;
    });
  },
};
</script>

<style scoped>
.home{
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
