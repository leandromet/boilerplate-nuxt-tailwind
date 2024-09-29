<script lang="ts" setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const list = ref([]);

// Load posts from API
function loadPosts() {
  axios.get("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
      list.value = response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

// Initialize the maps


// Load posts  the component is mounted
onMounted(() => {
  loadPosts();
});
</script>
<template>
  <div>
    <!-- Button to load posts -->
    <button @click="loadPosts">Atualizar</button>

    <!-- Display loaded posts -->
    <div v-for="post in list" :key="post.id">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>

  </div>
</template>