document.addEventListener('DOMContentLoaded', function () {
  const emailInput = document.getElementById('email');
  const inputs = document.querySelectorAll('.content input');
  const nextButton = document.getElementById('nextButton'); // Updated ID to 'nextButton'
  const errorMessage = document.getElementById('error');
  const errorIcon = document.querySelector('.danger-triangle');
  let timeoutId = null;

  emailInput.addEventListener('input', function () {
    clearTimeout(timeoutId);
    const email = emailInput.value.trim(); // Trim whitespace from input

    if (email === '') {
      resetValidation();
      return;
    }

    emailInput.classList.add('typing'); // Add typing class when input is not empty
    emailInput.classList.remove('error'); // Remove error class when typing
    hideErrorMessage(); // Hide error message and reset styles when typing starts again

    timeoutId = setTimeout(function () {
      validateEmail(email);
    }, 1500);
  });

  function validateEmail(email) {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      showErrorMessage('Please enter a valid email address');
      emailInput.classList.add('error');
      emailInput.classList.remove('typing'); // Remove typing class if there is an error
    } else {
      hideErrorMessage();
      emailInput.classList.remove('error');
    }

    updateButtonState();
  }

  function resetValidation() {
    hideErrorMessage();
    emailInput.classList.remove('error');
    updateButtonState();
  }

  function showErrorMessage(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'flex'; // Show error message as flex
    errorIcon.style.display = 'block';
    emailInput.style.border = '3px solid red'; // Ensure border remains red

    // Adjust content layout for error message
    const content = document.querySelector('.content');
    content.classList.add('error-visible');
  }

  function hideErrorMessage() {
    errorMessage.style.display = 'none';
    errorIcon.style.display = 'none';
    if (!emailInput.classList.contains('focused')) {
      emailInput.style.border = '2px solid grey'; // Reset border color if not focused
    } else {
      emailInput.style.border = '3px solid black'; // Set default border on focus if not in error state
    }

    // Adjust content layout when error message is hidden
    const content = document.querySelector('.content');
    content.classList.remove('error-visible');
  }

  function updateButtonState() {
    let allFilled = true;
    inputs.forEach(inp => {
      if (!inp.value) {
        allFilled = false;
      }
    });

    if (emailInput.classList.contains('error') || emailInput.value.trim() === '' || !allFilled) {
      nextButton.disabled = true;
      nextButton.style.opacity = '0.5'; // Set opacity to 0.5
      nextButton.style.cursor = 'not-allowed'; // Set cursor to not-allowed
    } else {
      nextButton.disabled = false;
      nextButton.style.opacity = '1'; // Set opacity to 1
      nextButton.style.cursor = 'pointer'; // Set cursor to pointer
    }
  }

  nextButton.addEventListener('click', function () {
    
    if (!nextButton.disabled) {
      window.location.href = '../Financial/index.html'; // Redirect to the next page
    }
  });

  // Focus Event Handler
  emailInput.addEventListener('focus', function () {
    emailInput.classList.add('focused');
    if (!emailInput.classList.contains('error')) {
      emailInput.style.border = '3px solid black'; // Set default border on focus
    }
  });

  // Blur Event Handler
  emailInput.addEventListener('blur', function () {
    emailInput.classList.remove('focused');
    if (!emailInput.classList.contains('error')) {
      emailInput.style.border = '2px solid grey'; // Reset border color to grey on blur
    }
    if (emailInput.value.trim() === '') {
      emailInput.style.border = '1px solid black'; // Reset border to black if input is empty
    }
    emailInput.style.borderRadius = '6px';
  });

  // Add functionality for other inputs
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

    // Handle select field color change
    if (input.tagName.toLowerCase() === 'select') {
      input.addEventListener('change', function () {
        if (input.value) {
          input.style.color = 'black'; // Change selected option color to black
          input.classList.add('filled');
        } else {
          input.style.color = 'grey'; // Keep placeholder text grey
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
});
