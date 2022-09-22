import { Book } from "~/interfaces/books.interface";
import axios, { AxiosResponse } from "axios";
export default {
    async getSearchResult(subject: string) {
        //return axios.get(`https://www.googleapis.com/books/v1/volumes?q=categories:Education&key=AIzaSyBZ7Ug_7Z-xZIDuDh_246C6b_0q810d9ss`)
        return axios.get(`https://www.googleapis.com/books/v1/volumes?q=`+ subject +`&maxResults=40`)
        .then((res) => res)   
        
    }
}