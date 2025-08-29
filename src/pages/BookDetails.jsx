import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import "../styles/BookCard.css";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const cleanId = id.replace("/works/", "");
        const response = await fetch(`https://openlibrary.org/works/${cleanId}.json`);
        if (!response.ok) throw new Error("Failed to fetch details");

        const data = await response.json();
        setBookDetails(data);
      } catch {
        setError("Failed to load book details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="loader-wrapper">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="book-details-container">
      {/* Cover + Info Section */}
      <div className="book-flex">
        <img
          src={
            bookDetails?.covers
              ? `https://covers.openlibrary.org/b/id/${bookDetails.covers[0]}-L.jpg`
              : "/placeholder.jpg"
          }
          alt={bookDetails?.title || "Book cover"}
          className="book-cover"
        />

        <div className="book-info">
          <h1 className="book-title">{bookDetails?.title}</h1>
          <p className="book-description">
            {bookDetails?.description
              ? typeof bookDetails.description === "string"
                ? bookDetails.description
                : bookDetails.description.value
              : "No description available."}
          </p>
        </div>
      </div>

      {/* Subjects */}
      {bookDetails?.subjects && (
        <div className="subjects-section">
          <h3 className="subjects-title">Subjects</h3>
          <ul className="subject-list">
            {bookDetails.subjects.slice(0, 8).map((subject, index) => (
              <li key={index} className="subject-tag">
                {subject}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Subject Times */}
      {bookDetails?.subject_times && (
        <div className="subjects-section">
          <h3 className="subjects-title">Subject Times</h3>
          <ul className="subject-list">
            {bookDetails.subject_times.map((time, index) => (
              <li key={index} className="subject-tag">
                {time}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
}
