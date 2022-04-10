export const getTheme = (isDark: any) => (isDark ? "" : "dark-");

export const getFilteredVideos = (videos: any, selectedCategories: any) => {
  let finalVideos = videos;
  if (selectedCategories.length > 0) {
    finalVideos = videos.filter(({ category }: any) =>
      selectedCategories.includes(category),
    );
  }
  return finalVideos;
};
