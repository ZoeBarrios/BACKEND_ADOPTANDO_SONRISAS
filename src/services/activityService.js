import Activity from "../models/activity.js";
export const getActivities = async () => {
  const activities = await Activity.findAll();
  if (!activities) {
    return null;
  }
  return activities;
};

export const getActivityById = async (activity_id) => {
  const activity = await Activity.findByPk(activity_id);
  if (!activity) {
    return null;
  }
  return activity;
};
