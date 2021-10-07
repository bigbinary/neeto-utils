const Slugify = (string) => {
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

const decodeExecutionResponse = response => {
  const decodedResponse = { ...response };
  if (response.stdin) decodedResponse.stdin = decode(response.stdin);

  if (response.stdout) decodedResponse.stdout = decode(response.stdout);

  if (response.stderr) decodedResponse.stderr = decode(response.stderr);

  if (response.message) decodedResponse.message = decode(response.message);

  if (response.compile_output) {
    decodedResponse.compile_output = decode(response.compile_output);
  }

  if (response.expected_output) {
    decodedResponse.expected_output = decode(response.expected_output);
  }

  return decodedResponse;
};

const encode = str => window.btoa(unescape(encodeURIComponent(str)));

const decode = str => decodeURIComponent(escape(window.atob(str)));

const a = {
  stdin: "SW5wdXQ=",
  stdout: "T3V0cHV0",
  stderr: "RXJyb3I=",
  message: "TWVzc2FnZQ==",
  compile_output: "Q29ucGlsZWQgT3V0cHV0",
  expected_output: "RXhwZWN0ZWQgT3V0cHV0",
}

export { Slugify, decodeExecutionResponse, encode, decode };
