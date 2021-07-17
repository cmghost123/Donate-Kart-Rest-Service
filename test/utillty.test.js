const assert = require("assert");
const utils = require("../src/utility");
const chai = require("chai");
const { exception } = require("console");
const expect = chai.expect;

describe("isEmptyResponse", () => {
  it("should return true when response is empty object", () => {
    expect(utils.isEmptyResponse({})).to.be.true;
  });

  it("should return false when response is not empty array", () => {
    expect(utils.isEmptyResponse([])).to.be.true;
  });

  it("should return true when response is empty object", () => {
    expect(utils.isEmptyResponse({ a: 1 })).to.be.false;
  });

  it("should return false when response is not empty array", () => {
    expect(utils.isEmptyResponse(["a"])).to.be.false;
  });
});

describe("sortBasedOnKey", () => {
  beforeEach(function () {
    list = [{ totalAmount: 50 }, { totalAmount: 10 }, { totalAmount: 90 }];
    descSortedList = [
      { totalAmount: 90 },
      { totalAmount: 50 },
      { totalAmount: 10 },
    ];
  });

  it("should return descending sorted list default if order is not specified", () => {
    expect(utils.sortBasedOnKey(list, "", "totalAmount")).to.have.deep.members(
      descSortedList
    );
  });

  it("should return descending sorted list wrt key in object ", () => {
    expect(
      utils.sortBasedOnKey(list, "descending", "totalAmount")
    ).to.have.deep.members(descSortedList);
  });

  it("should return ascending sort ordered list wrt key in object", () => {
    expect(
      utils.sortBasedOnKey(list, "ascending", "totalAmount")
    ).to.have.deep.members(descSortedList);
  });
});
