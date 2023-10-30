const movieContainer = document.querySelector('.movie-container');
const movieCard = document.querySelector('.movie-card');
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('#search-input')
const resetBtn = document.querySelector('.reset-button');
const searchLogContainer = document.querySelector('.search-log');
const searchList = document.querySelector('.search-log-list');
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjgyMzdlYWMxZjdiYWVlNjJiZjJmYWY1Njc4YzAyZiIsInN1YiI6IjY1MmY3MWZkMGNiMzM1MTZmNjQwYzEzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GEIWqP736DYrah_tW9saUYSksPkL_PNWinkd8U2iuig'
  }
};

// 초기 화면 그리는 함수
fetchData()


// 영화 카드 클릭 시 alert
// movieCard?.addEventListener('click', (e) => {
//   alert(`영화 id: ${e.target.dataset.id}`)
// })

// 초기화
resetBtn.addEventListener('click', () => {
  movieContainer.innerHTML = ''
  searchInput.value = ''
  fetchData();
})


//==========
// FUNCTION
//==========

// 데이터 fetch 후 초기 화면 그리기 / 검색 기능
async function fetchData() {
  const res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?
  language=en-US&page=1`, options)

  try {
    let data = await res.json();
    // 카드 UI로 데이터 전달
    createCard(data.results);
  }
  catch (err) {
    console.log(console.error(err));
  }


  // 검색 기능
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // fetch 데이터와 인풋 입력 값을 전달하여 검색
    searchMovie(data, searchInput.value)
    // 인풋 입력 값을 전달하여 검색했던 목록 생성
    searchedLog(searchInput.value)

    searchInput.value = ''
    searchLogContainer.id = ''
  })

  let cards = document.querySelectorAll('.movie-card');
  showId(cards)
}

// 카드 UI 그리기
function createCard(data) {
  let tempHTML = '';
  data?.forEach(el => {
    if (data.length === 0) {
      tempHTML = `<div><h1>찾는 정보가 없습니다</h1></div>`
    } else {
      tempHTML = `<div class="movie-card" data-id = '${el.id}'>
        <div class="movie-card-img">
          <img  data-id = '${el.id}' loading="lazy" src=${`https://image.tmdb.org/t/p/w300` + el.poster_path} alt="" />
        </div>
        <h2 class="movie-card-title">${el.title}</h2>
        <p class="movie-card-desc">
          ${el.overview}
        </p>
        <h4 class='average-score'>Rating: ${el.vote_average}</h4>
    </div >`
    }

    movieContainer.insertAdjacentHTML('beforeend', tempHTML)
  })

}

const showId = (el) => {
  (Array.from(el).forEach(items => {
    items.addEventListener('click', (e) => alert(`id: ${e.target.dataset.id}`))
  }))
}





// 검색 후 해당되는 데이터로 카드 UI 그리기
async function searchMovie(data, searchValue) {
  let filtered = data.results.filter(el => (el.title.toLowerCase()).includes(searchValue.toLowerCase()))
  movieContainer.innerHTML = ``;

  createCard(filtered)
}

function searchedLog(searchValue) {
  let logHTML = `<li class="list_item" data-name=${searchValue}>
  ${searchValue}</li>`;

  searchList.insertAdjacentHTML('beforeend', logHTML)
}
