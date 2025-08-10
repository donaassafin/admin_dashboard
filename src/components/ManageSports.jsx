import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "./ManageSports.css";

function ManageSports() {
  const { t } = useTranslation();
  const [sports, setSports] = useState([]);
  const [form, setForm] = useState({ name: "", max_players: "", photo: null });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const fetchSports = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/sport/viewall", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSports(res.data.data["Sports:"] || []);
    } catch (err) {
      console.error(t("fetchFailed"), err);
    }
  };

  useEffect(() => {
    fetchSports();
  }, []);

  const translateError = (message) => {
    if (message.includes("The name has already been taken")) {
      return t("nameTaken");
    }
    if (message.includes("photo must not be greater than 2048 kilobytes")) {
      return t("imageTooLarge");
    }
    return message;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.max_players || (!form.photo && !editingId)) {
      setMessage(t("fillRequiredFields"));
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("max_players_per_team", form.max_players);
    if (form.photo) {
      formData.append("photo", form.photo);
    }

    const url = editingId
      ? `http://localhost:8000/api/sport/update/${editingId}`
      : "http://localhost:8000/api/sport/create";

    try {
      const res = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.status === true || res.data.status === "true") {
        setMessage(editingId ? t("editSuccess") : t("addSuccess"));
        setForm({ name: "", max_players: "", photo: null });
        setEditingId(null);
        fetchSports();
      } else {
        setMessage(t("operationFailed") + ": " + (res.data.message || ""));
      }
    } catch (err) {
      console.error(t("operationFailed"), err);
      if (err.response?.data?.message) {
        setMessage(translateError(err.response.data.message));
      } else {
        setMessage(t("operationFailed"));
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t("confirmDelete"))) return;
    try {
      await axios.delete(`http://localhost:8000/api/sport/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(t("deleteSuccess"));
      fetchSports();
    } catch (err) {
      console.error(t("deleteFailed"), err);
      setMessage(t("deleteFailed"));
    }
  };

  const handleEdit = (sport) => {
    setForm({
      name: sport.name,
      max_players: sport.max_players_per_team || "",
      photo: null,
    });
    setEditingId(sport.id);
  };

  return (
    <div className="manage-sports-container">
      <h1 className="manage-sports-title">{t("ManageSports")}</h1>

      {message && <p className="message">{message}</p>}

      <form
        onSubmit={handleSubmit}
        className="sport-form"
        style={{ maxWidth: "400px", margin: "auto", marginBottom: "30px" }}
      >
        <input
          type="text"
          placeholder={t("sportName")}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder={t("playersCount")}
          value={form.max_players}
          onChange={(e) => setForm({ ...form, max_players: e.target.value })}
          required
          min="1"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setForm({ ...form, photo: e.target.files[0] })}
        />
        <button type="submit">{editingId ? t("edit") : t("add")}</button>
      </form>

      <div className="sports-list">
        {sports.length === 0 && <p>{t("noSportsFound")}</p>}
        {sports.map((sport) => (
          <div key={sport.id} className="sport-card">
            <h3>{sport.name}</h3>
            <p>
              {t("playersCount")}: {sport.max_players_per_team || "?"}
            </p>
            {sport.photo ? (
              <img
                src={`http://localhost:8000/storage/${sport.photo.replace(
                  /^\/?storage\//,
                  ""
                )}`}
                alt={sport.name}
                className="sport-image"
              />
            ) : (
              <p>{t("noImage")}</p>
            )}
            <div className="btn-group" style={{ justifyContent: "center" }}>
              <button className="edit" onClick={() => handleEdit(sport)}>
                {t("edit")}
              </button>
              <button className="delete" onClick={() => handleDelete(sport.id)}>
                {t("delete")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageSports;
