import React, { useState } from "react";
import Firstpage from "../components/Firstpage";
import { useRoutes } from "react-router-dom";
import Secondpage from "../components/Secondpage";

const AppRoutes = () => {
  const [country, setCountry] = useState("London");

  const routes = [
    {
      path: "/",
      element: <Firstpage country={country} />,
    },
    {
      path: "/second",
      element: <Secondpage setCountry={setCountry} country={country} />,
    },
  ];
  const route = useRoutes(routes);
  return route;
};

export default AppRoutes;
