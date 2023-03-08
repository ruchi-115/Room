import React, { useState } from "react"

export default function Overlay() {
    return (
        <div style={{ position: "absolute", top: 40, right: 40 }}>
            <p style={{ flex: "1 1 0%", fontSize: 12, lineHeight: "1em", textAlign: "right", color: "black" }}>
                <a href="http://pmnd.rs/">pmnd.rs</a> <a href="https://github.com/pmndrs">git</a> <a href="https://codesandbox.io/s/zxpv7">csb</a>
            </p>
        </div>
    )
}
