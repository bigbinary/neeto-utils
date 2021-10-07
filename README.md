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
Utils 
1. Slugify
2. encode
3. decode
4. decodeExecutionResponse

Hooks 
1. useDebounce
2. useOnClickOutside
3. useLocalStorage
4. useFetch (Todo)

