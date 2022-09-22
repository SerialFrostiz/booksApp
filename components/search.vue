<template>
  <div>
    <v-container fluid>
      <v-row dense>
        <v-text-field
        label="Votre recherche"
        hint="Mot Clé"
        v-model="subject"
        append-icon="mdi-magnify" class="shrink mx-4">
      </v-text-field>
        <v-btn v-on:click="search()" color="primary" rounded dark>Recherche</v-btn>
        <div>choix : {{ subject }}</div>
      </v-row>
      <v-row dense>
        <v-col v-for="object in searchList" 
        :loading="loading"
        class="my-12"
        max-width="300px"
        >
        <v-card>
          <template slot="progress">
            <v-progress-linear
            color="deep-purple"
            height="10"
            indeterminate
            ></v-progress-linear>
          </template>
          
          <v-img
          height="150"
          :src="`${object.image}`"
          ></v-img>
          <v-card-title><div class="text-xm">{{object.title}}</div></v-card-title>
          
          
        <v-card-actions>
          <v-btn
          color="deep-purple lighten-2"
          text
          @click="redirect(object.preview)"
          >
          Preview
        </v-btn>
        <v-btn
        color="deep-purple lighten-2"
        text
        @click="redirect(object.buy)"
        >
        Achat
      </v-btn>
    </v-card-actions>
  </v-card>
</v-col>
</v-row>
</v-container>



</div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { Book } from "~/interfaces/books.interface";
  import { Search } from "@/interfaces/search.interface"
  import searchCommand from "~/commands/search.command";
  import { AxiosResponse } from "axios";
  
  
  export default defineComponent({
    name: 'Search',
    data(){
      return{
        subject: '' as string,
        searchList: [] as Array<Book> 
        }
      },
      methods: {
        async search() {
          if(this.subject != ""){
            this.searchList = await searchCommand.search(this.subject);
            //console.log(this.searchList)
          }
        },
        redirect(link: string) {
          window.location.href = link
        }
      }
  })
    
</script>