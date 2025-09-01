import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PlayersTable.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import sportLoading from "../assets/SportLoading.json";

const PlayersTable = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchPlayers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/api/profile/viewall", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlayers(res.data.data.profiles || []);
    } catch (err) {
      console.error("Error fetching players", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <Lottie animationData={sportLoading} loop={true} style={{ width: 220, height: 220 }} />
      </div>
    );
  }

  return (
    <div className="players-page">
      <h1 className="page-title">{t("playersList")}</h1>
      <table className="styled-table">
        <thead>
          <tr>
            <th>{t("firstName")}</th>
            <th>{t("lastName")}</th>
            <th>{t("birthdate")}</th>
            <th>{t("gender")}</th>
            <th>{t("phone")}</th>
            <th>{t("address")}</th>
            <th>{t("actions")}</th>
          </tr>
        </thead>
        <tbody>
          {players.map((p) => (
            <tr key={p.id}>
              <td>{p.first_name}</td>
              <td>{p.last_name}</td>
              <td>{p.birthdate}</td>
              <td>{p.gender}</td>
              <td>{p.phone_number}</td>
              <td>{p.address}</td>
              <td>
                <button
                  className="btn-view"
                  onClick={() => navigate(`/players/${p.id}`)}
                >
                  {t("view")}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayersTable;
