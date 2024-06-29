document.addEventListener('DOMContentLoaded', function () {
    const otpInput = document.getElementById('otp');
    const nextButton = document.getElementById('next-button');
    const errorMessage = document.getElementById('error-message');
    const errorIcon = document.querySelector('.danger-triangle');
    const emailDisplay = document.getElementById('email-display');
    const email = localStorage.getItem('userEmail');
    let timeoutId = null;

    // if (!email) {
    //     alert('No email found. Please start over.');
    //     window.location.href = 'email.html'; // Redirect to email input page if no email found
    // } else {
    //     emailDisplay.textContent = Sent at ${email};
    // }

    otpInput.addEventListener('input', function () {
        const otp = otpInput.value.trim(); // Trim whitespace from input

        if (otp.length !== 6) {
            resetValidation();
            return;
        }

        otpInput.classList.add('typing'); // Add typing class when input is not empty
        otpInput.classList.remove('error'); // Remove error class when typing
        hideErrorMessage(); // Hide error message and reset styles when typing starts again

        validateOTP(otp);
    });

    function validateOTP(otp) {
        // Regular expression for basic OTP validation (digits only, length 6)
        const otpRegex = /^\d{6}$/;

        if (!otpRegex.test(otp)) {
            showErrorMessage('Please enter a valid OTP');
            otpInput.classList.add('error');
            otpInput.classList.remove('typing'); // Remove typing class if there is an error
        } else {
            hideErrorMessage();
            otpInput.classList.remove('error');
        }

        updateButtonState();
    }

    function resetValidation() {
        hideErrorMessage();
        otpInput.classList.remove('error');
        updateButtonState();
    }

    function showErrorMessage(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        errorIcon.style.display = 'block';
        otpInput.classList.add('error'); // Add error class to make the border red
        otpInput.style.border = '3px solid red'; // Ensure border remains red
    }

    function hideErrorMessage() {
        errorMessage.style.display = 'none';
        errorIcon.style.display = 'none';
        if (!otpInput.classList.contains('focused')) {
            otpInput.style.border = '2px solid grey'; // Reset border color if not focused
        } else {
            otpInput.style.border = '3px solid black'; // Set default border on focus if not in error state
        }
    }

    function updateButtonState() {
        if (otpInput.value.trim().length !== 5) {
            nextButton.disabled = true;
            nextButton.style.opacity = '0.5'; // Set opacity to 0.5
            nextButton.style.cursor = 'not-allowed'; // Set cursor to not-allowed
        } else {
            nextButton.disabled = false;
            nextButton.style.opacity = '1'; // Set opacity to 1
            nextButton.style.cursor = 'pointer'; // Set cursor to pointer
        }
    }

    nextButton.addEventListener('click', async function () {
        if (!nextButton.disabled) {
            const otp = otpInput.value.trim();

            // Send OTP verification request to the backend
            try {
                const response = await fetch('https://regnum-backend-bice.vercel.app/verify-otp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, otp }),
                });

                if (response.ok) {
                    alert('OTP verified successfully!');

                    // Create an entry in the database after OTP verification
                    const createUserEntryResponse = await fetch('https://regnum-backend-bice.vercel.app/update-details', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email }),
                    });

                    if (createUserEntryResponse.ok) {
                        window.location.href = '../Information/index.html'; // Redirect to next page
                    } else {
                        const errorData = await createUserEntryResponse.json();
                        showErrorMessage(errorData.error || 'Error creating user entry. Please try again.');
                    }
                } else {
                    const errorData = await response.json();
                    showErrorMessage(errorData.error || 'Error verifying OTP. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                showErrorMessage('Failed to verify OTP. Please try again later.');
            }
        }
    });

    // Focus Event Handler
    otpInput.addEventListener('focus', function () {
        otpInput.classList.add('focused');
        if (!otpInput.classList.contains('error')) {
            otpInput.style.border = '3px solid black'; // Set default border on focus
        }
    });

    // Blur Event Handler
    otpInput.addEventListener('blur', function () {
        otpInput.classList.remove('focused');
        if (!otpInput.classList.contains('error')) {
            otpInput.style.border = '2px solid grey'; // Reset border color to grey on blur
        }
        if (otpInput.value.trim() === '') {
            otpInput.style.border = '1px solid black'; // Reset border to grey if input is empty
        }
        otpInput.style.borderRadius = '6px';
    });
});