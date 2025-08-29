import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
export default function App() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/works/:id" element={<BookDetails />} />
      </Routes>
    </Router>

  );
}
