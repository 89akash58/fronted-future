import React, { useState, useEffect } from "react";
import "./HelpCenter.css";
import { BiBook } from "react-icons/bi";

const HelpCenter = () => {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCards, setFilteredCards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    // Send the data to the server (API call)
    fetch("https://backend-future.onrender.com/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // Optionally, refresh the cards or handle success
        handleCloseModal();
        fetchCards();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const fetchCards = async () => {
    try {
      const response = await fetch("https://backend-future.onrender.com/cards");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCards(data);
      setFilteredCards(data); // Initially display all cards
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };
  useEffect(() => {
    fetchCards();
  }, []);

  const handleSearch = () => {
    const results = cards.filter((card) =>
      card.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCards(results);
  };

  return (
    <div className="help-center">
      <nav className="navbar">
        <div className="navbar-left">
          <a href="#" className="logo">
            <BiBook
              style={{
                background: "white",
                color: "black",
                fontSize: "24px",
                borderRadius: "2px",
                marginRight: "10px",
              }}
            />
            Abstract | Help Center
          </a>
        </div>
        <div className="navbar-right">
          <button className="request-button" onClick={handleOpenModal}>
            Submit a request
          </button>
        </div>
      </nav>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Submit a Request</h2>
            <input
              className="request"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="request"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      )}
      <header className="header">
        <div className="header-content">
          <h1>How can we help?</h1>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>→</button>
          </div>
        </div>
      </header>
      <div className="content">
        <div className="grid">
          {filteredCards.map((card) => (
            <div className="grid-item" key={card.id}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
      <footer className="footer">
        <div className="footer-section">
          <h4>Abstract</h4>
          <ul>
            <li>Branches</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li>Blog</li>
            <li>Help Center</li>
            <li>Release Notes</li>
            <li>Status</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Community</h4>
          <ul>
            <li>Twitter</li>
            <li>LinkedIn</li>
            <li>Facebook</li>
            <li>Dribbble</li>
            <li>Podcast</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Legal</li>
            <h4>Contact Us</h4>
            <ul>
              <li>Testuser@example.com</li>
            </ul>
          </ul>
        </div>
        <div className="footer-sections">
          <ul>
            <li>
              <BiBook
                style={{
                  background: "white",
                  color: "black",
                  fontSize: "24px",
                  borderRadius: "2px",
                }}
              />
            </li>
            <li>@copyright 2022</li>
            <li>Abstract Studio Design, Inc.</li>
            <li>All rights reserved</li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default HelpCenter;
