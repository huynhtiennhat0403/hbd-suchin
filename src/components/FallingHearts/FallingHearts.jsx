import { useMemo } from "react";
import "./FallingHearts.css";

// Tạo sẵn danh sách hạt tim ngẫu nhiên
function generateHearts(count = 60) {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    left: Math.random() * 100, // Vị trí ngang 0% - 100%
    size: Math.random() * 20 + 16, // Kích cỡ 16px - 36px
    duration: Math.random() * 1 + 1, // Tốc độ rơi cực nhanh: 0.8s - 1.6s
    delay: Math.random() * 2, // Phân tán thời gian bắt đầu rơi trong 2s đầu
    opacity: Math.random() * 0.6 + 0.4, // Độ trong suốt
  }));
}

function FallingHearts() {
  // Dùng useMemo để danh sách tim chỉ sinh ra 1 lần duy nhất, không lag máy
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
          ♥
        </span>
      ))}
    </div>
  );
}

export default FallingHearts;