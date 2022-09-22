<script>
  import axios from 'axios'
  export default {
    data() {
  	  return {
	      parentMessage: 'Parent',
        items: [{ message: 'Foo' }],
        params: [{id: '42'}] ,
        answer: 'lo',
  	  }
	  },
    beforeCreate(){
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=categories:Education&key=AIzaSyBZ7Ug_7Z-xZIDuDh_246C6b_0q810d9ss`).then((res) => {
        this.answer = res}
      )
    }
  }
</script>

<template>
  <div>
    <li v-for="(item, index) in items">
  	  {{ parentMessage }}
	  </li>
    <div>Voila : {{ answer.data }}</div>
  </div>
</template>