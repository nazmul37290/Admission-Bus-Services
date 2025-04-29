import { TGalleryItem } from "./gallery.interface";
import { galleryModel } from "./gallery.model";

const createGalleryItemIntoDb = async (galleryItemData: TGalleryItem) => {
  const result = await galleryModel.create(galleryItemData);
  return result;
};

const getAllGalleryItemFromDb = async () => {
  const result = await galleryModel.find();
  return result;
};

const updateGalleryItemIntoDb = async (
  id: string,
  payload: Partial<TGalleryItem>
) => {
  const result = await galleryModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteGalleryItemFromDb = async (id: string) => {
  const result = await galleryModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const GalleryItemServices = {
  createGalleryItemIntoDb,
  getAllGalleryItemFromDb,
  updateGalleryItemIntoDb,
  deleteGalleryItemFromDb,
};
