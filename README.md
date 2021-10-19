# NeetoUtils

NeetoUtils is a utilities library that drives the experience in all Neeto products built at BigBinary.

## Installation

```
yarn add https://github.com/bigbinary/neeto-utils
```

## Development

Install all the dependencies by executing following command.

```
yarn
```

You can create new components in the `lib/components` and export them from `lib/index.js`.

Running the `yarn start` command starts a CRA app which resides in `example` folder. Use this application to test out changes. Note that nothing in the `src` folder will be bundled with NeetoEditor.

## Building

Running the `yarn build` command build a production bundle file.

# Available utilities

## Utils

### Slugify

```js
const Slugify = string => {
  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};
```

### Truncate

```js
const truncate = (text = "", maxLength = 30) =>
  text.length > maxLength ? R.concat(R.slice(0, maxLength, text), "...") : text;
```
## Hooks

### useDebounce

```js
const useDebounce = (value, delay = 800) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
};
```
### useOnClickOutside

```js
const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};
```
### useLocalStorage

`useLocalStorage` is a custom react hook used to read and write a specific field in application's localstorage.

```js
const [localStorageValue, setLocalStorageValue] = useLocalStorage(
  "useLocalStorage",
  "BigBinary"
);
return (
  <input
    placeholder="Enter value"
    value={localStorageValue}
    onChange={(e) => setLocalStorageValue(e.target.value)}
  />
);
```
### useAxios

`useAxios` is a custom react hook used to perform API requests. It helps reduce the duplication of the same code in the same file and across multiple files in a project.

```js
const {
		request: createPost,
		apiResponse: { data: id },
		error: createError,
		isLoading: createLoading,
	} = useAxios(
		{
			method: "POST" // Any valid HTTP methid ,
			url: "https://jsonplaceholder.typicode.com/posts" // A valid API endpoint,
      headers: "" // Valid HTTP headers
		},
		""
	);
```
