var APIKEY = "6ded4d810fea7824b1775ec567dd74dc";
var APIURL = "https://api.themoviedb.org/3";
var IMGPATH = "https://image.tmdb.org/t/p/w1280";

async function getTrendingMovies() {
    var url = APIURL + '/trending/movie/week?api_key=' + APIKEY + '&page=1';
    var resp = await fetch(url);
    var respData = await resp.json();
    var today = new Date();
    today.setHours(0,0,0,0);
    //console.log(respData);
    
    var pop_cont = document.getElementById("popular");
    
    respData.results.forEach(movie => {
        
        var release_date = new Date(movie.release_date);
        
        if(release_date <= today) {
            var pop_div = document.createElement('div');
            pop_div.classList.add("movie_card");
            var movie_img = document.createElement('img');
            movie_img.src = IMGPATH + movie.poster_path;
            movie_img.classList.add("movie_card_img");

            var rating = document.createElement('span');
            rating.innerHTML = `<i class="fas fa-star"></i>` + movie.vote_average;
            
            pop_div.appendChild(movie_img);
            pop_div.appendChild(rating);
            
            //add click listener for movie card
            var movieCardListener = pop_div.querySelector('.movie_card_img');
            movieCardListener.addEventListener("click", () => {
                getMovieInfo(movie.id);
            });
            
            pop_cont.appendChild(pop_div);
        }
        
    });    
}

async function getUpComingMovies() {
    var url = APIURL + '/movie/upcoming?api_key=' + APIKEY;
    var resp = await fetch(url);
    var respData = await resp.json();
    var today = new Date();
    today.setHours(0,0,0,0);
    //console.log(respData);
    
    var new_cont = document.getElementById("upcoming");
    var page = 1;
    
    while(page < 4) {
    
        respData.results.forEach(movie => {

            var release_date = new Date(movie.release_date);

            if(release_date >= today && movie.poster_path != null) {
                var movie_card = document.createElement('div');
                movie_card.classList.add("movie_card");
                var movie_img = document.createElement('img');
                movie_img.src = IMGPATH + movie.poster_path;
                movie_img.classList.add("movie_card_img");

                var release = document.createElement('span');

                var month = release_date.toLocaleString('default', {month: 'short'});
                var day = release_date.getDate();
                release.innerHTML = month + " " + day;
                
                movie_card.appendChild(movie_img);
                movie_card.appendChild(release);
                
                //add click listener for movie card
                var movieCardListener = movie_card.querySelector('.movie_card_img');
                movieCardListener.addEventListener("click", () => {
                    getMovieInfo(movie.id);
                });

                new_cont.appendChild(movie_card);
            }

        });
        page = page + 1;
        url = APIURL + '/movie/upcoming?api_key=' + APIKEY + '&page=' + page;
        resp = await fetch(url);
        respData = await resp.json();
    }
}

async function getNowPlaying() {
    var url = APIURL + '/movie/now_playing?api_key=' + APIKEY + '&language=en-US';
    var resp = await fetch(url);
    var respData = await resp.json();
    var today = new Date();
    today.setHours(0,0,0,0);
    //console.log(respData);
    
    var inCinemas = document.getElementById("inCinemas");
    
    respData.results.forEach(movie => {
        var release_date = new Date(movie.release_date);
        
        if(release_date <= today) {
            var inCinemas_div = document.createElement('div');
            inCinemas_div.classList.add("movie_card");
            var movie_img = document.createElement('img');
            movie_img.src = IMGPATH + movie.poster_path;
            movie_img.classList.add("movie_card_img");

            var rating = document.createElement('span');
            rating.innerHTML = `<i class="fas fa-star"></i>` + movie.vote_average;
            
            inCinemas_div.appendChild(movie_img);
            inCinemas_div.appendChild(rating);
            
            //add click listener for movie card
            var movieCardListener = inCinemas_div.querySelector('.movie_card_img');
            movieCardListener.addEventListener("click", () => {
                getMovieInfo(movie.id);
            });

            inCinemas.appendChild(inCinemas_div);
        }
    });
}

async function searchMovies(text) {
    var url = APIURL + '/search/movie?api_key=' + APIKEY + '&language=en-US&query='+text;
    var resp = await fetch(url);
    var respData = await resp.json();
    //console.log(respData);
    
    var searchResults = document.getElementById("search");
    searchResults.innerHTML = '';
    
    respData.results.forEach(movie => {
        
        if(movie.poster_path != null) {
            var search_div = document.createElement('div');
            search_div.classList.add("movie_card");
            var movie_img = document.createElement('img');
            movie_img.src = IMGPATH + movie.poster_path;
            movie_img.classList.add("movie_card_img");

            var rating = document.createElement('span');
            rating.innerHTML = `<i class="fas fa-star"></i>` + movie.vote_average;
            
            search_div.appendChild(movie_img);
            search_div.appendChild(rating);
            
            //add click listener for movie card
            var movieCardListener = search_div.querySelector('.movie_card_img');
            movieCardListener.addEventListener("click", () => {
                getMovieInfo(movie.id);
            });

            searchResults.appendChild(search_div);
        }
        
    });
    
}

async function getMovieInfo(movieId) {
    var url = APIURL + '/movie/' + movieId + '?api_key=' + APIKEY;
    var resp = await fetch(url);
    var respData = await resp.json();
    const movie = respData;
        
    var url1 = APIURL + '/movie/' + movieId + '/credits?api_key=' + APIKEY;
    var resp1 = await fetch(url1);
    var respData1 = await resp1.json();
    const castList = respData1;
    
    populateMovieInfo(movie, castList);
}

