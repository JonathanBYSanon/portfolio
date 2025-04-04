const pages = {
  home: {
    style: true,
    script: false
  },
  about: {
    style: true,
    script: false
  },
  project:
  {
    style: true,
    script: true
  },
};

const main = document.querySelector("main");
const nav = document.querySelector("nav");
let projects = {};

document.addEventListener("DOMContentLoaded", () => {
  loadPage("home");
});

// **** Functions ****

function loadPage(pageName) {
  event.preventDefault();
  const pageConfig = pages[pageName];

  if (!pageConfig) {
    main.innerHTML = `<p>Sorry, this page does not exist.</p>`;
    return;
  }

  // Fade out first
  main.classList.remove("visible"); 
  main.classList.add("invisible");
  if (nav) updateActiveLink(pageName);

  setTimeout(() => {

    fetch(`HTML/${pageName}.html`)
    .then(res => {
      if (!res.ok) throw new Error("Page not found");
      return res.text();
    })
    .then(html => {
      removePageStylesheet();
      removePageScript();
      main.innerHTML = html;
      if (pageConfig.style) loadPageStylesheet(pageName);
      if (pageConfig.script) loadPageScript(pageName);
      

      main.classList.remove("invisible");
      main.classList.add("visible");
      
    })
    .catch(err => {
      main.innerHTML = `<p>Sorry, that page couldn't be loaded.</p>`;
      console.error(err);
      main.classList.remove("invisible");
      main.classList.add("visible");
    });

  }, 500);

}

function removePageStylesheet() {
  const existing = document.getElementById("page-style");
  if (existing) existing.remove();
}

function loadPageStylesheet(styleName) {

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `CSS/${styleName}.css`;
  link.id = "page-style";
  document.head.appendChild(link);
}

function loadPageScript(scriptName) {

  const script = document.createElement("script");
  script.src = `JS/${scriptName}.js`;
  script.id = "page-script";
  script.defer = true;
  document.body.appendChild(script);
}

function removePageScript() {
  const existing = document.getElementById("page-script");
  if (existing) existing.remove();
}

function updateActiveLink(activePage) {
  const links = nav.querySelectorAll(".nav-links li");
  links.forEach(link => {
    const isActive = link.querySelector("a").getAttribute("data-page") === activePage;
    link.classList.toggle("active", isActive);
  });
}

function goToContact() {
  event.preventDefault();
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
}

function goToMenu() {
  event.preventDefault();
  document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
}