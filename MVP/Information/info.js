document.addEventListener('DOMContentLoaded', function () {
  // const emailInput = document.getElementById('email');
  const inputs = document.querySelectorAll('input');
  console.log(inputs);
  const nextButton = document.getElementById('nextButton'); // Updated ID to 'nextButton'
 console.log("inside js");

  function updateButtonState() {
    let allFilled = true;
    inputs.forEach(inp => {
      if (!inp.value) {
        allFilled = false;
      }
    });

    if (!allFilled) {
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
    console.log("Button Clicked!");
    if (!nextButton.disabled) {
      const email = localStorage.getItem('userEmail');
      let data = {}
      data["email"] = email;
      data["FullName"] = document.getElementById("name").value;
      console.log(document.getElementById("name"));
      data["DateOfBirth"] = document.getElementById("dob").value;
      data["City"] = document.getElementById("city").value;
      data["PhoneNumber"] = document.getElementById("phoneNumber").value;
      data["CountryCode"] = document.getElementById("countryCode").value;
      console.log(data);
      try {
        const response = await fetch('https://regnum-backend-bice.vercel.app/update-details', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          alert("submitted!");
          window.location.href = '../Financial/index.html'; // Redirect to the next page
        } else {
          const errorData = await response.json();
          console.error('Error updating user information:', errorData);
        }
      } catch (error) {
        console.error('Error updating user information:', error);
      }
    }
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
  updateButtonState();
});

