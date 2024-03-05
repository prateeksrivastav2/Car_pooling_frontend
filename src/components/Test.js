import React from 'react';

const Test = () => {
  return (
    <div className="home-container">
      <header>
        <h1>Welcome to our Car Rental Service</h1>
        <p>Find the perfect car for your journey!</p>
      </header>
      <main>
        <section className="search-section">
          <h2>Search for a Car</h2>
          <form>
            <label htmlFor="location">Location:</label>
            <input type="text" id="location" name="location" placeholder="Enter pickup location" />

            <label htmlFor="date">Pickup Date:</label>
            <input type="date" id="date" name="date" />

            <label htmlFor="returnDate">Return Date:</label>
            <input type="date" id="returnDate" name="returnDate" />

            <button type="submit">Search</button>
          </form>
        </section>

        <section className="featured-section">
          <h2>Featured Cars</h2>
          <div className="featured-cars">
            {/* Featured car components go here */}
          </div>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 Car Rental Service</p>
      </footer>
    </div>
  );
};

export default Test;
