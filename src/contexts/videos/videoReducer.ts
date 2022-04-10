import {
  SET_VIDEOS,
  SET_CATEGORIES,
  FILTER_BY_CATEGORIES,
  REMOVE_CATEGORY,
  SET_LOADING,
} from "types/videos";

const videoReducer = (videosData: any, { type, payload }: any) => {
  switch (type) {
    case SET_VIDEOS:
      return {
        ...videosData,
        videos: payload,
      };

    case SET_CATEGORIES:
      return {
        ...videosData,
        categories: payload,
      };

    case FILTER_BY_CATEGORIES:
      return {
        ...videosData,
        selectedCategories: [...videosData.selectedCategories, payload],
      };

    case REMOVE_CATEGORY:
      return {
        ...videosData,
        selectedCategories: videosData.selectedCategories.filter(
          (category: any) => category !== payload,
        ),
      };

    case SET_LOADING:
      return {
        ...videosData,
        loading: payload,
      };

    default:
      return {
        ...videosData,
      };
  }
};

export default videoReducer;
