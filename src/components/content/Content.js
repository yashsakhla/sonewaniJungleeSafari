import React from "react";
import img from "../../assets/img1.png";
import img2 from "../../assets/img2.png";
import img3 from "../../assets/img3.png";
import img4 from "../../assets/img4.png";
import img5 from "../../assets/img5.DNG";

function Content() {
  const containerStyle = {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#000", // Black background
    color: "#fff",
    padding: "20px",
    textAlign: "center",
    minHeight: "100vh",
  };

  const sectionStyle = {
    margin: "30px auto",
    padding: "20px",
    borderRadius: "12px",
    maxWidth: "900px",
    boxShadow: "0 4px 15px rgba(255,255,255,0.1)",
    backgroundColor: "#111", // Dark card background
  };

  const imageContainerStyle = {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    flexWrap: "wrap", // Makes responsive on smaller screens
  };

  const imageStyle = {
    width: "100%",
    height: "350px",
    objectFit: "cover",
    borderRadius: "10px",
    transition: "transform 0.3s ease",
  };


  const headingStyle = {
    fontSize: "26px",
    color: "#00ff99", // Jungle green accent
    marginBottom: "10px",
  };

  const captionStyle = {
    fontSize: "16px",
    color: "#ccc",
    marginTop: "15px",
  };

  return (
    <div style={containerStyle}>
      <h1
        style={{
          color: "#00e676",
          textShadow: "0 0 10px #00e676",
          marginBottom: "40px",
        }}
      >
        🌿 Jungle Safari Experience 🌿
      </h1>

      {/* Stay Place Section */}
      <div style={sectionStyle}>
        <h2 style={headingStyle}>🏕️ Stay Place</h2>
        <div style={imageContainerStyle}>
          <img
            src={img}
            alt="Stay Place 1"
            style={imageStyle}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
          <img
            src={img2}
            alt="Stay Place 2"
            style={imageStyle}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </div>
        <p style={captionStyle}>
          A calm and cozy stay near the jungle with nature all around. Perfect
          place to relax before the adventure begins!
        </p>
      </div>

      {/* Snack Break Section */}
      <div style={sectionStyle}>
        <h2 style={headingStyle}>🍪 Snack Break</h2>
        <div style={imageContainerStyle}>
          <img
            src={img3}
            alt="Snack Break 1"
            style={imageStyle}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
          <img
            src={img4}
            alt="Snack Break 2"
            style={imageStyle}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </div>
        <p style={captionStyle}>
          Enjoy some quick snacks and tea with the sound of birds and the cool
          forest breeze.
        </p>
      </div>

      {/* Lunch Section */}
      <div style={sectionStyle}>
        <h2 style={headingStyle}>🍽️ Lunch Time</h2>
        <div style={imageContainerStyle}>
          <img
            src={img5}
            alt="Lunch 1"
            style={imageStyle}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </div>
        <p style={captionStyle}>
          Delicious local cuisine served in open nature with a view of the
          jungle greens.
        </p>
      </div>
    </div>
  );
}

export default Content;
