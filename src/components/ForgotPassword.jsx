import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

function ForgotPassword() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/api/password/forgot", {
        email,
      });

      if (res.data.message) {
        setSuccessMsg("✔ تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.");
        setErrorMsg("");
      }
    } catch (err) {
      setErrorMsg("❌ حدث خطأ، تأكد من البريد الإلكتروني.");
      setSuccessMsg("");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{t("forgotPassword")}</h2>

        {successMsg && <p style={{ color: "green", textAlign: "center" }}>{successMsg}</p>}
        {errorMsg && <p style={{ color: "red", textAlign: "center" }}>{errorMsg}</p>}

        <input
          type="email"
          placeholder={t("email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit" className="form-btn">{t("submit")}</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
