import React from "react";
// import { Slugify } from "/bundle/main";
import { Slugify } from "../../lib/utils";

const App = () => {
  return (
    <div>
      <h1>Neeto Utils</h1>
      <h3>Slugify</h3>
      <p>
        Input: <b>This is Neeto Utils</b><br/>
        Output: <b>{Slugify("This is Neeto Utils")}</b>
      </p>
    </div>
  );
};

export default App;
