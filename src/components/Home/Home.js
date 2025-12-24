import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import {
  FaSun,
  FaMoon,
  FaUsers,
  FaCarSide,
  FaCampground,
  FaCoffee,
  FaWhatsapp,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaClock,
} from "react-icons/fa";
import BannerVideo from "../../assets/banner-video.mp4";
import image1 from "../../assets/tiger-1.jpg";
import image2 from "../../assets/tiger-2.jpg";
import image3 from "../../assets/tiger-3.jpg";
import image4 from "../../assets/tiger-4.jpg";
import image5 from "../../assets/tiger-5.jpg";
import image6 from "../../assets/tiger-6.jpg";
import image7 from "../../assets/tiger-7.jpg";
import image8 from "../../assets/animal-8.jpg";
import image9 from "../../assets/animal-9.jpg";
import Content from "../content/Content";
import logo from "../../assets/1.png";
import AboutExplorer from "../aboutExplorer/aboutExplorer";
const fontLink1 = document.createElement("link");
fontLink1.href =
  "https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700;900&display=swap";
fontLink1.rel = "stylesheet";
document.head.appendChild(fontLink1);

const fontLink2 = document.createElement("link");
fontLink2.href =
  "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap";
fontLink2.rel = "stylesheet";
document.head.appendChild(fontLink2);

const EMAILJS_SERVICE_ID = "service_ol838de";
const EMAILJS_TEMPLATE_ID = "template_wbm3zna";
const EMAILJS_USER_ID = "iCSebDLdPFczerYmy";

const VIDEO_SRC = BannerVideo;
const IMAGE_URLS = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
];

const PACKAGES = [
  {
    name: "Morning Safari",
    price: "₹3,700 / Jeep",
    bg: image1,
    icon: <FaSun size={32} color="#FFD600" />,
    details: [
      { icon: <FaUsers />, text: "Up to 5 people in Jeep" },
      { icon: <FaCarSide />, text: "Jeep Safari with guide" },
      { icon: <FaCoffee />, text: "Breakfast break included" },
      { icon: <FaCampground />, text: "Multiple activities" },
      { icon: <FaClock />, text: "Timing: 6AM - 11AM" },
    ],
    description:
      "Start your adventure at dawn! Enjoy a guided safari, breakfast break, and fun activities in the wild.",
  },
  {
    name: "Evening Safari",
    price: "₹3,700 / Jeep",
    bg: image2,
    icon: <FaMoon size={32} color="#00BFFF" />,
    details: [
      { icon: <FaUsers />, text: "Up to 5 people in Jeep" },
      { icon: <FaCarSide />, text: "Jeep Safari with guide" },
      { icon: <FaCampground />, text: "Campfire break included" },
      { icon: <FaCoffee />, text: "Evening refreshments" },
      { icon: <FaClock />, text: "Timing: 1PM - 6PM" },
    ],
    description:
      "Experience the jungle as the sun sets! Includes a scenic safari, campfire break, and more activities.",
  },
];

const PHONE_NUMBER = "9165041080";

