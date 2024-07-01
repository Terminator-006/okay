let otp = "";
document.addEventListener('DOMContentLoaded', function () {
    const otpInput1 = document.getElementById('otp1');
    const otpInput2 = document.getElementById('otp2');
    const otpInput3 = document.getElementById('otp3');
    const otpInput4 = document.getElementById('otp4');
    const otpInput5 = document.getElementById('otp5');
    const nextButton = document.getElementById('next-button');
    const email = localStorage.getItem('userEmail');
    const messageClass = document.getElementById("message").innerHTML = `Sent at ${email}`
    nextButton.addEventListener('click', async function () {
        if (!nextButton.disabled) {
            // console.log(otpInput1.value);
            // const otp = otpInput1.value + otpInput2.innerText + otpInput3.innerText + otpInput4.innerText + otpInput5.innerText;
            console.log(otp);

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

document.addEventListener('DOMContentLoaded', function () {
    const inputsContainer = document.getElementById("inputs");
    const inputs = inputsContainer.querySelectorAll(".enter");
    let userManuallySelected = false;

    // Focus on the first input when the inputs div is clicked and the user hasn't manually selected any input
    inputsContainer.addEventListener('click', () => {
        if (!userManuallySelected && inputs.length > 0) {
            inputs[0].focus();
        }
    });

    inputs.forEach((input) => {
        input.addEventListener("input", function (e) {
            const target = e.target;
            const val = target.value;

            if (isNaN(val)) {
                target.value = "";
                return;
            }
            otp+=val;
            target.value ='.';
            if (val !== "") {
                const next = target.nextElementSibling;
                if (next) {
                    next.focus();
                }
            }
        });

        input.addEventListener("keyup", function (e) {
            const target = e.target;
            const key = e.key.toLowerCase();

            if (key === "backspace" || key === "delete") {
                target.value = "";
                const prev = target.previousElementSibling;
                if (prev) {
                    prev.focus();
                }
            }
        });

        // Set the flag to true if the user manually selects any input
        input.addEventListener('focus', () => {
            userManuallySelected = true;
        });
    });
});
