import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";

export const alt = "Maison Legit: lapis legit, baked by hand in Jakarta";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  // The cross-section is the brand's signature photograph (DESIGN.md).
  const photo = await readFile(
    join(process.cwd(), "public/assets/photography/lapis-legit-original-3.jpg"),
    "base64",
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#faf5e8",
          color: "#1e1710",
        }}
      >
        <div
          style={{
            width: 640,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "72px",
          }}
        >
          <div style={{ fontSize: 96, lineHeight: 1, fontWeight: 600 }}>
            Maison Legit
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 36,
              marginTop: 24,
              color: "#5f5142",
            }}
          >
            <span>Lapis legit, baked by hand</span>
            <span>in Jakarta.</span>
          </div>
        </div>
        <img
          src={`data:image/jpeg;base64,${photo}`}
          width={560}
          height={630}
          style={{ objectFit: "cover" }}
          alt=""
        />
      </div>
    ),
    { ...size },
  );
}
