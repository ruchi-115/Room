import React, { useState } from "react";

export default function Underlay({ mode }) {

    return (
        <>
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    padding: 30,
                    display: "inline-flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start"
                }}>
                {/* 
                <div style={{
                    position: "relative",
                    top: 0,
                    left: 0,
                }} >
                    <input type="checkbox" id="switch" /><label for="switch">Toggle</label>
                </div> */}
                <div style={{ width: "100%", padding: 0, display: "inline-flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <p

                        style={{
                            fontFamily: "'Antonio', sans-serif",
                            flex: "1 1 0%",
                            height: 30,
                            fontSize: 30,
                            fontWeight: "700",
                            lineHeight: "30px",
                            letterSpacing: -2,
                            color: mode ? "white" : "black",
                        }}>
                        RUCHITA'S PORTFOLIO
                    </p>
                    {/* <div style={{ display: "flex", gap: "0.5em" }}>
                        <a><img alt="github" style={{ borderRadius: '1em' }} src="github_icon.png" height={34} width={34} ></img></a>
                        <a ><img style={{ borderRadius: '1em' }} alt="linkedin" src="linkedin_icon.png" height={34} width={34} ></img></a>
                        <a><img style={{ borderRadius: '10em' }} alt="medium" src="medium_icon.png" height={34} width={34} ></img></a>
                    </div> */}
                </div>
                <div style={{ width: "100%", padding: 0, display: "inline-flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "center" }}>
                    <p style={{ flex: "1 1 0%", height: "100%", fontSize: 12, lineHeight: "1.5em", color: mode ? "white" : "black" }}>
                        <b>Isometric PC room</b>
                        <br />
                        3D ROOM PROJECT
                        <br />
                        <b>—</b>
                    </p>
                    <div style={{ width: 10 }} />
                    <p
                        style={{
                            transform: "rotate3d(0, 0, 1, 90deg) translate3d(100%,10px,0)",
                            transformOrigin: "right",
                            fontSize: 15,
                            fontWeight: "700",
                            lineHeight: "100%",
                            textAlign: "right",
                            color: mode ? "white" : "black",
                            whiteSpace: "nowrap",
                        }}>
                        ● ruchitasonawale115@gmail.com
                    </p>
                </div>

                <div
                    className="full"
                    style={{
                        fontFamily: "'Antonio', sans-serif",
                        width: "100%",
                        height: "50%",
                        flex: "1 1 0%",
                        padding: 0,
                        display: "inline-flex",
                        flexDirection: "row",
                        alignItems: "flex-end",
                        justifyContent: "center",
                    }}>
                    {/* <p style={{ flex: "1 1 0%", fontSize: 250, lineHeight: "1em", color: mode ? "white" : "black", margin: 0, letterSpacing: -10 }}>R</p> */}
                    {/* <div style={{ width: 10 }} /> */}
                    {/* <p style={{ flex: "1 1 0%", fontSize: 250, lineHeight: "100%", textAlign: "right", color: mode ? "white" : "black", margin: 0, letterSpacing: -10 }}>_19</p> */}
                </div>
                <div style={{ height: 60 }} />
                {/* <div
                    style={{
                        pointerEvents: "all",
                        pointer: "auto",
                        width: "100%",
                        padding: 0,
                        display: "inline-flex",
                        flexDirection: "row",
                        alignItems: "flex-end",
                        justifyContent: "center",
                    }}>
                    <p className="full" style={{ whiteSpace: "nowrap", flex: "1 1 0%", fontSize: 12, lineHeight: "1.5em", color: mode ? "white" : "black" }}>
                        <b>Wonders of Antiquity</b>
                        <br />
                        Pythagorean Mathematics
                    </p>
                    <div style={{ width: 10 }} />
                    <p
                        className="full"
                        style={{
                            fontFamily: "'Antonio', sans-serif",
                            flex: "1 1 0%",
                            fontSize: 16,
                            fontWeight: "700",
                            lineHeight: "1em",
                            textAlign: "center",
                            color: mode ? "white" : "black",
                            letterSpacing: -0.5,
                            whiteSpace: "nowrap",
                        }}>
                        THE SUMMIT OF THE MANY
                    </p>
                    <div style={{ width: 10 }} />
                    <p className="full" style={{ flex: "1 1 0%", fontSize: 12, lineHeight: "1em", textAlign: "right", color: mode ? "white" : "black" }}></p>
                </div> */}
            </div>
        </>
    )
}
