const API_KEY_OMDB = '8b9773fd'; 
const API_KEY_TMDB = '487df02639957e246b25f34c337a8375';

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("darkModeToggle").addEventListener("click", toggleDarkMode);
    loadFavorites();
});

/*  Search for movies */
async function searchMovie() {
    const query = document.getElementById('searchInput').value.trim();
    if (!query) {
        alert('Please enter a movie or TV show name!');
        return;
    }

    const url = `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY_OMDB}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === 'True') {
            displayMovies(data.Search);
        } else {
            document.getElementById('result').innerHTML = '<p>No movies found.</p>';
        }
    } catch (error) {
        console.error("Error fetching movie data:", error);
    }
}

/*  Display movies with Trailer & Streaming Platform */
async function displayMovies(movies) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    for (const movie of movies) {
        let movieDetails = await getMovieDetails(movie.imdbID);
        let streamingPlatform = await getStreamingPlatform(movie.Title);
        let trailerURL = await getMovieTrailer(movie.Title);

        resultDiv.innerHTML += `
            <div class="movie">
                <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}">
                <h3>${movie.Title} (${movie.Year})</h3>
                <p>⭐ IMDb Rating: ${movieDetails.imdbRating || 'N/A'}</p>
                <p>📺 Streaming on: ${streamingPlatform}</p>
                <iframe class="trailer" src="${trailerURL}" frameborder="0" allowfullscreen></iframe>
                <button onclick="addToFavorites('${movie.imdbID}', '${movie.Title}')">❤️ Add to Favorites</button>
            </div>
        `;
    }
}

/* Fetch Trailer from TMDB */
async function getMovieTrailer(title) {
    try {
        const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY_TMDB}&query=${encodeURIComponent(title)}`;
        const searchResponse = await fetch(searchURL);
        const searchData = await searchResponse.json();

        if (searchData.results.length > 0) {
            const movieId = searchData.results[0].id;
            const trailerURL = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY_TMDB}`;
            const trailerResponse = await fetch(trailerURL);
            const trailerData = await trailerResponse.json();

            if (trailerData.results.length > 0) {
                return `https://www.youtube.com/embed/${trailerData.results[0].key}`;
            }
        }
    } catch (error) {
        console.error("Error fetching trailer:", error);
    }
    return "";
}

/*  Fetch Streaming Platform Availability */
async function getStreamingPlatform(title) {
    try {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY_TMDB}&query=${encodeURIComponent(title)}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.results.length > 0) {
            const movieId = data.results[0].id;
            const platformURL = `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${API_KEY_TMDB}`;
            const platformResponse = await fetch(platformURL);
            const platformData = await platformResponse.json();

            if (platformData.results && platformData.results.US) {
                return platformData.results.US.flatrate?.[0]?.provider_name || "Not Available";
            }
        }
    } catch (error) {
        console.error("Error fetching streaming platform:", error);
    }
    return "Not Available";
}

/*  Get Detailed Movie Info (Ratings, Genre) */
async function getMovieDetails(imdbID) {
    try {
        const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY_OMDB}`;
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("Error fetching movie details:", error);
    }
    return {};
}

/*  Add movie to favorites */
function addToFavorites(imdbID, title) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (!favorites.some(movie => movie.id === imdbID)) {
        favorites.push({ id: imdbID, title: title });
        localStorage.setItem('favorites', JSON.stringify(favorites));
        loadFavorites();
    } else {
        alert("Already in favorites!");
    }
}

/*  Remove from favorites */
function removeFromFavorites(imdbID) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(movie => movie.id !== imdbID);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    loadFavorites();
}

/* Load Favorites */
function loadFavorites() {
    const favoritesList = document.getElementById("favoritesList");
    favoritesList.innerHTML = "";

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    favorites.forEach(movie => {
        const li = document.createElement("li");
        li.innerHTML = `${movie.title} <button onclick="removeFromFavorites('${movie.id}')">🗑️</button>`;
        favoritesList.appendChild(li);
    });
}

/*  "Surprise Me!" - Get a Random Movie */
async function getRandomMovie() {
    const randomMovies = ["Inception", "Interstellar", "Titanic", "The Dark Knight", "Avatar"];
    const randomQuery = randomMovies[Math.floor(Math.random() * randomMovies.length)];

    const url = `https://www.omdbapi.com/?t=${randomQuery}&apikey=${API_KEY_OMDB}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === 'True') {
            document.getElementById('result').innerHTML = `
                <div class="movie">
                    <img src="${data.Poster !== 'N/A' ? data.Poster : 'placeholder.jpg'}" alt="${data.Title}">
                    <h3>${data.Title} (${data.Year})</h3>
                    <p>🎭 Genre: ${data.Genre}</p>
                    <p>⭐ IMDb Rating: ${data.imdbRating}</p>
                    <button onclick="addToFavorites('${data.imdbID}', '${data.Title}')">❤️ Add to Favorites</button>
                </div>
            `;
        } else {
            document.getElementById('result').innerHTML = '<p>No movie found.</p>';
        }
    } catch (error) {
        console.error("Error fetching random movie:", error);
    }
}

/* Voice Search */
function startVoiceSearch() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";

    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById("searchInput").value = transcript;
        searchMovie();
    };

    recognition.onerror = function () {
        alert("Voice recognition failed. Please try again.");
    };

    recognition.start();
}

/* Toggle Dark Mode */
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}


