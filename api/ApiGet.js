import React from "react";

const ApiGet = async (methodname, args) => {
  try {
    var apiUrl = "";
    const data = require("../assets/data.json");
    apiUrl = data.apiRoute;

    var url = apiUrl + `methodname=${methodname}&args=${args}`;
    // url = "https://dummy.restapiexample.com/api/v1/employees";

    console.log(url);


    // fetch(url)
    //   .then((res) => res.json())
    //   .then(
    //     (result) => {
    //       console.log(result);
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );

    var response = await fetch(url);
    // console.log(await response);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export default ApiGet;
