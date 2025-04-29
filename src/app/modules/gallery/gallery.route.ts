import express from "express";
import { GalleryItemsController } from "./gallery.controller";
import validateRequest from "../../middlewares/validateRequest";
import { GalleryItemsValidations } from "./gallery.validation";
import { upload } from "../../utils/uploadFile";

const router = express.Router();

router.post(
  "/create-gallery-item",
  upload.single("image"),
  validateRequest(GalleryItemsValidations.createGalleryItemSchema),
  GalleryItemsController.createGalleryItem
);
router.get("/", GalleryItemsController.getAllGalleryItems);
router.patch(
  "/:id",
  upload.single("image"),
  validateRequest(GalleryItemsValidations.updateGalleryItemSchema),
  GalleryItemsController.updateGalleryItem
);
router.delete("/:id", GalleryItemsController.deleteGalleryItem);

export const GalleryRouter = router;
