import { useState, useRef } from "react";
import FallingHearts from "./components/FallingHearts/FallingHearts";
import MessageSequence from "./components/MessageSequence/MessageSequence";
import FinalHeart from "./components/FinalHeart/FinalHeart";
import "./App.css";

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isMessageDone, setIsMessageDone] = useState(false);
  const audioRef = useRef(null);

  const handleStart = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((err) => console.log("Lỗi phát nhạc:", err));
    }
    setHasStarted(true);
  };

  return (
    <div className="app">
      <audio ref={audioRef} src="/music.mp3" loop preload="auto" />
      <div className="overlay"></div>

      {/* Hiệu ứng tim rơi chạy liên tục */}
      <FallingHearts />

      {!hasStarted ? (
        <div className="start-screen">
          <button className="start-btn" onClick={handleStart}>
            🎁 Bấm vào đây để mở quà nhé! ✨
          </button>
        </div>
      ) : (
        <div className="content">
          {!isMessageDone ? (
            <MessageSequence onComplete={() => setIsMessageDone(true)} />
          ) : (
            <FinalHeart text="Anh yêu em" />
          )}
        </div>
      )}
    </div>
  );
}

export default App;