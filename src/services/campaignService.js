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
      result = MOCK;
    } else {
      let campaignResponse = await fetch(config.donateKartTestUrl);
      let campaigns = await campaignResponse.json();
      console.log("total campaigns : ", campaigns.length);
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
    let response = await getAllCampaigns();
    if (response && response.campaigns.length) {
      campaignFound = response.campaigns.find(
        (campaign) => campaign.ngoCode === req.params.ngoCode
      );
      console.log(campaignFound);
    }
    return campaignFound;
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
    let response = await getAllCampaigns();

    if (response && response.campaigns.length) {
      if (req.query.key) {
        key = req.query.key;
      } else {
        key = CONSTANT.DEFAULT_KEY_TO_SORT;
      }

      let sortedCampaigns = utils.sortBasedOnKey(
        response.campaigns,
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

filterActiveCampiagns = (list) => {
  let today = utils.getDateObject();

  let previousMonth = utils.oneMonthBack();
  console.log(list.length);
  let campiagns = list.filter((item) => {
    let creationDate = utils.getDateObject(item.created);
    let endDate = utils.getDateObject(item.endDate);
    console.log(creationDate, endDate);
    return creationDate >= previousMonth && endDate >= today;
  });
  console.log(campiagns);
  return campiagns;
};

inActiveCampiagns = (list) => {
  let today = utils.getDateObject();

  let campiagns = list.filter((item) => {
    let endDate = utils.getDateObject(item.endDate);

    endDate < today && console.log(endDate);
    return item.procuredAmount >= item.totalAmount || endDate < today;
  });

  return campiagns;
};

getActiveCampaigns = async () => {
  try {
    let response = await getAllCampaigns();
    if (response && response.campaigns.length) {
      return filterActiveCampiagns(response.campaigns);
    } else {
      return response;
    }
  } catch (error) {
    return error;
  }
};

getInActiveCampaigns = async () => {
  try {
    let response = await getAllCampaigns();
    if (response && response.campaigns.length) {
      return inActiveCampiagns(response.campaigns);
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
