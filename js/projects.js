/**
 * Nathan Lebherz Portfolio
 * Projects Data and Functionality
 * 
 * This file contains:
 * 1. Project data array
 * 2. Functions to render projects to DOM
 * 3. Modal functionality for project details
 */

// Project Data Array
const projectsData = [
    {
        id: 1,
        title: "Cell Test Hardware Validation Tool",
        shortDescription: "Automated validation process for cell test hardware, reducing validation time from 23 to 4 hours.",
        fullDescription: "Created a comprehensive tool that automates the validation of cell test hardware across multiple lab locations. The solution includes a data pipeline with a custom front-end interface, allowing users to complete the validation process with a single button press. This innovation dramatically decreased the equipment validation time from 23 hours to just 4 hours, significantly improving lab efficiency.",
        techStack: ["Python", "SQL", "Data Visualization", "Front-end Development"],
        image: "assets/images/project-validation.jpg",
        githubLink: "https://github.com/Nate-R-L/cell-validation-tool",
        demoLink: ""
    },
    {
        id: 2,
        title: "Auction Site Platform",
        shortDescription: "Created an auction website for Third Coast Supply Company with over $1.2 million in transactions.",
        fullDescription: "Developed a comprehensive auction website for Third Coast Supply Company, enabling customers to bid on company products. The platform features robust functionality including mass product uploading, product image handling, and a responsive mobile interface. The site has successfully facilitated over $1.2 million in transactions since its launch, becoming an essential business tool for the company.",
        techStack: ["JavaScript", "HTML/CSS", "E-commerce", "Database Design"],
        image: "assets/images/project-auction.jpg",
        githubLink: "https://github.com/Nate-R-L/auction-platform",
        demoLink: ""
    },
    {
        id: 3,
        title: "Battery Analysis GitHub Repository",
        shortDescription: "Collection of analysis scripts for processing, visualizing, and validating cell electrical test data.",
        fullDescription: "Created and maintained a centralized GitHub repository containing specialized analysis scripts for the Tesla battery team. These scripts provide powerful tools for processing, visualizing, and validating cell electrical test data across various testing scenarios. The repository has become a crucial resource for the team, standardizing analysis approaches and improving consistency in data interpretation.",
        techStack: ["Python", "Data Analysis", "GitHub", "Battery Testing"],
        image: "assets/images/project-analysis.jpg",
        githubLink: "https://github.com/Nate-R-L/battery-analysis-tools",
        demoLink: ""
    },
    {
        id: 4,
        title: "Inventory Management System",
        shortDescription: "Internal inventory system with barcode functionality and document generation capabilities.",
        fullDescription: "Designed and implemented a comprehensive inventory management system for Third Coast Supply Company to track and maintain their product catalog. The system features barcode printing and scanning functionality, along with automated generation of Purchase Orders and Invoices in PDF format. This solution has streamlined inventory processes and improved tracking accuracy throughout the organization.",
        techStack: ["JavaScript", "Database Design", "PDF Generation", "Barcode Technology"],
        image: "assets/images/project-inventory.jpg", 
        githubLink: "https://github.com/Nate-R-L/inventory-system",
        demoLink: ""
    },
    {
        id: 5,
        title: "Multi-Species Gas Diffusion Model",
        shortDescription: "MATLAB model for analyzing gas diffusion through membranes for combustion research.",
        fullDescription: "Developed a sophisticated MATLAB model for the UC Berkeley Combustion Modeling Lab that simulates multi-species gas diffusion through specialized membranes. The model was created to support graduate student research investigating flame propagation in stratified fuel mixtures. The project included designing and conducting validation experiments to measure local gas concentration, confirming the model's accuracy and enabling further research applications.",
        techStack: ["MATLAB", "Scientific Modeling", "Experimental Design", "Data Validation"],
        image: "assets/images/project-diffusion.jpg",
        githubLink: "https://github.com/Nate-R-L/gas-diffusion-model",
        demoLink: ""
    },
    {
        id: 6,
        title: "Battery Performance Dashboard",
        shortDescription: "Automated Python and Power BI dashboard for proactive battery formation analysis.",
        fullDescription: "Created an automated dashboard tool using Python and Power BI that provides real-time insights into battery formation processes. This tool enables proactive analysis of battery performance metrics and identifies potential issues before they impact production. The dashboard aggregates data from multiple sources and presents key performance indicators in an intuitive visual format, allowing quick decision-making by engineering and production teams.",
        techStack: ["Python", "Power BI", "Data Analysis", "Automation"],
        image: "assets/images/project-dashboard.jpg",
        githubLink: "https://github.com/Nate-R-L/battery-dashboard",
        demoLink: ""
    }
];

// Function to create project cards and append to container
function renderProjects() {
    const projectsContainer = document.getElementById('projects-container');
    
    // Clear container first
    projectsContainer.innerHTML = '';
    
    // Loop through projects and create cards
    projectsData.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        projectCard.setAttribute('data-aos', 'fade-up');
        
        // Create project card HTML
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" onerror="this.src='assets/images/placeholder-project.jpg'">
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.shortDescription}</p>
                <div class="project-tech">
                    ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    ${project.githubLink ? `<a href="${project.githubLink}" target="_blank" class="btn btn-secondary"><i class="fab fa-github"></i> GitHub</a>` : ''}
                    ${project.demoLink ? `<a href="${project.demoLink}" target="_blank" class="btn btn-primary">Live Demo</a>` : ''}
                    <span class="view-more" data-id="${project.id}">More Details</span>
                </div>
            </div>
        `;
        
        projectsContainer.appendChild(projectCard);
    });
    
    // Add event listeners for "More Details" links
    document.querySelectorAll('.view-more').forEach(button => {
        button.addEventListener('click', openProjectModal);
    });
}

// Function to open project modal with detailed info
function openProjectModal(e) {
    const projectId = parseInt(e.target.getAttribute('data-id'));
    const project = projectsData.find(p => p.id === projectId);
    
    if (!project) return;
    
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    
    // Create modal content
    modalBody.innerHTML = `
        <div class="modal-header">
            <h2>${project.title}</h2>
        </div>
        <div class="modal-image">
            <img src="${project.image}" alt="${project.title}" onerror="this.src='assets/images/placeholder-project.jpg'">
        </div>
        <div class="modal-description">
            <p>${project.fullDescription}</p>
        </div>
        <div class="modal-tech">
            <h3>Technologies Used</h3>
            <div class="project-tech">
                ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        </div>
        <div class="modal-links">
            ${project.githubLink ? `<a href="${project.githubLink}" target="_blank" class="btn btn-secondary"><i class="fab fa-github"></i> GitHub Repository</a>` : ''}
            ${project.demoLink ? `<a href="${project.demoLink}" target="_blank" class="btn btn-primary">Live Demo</a>` : ''}
        </div>
    `;
    
    // Display modal
    modal.style.display = 'block';
    
    // Disable body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

// Function to close modal
function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
    
    // Re-enable body scroll
    document.body.style.overflow = 'auto';
}

// Initialize modal close button
document.querySelector('.close-modal').addEventListener('click', closeProjectModal);

// Close modal when clicking outside content
window.addEventListener('click', (e) => {
    const modal = document.getElementById('projectModal');
    if (e.target === modal) {
        closeProjectModal();
    }
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProjectModal();
    }
});

// Initialize projects on page load
document.addEventListener('DOMContentLoaded', renderProjects);