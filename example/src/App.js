import React from "react";
import utils from "../../lib/utils";

const App = () => {
  const { Slugify } = utils;
  return (
    <div>
      <h2>Neeto Utils</h2>
      <p>
        The slug for <strong>This is Neeto Utils</strong> is <strong>{Slugify("This is Neeto Utils")}</strong>
      </p>
    </div>
  );
};

export default App;
