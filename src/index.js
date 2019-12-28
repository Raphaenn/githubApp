import React from "react";
import { StatusBar } from "react-native";
import "./config/reactotronConfig";

import Router from "./routes";

export default function App() {
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor="#E71D36"/>
        <Router />
      </>
    )
  }
