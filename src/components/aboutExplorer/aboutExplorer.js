import React from "react";

const AboutExplorer = () => {
  const containerStyle = {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#000", // black background
    color: "#fff",
    padding: "40px 20px",
    minHeight: "100vh",
    textAlign: "center",
  };

  const cardStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    backgroundColor: "#111",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(255,255,255,0.1)",
    padding: "30px",
  };

  const headingStyle = {
    fontSize: "28px",
    color: "#00e676",
    marginBottom: "10px",
  };

  const subheadingStyle = {
    fontSize: "18px",
    color: "#aaa",
    marginBottom: "20px",
  };

  const paragraphStyle = {
    fontSize: "16px",
    color: "#ccc",
    lineHeight: "1.6",
    textAlign: "justify",
  };

  const contactStyle = {
    marginTop: "30px",
    fontSize: "16px",
    color: "#00e676",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>

        <h1 style={headingStyle}>Gyan Sharma</h1>
        <h3 style={subheadingStyle}>
          🐾 Wildlife Explorer | Naturalist | 44 Years of Experience
        </h3>

        <p style={paragraphStyle}>
          Gyanchand Sharma is a renowned wildlife explorer and naturalist with
          over four decades of hands-on experience studying India’s rich flora
          and fauna. Having spent years in the dense forests of Madhya Pradesh,
          he has guided countless travelers and researchers through the mesmerizing wilderness.
        </p>

        <p style={paragraphStyle}>
          His deep knowledge of animal behavior, bird migration patterns, and
          forest ecology has made him a mentor to many budding explorers.
          Gyanchand’s passion for conservation and his commitment to preserving
          nature’s balance have earned him respect from the global wildlife
          community.
        </p>

        <p style={paragraphStyle}>
          When not on expeditions, he conducts workshops and awareness programs
          for local communities to promote responsible tourism and wildlife
          protection.
        </p>

        <div style={contactStyle}>
          <p>📧 Email: sonewaniwildlifesafari@gmail.com</p>
          <p>📞 Phone: +91 9165041080</p>
        </div>
      </div>
    </div>
  );
};

export default AboutExplorer;
