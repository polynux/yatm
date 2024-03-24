import { JSDOM } from "jsdom"
import { db, Praticiens } from 'astro:db';

const url = "https://bddtrans.fr";

const links = [
  "generalistes",
  "endocrinologues",
  "gynecologues",
  "psy",
  "voix",
  "chirurgiens",
  "dermato",
  "avocats",
  "autres"
];

function unStrong(str: string) {
  return str.replace(/<strong>/g, "").replace(/<\/strong>/g, "");
}

function unBr(str: string) {
  return str.replace(/<br>/g, "");
}

function strInStrong(str: string) {
  const regex = /<strong>(.*?)<\/strong>/g;
  const maches = str.match(regex) ?? [""];
  return maches.map((match) => unStrong(match));
}

function clean(str: string) {
  let temp = unStrong(str);
  return unBr(temp);
}

function parsePrat(prat: string) {
  let pratObj = {
    name: "",
    firstname: "",
    address: "",
    zip: "",
    city: "",
    description: "",
    profession: ""
  };

  const lines = prat.split("<br>");

  for (let line of lines) {
    if (line.includes("Nom :")) {
      pratObj.name = strInStrong(line)[0];
    }
    if (line.includes("Prénom :")) {
      pratObj.firstname = strInStrong(line)[1];
    }
    if (line.includes("Adresse :")) {
      pratObj.address = strInStrong(line)[0];
    }
    if (line.includes("Code postal :")) {
      pratObj.zip = strInStrong(line)[0];
    }
    if (line.includes("Ville :")) {
      pratObj.city = strInStrong(line)[1];
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
      let pratObj = parsePrat(prat.innerHTML);
      pratObj.profession = path;
      pratList.push(pratObj);
    }
  }

  return pratList;
}

export default async function () {
  const prats: Record<string, any> = {};

  for (let link of links) {
  //   prats[link] = await getPrat(link);
    let prat = await getPrat(link);
    if (prat.length === 0) {
      continue;
    }
    await db.insert(Praticiens).values(prat);
  }

  console.log(prats);
}

