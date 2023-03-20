import { query } from "express";

const advancedResults = (model, populate) => async (req, res, next) => {
  let query;
  //copy req.query
  const reqQuery = { ...req.query };
};

//Fields to exclude
const removeFields = ["select", "sort", "page", "limit"];

//loop over removefields and delete them from reqQuery
removeFields.forEach((param) => delete reqQuery(param));

//create query string from reqQuery
let queryStr = JSON.stringify(reqQuery);
queryStr = queryStr.replace(new RegExp('"', "g"), "");
