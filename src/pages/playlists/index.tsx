import "styles/home.scss";
import useTheme from "hooks/useTheme";
import Loader from "assets/icons/Loader";
import usePlayList from "hooks/usePlaylists";
import PlaylistCard from "components/playlist-card";

export default function Playlists() {
  const {
    theme: { currentTheme },
  } = useTheme();
  const { playlists, loading } = usePlayList();
  return (
    <main className={`${currentTheme}main`}>
      <section>
        <div className="flex text-center justify-center">
          <h3 className="h3">Playlists: {playlists.length}</h3>
        </div>
        {loading ? (
          <Loader type={currentTheme === "dark-" ? "dark" : "light"} />
        ) : (
          <div className="flex flex-wrap">
            {playlists.map(({ playlistName, _id: id, videos }: any) => (
              <PlaylistCard
                title={playlistName}
                id={id}
                videos={videos.length}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
