import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StadiumsTable.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import sportLoading from "../assets/SportLoading.json";

const StadiumsTable = () => {
  const [stadiums, setStadiums] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const fetchAll = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); 
      const res = await axios.get("http://localhost:8000/api/stadium/viewall", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStadiums(res.data.data.Stadiums || []);
    } catch (err) {
      console.error("Error fetching stadiums", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <Lottie animationData={sportLoading} loop={true} style={{ width: 220, height: 220 }} />
      </div>
    );
  }

  return (
    <div className="stadiums-page">
      <h1 className="page-title">{t("stadiumsList")}</h1>
      <table className="styled-table">
        <thead>
          <tr>
            <th>{t("stadiumName")}</th>
            <th>{t("location")}</th>
            <th>{t("Length")}</th>
            <th>{t("Width")}</th>
            <th>{t("owner")}</th>
            <th>{t("actions")}</th>
          </tr>
        </thead>
        <tbody>
          {stadiums.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.location}</td>
              <td>{s.Length} m</td>
              <td>{s.Width} m</td>
              <td>{s.owner_number}</td>
              <td>
                <button
                  className="btn-view"
                  onClick={() => navigate(`/stadiums/${s.id}`)}
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

export default StadiumsTable;
