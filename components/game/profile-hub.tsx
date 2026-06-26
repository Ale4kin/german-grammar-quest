import { AvatarWardrobe } from "@/components/game/avatar-wardrobe";
import { ProfileOverview } from "@/components/game/profile-overview";

export function ProfileHub() {
  return (
    <>
      <ProfileOverview />
      <div className="mt-4">
        <AvatarWardrobe showHeader={false} />
      </div>
    </>
  );
}
