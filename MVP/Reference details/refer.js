// Select all input and select elements
const howHeardSelect = document.getElementById('how-heard');
const referencesInput = document.getElementById('references');
const referenceNameInput = document.getElementById('reference-name');
const referencePhoneInput = document.getElementById('reference-phone');
const nextButton = document.getElementById('next-button');

// Function to check if all fields are valid
function checkAllFieldsValid() {
    return howHeardSelect.value !== '' &&
           referencesInput.validity.valid &&
           referenceNameInput.validity.valid &&
           referencePhoneInput.validity.valid;
}

// Function to enable or disable the Next button based on validation
function toggleNextButton() {
    if (checkAllFieldsValid()) {
        nextButton.removeAttribute('disabled');
    } else {
        nextButton.setAttribute('disabled', true);
    }
}

// Event listeners for input and select fields
howHeardSelect.addEventListener('input', toggleNextButton);
referencesInput.addEventListener('input', toggleNextButton);
referenceNameInput.addEventListener('input', toggleNextButton);
referencePhoneInput.addEventListener('input', toggleNextButton);

// Initial check when the page loads
toggleNextButton();
document.addEventListener('DOMContentLoaded', function (){
    nextButton.addEventListener('click', function () {
        
        if (!nextButton.disabled) {
          window.location.href = '../Social Engagement/index.html'; // Redirect to the next page
        }
      });
});