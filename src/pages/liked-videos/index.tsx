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
      <div className="flex text-center justify-center pt-10">
        <h3 className="h3">Liked videos: {likes.length}</h3>
      </div>
      <section>
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
