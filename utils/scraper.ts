import { JSDOM} from "jsdom"

const url = "https://bddtrans.fr";

const links = [
  "generalistes",
  // "endocrinologues",
  // "gynecologues",
  // "psy",
  // "voix",
  // "chirurgiens",
  // "dermato",
  // "avocats",
  // "autres"
];

/*
Nom : About Prénom : Philippe
Adresse : 23 boulevard de Marengo
Code postal : 31500 Ville : Toulouse Pays : France
Description :
Très safe sur la transidentité, suivent plusieurs personnes trans dans leur parcours.
*/
function parsePrat(prat: string) {
  let pratObj = {
    name: "",
    firstname: "",
    address: "",
    zip: "",
    city: "",
    description: "",
  };

  const lines = prat.split("\n");

  for (let line of lines) {
    if (line.includes("Nom :")) {
      pratObj.name = line.split("Nom : ")[1];
    }
    if (line.includes("Prénom :")) {
      pratObj.firstname = line.split("Prénom : ")[1];
    }
    if (line.includes("Adresse :")) {
      pratObj.address = line.split("Adresse : ")[1];
    }
    if (line.includes("Code postal :")) {
      pratObj.zip = line.split("Code postal : ")[1];
    }
    if (line.includes("Ville :")) {
      pratObj.city = line.split("Ville : ")[1];
    }
  }

  const description = (new JSDOM(prat)).window.document.querySelector(".description");
  pratObj.description = description ? description.textContent ?? "" : "";

  return pratObj;
}

async function getPrat(path: string) {
  const res = await fetch(`${url}/${path}/`);
  const html = await res.text();
  const dom = new JSDOM(html);
  const nPages = dom.window.document.querySelector(".npages")?.children.length ?? 1;

  const pratList = [];

  for (let i = 1; i <= nPages; i++) {
    let tempPath = path;
    if (i >= 1) {
      tempPath += `-${i}`;
    }

    const res = await fetch(`${url}/${tempPath}/`);
    const html = await res.text();
    const dom = new JSDOM(html);
    const list = dom.window.document.querySelectorAll(".view_prat");

    for (let prat of list) {
      pratList.push(parsePrat(prat.innerHTML));
    }
  }

  return pratList;
}

async function main() {
  const prats: Record<string, any> = {};

  for (let link of links) {
    prats[link] = await getPrat(link);
  }

  console.log(prats);
}

main();
