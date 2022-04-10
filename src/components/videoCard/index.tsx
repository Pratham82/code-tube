import useTheme from "hooks/useTheme";
import "styles/videoCard.scss";

export default function VideoCard({ cardData }: any) {
  const { title, thumbnail, channelLogo, duration, alt } = cardData;
  const {
    theme: { currentTheme },
  } = useTheme();
  return (
    <div className={`${currentTheme}video-card`}>
      <div className="flex">
        <img src={thumbnail} alt={alt} className="thumbnail" />
        <div className="views-card p-2">{(duration / 60).toFixed(2)}</div>
      </div>
      <div className="flex pt-12 pb-10 pl-4 pr-4">
        <img src={channelLogo} alt={alt} className="channelLogo mr-8" />
        <p className="title">{title}</p>
        <button type="button" className={`${currentTheme}options`}>
          <i className="fas fa-ellipsis-v" />
        </button>
      </div>
    </div>
  );
}
