import "../styles/BookCard.css";
import { useNavigate } from "react-router-dom";
export default function BookCard({ book }) {
    
    const navigate = useNavigate();
      const handleClick = (hell) => {
    navigate(`/book${hell}`, { state: { book } }); // pass full book details

  };
  return (
    <div className="book-card" onClick={()=>handleClick(book.id)}>
      <img
        src={book.coverUrl}
        alt={book.title}

      />
      <h3 >{book.title}</h3>

    </div>
  );
}
