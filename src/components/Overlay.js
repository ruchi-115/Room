export default function Overlay({ mode }) {
    return (
        <div style={{ position: "absolute", bottom: 40, right: 40 }}>
            <p style={{ flex: "1 1 0%", fontSize: 12, lineHeight: "1em", textAlign: "right", color: mode ? "white" : "black" }}>
                <a href="http://pmnd.rs/">pmnd.rs</a> <a href="https://github.com/pmndrs">git</a> <a href="https://codesandbox.io/s/zxpv7">csb</a>
            </p>
        </div>
    )
}
