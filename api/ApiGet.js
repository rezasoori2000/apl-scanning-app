import React, { useEffect, useState } from "react";

const ApiGet = async (action, value) => {
  try {
    var apiUrl = "";
    const data = require("../assets/data.json");
    apiUrl = data.apiRoute;

    var url = apiUrl + action;
    url += value != undefined ? `?${value}` : ``;
    console.log(url);
    const response = await fetch(url);

    const json = await response.json();
    return json;
    console.log("it returns: " + json);
  } catch (error) {
    console.error(error);
  }
};

export default ApiGet;
