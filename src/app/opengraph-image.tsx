import { ImageResponse } from "next/og";

export const alt = "Maison Legit — Homemade Lapis Legit, baked by hand in Jakarta";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "80px",
          background:
            "linear-gradient(150deg, #3f5e96 0%, #2e466f 55%, #25395e 100%)",
          color: "#faf5e8",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#e2cd8e",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 700,
          }}
        >
          Homemade Lapis Legit · Jakarta
        </div>
        <div
          style={{
            fontSize: 132,
            lineHeight: 1,
            marginTop: 28,
            fontWeight: 600,
            color: "#fcf9f1",
          }}
        >
          Maison Legit
        </div>
        <div
          style={{
            width: 90,
            height: 3,
            marginTop: 36,
            background: "linear-gradient(90deg, #e2cd8e, #c2a04c, #e2cd8e)",
          }}
        />
        <div
          style={{
            fontSize: 40,
            marginTop: 36,
            fontStyle: "italic",
            color: "#f3e8cc",
          }}
        >
          A family recipe, baked in layers.
        </div>
      </div>
    ),
    { ...size },
  );
}
