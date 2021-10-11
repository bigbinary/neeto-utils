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

## Hooks

### useDebounce

### useOnClickOutside

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
