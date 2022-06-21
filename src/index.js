import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ApiServise from './js/apiService';
import createGalleryItemMarkup from './js/galleryMarkup.js';
import refs from './js/refs.js'
import SimpleLightbox from 'simplelightbox'
import 'simplelightbox/dist/simple-lightbox.min.css'

const apiServise = new ApiServise();
let lightbox;

refs.form.addEventListener('submit', getImageOnFormSubmit);
refs.button.addEventListener('click', onLoadButtonClick);

function getImageOnFormSubmit(e) {
    e.preventDefault();
    refs.gallery.innerHTML = '';
    apiServise.query = e.currentTarget.elements.searchQuery.value;
    apiServise.resetPage();
    refs.button.classList.add('is-hidden');

    apiServise.fetchImages().then(({ hits, totalHits }) => {
        
        if (!apiServise.query) {
        alertEmptySearhInput();
            return;
        }
        
       if (totalHits === 0) { 
           failureInput();
           return;
       }
        
        if (totalHits > apiServise.perPage) {
            refs.button.classList.remove('is-hidden');
        }
        
        showQuantityOfImages(totalHits);
        refs.gallery.insertAdjacentHTML('beforeend', createGalleryItemMarkup(hits))
        lightbox = new SimpleLightbox('.gallery a');
    })
    console.log(apiServise)
} 

function onLoadButtonClick() {
    apiServise.loadMorePages();
    lightbox.destroy();

    apiServise.fetchImages().then(({ totalHits }) => {
        refs.gallery.insertAdjacentHTML('beforeend', createGalleryItemMarkup(apiServise.response.data.hits));
        lightbox = new SimpleLightbox('.gallery a').refresh();
    
         const maxPages = Math.ceil(totalHits / apiServise.perPage);

            if (apiServise.page === maxPages) {
            refs.button.classList.add('is-hidden');
            endOfResults(); 
         }

    });
}
    
function failureInput() { 
    Notify.failure('Sorry, there are no images matching your search query. Please try again.')
}

function showQuantityOfImages(quantity) { 
    Notify.success(`Hooray! We found ${quantity} images.`);
}

function alertEmptySearhInput() {
     Notify.failure('The search string cannot be empty. Please specify your search query.')
}

function endOfResults() {
    Notify.failure(`We're sorry, but you've reached the end of search results.`)
}


