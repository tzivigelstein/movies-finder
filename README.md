# MovieFinder App

### Introduction

Welcome to MovieFinder, a React and Typescript application powered by the Open Movie Database (OMDb) API. Discover and explore movies, series, episodes, and games effortlessly. This app is built using Vite and embraces modern technologies like React and Typescript.

### Features

- **Horizontal Picker**: The app boasts a sleek horizontal picker, reminiscent of the iOS interface, allowing users to effortlessly navigate through different categories and view all available content.

- **Real-time Search**: MovieFinder features a search bar with real-time search functionality. As users type, the app dynamically fetches results, thanks to a debounce implementation that prevents unnecessary API requests.

- **Infinite Scroll**: Enjoy seamless browsing with the infinite scroll feature. The app automatically loads the next pages of movies as users scroll, providing a continuous and engaging experience.

- **Error and Loading States**: MovieFinder gracefully handles error and loading states using skeleton screens, ensuring a smooth and pleasant user experience.

- **URL Friendly**: The app is URL-friendly, with the type and query parameters updating in the URL. Users can easily share or bookmark URLs to revisit their favorite searches.

### Getting Started

To get started with MovieFinder, follow these simple steps:

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to explore the app.

3. Build the app:

   ```bash
   npm run build
   ```

4. Run the built version:

   ```bash
   npm run start
   ```

### Technologies Used

- React
- Typescript
- Vite
- CSS Modules

### Considerations

**Mandatory environment variables:**

```bash
VITE_API_URL=https://www.omdbapi.com/
VITE_API_KEY=<YOUR_OMDB_API_KEY>
VITE_IMDB_URL=https://www.imdb.com/title
```

### Disclaimer

This app does not feature Server-Side Rendering (SSR). For any inquiries or issues, feel free to reach out. Happy movie hunting!
