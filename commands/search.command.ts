import searchQuery from "@/queries/search.query";
import { Axios, AxiosResponse } from "axios";
import { Book } from "~/interfaces/books.interface";
import { Search } from "~/interfaces/search.interface";
export default {
    async search(subject: string) {
            //const result: Array<Book> = searchQuery.getSearchResult('lol');
            const response: AxiosResponse = await searchQuery.getSearchResult(subject);
            const resultList: Array<Object> = response.data.items
            const booksList: Array<Book> = [];
            var thumbnail: string = ""
            resultList.forEach(element => {
                if(element.volumeInfo.hasOwnProperty('imageLinks')){
                    console.log("done")
                    thumbnail = element.volumeInfo.imageLinks.smallThumbnail
                }
                const tempBook: Book = {
                    title: element.volumeInfo.title,
                    description: element.volumeInfo.description,
                    authors: element.volumeInfo.authors,
                    image: thumbnail,
                    preview: element.volumeInfo.previewLink,
                    buy: element.saleInfo.buyLink
                }
                booksList.push(tempBook)
                console.log(tempBook)
            });            
            //result.push(result);            
            localStorage.setItem('booksList',JSON.stringify(booksList));
            console.log(booksList)
            return booksList
    }
}
  
