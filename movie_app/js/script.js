var APIKEY = "6ded4d810fea7824b1775ec567dd74dc";
var APIURL = "https://api.themoviedb.org/3";
var IMGPATH = "https://image.tmdb.org/t/p/w1280";

async function getPopularMovies() {
    var url = APIURL + '/movie/popular?api_key=' + APIKEY + '&page=1';
    var resp = await fetch(url);
    var respData = await resp.json();
    var today = new Date();
    today.setHours(0,0,0,0);
    //console.log(respData);
    
    if(respData.total_results < 4) {
        hideScrollBtn('right','add','popular');
    }
    else {
        hideScrollBtn('right','remove','popular');
    }
    
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
    
    if(respData.total_results < 4) {
        hideScrollBtn('right','add','upcoming');
    }
    else {
        hideScrollBtn('right','remove','upcoming');
    }
    
    var new_cont = document.getElementById("upcoming");
    
    respData.results.forEach(movie => {
        
        var release_date = new Date(movie.release_date);
        
        if(release_date >= today) {
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
            new_cont.appendChild(movie_card);
        }

    });
}

async function getNowPlaying() {
    var url = APIURL + '/movie/now_playing?api_key=' + APIKEY + '&language=en-US';
    var resp = await fetch(url);
    var respData = await resp.json();
    var today = new Date();
    today.setHours(0,0,0,0);
    //console.log(respData);
    
    if(respData.total_results < 4) {
        hideScrollBtn('right','add','inCinemas');
    }
    else {
        hideScrollBtn('right','remove','inCinemas');
    }
    
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
            inCinemas.appendChild(inCinemas_div);
        }
    });
}

async function searchMovies(text) {
    var url = APIURL + '/search/movie?api_key=' + APIKEY + '&language=en-US&query='+text;
    var resp = await fetch(url);
    var respData = await resp.json();
    //console.log(respData);
    
    if(respData.total_results < 4) {
        hideScrollBtn('right','add','search');
    }
    else {
        hideScrollBtn('right','remove','search');
    }
    
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
            searchResults.appendChild(search_div);
        }
        
    });
    
}

function hideScrollBtn(direction, action, idName) {
    var scrollBtn = document.getElementById(`scroll_${idName}_${direction}`);
    if(direction === 'left') {
        if(action === 'add' && ! scrollBtn.classList.contains("hidden")) {
            scrollBtn.classList.add("hidden");
        }
        else if(action === 'remove') {
            scrollBtn.classList.remove("hidden");
        }
    }
    if (direction === 'right') {
        if(action === 'add' && ! scrollBtn.classList.contains("hidden")) {
            scrollBtn.classList.add("hidden");
        }
        else if(action === 'remove') {
            scrollBtn.classList.remove("hidden");
        }
    }
}

function scrollEvents(idName) {
    var scrollRightBtn = document.getElementById(`scroll_${idName}_right`);
    var scrollLeftBtn = document.getElementById(`scroll_${idName}_left`);
    var mainWidth = document.getElementById("mobile-container").offsetWidth;
    var scrollNum = 350;

    if(scrollRightBtn) {
        scrollRightBtn.addEventListener("click", () => {
            document.getElementById(`${idName}`).scrollBy({
                left: `${scrollNum}`,
                behavior: 'smooth'
            });

            var sectionWidth = document.getElementById(`${idName}`).scrollWidth;

            var scrollLeft = document.getElementById(`${idName}`).scrollLeft;

            if(scrollLeft >= 0) {
                hideScrollBtn('left','remove',idName);
            }

            if(mainWidth + scrollLeft + scrollNum >= sectionWidth) {
                hideScrollBtn('right','add',idName);
            }

        });
    }
    
    if(scrollLeftBtn) {
        scrollLeftBtn.addEventListener("click", () => {
            document.getElementById(`${idName}`).scrollBy({
                left: `-${scrollNum}`,
                behavior: 'smooth'
            });
            
            var sectionWidth = document.getElementById(`${idName}`).scrollWidth;
            
            var scrollRight = document.getElementById(`${idName}`).scrollLeft;
            
            if(scrollRight - scrollNum <= 0) {
                hideScrollBtn('left','add',idName);
            }
            
            if(mainWidth + scrollRight <= sectionWidth) {
                hideScrollBtn('right','remove',idName);
            }
        
        });   
    }
}

function wheelDistance(e) {
    if(!e) {
        e = window.event;
    }
    let w = e.wheelDelta, d = e.detail;
    if(d) {
        return -d/3;
    }
    return w/120;
}

function handleScroll(e) {
    var delta = wheelDistance(e);
    var distance = 200;
    document.getElementById("mobile-container").scrollTop -= (distance * delta);
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
    
    setTimeout(hideScrollBtn('left','add','search'),30000);
}

var mobileCont = document.getElementById("mobile-container");
mobileCont.addEventListener('wheel', handleScroll);

var searchBtn = document.getElementById("searchbox");
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
                document.querySelector('.scontainer').focus();
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
getPopularMovies();
getUpComingMovies();
getNowPlaying();