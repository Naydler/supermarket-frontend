import React from "react";
import "../styles/timelineStyles.css";

const mockEvents = [
    {
        date: "2025-01-10",
        type: "Consulta",
        summary: "Revisión general con el médico de cabecera.",
    },
    {
        date: "2025-02-02",
        type: "Análisis",
        summary: "Análisis de sangre rutinario.",
    },
    {
        date: "2025-03-12",
        type: "Radiología",
        summary: "Radiografía de tórax.",
    },
    {
        date: "2025-04-01",
        type: "Vacuna",
        summary: "Vacuna de la gripe.",
    }
];

const EQueryTimeline: React.FC = () => {
    return (
        <div>
            <h2 style={{ marginBottom: 16 }}>Historial Médico (Timeline)</h2>

            <div className="timeline">
                {mockEvents.map((item, index) => (
                    <div key={index} className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}>
                        <div className="timeline-content">
                            <h4>{item.type}</h4>
                            <small>{item.date}</small>
                            <p>{item.summary}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EQueryTimeline;
