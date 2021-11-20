const API_KEY = "23430004-cf3d84f40651496950214677e";
const BASE_URL = "https://pixabay.com/api";

async function fetchImages(searchQuery, page) {
  const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=12&key=${API_KEY}`;

  const response = await fetch(url);
  const images = await response.json();
  //   this.setState({ loading: false });
  return images;
}

export default fetchImages;
