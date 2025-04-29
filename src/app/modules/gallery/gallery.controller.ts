import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { GalleryItemServices } from "./gallery.services";

const createGalleryItem = catchAsync(async (req: Request, res: Response) => {
  const galleryItemData = req.body;
  const file = req.file;
  if (file) {
    galleryItemData.image = `${file?.path}`;
  }
  const result = await GalleryItemServices.createGalleryItemIntoDb(
    galleryItemData
  );
  res.status(200).json({
    success: true,
    message: "Gallery item created successfully",
    data: result,
  });
});
const getAllGalleryItems = catchAsync(async (req: Request, res: Response) => {
  const result = await GalleryItemServices.getAllGalleryItemFromDb();
  if (result?.length) {
    res.status(200).json({
      success: true,
      message: "Gallery items retrieved successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "No items found",
      data: null,
    });
  }
});

const updateGalleryItem = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const file = req.file;
  if (file) {
    updatedData.image = `${file?.path}`;
  }
  const result = await GalleryItemServices.updateGalleryItemIntoDb(
    id,
    updatedData
  );
  if (result) {
    res.status(200).json({
      success: true,
      message: "Gallery item updated successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "item not found",
      data: null,
    });
  }
});
const deleteGalleryItem = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await GalleryItemServices.deleteGalleryItemFromDb(id);
  if (result) {
    res.status(200).json({
      success: true,
      message: "Gallery Item deleted successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Item not found",
      data: null,
    });
  }
});

export const GalleryItemsController = {
  createGalleryItem,
  getAllGalleryItems,
  updateGalleryItem,
  deleteGalleryItem,
};
