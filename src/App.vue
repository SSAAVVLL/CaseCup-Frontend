<template>
  <v-app class="cyan darken-3" id="inspire">
    <!--<v-navigation-drawer-->
      <!--v-model="drawer"-->
      <!--fixed-->
      <!--app-->
    <!--&gt;-->
      <!--<v-list dense>-->
        <!--<v-list-tile >-->
          <!--<v-list-tile-action>-->
            <!--<v-icon>home</v-icon>-->
          <!--</v-list-tile-action>-->
          <!--<v-list-tile-content>-->
            <!--<v-list-tile-title>Home</v-list-tile-title>-->
          <!--</v-list-tile-content>-->
        <!--</v-list-tile>-->
        <!--<v-list-tile>-->
          <!--<v-list-tile-action>-->
            <!--<v-icon>contact_mail</v-icon>-->
          <!--</v-list-tile-action>-->
          <!--<v-list-tile-content>-->
            <!--<v-list-tile-title>Contact</v-list-tile-title>-->
          <!--</v-list-tile-content>-->
        <!--</v-list-tile>-->
      <!--</v-list>-->
    <!--</v-navigation-drawer>-->
    <!--<v-toolbar color="blue" dark fixed app>-->
      <!--<v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>-->
      <!--<v-toolbar-title>SaleHero</v-toolbar-title>-->
      <!--<v-spacer></v-spacer>-->
      <!--<v-toolbar-items>-->
        <!--<v-btn v-if="jwtObject" flat>Игрок {{jwtObject.user}} | Очки {{jwtObject.score}} | День {{jwtObject.day}}, Час {{jwtObject.step}}</v-btn>-->
      <!--</v-toolbar-items>-->
      <!--<v-toolbar-items>-->
        <!--<v-btn color="blue" @click="opedScoreBoard()">Открыть таблицу достижений</v-btn>-->
      <!--</v-toolbar-items>-->
    <!--</v-toolbar>-->
    <v-content class="fill-height">
      <GameLayout @updated-jwt="updateToken($event)" ref="game"/>
    </v-content>
    <!-- <v-footer color="indigo" app>
      <span class="white--text">&copy; 2017</span>
    </v-footer> -->
  </v-app>
</template>

<script>
  import GameLayout from './layouts/GameLayout'
  export default {
    name: 'App',
    data: () => ({
      drawer: false,
      jwtObject: null,
    }),
    components: {
      GameLayout
    },
    methods: {
        opedScoreBoard() {
            this.$refs.game.openScoreBoard()
        },
        updateToken(token) {
            this.jwtObject = token
        }
    }
  }
</script>

<style>
  .circle {
      border-radius: 100%; 
  }
  .h-50 {
    height: calc(50% - 40px);
  }
  html, body, #inspire, .h-100 {
      height:100%;
  }
  .flex-grow-0 {
    flex-grow: 0 !important;
  }
  .flex-grow-1 {
    flex-grow: 1 !important;
  }
  .flex-shrink-0 {
    flex-shrink: 0 !important;
  }
  .flex-column {
    flex-direction: column !important;
  }
  .mh-0 {
    min-height: 0 !important;
  }
  .align-items-center {
    align-items: center !important;
  }
  .text-center {
    text-align:center;
  }
  .justify-flex-end {
    justify-content: flex-end !important;
  }
  .justify-center {
    justify-content: center !important;
  }
</style>