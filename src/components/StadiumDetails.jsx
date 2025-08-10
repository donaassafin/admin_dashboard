import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./StadiumDetails.css";

const StadiumDetails = () => {
  const { id } = useParams();
  const [stadium, setStadium] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchStadium = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/stadium/view/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStadium(res.data.data.Stadium);
    } catch (err) {
      console.error("Failed to fetch stadium details", err);
      alert(t("fetchFailed") || "فشل في جلب بيانات الملعب");
      navigate("/stadiums");
    }
  };

  useEffect(() => {
    fetchStadium();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm(t("confirmDeleteStadium") || "هل أنت متأكد من حذف الملعب؟");
    if (!confirmed) return;
    try {
      const res = await axios.delete(`http://localhost:8000/api/stadium/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.status) {
        alert(t("stadiumDeletedSuccessfully") || "تم حذف الملعب بنجاح");
        navigate(-1);
      } else {
        alert(t("failedToDeleteStadium") || "فشل في حذف الملعب");
      }
    } catch (err) {
      console.error("Error deleting stadium", err);
      alert( (err.response?.data?.message || "فشل في حذف الملعب"));
    }
  };

  if (!stadium) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>{t("loading") || "جار التحميل..."}</p>
      </div>
    );
  }

  return (
    <div className="stadium-details-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ⬅ {t("back") || "رجوع"}
      </button>

      <h1 className="page-title">{t("stadiumDetails") || "تفاصيل الملعب"}</h1>

      <div className="stadium-details-card no-avatar">
        <p><strong>{t("stadiumName") || "اسم الملعب"}:</strong> {stadium.name}</p>
        <p><strong>{t("location") || "الموقع"}:</strong> {stadium.location}</p>
        <p><strong>{t("Length") || "الطول"}:</strong> {stadium.Length} m</p>
        <p><strong>{t("Width") || "العرض"}:</strong> {stadium.Width} m</p>
        <p><strong>{t("description") || "الوصف"}:</strong> {stadium.description}</p>
        <p><strong>{t("owner") || "مالك الملعب"}:</strong> {stadium.owner_number}</p>
        <p><strong>{t("created_at") || "تاريخ الإنشاء"}:</strong> {stadium.created_at}</p>

        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <button className="delete" onClick={handleDelete}>
            {t("deleteStadium") || "حذف الملعب"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StadiumDetails;
