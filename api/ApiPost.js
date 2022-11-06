import React from "react";

const ApiPost = async (action, value) => {
  try {
    var apiUrl = "";
    const data = require("../assets/data.json");
    apiUrl = data.apiRoute;

    apiUrl += action;

    var response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: value,
    });
    return await response.json();
  } catch (err) {
    console.log("catch" + err);
  }
};

export default ApiPost;
