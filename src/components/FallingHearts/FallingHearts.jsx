import { useMemo } from "react";
import "./FallingHearts.css";

// Tạo danh sách các dòng chữ rơi ngẫu nhiên
function generateHearts(count = 65) {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    left: Math.random() * 95, // Giới hạn 0% - 95% để chữ dài không tràn mép màn hình
    size: Math.random() * 8 + 14, // Kích thước chữ rơi vừa vặn: 14px - 22px
    duration: Math.random() * 1.5 + 2, // Thời gian rơi từ 2s - 3.5s (giúp đọc rõ chữ hơn)
    delay: Math.random() * 2.5, // Phân tán nhịp rơi
    opacity: Math.random() * 0.5 + 0.5, // Độ mờ 0.5 - 1.0
  }));
}

function FallingHearts() {
  const hearts = useMemo(() => generateHearts(65), []);

  return (
    <div className="falling-hearts">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="heart"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            opacity: heart.opacity,
          }}
        >
          Khánh Như
        </span>
      ))}
    </div>
  );
}

export default FallingHearts;