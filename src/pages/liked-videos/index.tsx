import "styles/home.scss";
import useTheme from "hooks/useTheme";
import Loader from "assets/icons/Loader";
import VideoCard from "components/video-card";
import usePlayList from "hooks/usePlaylists";

export default function Liked() {
  const {
    theme: { currentTheme },
  } = useTheme();
  const { likes, loading } = usePlayList();
  return (
    <main className={`${currentTheme}main`}>
      <section>
        <div className="flex text-center justify-center">
          <h3 className="h3">Liked videos: {likes.length}</h3>
        </div>
        {loading ? (
          <Loader type={currentTheme === "dark-" ? "dark" : "light"} />
        ) : (
          <div className="flex flex-wrap">
            {likes.map((data: any) => (
              <VideoCard cardData={data} key={data.title} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
