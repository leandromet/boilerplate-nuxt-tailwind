<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import axios from "axios";

const list = ref([]);  // API data
const map1 = ref(null);
const map2 = ref(null);

// Layer information (overlays for map2)
const layerInfo = {       
  'umaterra:br_uf': 'Layer 3',
  'umaterra:lml_municipio_a': 'Layer 2',
  'umaterra:rod_trecho_rodoviario_l': 'Layer 5',
  'umaterra:hid_terreno_sujeito_inundacao_a': 'Layer 6',
  'umaterra:lml_capital_p': 'Layer 4',
};

// Load posts from the API
function loadPosts() {
  axios.get("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
      list.value = response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

// Function to initialize the maps with layer controls
async function initMaps() {
  if (process.client) {
    const L = await import("leaflet");
    await import("leaflet/dist/leaflet.css");

    // Initialize the first map (map1) with base layers
    map1.value = L.map('map1').setView([-8.5535477, -50.2186155], 8);
    
    // Base layers for map1
    const baseMapsMap1 = {
      "OpenStreetMap": L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 }),
      "Esri Satellite": L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", { maxZoom: 19 }),
      "Google Satellite": L.tileLayer("http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
        maxZoom: 19,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
      }),
      "Google Streets": L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
        maxZoom: 19,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
      }),
    };

    // Add default base layer to map1
    baseMapsMap1["Esri Satellite"].addTo(map1.value);
    

    // Add layers control for map1
    L.control.layers(baseMapsMap1).addTo(map1.value);

    // Initialize the second map (map2) with overlay layers
    map2.value = L.map('map2').setView([-8.5535477, -50.2186155], 8);
    
    // Base layer for map2 (e.g., OpenStreetMap)
    const baseMapMap2 = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 });
    baseMapMap2.addTo(map2.value);

    // Overlay layers for map2
    const overlayLayersMap2 = {};
    for (const layerName in layerInfo) {
      const wmsLayer = L.tileLayer.wms("https://geoserver.umaterra.com.br/geoserver/wms", {
        layers: layerName,
        format: "image/png",
        transparent: true,
      });
      overlayLayersMap2[layerInfo[layerName]] = wmsLayer;  // Add the layer to the control using its title
    }

    // Add layers control to map2 for toggling overlay layers
    baseMapMap2["OpenStreetMap"].addTo(map2.value);
    L.control.layers(baseMapsMap1, overlayLayersMap2).addTo(map2.value);  //  base layers, only overlay layers are added to this control
  }
}

// Load posts and initialize maps when the component is mounted
onMounted(() => {
  //loadPosts();
  initMaps();
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

    <!-- Map containers for map1 and map2 -->
    <div class="map-container" id="map1"></div>
    <div class="map-container" id="map2"></div>
  </div>
</template>

<style scoped>
/* Styling for the map containers */
.map-container {
  width: 90%;
  height: 50vh;
  margin: 10px 0;
}
</style>
