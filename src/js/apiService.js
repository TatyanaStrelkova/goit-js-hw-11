import 'regenerator-runtime/runtime';
import axios from 'axios';

 export default class ApiServise {
  constructor() {
    this.BASE_URL = 'https://pixabay.com/api/';
    this.API_KEY = '28117690-7a8a1375fd8d40be55bcdb152';
    this.searchQuery = '';
    this.page = 1;
  }
   async fetchImages() {
     
     this.response = await axios.get(this.BASE_URL, {
            params: {
             key: this.API_KEY,
             q: this.searchQuery,
             image_type: 'photo',
             orientation: 'horizontal',
             safesearch: true,
             page: this.page,
             per_page: 40,
            }
     })
     return this.response.data;
   } 

   loadMorePages() {
     this.page += 1;
   }

   resetPage() {
     this.page = 1;
   }
   
  get query() { 
    return this.searchQuery;
  }

  set query(newQuery) { 
    this.searchQuery = newQuery;
}
} 


 
 