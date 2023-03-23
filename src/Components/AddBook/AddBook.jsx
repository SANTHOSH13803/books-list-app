import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";

import "../index.css";
const AddBook = () => {
  const [book, setBook] = useState({
    title: "",
    price: null,
    desc: "",
    cover: "",
  });
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // it is used to make navigation easy
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/books", book);
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
      <div className="d-flex mt-2 justify-content-center align-items-center container ">
        <form
          className="row shadow bg-dark text-white form p-3 m-1 p-lg-5"
          onSubmit={handleSubmit}
        >
          <div className="col-12 text-center">
            <h2>ADD BOOK</h2>
          </div>
          <div className="col-12 mb-2">
            <label htmlFor="title">Title</label>
            <input
              ref={inputRef}
              id="title"
              className="form-control"
              type="text"
              name="title"
              required
              onChange={onEventChange}
            />
          </div>
          <div className="col-12 mb-2">
            <label htmlFor="price">Price</label>
            <input
              name="price"
              required
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
              id="cover"
              className="form-control"
              type="text"
              onChange={onEventChange}
            />
          </div>
          <div className="col-12 d-flex justify-content-end mt-3">
            <button className="btn btn-primary" type="submit">
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// export default withRouter(AddBook);
export default AddBook;
// with roter is depricated , Use Navigate form react-router
