import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";

// import { withRouter } from "react-router";
import "../index.css";
const EditBook = (props) => {
  const [book, setBook] = useState({
    title: "",
    price: null,
    desc: "",
    cover: "",
  });
  const inputRef = useRef(null);
  const location = useLocation();
  // gives id
  const id = parseInt(location.pathname.split("/")[2]);

  // useLocation hook gives the url of current page

  useEffect(() => {
    const fectchData = async () => {
      const response = await axios.get("http://localhost:5000/books");
      const item = response.data.filter((each) => each.id === id)[0];
      setBook((prev) => ({ ...prev, ...item }));
    };
    fectchData();
    inputRef.current.focus();
  }, [id]);

  console.log(book);

  // it is used to make navigation easy
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:5000/book/" + id, book);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  // ! use these state manangement in form its very useful
  // * step 1 : keep the name of input fields and state feilds same
  // * step 2 : use spread operation while setting the setBook method(ie., while using setBook)
  const onEventChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // e.target.name is a string to avoid error we write in above format
  };

  return (
    <div className="height-100">
      <div className="container mt-3 mb-5">
        <div className="row">
          <div className="col-12 text-center">
            <h2>EDIT BOOK</h2>
          </div>
        </div>
      </div>
      <div className="d-flex  justify-content-center align-items-center container ">
        <form
          className="row shadow bg-dark text-white form p-3 m-1 p-lg-5"
          onSubmit={handleSubmit}
        >
          <div className="col-12 mb-2">
            <label htmlFor="title">Title</label>
            <input
              ref={inputRef}
              id="title"
              className="form-control"
              type="text"
              name="title"
              required
              value={book.title}
              onChange={onEventChange}
            />
          </div>
          <div className="col-12 mb-2">
            <label htmlFor="price">Price</label>
            <input
              name="price"
              required
              value={book.price}
              id="price"
              className="form-control"
              type="number"
              onChange={onEventChange}
            />
          </div>
          <div className="col-12 mb-2">
            <label htmlFor="desc">Description</label>
            <textarea
              required
              name="desc"
              id="desc"
              value={book.desc}
              className="form-control"
              type="text"
              rows={5}
              onChange={onEventChange}
            />
          </div>
          <div className="col-12 mb-2">
            <label htmlFor="cover">Cover image</label>
            <input
              name="cover"
              required
              value={book.cover}
              id="cover"
              className="form-control"
              type="text"
              onChange={onEventChange}
            />
          </div>
          <div className="col-12 d-flex justify-content-end mt-3">
            <button className="btn btn-success" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// export default withRouter(EditBook);
export default EditBook;
// with roter is depricated , Use Navigate form react-router
