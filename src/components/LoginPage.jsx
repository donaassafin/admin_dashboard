// LoginPage.js
import axios from "axios"; 
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import TranslateIcon from "../assets/translate.svg";
import LoginImage from "../assets/login-design.svg";
import "./LoginPage.css";

function LoginPage() {
  const { t, i18n } = useTranslation(); 
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
  }



};

  return (
    <div className="login-container">
      <button className="lang-icon-btn" onClick={toggleLanguage}>
        <img src={TranslateIcon} alt="lang" className="lang-icon-img" />
      </button>

      <div className="login-wrapper">
        <div className="image-card">
          <img src={LoginImage} alt="Login" className="login-image" />
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
            <button type="submit" className="form-btn">
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