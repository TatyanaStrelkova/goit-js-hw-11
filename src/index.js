import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ApiServise from './js/apiService';
import createGalleryItemMarkup from './js/galleryMarkup.js';
import refs from './js/refs.js'

const apiServise = new ApiServise();

refs.form.addEventListener('submit', getImageOnFormSubmit);
refs.button.addEventListener('click', onLoadButtonClick);

function getImageOnFormSubmit(e) {
    e.preventDefault();
    refs.gallery.innerHTML = '';
    refs.button.classList.remove('is-hidden');
    apiServise.query = e.currentTarget.elements.searchQuery.value;
    apiServise.resetPage();

    if (apiServise.query === '') {
        alertEmptySearhInput();
        return;
     }

    apiServise.fetchImages().then(({ hits, totalHits }) => {
       if (hits.length === 0) { 
            failureInput();
            return;
       }
        showQuantityOfImages(totalHits)
        refs.gallery.insertAdjacentHTML('beforeend', createGalleryItemMarkup(hits))
    })
    console.log(apiServise)
} 

function onLoadButtonClick() {
    apiServise.loadMorePages()
    apiServise.fetchImages();
    refs.gallery.insertAdjacentHTML('beforeend', createGalleryItemMarkup(apiServise.response.data.hits))
    console.log(apiServise.response)
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


