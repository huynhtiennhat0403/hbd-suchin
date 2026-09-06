import { useEffect, useState } from "react";
import "./MessageSequence.css";

const messages = [
  "Hôm nay là một ngày đặc biệt...",
  "Chúc mừng sinh nhật SuChin tuổi 21.",
  "Chúc em tuổi mới luôn xinh đẹp, vui vẻ...",
  "Bình an và thật hạnh phúc.",
];

function MessageSequence({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hiện câu chữ
    setIsVisible(true);

    // Ẩn câu chữ sau 2.5s
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    // Chuyển sang câu kế tiếp sau 3.5s
    const nextTimer = setTimeout(() => {
      if (currentIndex < messages.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        // Nếu đã hết các câu trên, gọi onComplete để App kích hoạt FinalHeart
        if (onComplete) onComplete();
      }
    }, 3500);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [currentIndex, onComplete]);

  return (
    <div className="message-sequence">
      <p className={`message ${isVisible ? "message-visible" : ""}`}>
        {messages[currentIndex]}
      </p>
    </div>
  );
}

export default MessageSequence;