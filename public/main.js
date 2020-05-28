function ajax(method, url, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      cb(xhr);
    }
  };
  xhr.send();
}
getCSS.onclick = () => {
  ajax("GET", "/style.css", (xhr) => {
    const style = document.createElement("style");
    style.innerHTML = xhr.response;
    document.head.appendChild(style);
  });
};
getJS.onclick = () => {
  ajax("GET", "/2.js", (xhr) => {
    const script = document.createElement("script");
    script.innerText = xhr.responseText;
    document.body.appendChild(script);
  });
};
getHTML.onclick = () => {
  ajax("GET", "/3.html", (xhr) => {
    const div = document.createElement("div");
    div.innerHTML = xhr.responseText;
    document.body.appendChild(div);
  });
};
getXML.onclick = () => {
  ajax("GET", "/4.xml", (xhr) => {
    const span = document.querySelector("#myName");
    const name = xhr.responseXML.getElementsByTagName("warning")[0].textContent;
    span.innerHTML = name;
  });
};
getJSON.onclick = () => {
  ajax("GET", "/5.json", (xhr) => {
    const span = document.querySelector("#myName");
    console.log(xhr);
    const name = JSON.parse(xhr.responseText).name;
    span.innerHTML = name;
  });
};
let pageIndex = 2;
getNextPage.onclick = () => {
  ajax("GET", `/page${pageIndex}`, (xhr) => {
    const list = document.querySelector("#list");
    const data = JSON.parse(xhr.responseText);
    const html = data.map((item) => `<li>${item.id}</li>`).join("");
    list.innerHTML += html;
    pageIndex++;
  });
};
