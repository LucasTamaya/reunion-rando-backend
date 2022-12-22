import { Request, Response } from "express";

import { ActivityBody } from "../types/index";
import {
  getAllActivities,
  createNewActivity,
  getAllProviderActivities,
  deleteActivity,
  updateActivity,
  saveActivity,
  hasBeenAlreadySaved,
  unsaveActivity,
} from "../services/activityServices";
import {
  deleteImageFromCloudinary,
  uploadImageToCloudinary,
} from "../services/cloudinaryServices";

export const addActivityController = async (req: Request, res: Response) => {
  const activityWithNoImageProvided = !req.file;

  try {
    const { title, location, price, description, createdById }: ActivityBody =
      req.body;

    if (activityWithNoImageProvided) {
      const newActivity = await createNewActivity({
        title,
        location,
        description,
        createdById,
        price: parseInt(price),
        image_url: "",
        cloudinary_public_id: "",
      });

      return res.status(200).json({ newActivity });
    }

    const { secure_url, public_id } = await uploadImageToCloudinary(req);

    const newActivity = await createNewActivity({
      title,
      location,
      description,
      createdById,
      price: parseInt(price),
      image_url: secure_url,
      cloudinary_public_id: public_id,
    });

    return res.status(200).json({ newActivity });
  } catch (err: any) {
    console.log(err.message);
    return res.sendStatus(500);
  }
};

export const getAllActivitiesController = async (_: Request, res: Response) => {
  try {
    const activities = await getAllActivities();

    return res.status(200).json({ activities });
  } catch (err: any) {
    console.log(err.message);
    return res.sendStatus(500);
  }
};

export const getAllProviderActivitiesController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const providerActivities = await getAllProviderActivities(id);

    if (!providerActivities) {
      return res.status(200).json({ activities: [] });
    } else {
      return res.status(200).json({ activities: providerActivities });
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const deleteActivityController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { cloudinaryPublicId } = req.body;

    await deleteActivity(id);

    if (cloudinaryPublicId) {
      await deleteImageFromCloudinary(cloudinaryPublicId);
    }

    return res.status(200).json({ activityId: id });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const updateActivityController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // if the user doesn't updates the image activity, the file prop will be
    // the url of the current image. But if he does, the file prop will not
    // be defined in the req.body but in req.file (because a real file will be passed)
    const { price, file, cloudinaryPublicId, ...activityProps }: ActivityBody =
      req.body;

    const activityWithNoImageProvided = !file && !req.file;
    const hasUpdatedTheImageActivity = !file;
    // const hasUpdatedWithTheCurrentImageActivity = file;
    let imageUrl: string;
    let cloudinaryImagePublicId: string;

    if (activityWithNoImageProvided) {
      imageUrl = "";
      cloudinaryImagePublicId = "";
    } else if (hasUpdatedTheImageActivity) {
      // BUG ICI, ajouter un test si on a pas de file, de ne pas delete
      await deleteImageFromCloudinary(cloudinaryPublicId);
      const { secure_url, public_id } = await uploadImageToCloudinary(req);
      imageUrl = secure_url;
      cloudinaryImagePublicId = public_id;
    } else {
      imageUrl = file;
      cloudinaryImagePublicId = cloudinaryPublicId;
    }

    await updateActivity(id, {
      price: parseInt(price),
      image_url: imageUrl,
      cloudinary_public_id: cloudinaryImagePublicId,
      ...activityProps,
    });

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const saveActivityController = async (req: Request, res: Response) => {
  try {
    const { activityId } = req.params;
    const { userId } = req.body;

    if (await hasBeenAlreadySaved(activityId, userId)) {
      return res.status(409).json({
        isError: true,
        message: "L'activité a déjà été ajoutée aux favoris",
      });
    }
    await saveActivity(activityId, userId);

    return res.sendStatus(200);
  } catch (err: any) {
    console.error(err.message);
    return res.sendStatus(500);
  }
};

export const unsaveActivityController = async (req: Request, res: Response) => {
  try {
    const { activityId } = req.params;
    const { userId }: { userId: string } = req.body;

    await unsaveActivity(activityId, userId);

    return res.status(200).json({ activityId });
  } catch (err: any) {
    console.error(err.message);
    return res.sendStatus(500);
  }
};
