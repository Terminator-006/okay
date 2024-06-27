document.addEventListener('DOMContentLoaded', function () {
    const inputs = document.querySelectorAll('.content input');
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
    nextButton.addEventListener('click', function () {
        
        if (!nextButton.disabled) {
          window.location.href = '../Reference details/index.html'; // Redirect to the next page
        }
      });}

);

