import useTheme from "hooks/useTheme";
import "styles/container.scss";

export default function Container({ children }: any) {
  const {
    theme: { currentTheme },
  } = useTheme();
  return <div className={`${currentTheme}container`}>{children}</div>;
}
