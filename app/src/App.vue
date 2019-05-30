<template>
  <v-app>
    <div class="app-container">
      <navigation :toggle="drawer"/>
      <v-content>
        <router-view/>
      </v-content>
    </div>
  </v-app>
</template>

<script>

export default {
  name: "App",
  components: {
  },
  data() {
    return {
      drawer: true
    };
  }
};
</script>

