document.addEventListener('DOMContentLoaded', () => {
    fetchProjects();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Handle Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
});

async function fetchProjects() {
    try {
        const response = await fetch('/api/projects');
        const projects = await response.json();
        
        const projectsContainer = document.querySelector('.projects-box');
        if (!projectsContainer) return;
        
        projectsContainer.innerHTML = projects.map(project => `
            <div class="project">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error fetching projects:', error);
    }
}

async function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        if (response.ok) {
            alert('Message sent successfully!');
            e.target.reset();
        } else {
            alert('Failed to send message.');
        }
    } catch (error) {
        console.error('Error sending message:', error);
        alert('An error occurred. Please try again.');
    }
}
