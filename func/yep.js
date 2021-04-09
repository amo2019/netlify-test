// /.netlify/functions/yep

exports.handler = function (event, context, callback) {
  //event - similar to express Request object
  console.log(event);

  let amin = process.env.amin;
  console.log(amin);

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ msg: `Yes. Yes. ${amin}` }),
  });
};
