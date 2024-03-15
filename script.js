document.addEventListener("DOMContentLoaded", function() {
    // Function to show/hide the h4 text when the disk spins
    function toggleH4Opacity(event, opacity) {
        const h4 = event.currentTarget.querySelector('.hover-content h4');
        h4.style.opacity = opacity;
    }

    // Function to handle mouse enter event
    function handleMouseEnter(event) {
        toggleH4Opacity(event, 1); // Show h4
        bringToFront(event, true);
    }

    // Function to handle mouse leave event
    function handleMouseLeave(event) {
        toggleH4Opacity(event, 0); // Hide h4
        bringToFront(event, false);
    }

    // Function to bring spinning disk and h4 to front on hover
    function bringToFront(event, bringToFront) {
        const disc = event.currentTarget.nextElementSibling.querySelector('.disc');
        const hoverContent = event.currentTarget.nextElementSibling.querySelector('.hover-content');
        disc.style.zIndex = bringToFront ? 1 : ''; // Bring the spinning disk to the front if true
        hoverContent.style.zIndex = bringToFront ? 1 : ''; // Bring the hover content to the front if true
    }

    // Add event listeners to each project
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        project.addEventListener('mouseenter', handleMouseEnter);
        project.addEventListener('mouseleave', handleMouseLeave);

        // Add click event listener to each project disc
        const disc = project.querySelector('.disc');
        const link = project.dataset.link; // Get the link from the data attribute
        disc.addEventListener('click', function() {
            window.location.href = link; // Redirect to the link specified in the data attribute
        });
    });

    // Initialize Hydra for canvas elements
    const canvasElements = document.querySelectorAll('.hydraCanvas');
    canvasElements.forEach(canvas => {
        const hydra = new Hydra({ detectAudio: false, canvas });
        osc(4, 0.1, 1.2).out();
        canvas.style.height = "50px"; // Set initial height
        updateCanvasDimensions(); // Update canvas dimensions
    });

    // Update canvas dimensions when window is resized
    window.addEventListener('resize', updateCanvasDimensions);

    // Function to update canvas dimensions
    function updateCanvasDimensions() {
        canvasElements.forEach(canvas => {
            canvas.style.width = window.innerWidth + 'px';
            canvas.style.height = "50px"; // You can adjust the height as needed
        });
    }
});