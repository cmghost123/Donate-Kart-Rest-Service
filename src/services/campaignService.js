const path = require("path");
const fs = require("fs");
const fetch = require("node-fetch");
const utils = require("../utility");
const configPath = path.join(__dirname, "../configuration/config.json");
const config = JSON.parse(fs.readFileSync(configPath));
const MOCK = require("../constant/campaign-mock.json");
const CONSTANT = require("../constant/constants");

getAllCampaigns = async () => {
  try {
    let result;
    if (config.isMock) {
      console.log("MOCK");
      result = MOCK.campaigns;
    } else {
      let campaignResponse = await fetch(config.donateKartTestUrl);
      let campaigns = await campaignResponse.json();
      console.log("Total campaigns : ", campaigns.length);
      result = campaigns;
    }
    if (utils.isEmptyResponse(result)) {
      return {};
    } else {
      return result;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get data from external api");
  }
};

getCampaigns = async () => {
  try {
    let result = await getAllCampaigns();
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

getCampaignByNgoCode = async (req, res) => {
  try {
    let campaigns = await getAllCampaigns();
    if (campaigns && campaigns.length) {
      campaignFound = campaigns.filter(
        (campaign) => campaign.ngoCode === req.params.ngoCode
      );
      return campaignFound;
    } else {
      return campaigns;
    }
  } catch (error) {
    return error;
  }
};

createSubset = ({ title, totalAmount, endDate, backersCount }) => ({
  title,
  totalAmount,
  endDate,
  backersCount,
});

getSubsetOfCampaigns = (campaigns) => {
  let subsetOfCampaigns = campaigns.map((campaign) => createSubset(campaign));
  return subsetOfCampaigns;
};

sortCampaigns = async (req) => {
  try {
    let key;
    let campaigns = await getAllCampaigns();
    if (campaigns && campaigns.length) {
      if (req.query.key) {
        key = req.query.key;
      } else {
        key = CONSTANT.DEFAULT_KEY_TO_SORT;
      }

      let sortedCampaigns = utils.sortBasedOnKey(
        campaigns,
        req.query.order,
        key
      );

      return getSubsetOfCampaigns(sortedCampaigns);
    } else {
      return response;
    }
  } catch (error) {
    return error;
  }
};

filterActiveCampaigns = (list) => {
  let today = utils.getDateObject();

  let previousMonth = utils.oneMonthBack();
  let campaigns = list.filter((item) => {
    let creationDate = utils.getDateObject(item.created);
    let endDate = utils.getDateObject(item.endDate);

    return creationDate >= previousMonth && endDate >= today;
  });
  return campaigns;
};

filterInActiveCampaigns = (list) => {
  let today = utils.getDateObject();

  let campaigns = list.filter((item) => {
    let endDate = utils.getDateObject(item.endDate);
    return item.procuredAmount >= item.totalAmount || endDate < today;
  });
  return campaigns;
};

getActiveCampaigns = async () => {
  try {
    let campaigns = await getAllCampaigns();
    if (campaigns && campaigns.length) {
      return filterActiveCampaigns(campaigns);
    } else {
      return campaigns;
    }
  } catch (error) {
    return error;
  }
};

getInActiveCampaigns = async () => {
  try {
    let campaigns = await getAllCampaigns();
    if (campaigns && campaigns.length) {
      return filterInActiveCampaigns(campaigns);
    } else {
      return campaigns;
    }
  } catch (error) {
    return error;
  }
};

module.exports = {
  getCampaignByNgoCode,
  getCampaigns,
  sortCampaigns,
  getActiveCampaigns,
  getInActiveCampaigns,
};
