import axios from 'axios';

export async function searchService(searchQuery, page) {
  const API_KEY = '39907468-6fc82bf280496c4ab5c23ac18';
  const BASE_URL = 'https://pixabay.com/api/';
  const params = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 12,
  });
  const resp = await axios.get(`${BASE_URL}?${params}`);
  return resp.data;
}
