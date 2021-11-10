const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '24234149-5c66644c32ce64debb1a8789c';
export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 12;
  }
  async fetchPhotos() {
    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}&key=${API_KEY}`;

    try {
      const responce = await (await fetch(url)).json();
      const { hits } = responce;
      this.incrementPage();
      return hits;
    } catch (error) {
      console.log(error);
    }
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}
