import { useState, useEffect } from "react";
import "../styles/home.css";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import Loader from "../components/Loader";
import img from '../assets/ai-generated-8963817_1920.jpg'

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch books by query
  const fetchBooks = async (query) => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}`
      );
      const data = await res.json();

      const booksData = data.docs.slice(0, 20).map((book) => ({
        id: book.key,
        title: book.title,
        author: book.author_name?.join(", ") || "Unknown Author",
        year: book.first_publish_year || "Year Unknown",
        coverUrl: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : "/placeholder.jpg",
      }));

      setBooks(booksData);
    } catch {
      setError("Failed to fetch books. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Initial recommendations on load
  useEffect(() => {
    fetchBooks("book");
  }, []);

  return (
    <div>
         <header className="header">
        <img className="person" src={img}/>

        <h2 className="brand">THE BOOKS</h2>

      </header>
    <div className="home-page">
   

      <main className="content">
        <h1 className="title">Discover</h1>
        <div className="search-section">
          <SearchBar onSearch={fetchBooks} />
          <p className="subtitle">Book Recommendations</p>
        </div>

        {loading && <Loader />}
        {error && <p className="error-message">{error}</p>}

        <div className="book-list">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </main>
    </div>
    </div>
  );
}
