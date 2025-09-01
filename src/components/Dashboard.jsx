import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Lottie from "lottie-react";
import sportLoading from "../assets/SportLoading.json";
import TranslateIcon from "../assets/translate.svg";
import "./Dashboard.css";
import { FaTrophy ,FaUsers, FaFutbol, FaClipboardList, FaHourglassHalf, FaBasketballBall } from "react-icons/fa";



function Dashboard() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    setLoading(false);
  }, [navigate]);

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar");
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert(t("logoutFailed"));
      return;
    }

    setLogoutLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.status === true) {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        alert(t("logoutFailed"));
      }
    } catch (error) {
      console.error("Logout failed", error);
      alert(t("logoutFailed"));
    } finally {
      setLogoutLoading(false);
    }
  };

  if (loading || logoutLoading) {
    return (
      <div className="loading-container">
        <Lottie
          animationData={sportLoading}
          loop={true}
          style={{ width: 220, height: 220 }}
        />
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">{t("dashboard")}</h1>

        <div className="dashboard-actions">
          <button className="lang-btn" onClick={toggleLanguage}>
            <img src={TranslateIcon} alt="lang" className="lang-icon-img" />
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            {t("logout")}
          </button>
        </div>
      </div>

      <div className="stats-grid">
  <Link to="/players" className="stat-card">
    <FaUsers className="stat-icon" />
    <p>{t("players")}</p>
  </Link>

  <Link to="/stadiums" className="stat-card">
    <FaFutbol className="stat-icon" />
    <p>{t("stadiums")}</p>
  </Link>

  <Link to="/reports" className="stat-card">
    <FaClipboardList className="stat-icon" />
    <p>{t("reports")}</p>
  </Link>

  <Link to="/pending-asks" className="stat-card">
    <FaHourglassHalf className="stat-icon" />
    <p>{t("pendingRequests")}</p>
  </Link>

  <Link to="/manage-sports" className="stat-card">
    <FaBasketballBall className="stat-icon" />
    <p>{t("sports") || "الرياضات"}</p>
  </Link>

  <Link to="/leagues" className="stat-card">
  <FaTrophy className="stat-icon" />
  <p>{t("leagues") || "الدوريات"}</p>
</Link>
</div>

    </div>
  );
}

export default Dashboard;
