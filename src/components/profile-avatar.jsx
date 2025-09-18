import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const ProfileAvatar = ({ name, profile_pic_url, className, ...props }) => {
  return (
    <Avatar className={`${className}`} {...props}>
      <AvatarImage src={profile_pic_url} alt={name} className="object-cover" />
      <AvatarFallback className="sm:text-2xl text-xl text-inherit bg-inherit rounded-[inherit]">
        {name?.at(0)?.toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default ProfileAvatar;
