import { Loader, LogOut } from "lucide-react"
import { useAuthStore } from "@/store/useAuthStore"
import { useRef, useState } from "react"

const ProfileHeader = () => {
    const {isLogginout,Logout,authUser,updateProfile,isUpdatingProfile} = useAuthStore()
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [selectedImg,setSelectedImg] = useState<string | null>(null)

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.readAsDataURL(file);
  
  reader.onloadend = async (): Promise<void> => {
    const base64Image = reader.result as string;
    setSelectedImg(base64Image);
     updateProfile( base64Image );
  };
};
        
    
  return (
    <div className="flex items-center justify-between py-6 px-4">
      
      {/* LEFT: Brand */}
      <span className="text-lg font-semibold text-white">
        ChatX
      </span>

      {/* RIGHT: User + Logout */}
      <div className="flex items-center gap-3">
        
        {/* User info */}
        <div className="flex items-center gap-2">
            <button
              className="size-14 rounded-full overflow-hidden relative group text-white cursor-pointer flex items-center justify-center"
              onClick={() => fileInputRef.current?.click()}
            >
             {isUpdatingProfile ?
             <Loader className="size-10 animate-spin  "/>
             : <img
                src={selectedImg || authUser?.profilePic || "/avatar.png"}
                alt="User image"
                className="size-full object-cover"
              />}  
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-xs">Change</span>
              </div>

            </button>
          <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
          <span className="text-sm text-white/80">
            {authUser?.fullName}
          </span>
        </div>

        {/* Logout icon */}
        <button
          title="Logout"
          className="rounded-md p-2 text-white/70 hover:bg-white/10 hover:text-white cursor-pointer"
          onClick={() => Logout()}
        >
          <LogOut className="h-4 w-4"  />
        </button>
      </div>
    </div>
  )
}

export default ProfileHeader
