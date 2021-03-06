import React, { useEffect, useRef, useState } from "react";
import BasicTemplate from "./components/BasicTemplate";
import { Slugify, truncate, humanize } from "../../lib/utils";
import {
  useAxios,
  useDebounce,
  useOnClickOutside,
  useLocalStorage,
} from "../../lib/hooks";

const App = () => {
  const buttonRef = useRef();
  const [useDebounceValue, setUseDebounceValue] = useState("");

  useOnClickOutside(buttonRef, () => console.log("Clicked outside the button"));
  const debouncedValue = useDebounce(useDebounceValue, 2000);
  const truncateSentence =
    "This is a large sentence to test truncate function of length 74 characters";
  const [localStorageValue, setLocalStorageValue] = useLocalStorage(
    "useLocalStorage",
    "BigBinary"
  );

  const {
    request: getPosts,
    response: { data: posts },
    error: postsError,
    isLoading: postsLoading,
  } = useAxios(
    {
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/posts",
    },
    []
  );

  const {
    request: createPost,
    response: { data: id },
    error: createError,
    isLoading: createLoading,
  } = useAxios(
    {
      method: "POST",
      url: "https://jsonplaceholder.typicode.com/posts",
    },
    ""
  );

  const handleSubmit = () => {
    createPost();
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
        title="Humanize"
        input={"this-is-neeto-utils"}
        output={humanize("this-is-neeto-utils")}
      />
      <BasicTemplate
        title="Truncate"
        input={truncateSentence}
        output={truncate(truncateSentence)}
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
      <button
        onClick={() => getPosts()}
        style={{
          marginRight: "16px",
        }}
      >
        GET
      </button>
      <button onClick={() => handleSubmit()}>POST</button>
      <div>
        <h1>Posts - GET</h1>

        {postsLoading ? (
          <p>loading...</p>
        ) : (
          <div>
            {postsError && (
              <div>
                <p>{postsError.message}</p>
              </div>
            )}
            <div>
              {posts &&
                posts.map((todo) => <h3 key={todo.id}>{todo.title}</h3>)}
            </div>
          </div>
        )}
      </div>
      <div>
        {createLoading ? <p>Loading...</p> : <p>{JSON.stringify(id)}</p>}
        {createError && <p>createError</p>}
      </div>
    </div>
  );
};

export default App;
