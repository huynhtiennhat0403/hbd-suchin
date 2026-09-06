import { useMemo, useState, useEffect } from "react";
import "./FinalHeart.css";

const TOTAL_HEARTS = 500;

function generateOrderedPoints(count = TOTAL_HEARTS, scaleX = 22, scaleY = 17) {
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

    y = y - 2.8;

    const jitterX = (Math.random() - 0.5) * 16;
    const jitterY = (Math.random() - 0.5) * 16;
    const drawDelay = (i / count) * 2.2;

    list.push({
      id: i,
      x: x * scaleX + jitterX,
      y: y * scaleY + jitterY,
      size: Math.random() * 4 + 10,
      drawDelay,
    });
  }
  return list;
}

function FinalHeart({ text = "Anh yêu em" }) {
  // Tính toán kích thước tim thích hợp theo màn hình
  const [dimensions, setDimensions] = useState(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const isLandscape = w > h && h < 550;

    if (isLandscape) {
      return { scaleX: 18, scaleY: 11 }; // Khi xoay ngang: thu hẹp chiều dọc
    }
    if (w < 500) {
      return { scaleX: 11.5, scaleY: 11 }; // Cầm dọc iPhone: thu gọn hai bên
    }
    return { scaleX: 24, scaleY: 18 }; // Màn hình máy tính lớn
  });

  const [startDrawing, setStartDrawing] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const isLandscape = w > h && h < 550;

      if (isLandscape) {
        setDimensions({ scaleX: 18, scaleY: 11 });
      } else if (w < 500) {
        setDimensions({ scaleX: 11.5, scaleY: 11 });
      } else {
        setDimensions({ scaleX: 24, scaleY: 18 });
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