function populateMovieInfo(movie, castList) {
    var movieDetails = document.getElementById("movie-info-container");
    movieDetails.innerHTML = '';
    var releaseDate = new Date(movie.release_date);
    var releaseMonth = releaseDate.toLocaleDateString('default', {month: 'short'});
    var releaseDay = releaseDate.getDate();
    var releaseYear = releaseDate.getFullYear();
    var genre = '';
    movie.genres.forEach(g => {
        genre += g.name + ', ';
    });
    genre = genre.replace(/, $/g,'');
    
    var len = (castList.cast.length < 13 ? castList.cast.length : 13);
    var backdrop_image = (movie.backdrop_path ? movie.backdrop_path : movie.poster_path);
    
    var castUL = [];
    for (let i=0; i<len; i++) {
        if(castList.cast[i].profile_path) {
            castUL.push(castList.cast[i]);
        }
    }
    
    if(castUL.length > 1) {
        var castULString = `<ul class="cast_header">
        <li>CAST</li></ul>
        <div id="cast" class="cast-info hide-scroll">
            <ul> ${castUL.map(cast => `<li><img src="${IMGPATH + cast.profile_path}">${cast.original_name}</li>`).join('')}
            </ul>
        </div>`;
    }
    else {
        var castULString = '';
    }

    var movieInfoCard = document.createElement('div');
    movieInfoCard.classList.add("movie-info-card");
    movieInfoCard.classList.add("hide-scroll");
    movieInfoCard.innerHTML = `<div class="backdrop_section"><img class="backdrop_image" src="${IMGPATH + backdrop_image}">
        <button class="runtime">${movie.runtime} mins</button></div>
        <button class="close"><i class="fas fa-times"></i></button>
        <img class="poster_image" src="${IMGPATH + movie.poster_path}">
        <h2>${movie.original_title}</h2>
        <p class="movie-intro">${movie.overview}</p>
        ${castULString}
        <div class="extra-info">
            <ul>
                <li>
                    <header>Release Date</header>
                    ${releaseMonth} ${releaseDay}, ${releaseYear}
                </li>
                <li>
                    <header>Genre</header>
                    ${genre}
                </li>
            </ul>
        </div>`;
    
    var closeBtnListener = movieInfoCard.querySelector('.close');
    closeBtnListener.addEventListener("click", () => {
        movieDetails.classList.add("hidden");
    });

    movieDetails.appendChild(movieInfoCard);
    movieDetails.classList.remove("hidden");
}

function scrollEvents(idName) {
    
    var containerName = document.getElementById(`${idName}`);
    var scrollName = document.querySelector(`.scroll_${idName}`);
    var mainWidth = document.getElementById("mobile-container").offsetWidth;
    
    containerName.addEventListener("scroll", () => {
        
        if(containerName.scrollLeft > 0) {
            scrollName.querySelector('.scroll_icon_right').classList.remove('hidden');
            scrollName.querySelector('.scroll_icon_left').classList.remove('hidden');
            
            var arrowsR = scrollName.querySelectorAll('.r-arrow');
            arrowsR.forEach(arr => {
                arr.classList.add('bounceArrowsRight');
            });
            var arrowsL = scrollName.querySelectorAll('.l-arrow');
            arrowsL.forEach(arr => {
                arr.classList.add('bounceArrowsLeft');
            });
        }
        if(containerName.scrollLeft == 0) {
            
            var arrowsR = scrollName.querySelectorAll('.r-arrow');
            arrowsR.forEach(arr => {
                arr.classList.remove('bounceArrowsRight');
            });
            var arrowsL = scrollName.querySelectorAll('.l-arrow');
            arrowsL.forEach(arr => {
                arr.classList.remove('bounceArrowsLeft');
            });
            
            scrollName.querySelector('.scroll_icon_left').classList.add('hidden');
            scrollName.querySelector('.scroll_icon_right').classList.add('hidden');
            
        }
        if(containerName.scrollLeft + mainWidth >= containerName.scrollWidth) {
            var arrowsR = scrollName.querySelectorAll('.r-arrow');
            arrowsR.forEach(arr => {
                arr.classList.remove('bounceArrowsRight');
            });
            scrollName.querySelector('.scroll_icon_right').classList.add('hidden');
        }
    });
}

function clearSearchHide(action) {
    var searchSection = document.querySelector('.scontainer');
    if(searchSection.classList.contains("search-hide") && action === "remove") {
        searchSection.classList.remove("search-hide");
    }
    if(!searchSection.classList.contains("search-hide") && action === "add") {
        searchSection.classList.add("search-hide");
    }
}

function resetSearch() {
    var initialNo = document.getElementById("search").scrollLeft;
    document.getElementById("search").scrollBy({
        left: `-${initialNo}`,
        behavior: 'smooth'
    });    
}

var searchBtn = document.getElementById("searchbox");
searchBtn.focus();

if(searchBtn) {
    searchBtn.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            if(searchBtn.value) {
                resetSearch();
                clearSearchHide("remove");
                var input = searchBtn.value;
                input = encodeURIComponent(input);
                searchMovies(input);
                scrollEvents("search");
                searchBtn.value = '';
                searchBtn.blur();
            }
            else {
                clearSearchHide("add");
            }
        }
    });
}

scrollEvents("popular");
scrollEvents("upcoming");
scrollEvents("inCinemas");
getTrendingMovies();
getUpComingMovies();
getNowPlaying();