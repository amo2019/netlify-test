const URL = "/api/ron/quotes";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("ron").addEventListener("click", getRon);
  document.getElementById("yep").addEventListener("click", getYes);
  document
    .getElementById("youtubeApi")
    .addEventListener("click", getyoutubeApi);
});

function getRon(ev) {
  ev.preventDefault();
  console.log("get ron quote");
  fetch(URL)
    .then((resp) => resp.json())
    .then((content) => {
      let main = document.querySelector("main");
      main.innerHTML = `<h2>${content[0]}</h2>`;
    })
    .catch((err) => console.error);
}

function getYes(ev) {
  console.log("yes");
  let url = "/api/yes";
  fetch(url)
    .then((resp) => resp.json())
    .then((content) => {
      let main = document.querySelector("main");
      main.innerHTML = `<h2>${content.msg}</h2>`;
    })
    .catch((err) => console.error);
}

function createClickHandler(e) {
  let itemId = e.target.getAttribute("id");
  //console.log("e.nextSibling:", e.nextSibling);
  //e.nextSibling.removeNode;
  if (e.target !== e.currentTarget && itemId) {
    let clickedItem = e.target.innerHTML;
    let attr = "d" + itemId;
    let x = document.getElementById(attr);
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }

    var clickedItem3 = e.target;
    console.log("clicked Item:", clickedItem, itemId);
  }
  e.stopPropagation();
}

function getyoutubeApi(ev) {
  ev.preventDefault();
  console.log("get youtubeApicat");
  fetch("/api/youtubeApi")
    .then((res) => res.json())
    .then((data) => {
      let main = document.querySelector("main");
      let element = document.createElement("div");
      var att = document.createAttribute("class");
      let content = data.items.map((item) => {
        console.log("item:", item);
        if (item.id.videoId)
          return `<li id="${item.id.videoId}">${item.snippet.channelTitle}</li><div id="d${item.id.videoId}" hidden>${item.snippet.channelTitle}</div>`;
      });

      main.innerHTML = `<ul style="list-style-type:none;">${content}</ul>`;

      let child_nodes = Array.from(main.childNodes);
      console.log("main;", child_nodes[0].childNodes[2].textContent);
      for (item in child_nodes) {
        console.log("node name:", item, child_nodes.length);
        if (item.textContent === ",") {
          child_nodes.removeChild(item);
        }
      }
      var children = main.childNodes;

      for (child in children) {
        console.log("::", children[child]);
      }

      main.addEventListener("click", createClickHandler, false);
    })
    .catch(console.error);
}
