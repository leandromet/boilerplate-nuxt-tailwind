<script lang="ts" setup>
import axios from "axios";
const list = ref([]);

onMounted(() => {
  loadPosts();
});

function loadPosts() {
  axios.get("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
      list.value = response.data;
    });
    .catch((error) => {
      console.error(error);
    });
}
</script>

<template>
  <div>
    <button @click="loadPosts">Atualizar</button>
    <div v-for="post in list" :key="post.id">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>

<style lang="css"></style>
