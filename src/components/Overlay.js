import React from "react"

export default function Overlay({ mode, onPlaygroundOpen }) {
    // Replace this with your actual resume URL (Google Drive, Dropbox, etc.)
    const resumeUrl = "https://drive.google.com/your-resume-link"
    
    return (
        <div style={{ 
            position: "absolute", 
            top: 20, 
            right: 20, 
            display: "flex",
            gap: "12px",
            zIndex: 10,
        }}>
            {/* Playground Button */}
            <button
                onClick={onPlaygroundOpen}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 20px",
                    background: mode ? "rgba(153,202,209,0.15)" : "rgba(255,255,255,0.9)",
                    border: `2px solid ${mode ? "#99cad1" : "#007589"}`,
                    borderRadius: "12px",
                    color: mode ? "#99cad1" : "#007589",
                    cursor: "pointer",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    fontFamily: "'Inter var', sans-serif",
                    transition: "all 0.3s ease",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
                onMouseOver={(e) => {
                    e.target.style.transform = "translateY(-2px)"
                    e.target.style.boxShadow = "0 6px 25px rgba(0,0,0,0.15)"
                    e.target.style.background = mode ? "rgba(153,202,209,0.25)" : "rgba(255,255,255,1)"
                }}
                onMouseOut={(e) => {
                    e.target.style.transform = "translateY(0)"
                    e.target.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)"
                    e.target.style.background = mode ? "rgba(153,202,209,0.15)" : "rgba(255,255,255,0.9)"
                }}
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                    <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                    <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
                Playground
            </button>

            {/* Download Resume Button */}
            <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 20px",
                    background: mode ? "#99cad1" : "#007589",
                    border: "none",
                    borderRadius: "12px",
                    color: mode ? "#0f0f0f" : "#fff",
                    cursor: "pointer",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    fontFamily: "'Inter var', sans-serif",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 20px rgba(0,117,137,0.3)",
                }}
                onMouseOver={(e) => {
                    e.target.style.transform = "translateY(-2px)"
                    e.target.style.boxShadow = "0 6px 25px rgba(0,117,137,0.4)"
                }}
                onMouseOut={(e) => {
                    e.target.style.transform = "translateY(0)"
                    e.target.style.boxShadow = "0 4px 20px rgba(0,117,137,0.3)"
                }}
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Resume
            </a>
        </div>
    )
}
