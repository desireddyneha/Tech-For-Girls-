document.addEventListener('DOMContentLoaded', () => {
    const whatsappShareBtn = document.getElementById('whatsappShareBtn');
    const whatsappCounterDisplay = document.getElementById('whatsappCounter');
    const whatsappMessageDisplay = document.getElementById('whatsappMessage');
    const registrationForm = document.getElementById('registrationForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage'); // For displaying errors or success

    let whatsappShareCount = 0;
    const maxShares = 5;
    const predefinedMessage = "Hey Buddy , Join Tech For Girls Community";

    // Function to update WhatsApp counter display
    function updateWhatsappCounter() {
        whatsappCounterDisplay.textContent = `Click count: ${whatsappShareCount}/${maxShares}`;
    }

    // Event listener for WhatsApp share button
    if (whatsappShareBtn) {
        whatsappShareBtn.addEventListener('click', () => {
            if (whatsappShareCount < maxShares) {
                whatsappShareCount++;
                updateWhatsappCounter();

                // Open WhatsApp with pre-written message
                const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(predefinedMessage)}`;
                window.open(whatsappUrl, '_blank');

                if (whatsappShareCount === maxShares) {
                    whatsappMessageDisplay.textContent = "Sharing complete. Please continue.";
                    whatsappMessageDisplay.style.display = 'block';
                    whatsappShareBtn.disabled = true;
                    whatsappShareBtn.style.backgroundColor = '#cccccc'; // Disabled look
                }
            }
        });
    }

    // Initialize counter display
    updateWhatsappCounter();

    // More code will be added here for other functionalities (form submission, localStorage, etc.)

    // Form submission listener
    if (registrationForm) {
        registrationForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission

            // Clear previous messages
            formMessage.textContent = '';
            formMessage.style.display = 'none';
            formMessage.className = 'message';


            // Validate WhatsApp share count
            if (whatsappShareCount < maxShares) {
                formMessage.textContent = `Please complete WhatsApp sharing (${whatsappShareCount}/${maxShares} done).`;
                formMessage.style.display = 'block';
                formMessage.classList.add('error'); // Add error class for styling
                return;
            }

            // If validation passes, proceed with submission (to be implemented)
            console.log('Form validation passed. Ready for submission.');
            // For now, just log. Later, this will handle data collection and sending.

            // Disable form elements and show success message
            disableFormAndShowSuccess();
        });
    }

    function disableFormAndShowSuccess() {
        // Disable all form inputs
        Array.from(registrationForm.elements).forEach(element => {
            element.disabled = true;
        });

        // The submit button is part of registrationForm.elements, so it's disabled too.
        // If there were other buttons outside the form, they'd need separate disabling:
        // if (whatsappShareBtn) whatsappShareBtn.disabled = true; // Already disabled if max shares reached

        // Show success message
        formMessage.textContent = "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!";
        formMessage.style.display = 'block';
        formMessage.className = 'message success'; // Add success class for styling

        // Hide WhatsApp specific messages if they are visible
        if(whatsappMessageDisplay) whatsappMessageDisplay.style.display = 'none';
        if(whatsappCounterDisplay) whatsappCounterDisplay.style.display = 'none';
    }
});
