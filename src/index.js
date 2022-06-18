import 'regenerator-runtime/runtime';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import createGalleryItemMarkup from './js/galleryMarkup.js';
import refs from './js/refs.js'

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '28117690-7a8a1375fd8d40be55bcdb152';

refs.form.addEventListener('submit', getImageOnFormSubmit)

async function getImageOnFormSubmit(e) {
    e.preventDefault();
    refs.gallery.innerHTML = '';
    refs.button.classList.remove('is-hidden');
    const userSearchQueryValue = e.currentTarget.elements.searchQuery.value.trim();
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: userSearchQueryValue,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
            }
        })
    /*     if (data.hits.length === 0) { 
            failureInput();
            return;
        } */
       refs.gallery.insertAdjacentHTML('beforeend', createGalleryItemMarkup(response.data.hits))
       /*  return response; */
    } catch (response) {
      /*   if (response.data.hits === 0) { 
            failureInput();
        } */
       /*  failureInput() */
         console.log()
  }
}
    
function failureInput() { 
    Notify.failure('Sorry, there are no images matching your search query. Please try again.')
}





