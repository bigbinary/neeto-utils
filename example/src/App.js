import React, { useRef } from "react";
// import { Slugify } from "/bundle/main";
import BasicTemplate from "./components/BasicTemplate";
import { Slugify, useOnClickOutside } from "../../lib/utils";

const App = () => {
  const buttonRef = useRef();
  useOnClickOutside(buttonRef, () => console.log("Clicked outside the button"));

  return (
    <div>
      <h1>Neeto Utils</h1>
      <BasicTemplate
        title="SLugify"
        input="This is Neeto Utils"
        output={Slugify("This is Neeto Utils")}
      />
      <BasicTemplate
        title="useOnClickOutside"
        input={<button ref={buttonRef}>Click outside</button>}
        output="Check console"
      />
    </div>
  );
};

export default App;
