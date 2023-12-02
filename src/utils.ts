const INITIAL_QUERIES = [
  "The Shawshank Redemption",
  "Inception",
  "The Godfather",
  "Pulp Fiction",
  "The Dark Knight",
  "Forrest Gump",
  "The Matrix",
  "Schindler's List",
  "Fight Club",
  "The Lord of the Rings",
  "Titanic",
  "Jurassic Park",
  "Avatar",
  "The Avengers",
  "La La Land",
  "The Grand Budapest Hotel",
  "Interstellar",
  "The Social Network",
  "The Silence of the Lambs",
  "Casablanca",
];

export default function getRotativeValue() {
  let currentIndex = parseInt(localStorage.getItem("currentIndex") ?? "0");

  const currentValue = INITIAL_QUERIES[currentIndex];

  currentIndex = (currentIndex + 1) % INITIAL_QUERIES.length;

  localStorage.setItem("currentIndex", currentIndex.toString());

  return currentValue;
}
