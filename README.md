# Movie Finder App 🎬

## 📌 Project Overview
Movie Finder is a web application that allows users to search for movies, view trailers, check streaming platform availability, and save favorite movies. It integrates OMDB and TMDB APIs to fetch movie details, ratings, and watch providers. Additionally, users can enable dark mode and use a "Surprise Me!" feature to get random movie suggestions.

## 🚀 Features
- 🔍 **Search Movies & TV Shows** (OMDB API)
- 🎞 **Watch Movie Trailers** (TMDB API)
- 📺 **Check Streaming Platform Availability** (TMDB API)
- ❤️ **Add/Remove Favorites** (LocalStorage)
- 🎭 **Surprise Me!** - Suggests a random movie
- 🗣 **Voice Search** - Search using voice recognition
- 🌙 **Dark Mode Toggle**

## 🛠 Technologies Used
- HTML, CSS, JavaScript
- OMDB API & TMDB API (for movie details, trailers, streaming info)
- LocalStorage (for saving favorites)
- Google Speech Recognition (for voice search)

---

## 📂 File Structure
```
📦 Movie Finder Project
 ┣ 📜 index.html       # Main HTML file
 ┣ 📜 style.css        # Stylesheet
 ┣ 📜 script.js        # Main JavaScript file
 ┣ 📜 config.js        # API key configuration (excluded in GitHub)
 ┣ 📜 README.md        # Project Documentation
 ┣ 📜 .gitignore       # Ignore config.js (to hide API keys)
```

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/movie-finder.git
cd movie-finder
```

### 2️⃣ Create `config.js` File (For API Keys)
Since API keys are sensitive, **DO NOT** push them to GitHub. Instead, create a `config.js` file inside your project and add the following:
```js
const API_KEY_OMDB = 'YOUR_OMDB_API_KEY';
const API_KEY_TMDB = 'YOUR_TMDB_API_KEY';
```
> 🛑 **Note:** Replace `'YOUR_OMDB_API_KEY'` and `'YOUR_TMDB_API_KEY'` with your actual API keys.

### 3️⃣ Add `.gitignore` (To Hide API Keys)
Create a `.gitignore` file and add the following line to **prevent uploading sensitive keys**:
```
config.js
```

### 4️⃣ Run the Project Locally
Simply open `index.html` in your browser.

---

## 🌍 Deployment
You can deploy the project using **GitHub Pages**, **Netlify**, or **Vercel**.

### Deploy on GitHub Pages:
1. Push your project to GitHub.
2. Go to **Settings** → **Pages**.
3. Select the `main` branch and set root as `/`.
4. Click **Save** and get your live link.

---

## 🚀Live Demo
[Movie-TV-Show Finder](https://godatcode.github.io/Movie-TV-Show-Finder/)

## 🎯 How It Works
1. **Search for a movie** → Fetches movie info from OMDB API.
2. **Click on a result** → Fetches trailer & streaming info using TMDB API.
3. **Add to Favorites** → Saves the movie to LocalStorage.
4. **Use Voice Search** → Enables speech recognition for search.
5. **Toggle Dark Mode** → Switches between light & dark theme.
6. **Surprise Me!** → Shows a random movie recommendation.

---

## 🔐 Security & API Key Management
To **secure API keys**, follow these steps:
- **Never expose API keys in public repositories.**
- **Use `.gitignore`** to prevent `config.js` from being uploaded.
- **Use environment variables** if hosting on a backend server.

---

## 📢 Contributing
1. Fork the repository 🍴
2. Create a new branch `feature-new` 🌿
3. Make your changes & commit 🚀
4. Submit a Pull Request 🔥

---

## 📜 License
This project is **open-source** under the [MIT License](https://github.com/Godatcode/Movie-TV-Show-Finder/blob/main/LICENSE).

---

## 🤝 Acknowledgments
- [OMDB API](https://www.omdbapi.com/) for movie data 🎬
- [TMDB API](https://www.themoviedb.org/) for trailers & streaming info 📺

---

### 🎉 Thank You & Happy Coding! 🚀🎬
