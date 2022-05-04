import React, { useEffect, useState } from "react";
import axios from "axios";

const SoapCall = async (action, value) => {
  try {
    // var url = "https://esporders-test.aplnz.co.nz/ESPHubWebServer/HubService";
    var url = "https://172.16.1.42/ESPHubWebServer/HubService";
    //var url = "http://dummy.restapiexample.com/api/v1/employees";
    var header = { "Content-Type": "application/x-www-form-urlencoded" };
    var data =
      "<soap12:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap12='http://www.w3.org/2003/05/soap-envelope'><soap12:Header xmlns:wsa='http://www.w3.org/2005/08/addressing'><wsa:To>https://esporders-test.aplnz.co.nz/ESPHubWebServer/HubService</wsa:To><wsa:Action>http://ESP.Hub.WebServer/IHubMainService/ESP_HS_Customer_IsAlive</wsa:Action></soap12:Header><soap12:Body xmlns:xsi='http://ESP.Hub.WebServer'><xsi:ESP_HS_Customer_IsAlive><corpPassword>1@ie3avb2ebVE1Mn</corpPassword></xsi:ESP_HS_Customer_IsAlive></soap12:Body></soap12:Envelope>";
    var a = await axios.post(url, data, { header });
    //   body: data,
    //   method: "POST",
    //   mode: "cors",
    //   header: header,
    // });

    //.done();
    return JSON.stringify(a);
  } catch (error) {
    console.log(error);
  }
};

export default SoapCall;
