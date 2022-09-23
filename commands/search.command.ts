import searchQuery from "@/queries/search.query";
import { Axios, AxiosResponse } from "axios";
import { Book } from "~/interfaces/books.interface";
import { Search } from "~/interfaces/search.interface";
export default {
    async search(subject: string,filter: number) {
        var response: AxiosResponse
        var category: string = "Aucun"
        
        switch (filter) {
            case 1:
                category = "Science"
                response = await searchQuery.getSearchResultFiltered(subject,category);
                break;
            case 2:
                category = "Automobiles"
                response = await searchQuery.getSearchResultFiltered(subject,category);
                break;
            case 3:
                category = "Internet"
                response = await searchQuery.getSearchResultFiltered(subject,category);
                break;
            case 4:
                category = "Aucun"        
                response = await searchQuery.getSearchResult(subject);
                break;
        }
        
        //const result: Array<Book> = searchQuery.getSearchResult('lol');
        //const response: AxiosResponse = await searchQuery.getSearchResult(subject);
        const resultList: Array<Object> = response.data.items
        const booksList: Array<Book> = [];
        var thumbnail: string = ""
        resultList.forEach(element => {
            if(element.volumeInfo.hasOwnProperty('imageLinks')){
                
                thumbnail = element.volumeInfo.imageLinks.smallThumbnail
            }
            const tempBook: Book = {
                title: element.volumeInfo.title,
                description: element.volumeInfo.description,
                authors: element.volumeInfo.authors,
                image: thumbnail,
                preview: element.volumeInfo.previewLink,
                buy: element.saleInfo.buyLink,
                id: element.id
            }
            booksList.push(tempBook)
        });            
        localStorage.setItem('booksList',JSON.stringify(booksList));
        return booksList
    },
    async searchCategory(category: string){
        var response: AxiosResponse    
        response = await searchQuery.getCategorySearchResult(category);
        const resultList: Array<Object> = response.data.items
        const booksList: Array<Book> = [];
        var thumbnail: string = ""
        resultList.forEach(element => {
            if(element.volumeInfo.hasOwnProperty('imageLinks')){
                thumbnail = element.volumeInfo.imageLinks.smallThumbnail
            }
            const tempBook: Book = {
                title: element.volumeInfo.title,
                description: element.volumeInfo.description,
                authors: element.volumeInfo.authors,
                image: thumbnail,
                preview: element.volumeInfo.previewLink,
                buy: element.saleInfo.buyLink,
                id: element.saleInfo.id
            }
            booksList.push(tempBook)
        });            
        localStorage.setItem('booksList',JSON.stringify(booksList));
        return booksList
    }
}

