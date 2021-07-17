isEmptyResponse = (response) => {
  if(response instanceof Array){
    return response.length === 0;
  } else if(response instanceof Object){
    return Object.keys(response).length === 0;
  }
};

sortBasedOnKey = (list, order, key) => {
  if (order === "ascending") {
    list.sort((a, b) => a[key] - b[key]);
  } else {
    list.sort((a, b) => b[key] - a[key]);
  }
  return list;
};

oneMonthBack = () => {
  let date = getDateObject();
  let month = date.getMonth();
  date.setMonth(date.getMonth() - 1);

  if (date.getMonth() == month) date.setDate(0);
  date.setHours(0, 0, 0, 0);
  return date;
};

getDateObject = (date) => {
  if (date) {
    let dateObject = new Date(date);
    dateObject.setHours(0, 0, 0, 0);
    return dateObject;
  } else {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }
};

module.exports = {
  isEmptyResponse,
  sortBasedOnKey,
  oneMonthBack,
  getDateObject,
};
