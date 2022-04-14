import "styles/home.scss";
import useTheme from "hooks/useTheme";
import useVideos from "hooks/useVideos";
import Loader from "assets/icons/Loader";
import ChipsContainer from "components/chips-container";
import VideoCard from "components/video-card";
import Modal from "components/common-modal";
import PlaylistModal from "components/playlist-modal";

export default function Home() {
  const {
    theme: { currentTheme },
  } = useTheme();
  const { categories, filteredVideos, loading } = useVideos();
  return (
    <main className={`${currentTheme}main`}>
      <Modal>
        <PlaylistModal />
      </Modal>
      <section>
        {loading ? (
          <Loader type={currentTheme === "dark-" ? "dark" : "light"} />
        ) : (
          <>
            <ChipsContainer categories={categories} />
            <div className="flex flex-wrap">
              {filteredVideos.map((data: any) => (
                <VideoCard cardData={data} key={data.title} />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