const SonewaniJungleSafari = () => {
  const [showHero, setShowHero] = useState(false);
  const [isHoveringTop, setIsHoveringTop] = useState(false);
  const [isHoveringBottom, setIsHoveringBottom] = useState(false);
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [showPackageForm, setShowPackageForm] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [formPeople, setFormPeople] = useState(2);
  const [formDate, setFormDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  });
  const [formName, setFormName] = useState("");
  const [formUserNumber, setFormUserNumber] = useState("");
  const [formUserEmail, setFormUserEmail] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [formSuccess, setFormSuccess] = useState(false);
  const [sending, setSending] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [visibleSections, setVisibleSections] = useState([]);
  const loopImages = [...IMAGE_URLS, ...IMAGE_URLS];

  useEffect(() => {
    if (!localStorage.getItem("hasVisited")) {
      localStorage.setItem("hasVisited", "true");
    }
    setTimeout(() => setShowHero(true), 400);

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => [...prev, entry.target.id]);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-section").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (sideNavOpen || showPackageForm || showConfirmPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [sideNavOpen, showPackageForm, showConfirmPopup]);

  const handleTouchStartTop = () => setIsHoveringTop(true);
  const handleTouchEndTop = () => setIsHoveringTop(false);
  const handleTouchStartBottom = () => setIsHoveringBottom(true);
  const handleTouchEndBottom = () => setIsHoveringBottom(false);

  const openPackageForm = (pkgName) => {
    setSelectedPackage(pkgName);
    setFormPeople(2);
    setFormName("");
    setFormUserNumber("");
    setFormUserEmail("");
    setFormErrors({});
    const d = new Date();
    d.setDate(d.getDate() + 1);
    setFormDate(d.toISOString().split("T")[0]);
    setShowPackageForm(true);
    setFormSuccess(false);
  };
  const closePackageForm = () => setShowPackageForm(false);

  const validateForm = () => {
    const errors = {};
    if (!formName.trim()) errors.name = "Name is required.";
    if (!/^\d{10}$/.test(formUserNumber))
      errors.userNumber = "Enter a valid 10-digit number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formUserEmail))
      errors.userEmail = "Enter a valid email address.";
    return errors;
  };

  const submitPackageForm = (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setSending(true);
    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          package: selectedPackage,
          people: formPeople,
          date: formDate,
          name: formName,
          user_number: formUserNumber,
          user_email: formUserEmail,
        },
        EMAILJS_USER_ID
      )
      .then(
        () => {
          setSending(false);
          setFormSuccess(true);
          setTimeout(() => {
            setShowPackageForm(false);
            setFormSuccess(false);
            setShowConfirmPopup(true);
            setTimeout(() => setShowConfirmPopup(false), 3500);
          }, 1200);
        },
        () => {
          setSending(false);
          alert("Failed to send booking. Please try again or contact us.");
        }
      );
  };

  return (
    <div
      style={{
        fontFamily: "'Poppins', Arial, sans-serif",
        margin: 0,
        padding: 0,
        minHeight: "100vh",
        background: "#111",
        overflowX: "hidden",
      }}
    >
      <style>{`
        .form-row { display: flex; gap: 18px; }
        .form-row .form-group { flex: 1 1 0; margin-bottom: 0; }
        @media (max-width: 700px) {
          .form-row { flex-direction: column; gap: 0; }
        }
          
@keyframes fadeInUp { 0% { opacity: 0; transform: translateY(40px);} 100% { opacity: 1; transform: translateY(0);} }
@keyframes popIn { 0% { opacity: 0; transform: scale(0.92);} 100% { opacity: 1; transform: scale(1);} }
@keyframes scrollLeft { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
@keyframes scrollRight { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.scroll-row { display: flex; width: fit-content; }
.scroll-row.top { animation: scrollLeft 40s linear infinite; }
.scroll-row.top.paused { animation-play-state: paused; }
.scroll-row.bottom { animation: scrollRight 40s linear infinite; }
.scroll-row.bottom.paused { animation-play-state: paused; }
.scroll-container::-webkit-scrollbar { display: none; }
.scroll-container { -ms-overflow-style: none; scrollbar-width: none; }
.animate-section { opacity: 0; transform: translateY(40px); transition: opacity 0.6s ease, transform 0.6s ease; }
.animate-section.visible { opacity: 1; transform: translateY(0); }
@media (max-width: 900px) {
  .hero-circle { width: 85vw !important; padding: 5vw !important; min-width: 0 !important; font-size: 1.1rem !important; }
  .gallery-img { width: 60vw !important; height: 35vw !important; min-width: 60vw !important; max-width: 80vw !important; margin-right: 12px !important; border-radius: 10px !important; }
}
@media (max-width: 600px) {
  .hero-circle { width: 96vw !important; padding: 4vw !important; min-width: 0 !important; font-size: 1rem !important; }
  .gallery-img { width: 90vw !important; height: 50vw !important; min-width: 90vw !important; max-width: 96vw !important; margin-right: 8px !important; border-radius: 8px !important; }
  .popup-img { max-width: 96vw !important; max-height: 70vh !important; }
}
.hamburger { display: none; background: none; border: none; font-size: 2.2rem; color: #fff; cursor: pointer; margin-right: 16px; }
@media (max-width: 768px) {
  .hamburger { display: block; }
  .header-btn { display: none !important; }
}
.side-nav-overlay { display: none; }
.side-nav { display: none; }
@media (max-width: 768px) {
  .side-nav-overlay { display: ${
    sideNavOpen ? "block" : "none"
  }; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.5); z-index: 2000; }
  .side-nav { display: block; position: fixed; top: 0; left: 0; width: 75vw; max-width: 320px; height: 100vh; background: #fff; box-shadow: 2px 0 24px rgba(0,0,0,0.15); z-index: 3000; transform: ${
    sideNavOpen ? "translateX(0)" : "translateX(-100%)"
  }; transition: transform 0.3s cubic-bezier(.68,-0.55,.27,1.55); padding: 36px 28px 24px 28px; display: flex; flex-direction: column; }
  .side-nav .close-btn { background: none; border: none; font-size: 2rem; color: #1b6897; align-self: flex-end; margin-bottom: 32px; cursor: pointer; }
  .side-nav .side-nav-link { background: #1b6897; color: #fff; border: none; border-radius: 7px; font-size: 1.1rem; font-weight: 500; padding: 14px 0; margin-bottom: 18px; cursor: pointer; letter-spacing: 1px; width: 100%; text-align: center; transition: background 0.2s; }
  .side-nav .side-nav-link:last-child { margin-bottom: 0; }
}
.packages-row { display: flex; flex-wrap: wrap; gap: 32px; justify-content: center; }
.package-price {
  font-family: 'Montserrat', Arial, sans-serif;
  font-size: 1.4rem;
  font-weight: 800;
  color: #ffd600;
  margin: 8px 0 18px 0;
  letter-spacing: 1px;
  text-shadow: 0 2px 8px rgba(0,0,0,0.35);
}

.package-price span {
  font-size: 0.9rem;
  font-weight: 500;
  opacity: 0.9;
}

@media (min-width: 900px) { .packages-row { flex-direction: row; justify-content: center; align-items: stretch; } }
@media (max-width: 899px) { .packages-row { flex-direction: column; align-items: center; } }
.package-card { background: #1b6897; position: relative; color: #fff; border-radius: 18px; padding: 24px 28px 32px 28px; margin: 20px auto; max-width: 420px; box-shadow: 0 8px 40px rgba(27,104,151,0.3); cursor: default; transition: transform 0.3s ease, box-shadow 0.3s ease; display: flex; flex-direction: column; align-items: center; text-align: center; animation: popIn 1s ease forwards; overflow: hidden; }
.package-card .bg-img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; opacity: 0.30; border-radius: 18px; filter: blur(0.5px); }
.package-card .bg-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(27,104,151,0.62); z-index: 1; border-radius: 18px; }
.package-card > * { position: relative; z-index: 2; }
.package-card:hover { transform: translateY(-8px); box-shadow: 0 16px 48px rgba(27,104,151,0.45); }
.package-icon { margin-bottom: 18px; }
.package-name { font-family: 'Montserrat', Arial, sans-serif; font-weight: 900; font-size: 1.8rem; letter-spacing: 1.5px; margin-bottom: 14px; animation: fadeInOut 4s ease-in-out infinite; }
.package-desc { font-family: 'Montserrat', Arial, sans-serif; font-weight: 300; font-size: 1rem; margin-bottom: 20px; max-width: 420px; animation: fadeInOut 6s ease-in-out infinite; }
@keyframes fadeInOut { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
.package-details { width: 100%; margin-bottom: 24px; text-align: left; }
.package-detail { display: flex; align-items: center; gap: 12px; font-weight: 500; font-size: 1rem; margin-bottom: 10px; }
.package-detail svg { flex-shrink: 0; color: #ffd600; }
.package-book-btn { background: #fff; color: #1b6897; border: none; border-radius: 30px; font-weight: 700; font-size: 1.1rem; padding: 12px 28px; cursor: pointer; letter-spacing: 1px; transition: background 0.2s ease; }
.package-book-btn:hover { background: #e0e0e0; }
.popup-form-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.85); display: flex; justify-content: center; align-items: center; z-index: 10000; }
.popup-form { background: #fff; border-radius: 18px; padding: 32px 36px; max-width: 600px; width: 90vw; box-shadow: 0 12px 48px rgba(0,0,0,0.25); position: relative; animation: popIn 0.4s ease forwards; }
.popup-close-btn { position: absolute; top: 14px; right: 14px; background: none; border: none; font-size: 1.8rem; cursor: pointer; color: #1b6897; font-weight: 700; line-height: 1; }
.popup-form h3 { margin-top: 0; margin-bottom: 20px; font-weight: 900; color: #1b6897; text-align: center; letter-spacing: 1.5px; }
.form-group { margin-bottom: 18px; display: flex; flex-direction: column; }
.form-group label { font-weight: 600; margin-bottom: 6px; color: #333; }
.form-group select, .form-group input { padding: 10px 12px; font-size: 1rem; border-radius: 8px; border: 1.5px solid #aaa; outline: none; transition: border-color 0.2s; }
.form-group select:focus, .form-group input:focus { border-color: #1b6897; }
.form-submit-btn { width: 100%; padding: 12px 0; background: #1b6897; color: #fff; border: none; border-radius: 30px; font-weight: 700; font-size: 1.1rem; cursor: pointer; letter-spacing: 1px; transition: background 0.2s ease; margin-top: 1rem }
.form-submit-btn:disabled { background: #888; cursor: not-allowed; }
.form-submit-btn:hover { background: #14527a; }
.form-success-message { text-align: center; font-weight: 700; color: #1b6897; font-size: 1.1rem; margin-top: 18px; }
.confirm-popup { position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%); background: #fff; color: #1b6897; font-weight: 700; font-size: 1.2rem; border-radius: 18px; padding: 36px 32px; z-index: 20000; box-shadow: 0 8px 32px rgba(27,104,151,0.18); text-align: center; animation: popIn 0.4s ease; }
.map-section { background: #f7f7f7; padding: 40px 0 0 0; text-align: center; }
.map-title { font-size: 2rem; font-weight: 700; color: #1b6897; margin-bottom: 16px; }
.map-iframe { width: 90vw; max-width: 600px; height: 300px; border: none; border-radius: 14px; margin-bottom: 32px; }
.footer { background: #111; color: #fff; text-align: center; padding: 40px 10px 18px 10px; font-size: 1rem; letter-spacing: 1px; margin-top: 0; position: relative; font-family: 'Montserrat', Arial, sans-serif; }
.footer-content { display: flex; flex-direction: column; align-items: center; gap: 14px; }
.footer-links { display: flex; gap: 22px; margin-bottom: 10px; }
.footer-link { color: #fff; text-decoration: none; font-size: 1.2rem; display: flex; align-items: center; gap: 6px; transition: color 0.2s; font-family: 'Montserrat', Arial, sans-serif; }
.footer-link:hover { color: #ffd600; }
.footer-whatsapp-btn { background: #25d366; color: #fff; border: none; border-radius: 50%; width: 46px; height: 46px; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 8px; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.12); transition: background 0.2s; }
.footer-whatsapp-btn:hover { background: #128c7e;}
.instructions-section { background: linear-gradient(135deg, #1b6897 0%, #0d3a5a 100%); color: #fff; padding: 40px 20px; border-radius: 16px; max-width: 900px; margin: 40px auto; box-shadow: 0 8px 32px rgba(27,104,151,0.3); }
.instructions-header { display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 24px; }
.instructions-header h2 { font-size: 1.8rem; margin: 0; }
.instructions-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; }
.instruction-item { background: rgba(255,255,255,0.1); padding: 16px; border-radius: 8px; display: flex; align-items: flex-start; gap: 12px; }
.instruction-item svg { flex-shrink: 0; margin-top: 2px; color: #ffd600; }
.instruction-text { font-size: 0.95rem; line-height: 1.5; }
      `}</style>
      <header
        style={{
          width: "90%",
          background: "#111",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 5vw",
          height: 80,
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 10,
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          borderBottom: "2px solid #1b6897",
        }}
      >
        <button
          className="hamburger"
          aria-label="Open menu"
          onClick={() => setSideNavOpen(true)}
        >
          &#9776;
        </button>
        <img
          src={logo}
          alt="Sonewani Wild Life Safari"
          style={{ width: "4rem", borderRadius: "4rem" }}
        />
        <button
          className="header-btn"
          style={{
            background: "#fff",
            color: "#1b6897",
            border: "none",
            borderRadius: 8,
            fontSize: 16,
            fontWeight: 500,
            padding: "10px 22px",
            cursor: "pointer",
            letterSpacing: 1,
            boxShadow: "0 2px 8px rgba(27,104,151,0.15)",
            transition: "background 0.2s, transform 0.2s",
            outline: "none",
            marginLeft: "auto",
          }}
          onClick={() => openPackageForm("Morning Safari")}
        >
          Book Now
        </button>
      </header>
      <div className="side-nav-overlay" onClick={() => setSideNavOpen(false)} />
      <nav className="side-nav" aria-hidden={!sideNavOpen}>
        <button
          className="close-btn"
          onClick={() => setSideNavOpen(false)}
          aria-label="Close menu"
        >
          &times;
        </button>
        <button
          className="side-nav-link"
          onClick={() => {
            setSideNavOpen(false);
            openPackageForm("Morning Safari");
          }}
        >
          Book Now
        </button>
        <a
          className="side-nav-link"
          href={`tel:${PHONE_NUMBER}`}
          onClick={() => setSideNavOpen(false)}
          style={{ textDecoration: "none" }}
        >
          Contact Us
        </a>
      </nav>
      <section
        style={{
          width: "100vw",
          height: "100vh",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: "5rem",
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 0,
          }}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1050&q=80"
            alt="Safari Background"
            style={{ width: "100vw", height: "100vh", objectFit: "cover" }}
          />
        </video>
        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            opacity: showHero ? 1 : 0,
            animation: showHero
              ? "fadeInUp 1.2s cubic-bezier(.68,-0.55,.27,1.55)"
              : "none",
          }}
        >
          <div
            className="hero-circle"
            style={{
              background: "#1b68977a",
              borderRadius: "50%",
              aspectRatio: "1 / 1",
              width: 420,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 8px 32px rgba(27,104,151,0.16)",
              animation: showHero
                ? "popIn 1.2s cubic-bezier(.68,-0.55,.27,1.55)"
                : "none",
              color: "#fff",
              padding: 50,
              minWidth: 280,
              maxWidth: "95vw",
              textAlign: "center",
            }}
          >
            <h1
              style={{
                fontSize: "2.1rem",
                fontWeight: 900,
                margin: 0,
                letterSpacing: 2,
                lineHeight: 1.1,
                textShadow: "0 2px 8px rgba(0,0,0,0.18)",
                animation: showHero ? "fadeInUp 1.3s 0.3s both" : "none",
              }}
            >
              THE SONEWANI WILDLIFE SAFARI EXPERIENCE
            </h1>
            <p
              style={{
                fontSize: "1.1rem",
                fontWeight: 300,
                margin: "18px 0 0 0",
                color: "#e9f5e1",
                animation: showHero ? "fadeInUp 1.3s 0.6s both" : "none",
              }}
            >
              SONEWANI WILDLIFE SAFARI is situated on acres of wild natural area
              and home to hundreds of animals. Explore one of India's wildest
              attractions and top things to do for every nature lover.
            </p>
            <a
              href="#packages"
              style={{
                display: "inline-block",
                marginTop: 22,
                background: "#fff",
                color: "#1b6897",
                fontWeight: 500,
                borderRadius: 30,
                padding: "10px 26px",
                fontSize: 16,
                letterSpacing: 1,
                textDecoration: "none",
                transition: "background 0.2s, color 0.2s",
                boxShadow: "0 2px 8px rgba(27,104,151,0.10)",
                animation: showHero ? "fadeInUp 1.3s 0.9s both" : "none",
              }}
            >
              Book Now &rarr;
            </a>
          </div>
        </div>
      </section>
      <section
        style={{
          backgroundColor: "#111",
          color: "#fff",
          padding: "60px 2vw",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "2.2rem",
            fontWeight: 700,
            marginBottom: "34px",
            color: "#fff",
            letterSpacing: 1,
          }}
        >
          DRIVE-THROUGH SAFARI
        </h2>
        <p
          style={{
            textAlign: "center",
            fontSize: "1.18rem",
            fontWeight: 300,
            marginBottom: "34px",
            color: "#ccc",
            maxWidth: 900,
            margin: "0 auto 34px",
          }}
        >
          Large herds of animals roam wide-open, naturalistic habitats in the
          drive-through wildlife park!
        </p>
        <div style={{ textAlign: "center", marginBottom: "34px" }}>
          <a
            href="#see-more"
            style={{
              display: "inline-block",
              padding: "14px 28px",
              backgroundColor: "#1b6897",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "5px",
              fontWeight: 500,
              letterSpacing: 1,
              fontSize: 18,
              transition: "background-color 0.3s",
            }}
          >
            WHAT YOU WILL SEE &rarr;
          </a>
        </div>
        <div
          className="scroll-container"
          style={{
            overflow: "hidden",
            width: "100%",
            position: "relative",
            margin: "0 auto 30px auto",
            maxWidth: "100vw",
          }}
          onMouseEnter={() => setIsHoveringTop(true)}
          onMouseLeave={() => setIsHoveringTop(false)}
          onTouchStart={handleTouchStartTop}
          onTouchEnd={handleTouchEndTop}
        >
          <div
            className={`scroll-row top${isHoveringTop ? " paused" : ""}`}
            style={{ alignItems: "center" }}
          >
            {loopImages.map((url, index) => (
              <img
                key={"top-" + index}
                src={url}
                alt={`Safari ${index}`}
                className="gallery-img"
                style={{
                  width: "380px",
                  height: "260px",
                  objectFit: "cover",
                  marginRight: "18px",
                  borderRadius: "16px",
                  cursor: "zoom-in",
                  transition: "transform 0.3s",
                  minWidth: 380,
                }}
                draggable={false}
              />
            ))}
          </div>
        </div>
        <div
          className="scroll-container"
          style={{
            overflow: "hidden",
            width: "100%",
            position: "relative",
            margin: "0 auto",
            maxWidth: "100vw",
          }}
          onMouseEnter={() => setIsHoveringBottom(true)}
          onMouseLeave={() => setIsHoveringBottom(false)}
          onTouchStart={handleTouchStartBottom}
          onTouchEnd={handleTouchEndBottom}
        >
          <div
            className={`scroll-row bottom${isHoveringBottom ? " paused" : ""}`}
            style={{ alignItems: "center" }}
          >
            {loopImages.map((url, index) => (
              <img
                key={"bottom-" + index}
                src={url}
                alt={`Safari ${index}`}
                className="gallery-img"
                style={{
                  width: "380px",
                  height: "260px",
                  objectFit: "cover",
                  marginRight: "18px",
                  borderRadius: "16px",
                  cursor: "zoom-in",
                  transition: "transform 0.3s",
                  minWidth: 380,
                }}
                draggable={false}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Updated Instructions Section */}
      <section
        id="instructions"
        className={`animate-section ${
          visibleSections.includes("instructions") ? "visible" : ""
        }`}
        style={{ maxWidth: 1200, margin: "0 auto 60px auto" }}
      >
        <div className="instructions-section">
          <div className="instructions-header">
            <FaInfoCircle size={32} />
            <h2>Important Safari Instructions</h2>
          </div>
          <div className="instructions-list">
            <div className="instruction-item">
              <FaInfoCircle size={18} />
              <div className="instruction-text">
                Full payment must be made before boarding for safari.
              </div>
            </div>
            <div className="instruction-item">
              <FaInfoCircle size={18} />
              <div className="instruction-text">
                Carry a government-issued identity proof (Aadhar card, Driving
                License, etc.).
              </div>
            </div>
            <div className="instruction-item">
              <FaInfoCircle size={18} />
              <div className="instruction-text">
                Arrive at least 15 minutes before your scheduled safari time.
              </div>
            </div>
            <div className="instruction-item">
              <FaInfoCircle size={18} />
              <div className="instruction-text">
                Follow all instructions of the safari guide and staff.
              </div>
            </div>
            <div className="instruction-item">
              <FaInfoCircle size={18} />
              <div className="instruction-text">
                Do not feed or disturb the animals.
              </div>
            </div>
            <div className="instruction-item">
              <FaInfoCircle size={18} />
              <div className="instruction-text">
                Maintain silence and avoid loud noises inside the safari area.
              </div>
            </div>
            <div className="instruction-item">
              <FaInfoCircle size={18} />
              <div className="instruction-text">
                Smoking and alcohol consumption are strictly prohibited during
                the safari.
              </div>
            </div>
            <div className="instruction-item">
              <FaInfoCircle size={18} />
              <div className="instruction-text">
                Children must be accompanied by adults at all times.
              </div>
            </div>
            <div className="instruction-item">
              <FaInfoCircle size={18} />
              <div className="instruction-text">
                Do not litter; use the dustbins provided.
              </div>
            </div>
            <div className="instruction-item">
              <FaInfoCircle size={18} />
              <div className="instruction-text">
                Safari is subject to weather and forest department regulations.
              </div>
            </div>
            <div className="instruction-item">
              <FaInfoCircle size={18} />
              <div className="instruction-text">
                Management is not responsible for loss of personal belongings.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safari Packages Section */}
      <section
        id="packages"
        className={`animate-section ${
          visibleSections.includes("packages") ? "visible" : ""
        }`}
        style={{
          backgroundColor: "#111",
          color: "#fff",
          padding: "60px 20px",
          maxWidth: 1300,
          margin: "40px auto 80px auto",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "2.4rem",
            fontWeight: 700,
            marginBottom: "40px",
            color: "#fff",
            letterSpacing: 1.2,
          }}
        >
          Safari Booking Packages
        </h2>
        <div className="packages-row">
          {PACKAGES.map(({ name, icon, details, description, bg, price }) => (
            <div key={name} className="package-card">
              <img src={bg} alt="" className="bg-img" />
              <div className="bg-overlay" />
              <div className="package-icon">{icon}</div>
              <div className="package-name">{name}</div>
              <div className="package-price">{price}</div>

              <div className="package-desc">{description}</div>
              <div className="package-details">
                {details.map(({ icon, text }, i) => (
                  <div key={i} className="package-detail">
                    {icon}
                    <span>{text}</span>
                  </div>
                ))}
              </div>
              <button
                className="package-book-btn"
                onClick={() => openPackageForm(name)}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </section>
      <Content />
      <AboutExplorer />

      {showPackageForm && (
        <div
          className="popup-form-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="package-form-title"
        >
          <form
            className="popup-form"
            onSubmit={submitPackageForm}
            autoComplete="off"
          >
            <button
              type="button"
              className="popup-close-btn"
              aria-label="Close form"
              onClick={closePackageForm}
            >
              &times;
            </button>
            <h3 id="package-form-title">Book Safari Package</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="formName">Name</label>
                <input
                  id="formName"
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                />
                {formErrors.name && (
                  <span style={{ color: "red", fontSize: 13 }}>
                    {formErrors.name}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="formUserNumber">Number</label>
                <input
                  id="formUserNumber"
                  type="text"
                  value={formUserNumber}
                  onChange={(e) =>
                    setFormUserNumber(e.target.value.replace(/\D/, ""))
                  }
                  maxLength={10}
                  required
                />
                {formErrors.userNumber && (
                  <span style={{ color: "red", fontSize: 13 }}>
                    {formErrors.userNumber}
                  </span>
                )}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="formUserEmail">Email-id</label>
                <input
                  id="formUserEmail"
                  type="email"
                  value={formUserEmail}
                  onChange={(e) => setFormUserEmail(e.target.value)}
                  required
                />
                {formErrors.userEmail && (
                  <span style={{ color: "red", fontSize: 13 }}>
                    {formErrors.userEmail}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="people-count">Number of People (min 2)</label>
                <input
                  id="people-count"
                  type="number"
                  min="2"
                  max="20"
                  value={formPeople}
                  onChange={(e) =>
                    setFormPeople(Math.max(2, Number(e.target.value)))
                  }
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="package-select">Package</label>
                <select
                  id="package-select"
                  value={selectedPackage}
                  onChange={(e) => setSelectedPackage(e.target.value)}
                  required
                >
                  <option value="">Select a Package</option>
                  {PACKAGES.map((pkg) => (
                    <option key={pkg.name} value={pkg.name}>
                      {pkg.name} (
                      {pkg.details.find((d) => d.icon.type === FaClock)?.text})
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="date-select">Select Date</label>
                <input
                  id="date-select"
                  type="date"
                  min={(() => {
                    const d = new Date();
                    d.setDate(d.getDate() + 1);
                    return d.toISOString().split("T")[0];
                  })()}
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="form-submit-btn"
              disabled={sending}
            >
              {sending ? "Sending..." : "Confirm Booking"}
            </button>
            {formSuccess && (
              <div className="form-success-message">
                Booking Confirmed! Thank you.
              </div>
            )}
          </form>
        </div>
      )}
      {showConfirmPopup && (
        <div className="confirm-popup">
          <div style={{ fontSize: 32, marginBottom: 12 }}>✅</div>
          <div>Successfully booked!</div>
          <div style={{ fontWeight: 400, marginTop: 10, fontSize: "1rem" }}>
            Will contact you soon 😊
            <br />
            For queries contact us at{" "}
            <a
              href={`tel:${PHONE_NUMBER}`}
              style={{ color: "#1b6897", textDecoration: "underline" }}
            >
              {PHONE_NUMBER}
            </a>
          </div>
        </div>
      )}
      <section
        className="map-section animate-section"
        id="location"
        style={{
          opacity: visibleSections.includes("location") ? 1 : 0,
          transform: visibleSections.includes("location")
            ? "translateY(0)"
            : "translateY(40px)",
        }}
      >
        <div className="map-title">
          <FaMapMarkerAlt style={{ color: "#1b6897", marginRight: 8 }} />
          SONEWANI WILDLIFE SAFARI Location
        </div>
        <iframe
          className="map-iframe"
          title="SONEWANI WILDLIFE SAFARI Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14811.500727709736!2d80.34433029950993!3d21.862349730058366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a2a43f780c1b3a7%3A0xcb5cf9bd4ac69e0!2sSonewani%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1749844523675!5m2!1sen!2sin"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <div
          style={{
            fontWeight: 500,
            color: "#444",
            fontSize: "1rem",
            marginBottom: 32,
          }}
        >
          Sonewani, Madhya Pradesh, India
        </div>
      </section>
      <footer
        className="footer animate-section"
        id="contact"
        style={{
          opacity: visibleSections.includes("contact") ? 1 : 0,
          transform: visibleSections.includes("contact")
            ? "translateY(0)"
            : "translateY(40px)",
        }}
      >
        <div className="footer-content">
          <div
            style={{
              fontWeight: 700,
              fontSize: "1.15rem",
              fontFamily: "'Montserrat', Arial, sans-serif",
            }}
          >
            SONEWANI WILDLIFE SAFARI
          </div>
          <div className="footer-links">
            <a
              className="footer-link"
              href={`https://wa.me/91${PHONE_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Connect on WhatsApp"
            >
              <button className="footer-whatsapp-btn">
                <FaWhatsapp />
              </button>
              WhatsApp
            </a>
            <a
              className="footer-link"
              href={`tel:${PHONE_NUMBER}`}
              title="Call Us"
            >
              <FaPhoneAlt /> {PHONE_NUMBER}
            </a>
          </div>
          <div
            style={{
              fontSize: "0.98rem",
              color: "#d4f2ff",
              fontFamily: "'Montserrat', Arial, sans-serif",
            }}
          >
            &copy; {new Date().getFullYear()} SONEWANI WILDLIFE SAFARI. All
            rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SonewaniJungleSafari;
