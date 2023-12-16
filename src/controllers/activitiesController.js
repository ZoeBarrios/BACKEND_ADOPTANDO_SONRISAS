import { getActivities, getActivityById } from "../services/activityService.js";

export const getAllActivities = async (req, res, next) => {
  try {
    const activities = await getActivities();
    return res.success(200, activities);
  } catch (error) {
    next(error);
  }
};

export const getActivity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const activity = await getActivityById(id);
    return res.success(200, activity);
  } catch (error) {
    next(error);
  }
};
