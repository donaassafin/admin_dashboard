import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PlayersTable.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const PlayersTable = () => {
  const [players, setPlayers] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchPlayers = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/profile/viewall", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlayers(res.data.data.profiles || []);
    } catch (err) {
      console.error("Error fetching players", err);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

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
