import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "./RequestDetails.css";
import sportLoading from "../assets/SportLoading.json"; 
import Lottie from "lottie-react";


const RequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/stadium/viewRequest/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setRequest(res.data.data);
      } catch (err) {
        console.error(t("fetchFailed"), err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequestDetails();
  }, [id, token, t]);

  if (loading) {
    return (
      <div className="loading-container">
        <Lottie animationData={sportLoading} loop={true} style={{ width: 200, height: 200 }} />
      </div>
    );
  }

  if (!request) {
    return <p className="error-message">{t("noRequestFound")}</p>;
  }

  return (
    <div className="request-details-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        {t("back")}
      </button>

      <h1 className="details-title">
        {t("requestDetails")} #{id}
      </h1>

      <div className="details-card">
        <p><strong>{t("name")}:</strong> {request.name}</p>
        <p><strong>{t("description")}:</strong> {request.description}</p>
        <p><strong>{t("location")}:</strong> {request.location}</p>
        <p><strong>{t("Length")}:</strong> {request.Length} م</p>
        <p><strong>{t("Width")}:</strong> {request.Width} م</p>
        <p><strong>{t("ownerNumber")}:</strong> {request.owner_number}</p>
        <p><strong>{t("startTime")}:</strong> {request.start_time}</p>
        <p><strong>{t("endTime")}:</strong> {request.end_time}</p>
        <p>
          <strong>{t("status")}:</strong>
          <span className={`status-badge ${request.status}`}>
            {t(request.status)}
          </span>
        </p>
        <p><strong>{t("price")}:</strong> {request.price} $</p>
        <p><strong>{t("deposit")}:</strong> {request.deposit} $</p>
        <p><strong>{t("duration")}:</strong> {request.duration} {t("hours")}</p>
        <p><strong>{t("adminNotes")}:</strong> {request.admin_notes || "-"}</p>
        <p><strong>{t("coordinates")}:</strong> {request.latitude}, {request.longitude}</p>
        <p><strong>{t("created_at")}:</strong> {new Date(request.created_at).toLocaleString()}</p>
        <p><strong>{t("updated_at")}:</strong> {new Date(request.updated_at).toLocaleString()}</p>
      </div>

      {request.photos?.length > 0 && (
        <div className="details-photos">
          {request.photos.map((photo, i) => (
            <img
              key={i}
              src={`http://localhost:8000${photo}`}
              alt={`${t("photo")} ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestDetails;
