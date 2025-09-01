// LoginPage.js
import axios from "axios"; 
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import sportLoading from "../assets/SportLoading.json"; 
import TranslateIcon from "../assets/translate.svg";
import "./LoginPage.css";
import LoginAnimation from "../assets/Loginanimation.json";


function LoginPage() {
  const { t, i18n } = useTranslation(); 
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  useEffect(() => {
    setEmail("");
    setPassword(""); 
  }, []);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const res = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      const token = res.data.data.token;
      localStorage.setItem("token", token);

      navigate("/dashboard");
    } 
    catch (err) {
      console.error("Login failed:", err);
      alert("فشل تسجيل الدخول، تحقق من البريد الالكتروني أو كلمة المرور");
    } finally {
      setLoading(false); 
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Lottie animationData={sportLoading} loop={true} style={{ width: 200, height: 200 }} />
      </div>
    );
  }

  return (
    <div className="login-container">
      <button className="lang-icon-btn" onClick={toggleLanguage}>
        <img src={TranslateIcon} alt="lang" className="lang-icon-img" />
      </button>

      <div className="login-wrapper">
        <div className="image-card">
        <Lottie animationData={LoginAnimation} loop={true} style={{ width: 300, height: 300 }} />

        </div>

        <div className="form-card">
          <form className="login-form" onSubmit={handleLogin}>
            <h2>{t("login")}</h2>
            <input
              type="email"
              placeholder={t("email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder={t("password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="form-btn" disabled={loading}>
              {t("login")}
            </button>
            <p className="forgot-link" onClick={() => navigate("/forgot-password")}>
              {t("forgotPassword")}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
