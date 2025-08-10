// src/pages/PendingAsks.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./PendingAsks.css";

const PendingAsks = () => {
  const [asks, setAsks] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchAsks = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/stadium/viewAllRequest", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAsks(res.data.data.Asks || []);
    } catch (err) {
      console.error(t("fetchFailed"), err);
    }
  };

  const handleReply = async (id, status) => {
    const admin_notes = prompt(t("adminNotes"));
    if (!admin_notes && status === "rejected") return;

    try {
      await axios.post(
        `http://localhost:8000/api/stadium/replyask/${id}`,
        { status, admin_notes },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAsks();
    } catch (err) {
      alert(t("replyFailed"));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(t("confirmDeleteAsk"))) {
      try {
        const res = await axios.delete(
          `http://localhost:8000/api/deleteRequest/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        if (res.data.status) {
          fetchAsks();
        } else {
          alert(t("deleteFailed"));
        }
      } catch (err) {
        console.error(t("deleteError"), err);
        alert(t("deleteFailed"));
      }
    }
  };

  useEffect(() => {
    fetchAsks();
  }, []);

  const goToDetails = (id) => {
    navigate(`/request-details/${id}`);
  };

  return (
    <div className="pending-asks-page">
      <h1 className="page-title">{t("pendingRequests")}</h1>

      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>{t("name")}</th>
              <th>{t("location")}</th>
              <th>{t("status")}</th>
              <th>{t("photos")}</th>
              <th>{t("notes")}</th>
              <th>{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {asks.map((ask) => (
              <tr
                key={ask.id}
                className="clickable-row"
                onClick={() => goToDetails(ask.id)}
              >
                <td>{ask.name}</td>
                <td>{ask.location}</td>
                <td>
                  <span className={`status-badge ${ask.status}`}>
                    {t(ask.status)}
                  </span>
                </td>
                <td>
                  <div className="photo-preview">
                    {ask.photos?.map((photo, i) => (
                      <img
                        key={i}
                        src={`http://localhost:8000${photo}`}
                        alt="stadium"
                      />
                    ))}
                  </div>
                </td>
                <td>{ask.admin_notes || "-"}</td>
                <td onClick={(e) => e.stopPropagation()}>
                  {ask.status === "pending" && (
                    <>
                      <button
                        className="btn btn-approve"
                        onClick={() => handleReply(ask.id, "approved")}
                      >
                        {t("approve")}
                      </button>
                      <button
                        className="btn btn-reject"
                        onClick={() => handleReply(ask.id, "rejected")}
                      >
                        {t("reject")}
                      </button>
                    </>
                  )}
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(ask.id)}
                  >
                    {t("delete")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingAsks;
