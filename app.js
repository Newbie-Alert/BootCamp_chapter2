const movieContainer = document.querySelector('.movie_container');
const movieCard = document.querySelector('.movie_card');
const searchForm = document.querySelector('.search_form');
const searchInput = document.querySelector('#search_input')
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjgyMzdlYWMxZjdiYWVlNjJiZjJmYWY1Njc4YzAyZiIsInN1YiI6IjY1MmY3MWZkMGNiMzM1MTZmNjQwYzEzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GEIWqP736DYrah_tW9saUYSksPkL_PNWinkd8U2iuig'
  }
};

fetchData()

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchMovie(searchInput.value)
  searchInput.value = ''
})

movieCard?.addEventListener('click', (e) => {
  console.log(e.target.dataset.id);
  alert(`영화 id: ${e.target.dataset.id}`)
})

//==============
// FUNCTION
//==============

// 초기 화면 그리기
async function fetchData() {
  let data;
  const res = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  data = await res.json();
  // 카드 UI로 데이터 전달
  console.log(data);
  createCard(data.results);
}

// 카드 UI 그리기
function createCard(data) {
  data?.forEach(el => {
    let tempHTML = `<div class="movie_card") data-id = '${el.id}' onclick="alert('영화 id: ${el.id}')" >
        <div class="movie_card_img">
          <img src=${`https://image.tmdb.org/t/p/w300` + el.poster_path} alt="" />
        </div>
        <h2 class="movie_card_title">${el.title}</h2>
        <p class="movie_card_desc">
          ${el.overview}
        </p>
        <h4 class='average_score'>Rating: ${el.vote_average}</h4>
      </div>`

    movieContainer.insertAdjacentHTML('beforeend', tempHTML)
  })
}

// 검색 후 해당되는 데이터로 카드 UI 그리기
async function searchMovie(searchValue) {
  let data;
  const res = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  data = await res.json();
  data = data.results;
  let filtered = data.filter(el => (el.title.toLowerCase()).includes(searchValue.toLowerCase()))
  movieContainer.innerHTML = ``;
  createCard(filtered)
}

