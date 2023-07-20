import MyTabs from "./navigation";
import {init} from "./helper/db";
import React from "react";

init().then(()=>{
  console.log("Db initialized successfully");
}).catch(err=>{
  console.log("Db initialized with failure: " + err.message);
});

export default function App() {
  return <MyTabs />;
}


