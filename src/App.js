import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import AddBook from "./Components/AddBook/AddBook";
import EditBook from "./Components/EditBook/EditBook";
import Home from "./Components/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/book/:id" element={<EditBook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
