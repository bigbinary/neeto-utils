import React from "react";
import { Slugify } from "../../lib/utils";

const App = () => {
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
