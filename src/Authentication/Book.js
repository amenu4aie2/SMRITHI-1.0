import React from "react";
import "./Book.css"; // Assuming you have the CSS in a file named Book.css

const Book = () => {
  return (
    <div className="book" style={{ width: "20rem", height: "40rem" }}> {/* Adjust the width and height as needed */}
      <span className="page turn"></span>
      <span className="page turn"></span>
      <span className="page turn"></span>
      <span className="page turn"></span>
      <span className="page turn"></span>
      <span className="page turn"></span>
      <span className="cover"></span>
      <span className="page"></span>
      <span className="cover turn"></span>
    </div>
  );
};

export default Book;
