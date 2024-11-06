document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.layered-img'); // Get all the images
    let currentImageIndex = 0; // Start with the first image

    // Define unique audio files for the play button and each image
    const audioFiles = [
        new Audio('Crash_Intro.mp3'),  // Sound for the play button
        new Audio('First_Call.mp3'), // Sound for image 1
        new Audio('Second_Call.mp3'), // Sound for image 2
        new Audio('Third_Call.mp3'), // Sound for image 3
        new Audio('Final_Call.mp3')  // Sound for image 4
    ];

    // Get references to the overlay, play button, and container
    const overlay = document.getElementById('overlay');
    const playButton = document.getElementById('play-button');
    const container = document.getElementById('container');
    const endOverlay = document.getElementById('end-overlay');

    // Disable all images initially (they won't be clickable)
    images.forEach((img) => img.classList.add('disabled'));

    // Function to enable the next image
    function enableNextImage() {
        images[currentImageIndex].classList.remove('disabled');
        images[currentImageIndex].classList.add('active');
    }

    // Play button click event to start the first sound and hide the overlay
    playButton.addEventListener('click', function() {
        // Play the unique sound for the play button
        audioFiles[0].play();

        // Hide the overlay and show the image container
        overlay.style.display = 'none';
        container.style.display = 'block'; // Show the image container

        // Start the interactive image sequence after the play button sound finishes
        audioFiles[0].addEventListener('ended', function() {
            enableNextImage(); // Enable the first image after the play button sound ends
        });
    });

    // Click event listener for each image
    images.forEach((img, index) => {
        img.addEventListener('click', function() {
            if (index === currentImageIndex && !img.classList.contains('disabled')) {
                // Play the unique sound for the clicked image
                audioFiles[index + 1].play(); // `index + 1` to match with the correct audio file

                // Keep the image highlighted (active) while its sound is playing
                img.classList.add('active');

                // Disable the current image and move to the next one after the sound ends
                audioFiles[index + 1].addEventListener('ended', function() {
                    img.classList.remove('active'); // Remove the active class from current image
                    img.classList.add('disabled'); // Disable the current image

                    // Move to the next image
                    currentImageIndex++;
                    if (currentImageIndex < images.length) {
                        enableNextImage(); // Enable the next image after the current sound ends
                    } else {
                        // After the last audio, show the "The End!" overlay
                        setTimeout(function() {
                            endOverlay.style.display = 'flex'; // Show the "The End!" overlay
                        }, 500); // Delay to ensure the last image is properly disabled
                    }
                });
            }
        });
    });
});
