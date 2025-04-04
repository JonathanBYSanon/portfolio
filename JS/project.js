projects = {
  web: [
    {
      title: "Tijwet",
      platform: "Web",
      category: "Personal Project",
      languages: "HTML, CSS, JavaScript",
      description: "Tijwet is a web-based platform offering a collection of simple and engaging games designed for collaborative play. Each game operates as an independent HTML page, ensuring modularity and flexibility. The platform emphasizes accessibility and ease of use, allowing users to quickly start games without complex setups.",
      images: [
        "ASSETS/image/project/tijwet1.png",
        "ASSETS/image/project/tijwet2.png",
        "ASSETS/image/project/tijwet3.png",
      ],
      links: {
        "GitHub Repository": "https://github.com/JonathanBYSanon/Tijwet",
        "Live Website": "https://tijwet.com"
      }
    },
    {
      title:"Car dealership",
      platform: "Web",
      category: "School Project",
      languages: "Node.js, Vue.js, SQL",
      description: "A web application for a car dealership, built with Node.js and Vue.js with a SQL database."+
      " The purpose was to learn about web server development and front-end frameworks."+
      " The application includes a user management system with authentication, token management, password encryption, and a car management system with CRUD operations.",
      images: [
        "ASSETS/image/project/car-dealership-login.png",
        "ASSETS/image/project/car-dealership-home.png",
        "ASSETS/image/project/car-dealership-management.png",
        "ASSETS/image/project/car-dealership-modification.png",
      ],
      links: {
        "Back-end GitHub Repository": "https://github.com/JonathanBYSanon/Projet_Concessionaire",
        "Front-end Github Repository": "https://github.com/JonathanBYSanon/Projet_Concessionaire_Frontend"
      }
    },

    
    // Other web projects...
  ],
  desktop: [
    {
      title: "Le Banquier",
      platform: "Desktop",
      category: "Personal Project",
      languages: "C#, WPF",
      description: "Le Banquier is a desktop game inspired by the television show 'Deal or No Deal'. Developed using C# and WPF, the game features a clean MVVM architecture, engaging animations, and a dynamic offer system. Notably, the application has been adopted by the school's student association for events and activities, enhancing student engagement and entertainment.",
      images: [
        "ASSETS/image/project/le-banquier1.png",
        "ASSETS/image/project/le-banquier2.png",
        "ASSETS/image/project/le-banquier3.png",
        "ASSETS/image/project/le-banquier4.png",
        "ASSETS/image/project/le-banquier5.png",
      ],
      links: {
        "GitHub Repository": "https://github.com/JonathanBYSanon/LE_BANQUIER_VF",
        "Installer (MSI)": "https://github.com/JonathanBYSanon/LE_BANQUIER_VF/releases/tag/v1.0.0"
      }
    },
    {
      title: "Letter Clash",
      platform: "Desktop",
      category: "Personal Project",
      languages: "C#, WPF",
      description: "Letter Clash is a two-player (1v1) desktop game developed using C# and WPF. Players compete in real-time to form words, aiming to outscore their opponent within a time limit. The game integrates an external API and employs web scraping techniques for words validation, ensuring accurate and up-to-date word definitions for both English and French languages. This app is also used by the school's student association for events and activities, enhancing student engagement and entertainment.",
      images: [
        "ASSETS/image/project/letter-clash1.png",
        "ASSETS/image/project/letter-clash2.png",
        "ASSETS/image/project/letter-clash3.png",
        "ASSETS/image/project/letter-clash4.png",
      ],
      links: {
        "GitHub Repository": "https://github.com/JonathanBYSanon/LETTER_FIGHT",
        "Installer (MSI)": "https://github.com/JonathanBYSanon/LETTER_FIGHT/releases/tag/v1.0.0"
      }
    }
    
    
  ],
  mobile: [
    {
      title: "Mobile Projects",
      platform: "Mobile",
      category: "Personal Projects",
      languages: "N/A",
      description: "Currently, I do not have any notable mobile projects to showcase. This is primarily due to limited resources, which have constrained my ability to develop and refine mobile applications to a standard I deem presentable. I am actively seeking opportunities and resources to undertake meaningful mobile development projects in the future.",
      images: [
        "ASSETS/image/project/mobile-placeholder.jpg",
      ],
      links: {
        "Contact Me": "mailto:your.jonathansanonpro@gmail.com"
      }
    }
    
  ]
};

function renderProjects(category = 'all') {
    const template = document.getElementById('project-card-template');
    const container = document.querySelector('.project-section');
    container.innerHTML = ''; // Clear existing projects
  
    if (category === 'all') {
      // Render all projects
      for (const cat in projects) {
        projects[cat].forEach(project => {
          appendProjectCard(project, template, container);
        });
      }
    } else if (projects[category]) {
      // Render projects of the selected category
      projects[category].forEach(project => {
        appendProjectCard(project, template, container);
      });
    }
  }
  
function appendProjectCard(project, template, container) {
  const clone = document.importNode(template.content, true);

  const imagesSlider = clone.querySelector('.images-slider');
  const sliderNavigation = clone.querySelector('.slider-navigation');

  project.images.forEach((src, index) => {
    // Create and append image
    const img = document.createElement('img');
    img.src = src;
    img.alt = `${project.title} screenshot ${index + 1}`;
    img.classList.add('slide');
    if (index === 0) img.classList.add('chosen'); // Show the first image by default
    imagesSlider.appendChild(img);

    // Create and append navigation button
    const button = document.createElement('button');
    button.textContent = index + 1;
    button.classList.add('nav-button');
    if (index === 0) button.classList.add('chosen');

    //add the image index to the button
    button.dataset.imageIndex = index;

    button.addEventListener('click', () => {
      const sliderWrapper = button.closest('.slider-wrapper');
      const images = sliderWrapper.querySelectorAll('.slide');
      const buttons = sliderWrapper.querySelectorAll('.nav-button');
    
      images.forEach(img => img.classList.remove('chosen'));
      buttons.forEach(btn => btn.classList.remove('chosen'));
    
      button.classList.add('chosen');
    
      const imageIndex = Array.from(buttons).indexOf(button);
    
      if (images[imageIndex]) {
        images[imageIndex].classList.add('chosen');
      }
    });
    
    sliderNavigation.appendChild(button);

  });

  // Populate project information table
  const table = clone.querySelector('.project-info');
  const details = [
    { label: 'Title', value: project.title },
    { label: 'Platform', value: project.platform },
    { label: 'Category', value: project.category },
    { label: 'Languages', value: project.languages },
    { label: 'Description', value: project.description },
    {
      label: 'Links',
      value: Object.entries(project.links)
        .map(([text, url]) => `<a href="${url}" target="_blank">${text}</a>`)
        .join(' ● ')
    }
  ];

  details.forEach(detail => {
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    th.textContent = `${detail.label}:`;
    const td = document.createElement('td');
    td.innerHTML = detail.value;
    tr.appendChild(th);
    tr.appendChild(td);
    table.appendChild(tr);
  });

  container.appendChild(clone);
}  


renderProjects();

// Event listener for category selection
document.getElementById('categorySelect').addEventListener('change', function() {
    renderProjects(this.value);
});
  

  

