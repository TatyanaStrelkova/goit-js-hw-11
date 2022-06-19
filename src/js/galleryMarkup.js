/* largeImageURL - ссылка на большое изображение. */

export default function createGalleryItemMarkup(photos) {
  return photos.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => { 
        return `<div class="gallery-item">
        <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
            <p class="info-item">
                <b>Likes</b> ${likes}
            </p>
            <p class="info-item">
                <b>Views</b> ${views}
            </p>
            <p class="info-item">
                <b>Comments</b> ${comments}
            </p>
            <p class="info-item">
                <b>Downloads</b> ${downloads}
            </p>
        </div>
    </div>`
    }).join('');
 }