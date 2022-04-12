export const getTheme = (isDark: any) => (isDark ? "" : "dark-");

/**
 *
 * @param videos: array, of unfiltered videos
 * @param selectedCategories: string, category to filter
 * @returns finalVideos: array: filtered categories
 */
export const getFilteredVideos = (videos: any, selectedCategories: any) => {
  let finalVideos = videos;
  if (selectedCategories.length > 0) {
    finalVideos = videos.filter(({ category }: any) =>
      selectedCategories.includes(category),
    );
  }
  return finalVideos;
};

/**
 *
 * @param targetId :string
 * @param entity : array
 * @returns boolean
 */
export const isDuplicate = (targetId: any, entity: any) =>
  entity
    .map(({ _id: currId }: any) => currId === targetId)
    .some((val: any) => val);
