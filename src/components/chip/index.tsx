import "styles/chip.scss";
import useTheme from "hooks/useTheme";
import useVideos from "hooks/useVideos";
import { FILTER_BY_CATEGORIES, REMOVE_CATEGORY } from "types/videos";

export default function Chip({ category }: any) {
  const {
    theme: { currentTheme },
  } = useTheme();
  const { selectedCategories, dispatchVideos } = useVideos();

  const isSelectedCategory = (categoryName: any, currentCategories: any) =>
    !currentCategories.includes(categoryName);

  const handleChip = () => {
    dispatchVideos({
      type: isSelectedCategory(category, selectedCategories)
        ? FILTER_BY_CATEGORIES
        : REMOVE_CATEGORY,
      payload: category,
    });
  };

  return (
    <div className="flex">
      <button
        type="button"
        className={`${currentTheme}chip ${
          !isSelectedCategory(category, selectedCategories) &&
          `${currentTheme}chip-active`
        }`}
        onClick={handleChip}
      >
        {category}
        {!isSelectedCategory(category, selectedCategories) && (
          <i className="pl-6 far fa-times close-icon" />
        )}
      </button>
    </div>
  );
}
