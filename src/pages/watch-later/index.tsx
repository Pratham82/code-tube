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
      <div className="flex text-center justify-center pt-10">
        <h3 className="h3">Watch later videos: {watchLater.length}</h3>
      </div>
      <section>
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
