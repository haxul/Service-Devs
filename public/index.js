let list = document.querySelector("#list");

const getDevs = () => {
  let devs;
  fetch("/api/devs")
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      list.innerHTML = "";
      for (let i = 0; i < res.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = "";
        for (let key in res[i]) {
          switch (key) {
            case "_id":
              break;
            case "id": 
              li.innerHTML +="id: " + res[i]["id"];
              break;
            case "name":
              li.innerHTML += ", Name: " +  res[i]["name"];
              break;
            case "position":
              li.innerHTML += ", position: " + res[i]["position"];
              break;
            default:
              if (res[i]["skills"] === null) break;
              let skills = res[i]["skills"].join(", ");
              console.log(res[i]["skills"]);
              li.innerHTML += ", skills: " + skills + ".";
              break;
          }
        }
        list.append(li);
      }
    });
};

const addDev = (name, position, skills) => {
  const skillList = skills.split(/[\.,\s]+/g); 
  fetch("/api/addDevs", {
    method: "post",
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({
      name: name,
      position: position,
      skills: skillList
    })
  }).then(() => {
    getDevs();
  })
};

document.querySelector("#addDev").addEventListener("click", () => {
  const nameDev = document.querySelector("#name").value;
  const position = document.querySelector("#position").value;
  const skills = document.querySelector("#skills").value;
  addDev(nameDev, position, skills);
});

getDevs();
