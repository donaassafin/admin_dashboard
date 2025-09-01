import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LeagueTable.css";
import { useTranslation } from "react-i18next";
import Lottie from "lottie-react";
import sportLoading from "../assets/SportLoading.json";

const LeaguesTable = () => {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const fetchAll = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://127.0.0.1:8000/api/leagues", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeagues(res.data.data || []);
    } catch (err) {
      console.error("Error fetching leagues", err);
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
        <Lottie
          animationData={sportLoading}
          loop={true}
          style={{ width: 220, height: 220 }}
        />
      </div>
    );
  }

  return (
    <div className="leagues-page">
      <h1 className="page-title">{t("leaguesList")}</h1>
      <table className="styled-table">
        <thead>
          <tr>
            <th>{t("leagueName")}</th>
            <th>{t("startDate")}</th>
            <th>{t("endDate")}</th>
            <th>{t("price")}</th>
            <th>{t("prize")}</th>
            <th>{t("status")}</th>
          </tr>
        </thead>
        <tbody>
          {leagues.map((l) => (
            <tr key={l.id}>
              <td>{l.name}</td>
              <td>{l.start_date}</td>
              <td>{l.end_date}</td>
              <td>{l.price} </td>
              <td>{l.prize}</td>
              <td>{l.status === "active" ? t("active") : t("finished")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaguesTable;
