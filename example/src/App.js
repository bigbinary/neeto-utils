import React, { useEffect, useRef, useState } from "react";
// import { Slugify } from "/bundle/main";
import BasicTemplate from "./components/BasicTemplate";
import {
  Slugify,
  encode,
  decode,
  decodeExecutionResponse,
  dataCy,
  generateUUID,
  getDateInFormat,
  timeAgo,
  getTooltipTimestamp,
  truncateMessage,
  isImageAttachment,
  isVideoAttachment,
  isPdfAttachment,
  getFileType,
  resizeImage,
  requestWebNotificationPermission,
  blinkDocumentTitleWithUnreadCount,
  getToken,
  humanize,
  titleize,
  timeAgoInWords,
} from "../../lib/utils";
import {
  useDebounce,
  useOnClickOutside,
  useLocalStorage,
  useFuncDebounce,
} from "../../lib/hooks";

const App = () => {
  const buttonRef = useRef();
  const [useDebounceValue, setUseDebounceValue] = useState("");
  const [encodeValue, setEncodeValue] = useState("Hello BigBinary");
  const [unreadCount, setUnreadCount] = useState(0);
  const [tokenValue, setTokenValue] = useState("");

  useOnClickOutside(buttonRef, () => console.log("Clicked outside the button"));
  const debouncedValue = useDebounce(useDebounceValue, 2000);
  const [localStorageValue, setLocalStorageValue] = useLocalStorage(
    "useLocalStorage",
    "BigBinary"
  );
  const handleResizeImage = (event) => {
    const callback = (dataUrl) => console.log("Resized image", dataUrl);
    resizeImage(event.target.files[0], callback, 50, 50);
  };

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
        output={JSON.stringify(
          decodeExecutionResponse({
            stdin: "SW5wdXQ=",
            stdout: "T3V0cHV0",
            stderr: "RXJyb3I=",
            message: "TWVzc2FnZQ==",
            compile_output: "Q29ucGlsZWQgT3V0cHV0",
            expected_output: "RXhwZWN0ZWQgT3V0cHV0",
          })
        )}
      />
      <BasicTemplate
        title="dataCy"
        input={JSON.stringify({ value: "Hello", suffix: "BigBinary" })}
        output={dataCy("Hello", "BigBinary")}
      />
      <BasicTemplate
        title="generateUUID"
        input={null}
        output={generateUUID()}
      />
      <BasicTemplate
        title="useFuncDebounce"
        input={
          <button
            onClick={useFuncDebounce(
              () => console.log("Func debounced after 2 seconds"),
              2000
            )}
          >
            Click for debounce
          </button>
        }
        output="Check console"
      />
      <BasicTemplate
        title="getDateInFormat"
        input="11-11-2011"
        output={getDateInFormat("11-11-2011")}
      />
      <BasicTemplate
        title="timeAgo"
        input={String(new Date("10-08-2021 03:02:17"))}
        output={timeAgo(new Date("10-08-2021 03:02:17"))}
      />
      <BasicTemplate
        title="getTooltipTimestamp"
        input={String(new Date("10-08-2021 03:02:17"))}
        output={getTooltipTimestamp(new Date("10-08-2021 03:02:17"))}
      />
      <BasicTemplate
        title="truncateMessage"
        input={JSON.stringify({
          text: loremIpsum,
          maxLength: 50,
        })}
        output={truncateMessage(loremIpsum, 50)}
      />
      <BasicTemplate
        title="isImageAttachment"
        input="https://picsum.photos/200/300.jpg"
        output={String(isImageAttachment("https://picsum.photos/200/300.jpg"))}
      />
      <BasicTemplate
        title="isVideoAttachment"
        input="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
        output={String(
          isVideoAttachment(
            "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
          )
        )}
      />
      <BasicTemplate
        title="isPdfAttachment"
        input="http://www.africau.edu/images/default/sample.pdf"
        output={String(
          isPdfAttachment("http://www.africau.edu/images/default/sample.pdf")
        )}
      />
      <BasicTemplate
        title="getFileType"
        input="https://picsum.photos/200/300.jpg"
        output={getFileType("https://picsum.photos/200/300.jpg")}
      />
      <BasicTemplate
        title="resizeImage"
        input={
          <input
            type="file"
            placeholder="Select an image"
            accept="image/*"
            onChange={handleResizeImage}
          />
        }
        output="Check console"
      />
      <BasicTemplate
        title="requestWebNotificationPermission"
        input={
          <button onClick={requestWebNotificationPermission}>Click here</button>
        }
        output="Check console"
      />
      <BasicTemplate
        title="blinkDocumentTitleWithUnreadCount"
        input={
          <>
            <input
              placeholder="Enter number"
              type="number"
              value={unreadCount}
              onChange={(e) => setUnreadCount(e.target.value)}
            />
            <button
              onClick={() => blinkDocumentTitleWithUnreadCount(unreadCount)}
            >
              Submit
            </button>
          </>
        }
        output="Check ducument title"
      />
      <BasicTemplate
        title="getToken"
        input={
          <button onClick={() => setTokenValue(getToken())}>
            Generate token
          </button>
        }
        output={tokenValue}
      />
      <BasicTemplate
        title="humanize"
        input="hello_big-binary"
        output={humanize("hello_big-binary")}
      />
      <BasicTemplate
        title="titleize"
        input="hello_big-binary"
        output={titleize("hello_big-binary")}
      />
      <BasicTemplate
        title="timeAgoInWords"
        input={String(new Date("10-08-2021 03:02:17"))}
        output={timeAgoInWords(new Date("10-08-2021 03:02:17"))}
      />
    </div>
  );
};

export default App;

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt lectus lacus, aliquam sodales nibh facilisis sed. Praesent placerat odio non hendrerit facilisis. Mauris mollis sagittis sapien vel blandit. Aenean gravida risus vitae leo suscipit, vitae sollicitudin mi sodales. Nam elementum lacus tempus mauris euismod aliquet. Vestibulum eget diam et risus aliquam efficitur ut et orci. Fusce convallis magna sed commodo lacinia. Aliquam malesuada neque nulla, vel faucibus nibh porttitor id. Aliquam ultricies sagittis sem non lacinia. Cras mauris nisi, pellentesque sed facilisis at, mattis sed nibh. Pellentesque et turpis id urna mollis blandit quis laoreet libero.";
