import React, { useEffect, useRef, useState } from "react";
// import { Slugify } from "/bundle/main";
import BasicTemplate from "./components/BasicTemplate";
import { Slugify } from "../../lib/utils";
import { useDebounce, useOnClickOutside } from "../../lib/hooks";

const App = () => {
  const buttonRef = useRef();
  const [useDebounceValue, setUseDebounceValue] = useState("");

  useOnClickOutside(buttonRef, () => console.log("Clicked outside the button"));
  const debouncedValue = useDebounce(useDebounceValue, 2000);

  useEffect(() => {
    if (debouncedValue) {
      console.log(debouncedValue);
      setUseDebounceValue("");
    }
  }, [debouncedValue]);

  return (
    <div>
      <h1>Neeto Utils</h1>
      <BasicTemplate
        title="Slugify"
        input="This is Neeto Utils"
        output={Slugify("This is Neeto Utils")}
      />
      <BasicTemplate
        title="useOnClickOutside"
        input={<button ref={buttonRef}>Click outside</button>}
        output="Check console"
      />
      <BasicTemplate
        title="useDebounce"
        input={
          <button
            onClick={() => setUseDebounceValue("Debounced after 2 seconds")}
          >
            Click for debounce
          </button>
        }
        output="Check console"
      />
    </div>
  );
};

export default App;
