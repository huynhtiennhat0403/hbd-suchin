import { useMemo, useState, useEffect } from "react";
import "./FinalHeart.css";

const TOTAL_HEARTS = 460;

function generateOrderedPoints(count = TOTAL_HEARTS, scaleX = 13, scaleY = 10) {
  const list = [];
  for (let i = 0; i < count; i++) {
    const t = (i / count) * 2 * Math.PI;

    const x = 16 * Math.pow(Math.sin(t), 3);
    let y = -(
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t)
    );

    y = y - 1.2;

    const jitterX = (Math.random() - 0.5) * 12;
    const jitterY = (Math.random() - 0.5) * 12;
    const drawDelay = (i / count) * 2.2;

    list.push({
      id: i,
      x: x * scaleX + jitterX,
      y: y * scaleY + jitterY,
      size: Math.random() * 3 + 8,
      drawDelay,
    });
  }
  return list;
}

function FinalHeart({ text = "Anh yêu em" }) {
  const [dimensions, setDimensions] = useState(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const isLandscape = w > h && h < 550;

    if (isLandscape) {
      return { scaleX: 11, scaleY: 7.5 };
    }
    if (w < 500) {
      return { scaleX: 11.5, scaleY: 11.5 };
    }
    // Thu nhỏ tim trên màn hình máy tính:
    return { scaleX: 13, scaleY: 10 };
  });

  const [startDrawing, setStartDrawing] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const isLandscape = w > h && h < 550;

      if (isLandscape) {
        setDimensions({ scaleX: 11, scaleY: 7.5 });
      } else if (w < 500) {
        setDimensions({ scaleX: 11.5, scaleY: 11.5 });
      } else {
        setDimensions({ scaleX: 13, scaleY: 10 });
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    const timer = setTimeout(() => {
      setStartDrawing(true);
    }, 1200);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      clearTimeout(timer);
    };
  }, []);

  const hearts = useMemo(
    () => generateOrderedPoints(TOTAL_HEARTS, dimensions.scaleX, dimensions.scaleY),
    [dimensions]
  );

  return (
    <div className="final-heart-container">
      {startDrawing && (
        <div className="heart-border">
          {hearts.map((h) => (
            <span
              key={h.id}
              className="dense-mini-heart"
              style={{
                "--tx": `${h.x}px`,
                "--ty": `${h.y}px`,
                fontSize: `${h.size}px`,
                animationDelay: `${h.drawDelay}s`,
              }}
            >
              🤍
            </span>
          ))}
        </div>
      )}

      <h1 className="final-message">{text}</h1>
    </div>
  );
}

export default FinalHeart;