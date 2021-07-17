isEmptyResponse = (obj) => {
  return Object.keys(obj).length === 0;
};

sortBasedOnKey = (list, order, key) => {
  if (order === "ascending") {
    list.sort((a, b) => a[key] - b[key]);
  } else {
    list.sort((a, b) => b[key] - a[key]);
  }
  list.forEach((e) => {
    console.log(`${e.totalAmount} ----> ${e.code}`);
  });
  return list;
};

oneMonthBack = () => {
  var d = getDateObject();
  var m = d.getMonth();
  d.setMonth(d.getMonth() - 1);

  if (d.getMonth() == m) d.setDate(0);
  d.setHours(0, 0, 0, 0);
  return d;
};

getDateObject = (date) => {
  if (date) {
    let dateObject = new Date(date);
    dateObject.setHours(0, 0, 0, 0);
    return dateObject;
  } else {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    console.log(today);
    return today;
  }
};

module.exports = {
  isEmptyResponse,
  sortBasedOnKey,
  oneMonthBack,
  getDateObject,
};
