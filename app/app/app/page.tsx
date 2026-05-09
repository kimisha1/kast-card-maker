"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";

export default function Home() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [xId, setXId] = useState("@kastfan");
  const [isDownloading, setIsDownloading] = useState(false);

  function handlePhotoUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setPhoto(String(reader.result));
    };

    reader.readAsDataURL(file);
  }

  async function downloadCard() {
    if (!cardRef.current) return;

    try {
      setIsDownloading(true);

      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: "#7ccfff",
      });

      const link = document.createElement("a");
      link.download = "kast-pengu-card.png";
      link.href = dataUrl;
      link.click();
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <main className="page">
      <section className="hero">
        <div>
          <p className="badge">Fan-made card generator</p>
          <h1>KAST Pengu Card Maker</h1>
          <p className="subtitle">
            Upload your photo, add your X ID, and create a cute fantasy
            KAST-style stablecoin card.
          </p>
        </div>
      </section>

      <section className="builder">
        <aside className="panel">
          <h2>Customize Card</h2>

          <label className="label">Upload Photo</label>
          <label className="uploadBox">
            <span className="uploadIcon">📷</span>
            <span>Choose image</span>
            <input type="file" accept="image/*" onChange={handlePhotoUpload} />
          </label>

          <label className="label">X ID</label>
          <input
            className="textInput"
            value={xId}
            onChange={(event) => setXId(event.target.value)}
            placeholder="@kastfan"
          />

          <button className="downloadBtn" onClick={downloadCard}>
            {isDownloading ? "Generating..." : "Download PNG"}
          </button>

          <p className="note">
            This is a concept card only. It is not a real financial card.
          </p>
        </aside>

        <section className="previewArea">
          <KastCard cardRef={cardRef} photo={photo} xId={xId} />
        </section>
      </section>
    </main>
  );
}

function KastCard({
  cardRef,
  photo,
  xId,
}: {
  cardRef: React.RefObject<HTMLDivElement | null>;
  photo: string | null;
  xId: string;
}) {
  return (
    <div className="cardWrap">
      <div ref={cardRef} className="card">
        <div className="cardInnerBorder" />

        <div className="sparkle sparkle1">✦</div>
        <div className="sparkle sparkle2">★</div>
        <div className="sparkle sparkle3">✦</div>
        <div className="sparkle sparkle4">✧</div>

        <div className="logoRow">
          <div className="kLogo">K</div>
          <div className="kastText">KAST</div>
        </div>

        <div className="memberPill">🌐 GLOBAL MEMBER</div>

        <div className="titleBlock">
          <div>GLOBAL</div>
          <div className="yellow">STABLECOIN</div>
          <div>CARD</div>
        </div>

        <div className="actions">SPEND • SEND • SAVE</div>

        <div className="photoPenguin">
          <div className="penguinHead">
            <div className="hair" />
            <div className="photoArea">
              {photo ? (
                <img src={photo} alt="Uploaded profile" />
              ) : (
                <div className="photoPlaceholder">
                  <div>📷</div>
                  <span>YOUR PHOTO</span>
                  <span>HERE</span>
                </div>
              )}
            </div>
            <div className="beak" />
          </div>
        </div>

        <div className="castle">
          <div className="coin coin1">$</div>
          <div className="coin coin2">₮</div>
          <div className="tower tower1" />
          <div className="tower tower2" />
          <div className="tower tower3" />
          <div className="roof roof1" />
          <div className="roof roof2" />
          <div className="roof roof3" />
          <div className="snowBase" />
        </div>

        <div className="maskedNumber">**** **** ***</div>
        <div className="year">2026</div>

        <div className="xBox">
          <div className="xIcon">𝕏</div>
          <div className="xLabel">X ID</div>
          <div className="divider" />
          <div className="xValue">{xId || "@kastfan"}</div>
        </div>

        <div className="statsBox">
          <div className="stat">
            <span className="statIcon">🌍</span>
            <div>
              <strong>170+</strong>
              <small>COUNTRIES</small>
            </div>
          </div>

          <div className="statDivider" />

          <div className="stat">
            <span className="statIcon">🛒</span>
            <div>
              <strong>150M+</strong>
              <small>MERCHANTS</small>
            </div>
          </div>
        </div>

        <div className="poweredBox">
          <span>POWERED BY</span>
          <strong>KAST</strong>
          <small>BUILT FOR GLOBAL FREEDOM</small>
        </div>

        <div className="chip" />

        <div className="miniPenguin">
          <div className="miniBody" />
          <div className="miniBelly" />
          <div className="miniEye left" />
          <div className="miniEye right" />
          <div className="miniBeak" />
          <div className="miniWing leftWing" />
          <div className="miniWing rightWing" />
          <div className="miniFoot foot1" />
          <div className="miniFoot foot2" />
          <div className="miniMedal">K</div>
        </div>

        <div className="disclaimer">
          ✦ CONCEPT • NOT A REAL FINANCIAL CARD ✦
        </div>
      </div>
    </div>
  );
}
