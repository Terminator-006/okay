document.addEventListener('DOMContentLoaded', function () {
    const inputs = document.querySelectorAll('.content input, .content select');
    const nextButton = document.getElementById('next-button');

    inputs.forEach(input => {
        input.addEventListener('input', function () {
            // Check if all inputs are filled
            let allFilled = true;
            inputs.forEach(inp => {
                if (!inp.value) {
                    allFilled = false;
                }
            });

            // Enable or disable the button based on filled state
            if (allFilled) {
                nextButton.disabled = false;
                nextButton.style.opacity = '1';
                nextButton.style.cursor = 'pointer';
            } else {
                nextButton.disabled = true;
                nextButton.style.opacity = '0.5';
                nextButton.style.cursor = 'not-allowed';
            }

            // Add filled class if input is filled
            if (input.value) {
                input.classList.add('filled');
            } else {
                input.classList.remove('filled');
            }
        });

        // Reset border color on focus
        input.addEventListener('focus', function () {
            input.style.border = '1px solid black';
            input.style.borderRadius = '3px';
        });

        // Reset border radius on blur if input is filled
        input.addEventListener('blur', function () {
            if (input.value) {
                input.style.borderRadius = '6px';
                input.style.border = '2px solid grey';
            } else {
                input.style.border = '1px solid black';
            }
        });

        // Handle select field color change and font-weight
        if (input.tagName.toLowerCase() === 'select') {
            input.addEventListener('change', function () {
                if (input.value) {
                    input.style.color = 'black'; // Change selected option color to black
                    input.style.fontWeight = '600'; // Change font-weight to 600
                    input.style.border = '2px solid grey'; // Add 2px gray border
                    input.classList.add('filled');
                } else {
                    input.style.color = 'grey'; // Keep placeholder text grey
                    input.style.fontWeight = 'normal'; // Reset font-weight
                    input.style.border = '1px solid black'; // Reset border
                    input.classList.remove('filled');
                }
            });
        }

        // Handle date input color change
        if (input.type === 'date') {
            input.addEventListener('change', function () {
                if (input.value) {
                    input.style.color = 'black'; // Change date input text color to black
                    input.classList.add('filled');
                } else {
                    input.style.color = 'grey'; // Keep placeholder text grey
                    input.classList.remove('filled');
                }
            });
        }
    });
    nextButton.addEventListener('click', async function () {
        const degreeSelect = document.querySelector('select:nth-of-type(1)').value;
        const almaMaterInput = document.querySelector('input:nth-of-type(1)').value;
        const membershipSelect = document.querySelector('select:nth-of-type(2)').value;
        const registrationNumberInput = document.querySelector('input:nth-of-type(2)').value;
        const instagramIdInput = document.querySelector('input:nth-of-type(3)').value;
        const exoticPlaceInput = document.querySelector('input:nth-of-type(4)').value;
        const visaNumberInput = document.querySelector('input:nth-of-type(5)').value;

        const data = {};
        data["email"] = localStorage.getItem("userEmail");
        data["Degree"] = degreeSelect;
        data["AlmaMater"] = almaMaterInput;
        data["MemberShip"] = membershipSelect;
        data["RegNumber"] = registrationNumberInput;
        data["InstaId"] = instagramIdInput;
        data["ExoticPlace"] = exoticPlaceInput;
        data["VisaNumber"] = visaNumberInput;
       console.log(data);
       try {
        const response = await fetch('https://regnum-backend-bice.vercel.app/update-details', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          alert("submitted!");
          window.location.href = '../Personal preferences/index.html';
        } else {
          const errorData = await response.json();
          console.error('Error updating user information:', errorData);
        }
      } catch (error) {
        console.error('Error updating user information:', error);
      }
      });
    });