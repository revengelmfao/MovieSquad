# Movie Squad: MERN Stack Single-Page Application

## Project Overview
Movie Squad is an interactive full MERN stack single page application designed to help movie buffs save lists of their favorite movies and write reviews. Users can create watchlists, rate movies, write reviews and comment on other user reviews.

## Key Features

- **Movie Search (Using OMDB API)**
  - See top rated movies.
  - Enter a **movie name** and get results for that movie.
  - Options to **rate** the movie, add to a list of saved movies, and add to a movie watchlist.
  - View and write **movie reviews**.

- **Movie Reviews**
  - **Write reviews** on movies.
  - **Comment** on user reviews.

- **Saved Movies and Movie Watchlist**
  - **Save a list** of movies you have seen.
  - **Create a watchlist** of movies you are interested in.

## Live Deployment

[Movie Squad live]()

## Screenshots

### **Homepage:**
![Homepage Screenshot]()

### **Movie Search:**
![]()

### **Movie Review**
![]()

## Project Setup

### **1️⃣ Clone the Repository**
```sh
git clone <repository_url>
cd moviesquad
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Setup Environment Variables**
To use the required APIs, each team member must create a `.env` file with their own API keys. Follow these steps:

1. **Copy the `.env.example` file**
   ```sh
   cp .env.example .env
   ```
2. **Open the `.env` file and add your API keys**
   ```plaintext
   OMDB_API_KEY=your_omdb_key_here
   MONGODB_URI=your_mongodb_uri_here
   ```
3. **Save the file.**

🔹 **Important:** `.env` is included in `.gitignore` and **should never be committed** to GitHub.

### **4️⃣ Start the Development Server**
```sh
npm run develop
```

### **5️⃣ Update `.gitignore`**
Ensure `.gitignore` includes the `.env` file:
```plaintext
# Environment Variables
.env
.env.local
.env.*.local
```
If not, add these lines **manually** to prevent accidental commits of API keys.

---

## API Endpoints & Usage

### 🔹 Movie Search
**Get**
#### 🔹 **Returns**: A list of movies.
```json
[
  {
    
  }
]
```

## Deployment Guide

- **Ensure your `.env` file is set up.**
- Deploy on **Render** as a **Web Service**.
- Ensure the database **(MongoDB) is set up and connected through MongoDB Atlas**.

## API Integrations
Movie Squad integrates the OMDB API to 

## Technologies Used
### **Frontend:** 
- **React** (TypeScript, Vite)
- **React Router** (Navigation)
- **TailwindCSS** (Styling)
### **Backend:** 
- **Node.js, Express.js** (Server)
- **TypeScript** (For static type safety)
- **OMDB API** (Movie Search)
- **PostgreSQL** (Sequelize ORM)
- **JWT Authentication** (Secure login system)
### **Other Tools:** 
- **Render** (Deployment)
- **MongoDB Atlas** (Database)

## Future Enhancements
- ****

## License