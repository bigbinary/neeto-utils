import React, { useEffect, useRef, useState } from "react";
// import { Slugify } from "/bundle/main";
import BasicTemplate from "./components/BasicTemplate";
import {
  Slugify,
  encode,
  decode,
  decodeExecutionResponse,
} from "../../lib/utils";
import {
  useDebounce,
  useOnClickOutside,
  useLocalStorage,
} from "../../lib/hooks";

const App = () => {
  const buttonRef = useRef();
  const [useDebounceValue, setUseDebounceValue] = useState("");
  const [encodeValue, setEncodeValue] = useState("Hello BigBinary");

  useOnClickOutside(buttonRef, () => console.log("Clicked outside the button"));
  const debouncedValue = useDebounce(useDebounceValue, 2000);
  const [localStorageValue, setLocalStorageValue] = useLocalStorage(
    "useLocalStorage",
    "BigBinary"
  );

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
      <BasicTemplate
        title="useLocalStorage"
        input={
          <input
            placeholder="Enter value"
            value={localStorageValue}
            onChange={(e) => setLocalStorageValue(e.target.value)}
          />
        }
        output="Check local storage with key 'useLocalStorage'"
      />
      <BasicTemplate
        title="encode"
        input={
          <input
            placeholder="Enter Value"
            value={encodeValue}
            onChange={(e) => setEncodeValue(e.target.value)}
          />
        }
        output={encode(encodeValue)}
      />
      <BasicTemplate
        title="decode"
        input="SGVsbG8gQmlnQmluYXJ5"
        output={decode("SGVsbG8gQmlnQmluYXJ5")}
      />
      <BasicTemplate
        title="decodeExecutionResponse"
        input={JSON.stringify({
        stdin: "SW5wdXQ=",
        stdout: "T3V0cHV0",
        stderr: "RXJyb3I=",
        message: "TWVzc2FnZQ==",
        compile_output: "Q29ucGlsZWQgT3V0cHV0",
        expected_output: "RXhwZWN0ZWQgT3V0cHV0",
      })}
        output={JSON.stringify(decodeExecutionResponse({
          stdin: "SW5wdXQ=",
          stdout: "T3V0cHV0",
          stderr: "RXJyb3I=",
          message: "TWVzc2FnZQ==",
          compile_output: "Q29ucGlsZWQgT3V0cHV0",
          expected_output: "RXhwZWN0ZWQgT3V0cHV0",
        }))}
      />
    </div>
  );
};

export default App;
