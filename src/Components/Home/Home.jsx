import React, { useState, useEffect } from "react";
import "../index.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [books, setBook] = useState([]);

  const apiUrl = "http://localhost:5000/books";
  // ! If we try to use axios using node in local network it throws cors error
  // * To remove it in node terminal do this "npm i cors"
  useEffect(() => {
    const apiRequest = async () => {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        setBook(data);
      } catch (error) {
        console.log(error);
      }
    };
    apiRequest();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:5000/book/" + id);
      window.location.reload();
      // !this line reload the page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <nav className="col-12 d-flex justify-content-between align-items-center p-2 mb-5">
          <h1>CRUD OPERATIONS </h1>
          <Link to="/add-book">
            <button className="btn btn-primary">ADD</button>
          </Link>
        </nav>

        {books.map((eachBook) => {
          const { title, id, price, desc, cover } = eachBook;
          const validCover = cover.includes("http");

          return (
            <div className="col-md-6 col-xl-4 mb-4" key={id}>
              {/* cards  */}
              <div className="card" style={{ width: "18rem" }}>
                <img
                  src={
                    validCover
                      ? cover
                      : "https://images.unsplash.com/photo-1598791318878-10e76d178023?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  }
                  className="card-img-top image"
                  alt="card"
                />
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between">
                    <h5 className="card-title">{title}</h5>
                    <p className="price" style={{ fontWeight: 600 }}>
                      Rs.{price}
                    </p>
                  </div>
                  <p className="card-text">{desc}</p>
                  <Link to={`/book/${id}`} className="btn btn-primary">
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger m-2"
                    onClick={() => handleDelete(id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
