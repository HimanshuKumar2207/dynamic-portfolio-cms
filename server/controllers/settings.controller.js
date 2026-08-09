const SiteSettings = require('../models/SiteSettings');

const getOrCreate = async () => {
  let settings = await SiteSettings.findOne();
  if (!settings) settings = await SiteSettings.create({});
  return settings;
};

exports.getSettings = async (req, res) => {
  const settings = await getOrCreate();
  res.json(settings);
};

exports.updateSettings = async (req, res) => {
  const settings = await getOrCreate();
  Object.assign(settings, req.body);
  await settings.save();
  res.json(settings);
};
