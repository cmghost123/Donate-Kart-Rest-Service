const express = require("express");
const campaignRouter = express.Router();
const campaignController = require("../controllers/campaignController");

const campaignApi = "/api/campaigns";

campaignRouter.get(campaignApi + "/sort", campaignController.sortCampaigns);

campaignRouter.get(
  campaignApi + "/ngCode/:ngoCode",
  campaignController.getCampaignByNgoCode
);

campaignRouter.get(
  campaignApi + "/active",
  campaignController.getActiveCampaigns
);

campaignRouter.get(
  campaignApi + "/inActive",
  campaignController.getInActiveCampaigns
);

campaignRouter.get(campaignApi + "/", campaignController.getCampaigns);

module.exports = campaignRouter;
