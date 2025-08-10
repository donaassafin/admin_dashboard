import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./PlayerDetails.css";

const PlayerDetails = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchPlayer = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/profile/view/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlayer(res.data.data.profile);
    } catch (err) {
      console.error("Error fetching player details", err);
      alert( (err.response?.data?.message || "Failed to fetch player details"));
    }
  };

  useEffect(() => {
    fetchPlayer();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm(t("confirmDeletePlayer") || "هل أنت متأكد من حذف اللاعب؟");
    if (!confirmed) return;

    try {
      const res = await axios.delete(`http://localhost:8000/api/profile/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.status) {
        alert(t("playerDeletedSuccessfully") || "تم حذف اللاعب بنجاح");
        navigate(-1); 
      } else {
        alert(t("failedToDeletePlayer") || "فشل في حذف اللاعب");
      }
    } catch (err) {
      console.error("Error deleting player", err);
      alert( (err.response?.data?.message || "فشل في حذف اللاعب"));
    }
  };

  if (!player) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>{t("loading")}</p>
      </div>
    );
  }

  return (
    <div className="player-details-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ⬅ {t("back")}
      </button>

      <h1 className="page-title">{t("playerDetails")}</h1>

      <div className="player-details-card no-avatar">
        {/* تفاصيل اللاعب */}
        <p><strong>{t("firstName")}:</strong> {player.first_name}</p>
        <p><strong>{t("lastName")}:</strong> {player.last_name}</p>
        <p><strong>{t("birthdate")}:</strong> {player.birthdate}</p>
        <p><strong>{t("gender")}:</strong> {player.gender}</p>
        <p><strong>{t("phone")}:</strong> {player.phone_number}</p>
        <p><strong>{t("address")}:</strong> {player.address}</p>
        <p><strong>{t("height")}:</strong> {player.height} cm</p>
        <p><strong>{t("weight")}:</strong> {player.weight} kg</p>
        <p><strong>{t("experience")}:</strong> {player.years_of_experience} {t("years")}</p>
        <p><strong>{t("injuries")}:</strong> {player.injuries}</p>
        <p><strong>{t("positionsPlayed")}:</strong> {player.positions_played}</p>
        <p><strong>{t("achievements")}:</strong> {player.notable_achievements}</p>
        <p><strong>{t("previousTeams")}:</strong> {player.previous_teams}</p>
        <p><strong>{t("notes")}:</strong> {player.extra_notes}</p>

        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <button className="delete" onClick={handleDelete}>
            {t("deletePlayer") || "حذف اللاعب"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetails;
