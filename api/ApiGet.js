import React from "react";

const ApiGet = async (methodname, args) => {
  try {
    var apiUrl = "";
    const data = require("../assets/data.json");
    apiUrl = data.apiRoute;

    var url = apiUrl + `methodname=${methodname}&args=${args}`;
    console.log(url);
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    })
    .then((response) => {
      return response.json();
    });

    //  fetch(url,{
    //   method: 'GET',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json'
      
    //  }}).then((response) => {
    //   console.log("Response: "+JSON.stringify(response)); 
    //   response.json()})
    //  .then((json) => {
      
    //    return json;
    //  })
    //  .catch((error) => {
    //    console.error(error);
    //  });

  } catch (error) {
  //  console.error('Kooni : '+error);
  }
};

export default ApiGet;
