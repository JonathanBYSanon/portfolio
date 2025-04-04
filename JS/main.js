// ######################## HEADER #########################

// **** THEME MANAGEMENT ****

const themeSwitcher = document.querySelector("#theme-toggle input");
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
    themeSwitcher.checked = savedTheme === "dark";
}


themeSwitcher.addEventListener("change", () => {
    const newTheme = themeSwitcher.checked ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
});


// **** MENU MANAGEMENT ****
const menuToggle = document.querySelector("#menu-toggle");
const menu = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
    updateMenuToggleIcon();
});

function updateMenuToggleIcon() {
    menuToggle.querySelector("i").className = menu.style.display === "flex" ? "fas fa-times" : "fas fa-bars";
};

window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      menu.style.display = "flex"; // Reset the menu display when the window is resized to desktop
    }
});


// ######################## FOOTER #########################
const footerLinks = [
    { 
        title:"Phone",
        icon : "fas fa-phone",
        url : "tel:+14384532052",
        blank : false
    },
    { 
        title:"Email",
        icon : "fas fa-envelope",
        url : "mailto:jonathansanonpro@gmail.com",
        blank : false
    },
    { 
        title:"Github",
        icon : "fab fa-github",
        url : "https://github.com/JonathanBYSanon",
        blank : true
    },
    { 
        title:"Linkedin",
        icon : "fab fa-linkedin",
        url : "https://www.linkedin.com/in/jonathan-ben-yviaud-sanon-51a5592b4",
        blank : true
    },
    { 
        title:"Instagram",
        icon : "fab fa-instagram",
        url : "https://www.instagram.com/jonathansanon.ent?igsh=MXBhNDJteGVkOWMyNw&utm_source=qr",
        blank : true
    },  
    { 
        title:"Resume EN",
        icon : "fas fa-download",
        url : "ASSETS/docs/Jonathan-Sanon-Resume-EN.pdf",
        blank : true
    }, 
    { 
        title:"Resume FR",
        icon : "fas fa-download",
        url : "ASSETS/docs/Jonathan-Sanon-Resume-FR.pdf",
        blank : true
    }, 
]

const footer = document.querySelector("footer");

for (const link of footerLinks) {
    const a = document.createElement("a");
    a.href = link.url;
    if (link.blank) a.target = "_blank";
    a.innerHTML = `<i class="${link.icon}"></i>`;
    const span = document.createElement("span");
    span.textContent = link.title;
    span.className = "hidden";
    a.appendChild(span);
    footer.querySelector("#contact ul").appendChild(a);
}