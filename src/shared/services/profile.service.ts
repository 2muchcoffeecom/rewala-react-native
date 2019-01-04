import { ProfileModel } from '../models/profile.model';

export interface GetAvatarThumbsForAddRewalInput {
  profilesData: ProfileModel[];
  invitedFriends: string[];
}

interface IProfileService {
  getAvatarThumbsForAddRewal(input: GetAvatarThumbsForAddRewalInput): string[];
}

class ProfileService implements IProfileService {
  getAvatarThumbsForAddRewal(input: GetAvatarThumbsForAddRewalInput) {
    const avatarThumbUris: string[] = [];

    for (const profile of input.profilesData) {
      const isInvited = !!input.invitedFriends.find((userId) => userId === profile.userId);

      if (profile.avatarThumbPath && isInvited) {
        avatarThumbUris.push(profile.avatarThumbPath);
      }

      if (avatarThumbUris.length > 4) {
        break;
      }
    }

    return avatarThumbUris;
  }
}

export default new ProfileService();