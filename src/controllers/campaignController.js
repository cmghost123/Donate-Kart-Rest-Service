const campaignService = require("../services/campaignService");

getCampaigns = async (req, res) => {
  try {
    let result = await campaignService.getCampaigns();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

getCampaignByNgoCode = async (req, res) => {
  try {
    let result;
    if (req.params.ngoCode){
      result = await campaignService.getCampaignByNgoCode(req, res);
      res.send(result);
    } else {
      res.status(400).send("Bad Request");
    }
  } catch (error) {
    res.send(error);
  }
};

sortCampaigns = async (req, res) => {
  try {
    let result = await campaignService.sortCampaigns(req);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

getActiveCampaigns = async (req, res) => {
  try {
    let result = await campaignService.getActiveCampaigns();
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

getInActiveCampaigns = async (req, res) => {
  try {
    let result = await campaignService.getInActiveCampaigns();
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  getCampaignByNgoCode,
  getCampaigns,
  sortCampaigns,
  getActiveCampaigns,
  getInActiveCampaigns,
};
