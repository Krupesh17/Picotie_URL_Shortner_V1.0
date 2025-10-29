import React, { useCallback, useRef, useState } from "react";
import { ProfileAvatar, ProfilePicturePopoverMenu } from ".";
import { useSelector } from "react-redux";
import { cropToPerson } from "@/services/gemini-service";
import { cropImageToSquare } from "@/lib/image-utils";
import {
  useDeleteFile,
  useUpdateAccount,
  useUploadFile,
} from "@/tanstack-query/queries";
import { v4 as uuidV4 } from "uuid";
import { supabaseUrl } from "@/utils/supabase";
import { CircleAlertIcon } from "lucide-react";

const ProfilePictureEditor = ({ handleOnDialogDrawerOpen }) => {
  const { user } = useSelector((state) => state.auth);
  const fileInputRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const resetState = () => {
    setIsLoading(false);
    setError(null);
  };

  const { mutateAsync: deleteProfilePicture } = useDeleteFile();

  const { mutateAsync: updateAccount } = useUpdateAccount();

  const { mutateAsync: uploadProfilePicture } = useUploadFile();

  const updateProfilePicture = useCallback(async (imageFile) => {
    resetState();
    setIsLoading(true);

    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = async () => {
      const base64Image = reader.result;

      try {
        const boundingBox = await cropToPerson(base64Image);
        if (boundingBox) {
          const croppedImageBlob = await cropImageToSquare(
            base64Image,
            boundingBox
          );

          if (!croppedImageBlob) {
            throw new Error(
              "Cropping the profile picture failed. Please retry."
            );
          }

          if (user?.user_metadata?.profile_pic) {
            const path = user?.user_metadata?.profile_pic.match(
              /profile_pictures\/(.+)/
            )[1];

            await deleteProfilePicture({
              bucket_name: "profile_pictures",
              path: path,
            });

            await updateAccount({ data: { profile_pic: "" } });
          }

          const file_name = `${user?.id}/profile-pic-${uuidV4()}`;

          await uploadProfilePicture({
            bucket_name: "profile_pictures",
            path: file_name,
            file: croppedImageBlob,
          });

          const profile_pic_url = `${supabaseUrl}/storage/v1/object/public/profile_pictures/${file_name}`;

          await updateAccount({ data: { profile_pic: profile_pic_url } });

          handleOnDialogDrawerOpen();
        }
      } catch (error) {
        if (error) {
          console.error(error?.message);
          setError(error?.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
      setError("Failed to read the uploaded file.");
      setIsLoading(false);
    };
  }, []);

  const deleteCurrentProfilePicture = async () => {
    try {
      if (user?.user_metadata?.profile_pic) {
        const path = user?.user_metadata?.profile_pic.match(
          /profile_pictures\/(.+)/
        )[1];

        await deleteProfilePicture({
          bucket_name: "profile_pictures",
          path: path,
        });

        await updateAccount({ data: { profile_pic: "" } });
      }
    } catch (error) {
      console.error(error?.message);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      updateProfilePicture(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className={`relative mx-auto rounded-[40px] ${
          isLoading && "animate-pulse-shadow"
        }`}
      >
        <ProfileAvatar
          name={user?.user_metadata?.name}
          profile_pic_url={user?.user_metadata?.profile_pic}
          className="size-28 shrink-0 rounded-[40px] text-copy bg-blue-300"
        />

        <ProfilePicturePopoverMenu
          fileInputRef={fileInputRef}
          removeCurrentPicture={deleteCurrentProfilePicture}
          isLoading={isLoading}
        />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {error && (
        <p className="text-xs text-red-600 text-wrap mt-2 flex items-center gap-2 py-2 px-3 bg-red-500/20 rounded-2xl">
          <CircleAlertIcon className="size-5" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

export default ProfilePictureEditor;
