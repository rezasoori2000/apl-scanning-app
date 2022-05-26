import React from "react";

const GetHttp = async (methodname, args) => {
  try {

    var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
    console.log(request.readyState);
    console.log('request.status :'+request.status );
    console.log(request);
        return;
      }
    
      if (request.status === 200) {
        console.log('success', request.responseText);
        return request.responseText;
      } else {
        console.warn('error');
      }
    };
    var apiUrl = "";
    const data = require("../assets/data.json");
    apiUrl = data.apiRoute;

    var url = apiUrl + `methodname=${methodname}&args=${args}`;
    console.log(url);

    request.open('GET', url);
    request.send();
   

  } catch (error) {
    console.error(error);
  }
};

export default GetHttp;

