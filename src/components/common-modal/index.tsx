import useTheme from "hooks/useTheme";
import ReactDom from "react-dom";
import "styles/common-modal.scss";

export default function Modal({ children }: any) {
  const {
    theme: { isModalOpen, currentTheme },
  } = useTheme();
  if (!isModalOpen) return null;

  return ReactDom.createPortal(
    <div className="overlay">
      <div className={`${currentTheme}wrapper`}>
        <div className="flex">
          <div className="section-wrapper">{children}</div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
