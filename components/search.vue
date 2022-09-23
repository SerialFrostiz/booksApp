<template>
  <v-app>
    <v-container fluid>
      <v-row dense>
        <v-text-field
        label="Votre recherche"
        hint="Mot Clé"
        v-model="subject"
        append-icon="mdi-magnify" class="shrink mx-4">
      </v-text-field>
      <v-btn v-on:click="search(filter)" color="primary" rounded dark>Recherche</v-btn>
      <v-radio-group v-model="filter" row>
        <v-radio
        v-for="n in 4"
        :key="n"
        :label="`${filtersList[n-1]}`"
        :value="n"
        ></v-radio>
      </v-radio-group>
      <v-menu
      top
      >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
        >
        Categories
      </v-btn>
    </template>
    
    <v-list>
      <v-list-item
      v-for="item in categoriesList"
      >
      <v-list-item-title v-on:click="searchCategory(item)">{{ item }}</v-list-item-title>
    </v-list-item>
  </v-list>
</v-menu>
</v-row>
<v-row dense>
  <div v-for="object in searchList"
  class="ma-1 pa-0"
  style="width:200px"
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
    <v-card-text><div style="font-size:15px;color:black">{{object.title}}</div></v-card-text>
    
    
    <v-card-actions>
        <v-row fluid>
          <v-col class="pa-0 pl-3 text-center">
        <v-btn
        color="deep-purple lighten-2"
        text
        @click="redirect(object.preview)"
        class="pa-1"
        >
        Preview
      </v-btn>
    </v-col>
    <v-col class="pa-0 pr-3 text-center">
      <v-btn
      color="deep-purple lighten-2"
      text
      @click="redirect(object.buy)"
      class="pa-1"
      >
      Achat
    </v-btn>
  </v-col>
  </v-row>
  </v-card-actions>
  <v-card-actions class="justify-center">
  <v-btn
  
  color="yellow"
  @click="redirect(object.buy)"
  >
  fav
</v-btn>
<v-checkbox
      v-model="isFav"
      label="Favoris"
      @change="console.log(object.id)"
    ></v-checkbox>
</v-card-actions>
</v-card>
</div>
</v-row>
</v-container>



</v-app>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { Book } from "~/interfaces/books.interface";
  import { Search } from "@/interfaces/search.interface"
  import searchCommand from "~/commands/search.command";
  import { AxiosResponse } from "axios";
  import { booleanLiteral } from "@babel/types";
  import { mdiStarOutline } from '@mdi/js';
  
  export default defineComponent({
    name: 'Search',
    data(){
      return{
        isFav: false as boolean,
        subject: '' as string,
        searchList: [] as Array<Book>, 
          filtersList: ["Science","Voiture","Programmation","Aucun"] as Array<String>,
            filter: 4 as number,
            categoriesList: ["History","Music","Economy"] as Array<String>,
            }
          },
          methods: {
            async search(filter: number) {
              if(this.subject != ""){
                this.searchList = await searchCommand.search(this.subject,filter);            
              }
            },
            redirect(link: string) {
              window.location.href = link
            },
            async searchCategory(category: string) {
              this.searchList = await searchCommand.searchCategory(category)
            },
            fav(id: string) {
              console.log(id)
            }
          
          }
        })
        
      </script>