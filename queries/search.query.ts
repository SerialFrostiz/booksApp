import { Book } from "~/interfaces/books.interface";
import axios, { AxiosResponse } from "axios";
import env from "~/env";
export default {
    async getSearchResult(subject: string) {
        return axios.get(`https://www.googleapis.com/books/v1/volumes?q=`+ subject +`&maxResults=40&key=` + env.googleBooksApiKey)
        .then((res) => res)   
    },
    async getSearchResultFiltered(query: string,category: string) {
        return await axios.get(`https://www.googleapis.com/books/v1/volumes?q=`+ query +`:subject:`+ category +`&maxResults=40&key=` + env.googleBooksApiKey)  
    },
    async getCategorySearchResult(category: string) {
        return await axios.get(`https://www.googleapis.com/books/v1/volumes?q=:subject:`+ category +`&maxResults=40&key=` + env.googleBooksApiKey)  
    }
}