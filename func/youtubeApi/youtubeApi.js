const fetch = require("node-fetch");
// /.netlify/functions/youtubeApi
const KEY = process.env.REACT_APP_KEY;

exports.handler = async function (event, context, callback) {
  let url = new URL("https://www.googleapis.com/youtube/v3/search"),
    params = {
      part: "id,snippet",
      key: KEY,
      maxResults: 11,
      q: "videos",
      chart: "mostPopular",
    };
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );
  let res = await fetch(url, {
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached

    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await res.json();
  console.log("data:", data);
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(data),
  });
};
