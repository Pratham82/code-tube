import "styles/home.scss";
import useTheme from "hooks/useTheme";
import Loader from "assets/icons/Loader";
import VideoCard from "components/video-card";
import usePlayList from "hooks/usePlaylists";

export default function WatchLater() {
  const {
    theme: { currentTheme },
  } = useTheme();
  const { watchLater, loading } = usePlayList();
  return (
    <main className={`${currentTheme}main`}>
      <section>
        <div className="flex text-center justify-center">
          <h3 className="h3">Watch later videos: {watchLater.length}</h3>
        </div>
        {loading ? (
          <Loader type={currentTheme === "dark-" ? "dark" : "light"} />
        ) : (
          <div className="flex flex-wrap">
            {watchLater.map((data: any) => (
              <VideoCard cardData={data} key={data.title} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
