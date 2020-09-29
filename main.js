//   Using axios
// Create a function (up to you what you name it)
// Use this as your url 'https://api.publicapis.org/entries'
// First with promises then with async await
// after you get your data, limit the data to the first 20 choices
// if Cors is 'yes' log Description
// if Cors is 'unknown' log Link (edited)

// Amendment to #2 in classwork:
// Where I said: // take data and output 'Hello Joe Peters' for each object
// I mean log the first and last name for each object.

/////////////////////with async///////////////////////////////////////
let url = "https://api.publicapis.org/entries";
const axios = require("axios");

const withAsync = async (data) => {
  try {
    const response = await axios.get(data);
    const myData = await response.data.entries;
    console.log("\n------------------1 async begin-----------------");
    await myData.filter(({ Description, Cors, Link }, i) => {
      if (i < 20) {
        if (Cors === "yes") { console.log(Description);}
        if (Cors === "unknown") {console.log(Link);}
      }
    });
    console.log(`--------------- async end-----------------------\n`);
  } catch (err) {
    console.log(err);
  }
};

withAsync(url);

/////////////with async/////////////////////////////////////////////



///////////////////////with promise/////////////////////////////////
const fetch = require("node-fetch");

let yes = true;
const hi = (data) => {
  return new Promise((resolve, reject) => {
    if (yes) {
      const data1 = fetch(url)
        .then((data) => {return data.json()})
        .then((data) => {return data.entries;});
      resolve(data1);
    } else {
      reject("some error");
    }
  });
};

hi(url)
  .then((data) => data.filter((item, i) => i < 20))
  .then((data) => {
    console.log("------------2 why i am at top----------------");
    data.filter((item) => {
      if (item.Cors === "yes") {
        console.log(item.Description);
      }
      if (item.Cors === "unknown") {
        console.log(item.Link);
      }
    });
  });
////////////////////////with promise/////////////////////////////////