<template>
  <div>
    <input v-model="search">
    <div>choix : {{ search }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Search } from "@/interfaces/search.interface"


    export default defineComponent({
        name: 'Search',
        data(){
            return{
                searchQuery: {} as Search
            }
        }
    })

</script>