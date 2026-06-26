import type { Avatar } from "@/types";
import { avatarCosmetics } from "@/data/cosmetics";

export const mockAvatars: Avatar[] = avatarCosmetics.map((avatar) => ({
  id: avatar.id,
  name: avatar.name,
  emoji: avatar.emoji,
  description: avatar.description,
}));
