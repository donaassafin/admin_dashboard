// src/components/Reports.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import "./Reports.css";

const mockReports = [
  {
    id: 1,
    type: "player",
    reporter: "Ali",
    reported: "Omar",
    content: "سلوك غير لائق أثناء المباراة.",
  },
  {
    id: 2,
    type: "stadium",
    reporter: "Yousef",
    reported: "Stadium AlSham",
    content: "الملعب غير نظيف.",
  },
  {
    id: 3,
    type: "team",
    reporter: "Sara",
    reported: "Team Falcons",
    content: "تأخير دائم في الوصول.",
  },
];

function Reports() {
  const { t } = useTranslation();

  return (
    <div className="reports-container">
      <h2>{t("reports")}</h2>

      <div className="report-list">
        {mockReports.map((report) => (
          <div key={report.id} className="report-card">
            <p>
              <strong>{t("reportType")}:</strong> {t(report.type || "")}

            </p>
            <p>
              <strong>{t("reporter")}:</strong> {report.reporter}
            </p>
            <p>
              <strong>{t("reported")}:</strong> {report.reported}
            </p>
            <p>
              <strong>{t("content")}:</strong> {report.content}
            </p>

            <div className="report-actions">
              <button className="action-btn accept">{t("takeAction")}</button>
              <button className="action-btn delete">{t("delete")}</button>
              <button className="action-btn ignore">{t("ignore")}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reports;