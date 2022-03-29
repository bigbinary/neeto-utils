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

const truncate = (text = "", maxLength = 30) =>
  text.length > maxLength ? text.slice(0, maxLength - 3) + "..." : text;

const humanize = (string, capitalize = true) => {
  let humanizedString = string
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();

  if (capitalize) {
    humanizedString =
      humanizedString.charAt(0).toUpperCase() + humanizedString.slice(1);
  }

  return humanizedString;
};

export { Slugify, truncate, humanize };
