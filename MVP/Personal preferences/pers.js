document.addEventListener('DOMContentLoaded', function () {
    const multiselects = document.querySelectorAll('.multiselect');
    const nextButton = document.getElementById('submit-button');

    multiselects.forEach(multiselect => {
        const input = multiselect.querySelector('.select-field');
        const dropdown = multiselect.querySelector('.dropdown-content');
        const options = dropdown.querySelectorAll('option');

        input.addEventListener('click', function () {
            dropdown.classList.toggle('show');
        });

        options.forEach(option => {
            option.addEventListener('click', function () {
                if (option.classList.contains('selected')) {
                    option.classList.remove('selected');
                    updateInputValue(input, dropdown);
                } else {
                    option.classList.add('selected');
                    updateInputValue(input, dropdown);
                }
            });
        });
    });

    function updateInputValue(input, dropdown) {
        const selectedOptions = dropdown.querySelectorAll('option.selected');
        const selectedValues = Array.from(selectedOptions).map(option => option.value);
        input.value = selectedValues.join(', ');

        checkAllFilled();
    }

    function checkAllFilled() {
        const inputs = document.querySelectorAll('.select-field');
        let allFilled = true;

        inputs.forEach(input => {
            if (!input.value) {
                allFilled = false;
            }
        });

        const submitButton = document.getElementById('submit-button');
        if (allFilled) {
            submitButton.disabled = false;
            submitButton.style.opacity = '1';
            submitButton.style.cursor = 'pointer';
        } else {
            submitButton.disabled = true;
            submitButton.style.opacity = '0.5';
            submitButton.style.cursor = 'not-allowed';
        }
    }
    nextButton.addEventListener('click', function () {
        
        if (!nextButton.disabled) {
          window.location.href = '../photo/index.html'; // Redirect to the next page
        }
      });});