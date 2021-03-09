import useSound from "use-sound";
import Soundtrack from "../../music/bm4.mp3";

const Pause = ({ stop }) => {
  return (
    <button className="stop" onClick={() => stop()}>
      STOP
    </button>
  );
};

const Play = ({ play }) => {
  return (
    <button className="play" onClick={play}>
      PLAY
    </button>
  );
};

export const MusicButton = () => {
  const [play, { stop, isPlaying }] = useSound(Soundtrack);
  return (
    <div className="music__button">
      {isPlaying ? <Pause stop={stop} /> : <Play play={play} />}
    </div>
  );
};

export default MusicButton;
