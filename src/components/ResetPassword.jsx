import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

function ResetPassword() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenFromURL = params.get("token");
    const emailFromURL = params.get("email");

    if (tokenFromURL) setToken(tokenFromURL);
    if (emailFromURL) setEmail(emailFromURL);
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post("http://localhost:8000/api/password/reset", {
        email,
        token,
        password,
        password_confirmation: passwordConfirmation,
      });

      setMessage("✔ تمت إعادة تعيين كلمة المرور بنجاح.");

      setTimeout(() => {
       navigate("/", { replace: true });

      }, 1500); 

    } catch (err) {
      console.error(err);
      setError(" فشل إعادة التعيين. تحقق من الرمز أو البيانات.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{t("resetPassword")}</h2>

        {message && <p style={{ color: "green", textAlign: "center" }}>{message}</p>}
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <input
          type="email"
          placeholder={t("email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder={t("token") || "رمز التحقق"}
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />

        <input
          type="password"
          placeholder={t("newPassword") || "كلمة المرور الجديدة"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder={t("confirmPassword") || "تأكيد كلمة المرور"}
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />

        <button type="submit" className="form-btn">
          {t("resetPassword")}
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
