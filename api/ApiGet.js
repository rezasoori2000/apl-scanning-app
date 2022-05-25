import React, { useEffect, useState } from "react";

const ApiGet = async (methodname, args) => {
  try {
    var apiUrl = "";
    const data = require("../assets/data.json");
    apiUrl = data.apiRoute;

    var url = apiUrl + `methodname=${methodname}&args=${args}`;
    console.log(url);
    const response = await fetch(url);
    console.log(response);
    var json = {};
    if (response === "False" || response === "True") {
      json = { result: response };

    } else {
      json = await response.json();
    }

    console.log("it returns: " + json);
    return json;
  } catch (error) {
    console.error(error);
  }
};

export default ApiGet;
