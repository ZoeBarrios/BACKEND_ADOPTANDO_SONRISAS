import Activity from "../models/activity.js";
export const getActivities = async () => {
  const activities = await Activity.findAll();
  if (!activities) {
    throw new Error("No hay actividades");
  }
  return activities;
};

export const getActivityById = async (activity_id) => {
  const activity = await Activity.findByPk(activity_id);
  if (!activity) {
    throw new Error("La actividad no existe");
  }
  return activity;
};
