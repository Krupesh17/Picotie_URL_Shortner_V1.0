import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useMediaQuery } from "usehooks-ts";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { useDeleteFile, useDeleteURL } from "@/tanstack-query/queries";
import { updateShortLinksData } from "@/redux/slices/dashboard_slice";
import { useDispatch, useSelector } from "react-redux";
import { LoaderIcon, Trash2Icon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";

const ShortLinkDeleteDialog = ({
  isDialogOpen,
  setDialogOpen,
  shortLinkData,
}) => {
  const { shortLinks } = useSelector((state) => state.dashboard);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleOnDialogDrawerOpen = () => {
    setDialogOpen(false);
  };

  const { mutateAsync: deleteQrCode, isPending: isDeletingQrCode } =
    useDeleteFile();
  const { mutateAsync: deleteShortURL, isPending: isDeletingShortURL } =
    useDeleteURL();

  const handleDeleteShortURL = async () => {
    try {
      const shortUrlId = shortLinkData?.id;

      if (shortLinkData?.qr_code_url) {
        const path = shortLinkData?.qr_code_url.match(/qr_codes\/(.+)/)[1];

        await deleteQrCode({
          bucket_name: "qr_codes",
          path: path,
        });
      }

      await deleteShortURL(shortLinkData?.id);

      const updatedShortLinks = await shortLinks?.filter(
        (item) => item?.id !== shortUrlId
      );

      dispatch(updateShortLinksData(updatedShortLinks));

      if (pathname?.startsWith("/dashboard/link")) {
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.error("Failed to delete link:", error.message);
    } finally {
      handleOnDialogDrawerOpen();
    }
  };

  if (isDesktop) {
    return (
      <Dialog open={isDialogOpen} onOpenChange={handleOnDialogDrawerOpen}>
        <DialogContent
          className="!max-w-[450px] rounded-3xl overflow-y-auto"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle className="text-copy">Delete Short Link</DialogTitle>
            <DialogDescription className="text-copy-light text-sm">
              Are you sure you want to delete this short link? This action
              cannot be undone and the link will no longer redirect to its
              destination.
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center justify-end gap-2.5">
            <Button
              type="button"
              className="h-10 rounded-2xl"
              variant="outline"
              onClick={handleOnDialogDrawerOpen}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="h-10 rounded-2xl"
              variant="destructive"
              onClick={handleDeleteShortURL}
            >
              {isDeletingQrCode || isDeletingShortURL ? (
                <LoaderIcon className="size-5 animate-spin" />
              ) : (
                <>
                  <Trash2Icon className="size-5" />
                </>
              )}
              <span>Delete</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isDialogOpen} onOpenChange={handleOnDialogDrawerOpen}>
      <DrawerContent className="!rounded-t-3xl">
        <DrawerHeader>
          <DrawerTitle className="text-left text-copy">
            Delete Short Link
          </DrawerTitle>
          <DrawerDescription className="text-left text-copy-light text-sm">
            Are you sure you want to delete this short link? This action cannot
            be undone and the link will no longer redirect to its destination.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 mb-4 overflow-y-auto">
          <div className="flex items-center justify-end gap-2.5">
            <Button
              type="button"
              className="h-10 rounded-2xl"
              variant="outline"
              onClick={handleOnDialogDrawerOpen}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="h-10 rounded-2xl"
              variant="destructive"
              onClick={handleDeleteShortURL}
            >
              {isDeletingQrCode || isDeletingShortURL ? (
                <LoaderIcon className="size-5 animate-spin" />
              ) : (
                <>
                  <Trash2Icon className="size-5" />
                </>
              )}
              <span>Delete</span>
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ShortLinkDeleteDialog;
