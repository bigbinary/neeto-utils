import moment from "moment";
import * as R from "ramda";
import { v4 as uuid } from "uuid";

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

const decodeExecutionResponse = (response) => {
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

const encode = (str) => window.btoa(unescape(encodeURIComponent(str)));

const decode = (str) => decodeURIComponent(escape(window.atob(str)));

const dataCy = (value, suffix = "") => {
  return `[data-cy='${value}']${suffix}`;
};

const generateUUID = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};

const getDateInFormat = (date) => {
  const momentDate = moment(date);
  return moment().endOf("day").diff(moment(date), "days") >= 2
    ? momentDate.format("MMMM DD")
    : momentDate.calendar().split(" ")[0];
};

const timeAgo = (time, options = {}) => {
  const suffix = R.defaultTo("ago")(options.suffix);
  const nowText = R.defaultTo("just now")(options.nowText);
  moment.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s",
      s: `1s ${suffix}`,
      ss: `%d s ${suffix}`,
      m: `1m ${suffix}`,
      mm: `%dm ${suffix}`,
      h: `1h ${suffix}`,
      hh: `%dh ${suffix}`,
      d: `1d ${suffix}`,
      dd: `%dd ${suffix}`,
      M: `a month ${suffix}`,
      MM: `%d months ${suffix}`,
      y: `a year ${suffix}`,
      yy: `%d years ${suffix}`,
    },
  });

  let secondsElapsed = moment().diff(time, "seconds");

  if (secondsElapsed > 59) {
    return moment(time).fromNow(true);
  } else {
    return nowText;
  }
};

const getTooltipTimestamp = (time) => {
  const momentObj = moment(time);
  const timeString = momentObj.format("hh:mm:ss A");
  const isToday = momentObj.isSame(moment(), "day");
  const isYesterday = momentObj.isSame(moment().subtract(1, "day"), "day");

  if (isToday) {
    return `Today at ${timeString}`;
  } else if (isYesterday) {
    return `Yesterday at ${timeString}`;
  } else {
    return `${momentObj.format("MMM DD, YYYY")} at ${timeString}`;
  }
};

const truncateMessage = (text = "", maxLength = 30) =>
  text.length > maxLength ? R.concat(R.slice(0, maxLength, text), "...") : text;

const isImageAttachment = (url) => url && /\.(jpeg|jpg|gif|png)$/.test(url);
const isVideoAttachment = (url) =>
  url && /\.(mp4|mov|wmv|flv|avi|webm|mkv)$/.test(url);
const isPdfAttachment = (url) => url && /\.(pdf)$/.test(url);

const getFileType = (attachment_url) => {
  return (
    (isImageAttachment(attachment_url) && "image") ||
    (isVideoAttachment(attachment_url) && "video") ||
    (isPdfAttachment(attachment_url) && "document") ||
    ""
  );
};

const resizeImage = (file, callback, maxWidth = 40, maxHeight = 40) => {
  const fileReader = new FileReader();

  fileReader.onload = function () {
    const image = new Image();
    image.onload = function () {
      const canvas = document.createElement("canvas");
      const imageWidth = image.width;
      const imageHeight = image.height;
      const scale = Math.min(maxWidth / imageWidth, maxHeight / imageHeight);

      canvas.width = imageWidth * scale;
      canvas.height = imageHeight * scale;
      canvas
        .getContext("2d")
        .drawImage(image, 0, 0, canvas.width, canvas.height);

      callback(canvas.toDataURL());
    };

    image.src = this.result;
  };

  fileReader.readAsDataURL(file);
};

const requestWebNotificationPermission = () => {
  if (!("Notification" in window)) {
    /* eslint-disable no-console */
    console.log("This browser does not support desktop notification");
    /* eslint-disable no-console */
  } else {
    Notification.requestPermission();
  }
};

let timeoutId = null;
const blinkDocumentTitleWithUnreadCount = (unreadCount) => {
  if (unreadCount > 0) {
    const oldTitle = R.replace(/ *\([^)]*\) */g, "", document.title);
    const newTitle = `(${unreadCount}) ${oldTitle}`;

    const blink = () => {
      document.title = document.title == newTitle ? oldTitle : newTitle;
    };
    const clear = () => {
      clearInterval(timeoutId);
      document.title = oldTitle;
      window.onmousemove = null;
      timeoutId = null;
    };

    if (timeoutId) clear();
    if (!timeoutId) {
      timeoutId = setInterval(blink, 1000);
      window.onmousemove = clear;
    }
  }
};

const getToken = () => `${uuid()}-${new Date().getTime()}`;

const humanize = (string) => {
  string = string
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
  string = string.charAt(0).toUpperCase() + string.slice(1);

  return string;
};

const titleize = (string) => {
  return string
    .split("_")
    .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
    .join(" ");
};

const timeAgoInWords = (date) => {
  const units = [
    { max: 2760000, value: 60000, name: "minute", prev: "a minute ago" },
    { max: 72000000, value: 3600000, name: "hour", prev: "an hour ago" },
    { max: 518400000, value: 86400000, name: "day", prev: "yesterday" },
    { max: 2419200000, value: 604800000, name: "week", prev: "last week" },
    // max: 11 months
    { max: 28512000000, value: 2592000000, name: "month", prev: "last month" },
  ];

  const format = (diff, divisor, unit, prev) => {
    const val = Math.round(diff / divisor);
    return val <= 1 ? prev : val + " " + unit + "s ago";
  };

  const diff = Math.abs(Date.now() - new Date(date).getTime());
  // less than a minute
  if (diff < 60000) return "just now";
  for (let i = 0; i < units.length; i++) {
    if (diff < units[i].max) {
      return format(diff, units[i].value, units[i].name, units[i].prev);
    }
  }

  // `year` is the final unit.
  // same as:
  //  {
  //    max: Infinity,
  //    value: 31536000000,
  //    name: 'year',
  //    prev: 'last year'
  //  }
  return format(diff, 31536000000, "year", "last year");
};

export {
  Slugify,
  decodeExecutionResponse,
  encode,
  decode,
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
};
