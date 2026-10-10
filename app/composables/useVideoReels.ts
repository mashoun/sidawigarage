import { videoRepo } from '../../shared/infrastructure/staticJsonRepositories';
import type { VideoReel } from '../../shared/domain/models';

export const useVideoReels = () => {
  const reels = ref<VideoReel[]>(videoRepo.getAllReels());
  const featuredReels = computed(() => videoRepo.getFeaturedReels());

  const getReelById = (id: string): VideoReel | undefined => {
    return videoRepo.getReelById(id);
  };

  return {
    reels,
    featuredReels,
    getReelById,
  };
};
