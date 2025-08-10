import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import TranslateIcon from "../assets/translate.svg";
import "./Dashboard.css";

function Dashboard() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar");
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert(t("logoutFailed"));
      return;
    }

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
    }
  };



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
    <p>{t("players")}</p>
  </Link>

  <Link to="/stadiums" className="stat-card">
    <p>{t("stadiums")}</p>
  </Link>

  <Link to="/reports" className="stat-card">
    <p>{t("reports")}</p>
  </Link>

  <Link to="/pending-asks" className="stat-card">
    <p>{t("pendingRequests")}</p>
  </Link>

  <Link to="/manage-sports" className="stat-card">
    <p>{t("sports") || "الرياضات"}</p>
  </Link>
</div>

    </div>
  );
}

export default Dashboard;
