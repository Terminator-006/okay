document.addEventListener('DOMContentLoaded', function () {
    const multiselects = document.querySelectorAll('.multiselect');
    const nextButton = document.getElementById('submit-button');

    let currentOpenDropdown = null;

    multiselects.forEach(multiselect => {
        const input = multiselect.querySelector('.select-field');
        const dropdown = multiselect.querySelector('.dropdown-content');
        const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]');
        const dropdownIcon = multiselect.querySelector('.dropdown-icon');

        input.addEventListener('click', function (event) {
            event.stopPropagation(); // Prevent the click from bubbling up to the document
            if (currentOpenDropdown && currentOpenDropdown !== dropdown) {
                currentOpenDropdown.classList.remove('show');
            }
            dropdown.classList.toggle('show');
            currentOpenDropdown = dropdown.classList.contains('show') ? dropdown : null;
        });

        dropdownIcon.addEventListener('click', function (event) {
            event.stopPropagation(); // Prevent the click from bubbling up to the document
            if (currentOpenDropdown && currentOpenDropdown !== dropdown) {
                currentOpenDropdown.classList.remove('show');
            }
            dropdown.classList.toggle('show');
            currentOpenDropdown = dropdown.classList.contains('show') ? dropdown : null;
        });

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function () {
                updateInputValue(input, dropdown);
            });
        });

        dropdown.addEventListener('click', function (event) {
            event.stopPropagation(); // Prevent the click from bubbling up to the document
        });
    });

    function updateInputValue(input, dropdown) {
        const checkedBoxes = dropdown.querySelectorAll('input[type="checkbox"]:checked');
        const selectedValues = Array.from(checkedBoxes).map(checkbox => checkbox.value);
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

    nextButton.addEventListener('click', async function () {
        const data = {};

        multiselects.forEach(multiselect => {
            const category = multiselect.querySelector('.select-field').id;
            const checkboxes = multiselect.querySelectorAll('.checkbox input[type="checkbox"]');
            const selectedValues = Array.from(checkboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value);

            data[category] = selectedValues;
        });
        data["email"] = localStorage.getItem("userEmail");

        try {
            const response = await fetch('https://regnum-backend-bice.vercel.app/update-details', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert("submitted!");
                window.location.href = '../photo/index.html';
            } else {
                const errorData = await response.json();
                console.error('Error updating user information:', errorData);
            }
        } catch (error) {
            console.error('Error updating user information:', error);
        }
    });

    function closeAllDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown-content.show');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('show');
        });
        currentOpenDropdown = null;
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', function (event) {
        closeAllDropdowns();
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const inputFields = [
        document.getElementById("TravelPreference"),
        document.getElementById("CulturePreference"),
        document.getElementById("DiningPreference"),
        document.getElementById("Hobbies"),
        document.getElementById("FitnessPreference")
    ];

    inputFields.forEach(field => {
        field.addEventListener("focus", () => {
            field.style.border = "3px solid black";
            field.style.color = "black";
            field.style.fontWeight = "600";
        });

        field.addEventListener("blur", () => {
            if (field.value.trim() === "") {
                field.style.border = "1px solid black";
                field.style.fontWeight = "400";
            } else {
                field.style.border = "2px solid gray";
                field.style.fontWeight = "600";
            }
        });
    });

    const dropdownIcons = document.querySelectorAll(".dropdown-icon");
    dropdownIcons.forEach(icon => {
        icon.addEventListener("click", (event) => {
            event.stopPropagation();
            const dropdown = icon.parentElement.querySelector(".dropdown-content");
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            } else {
                closeAllDropdowns();
                dropdown.classList.add('show');
            }
        });
    });

    const checkboxes = document.querySelectorAll(".dropdown-content .checkbox input");
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", (event) => {
            event.stopPropagation(); // Prevent the change event from closing the dropdown
            const selectField = checkbox.closest('.multiselect').querySelector('.select-field');
            const selectedValues = Array.from(selectField.closest('.multiselect').querySelectorAll('.checkbox input:checked')).map(input => input.value);
            selectField.value = selectedValues.join(', ') || '';
            selectField.dispatchEvent(new Event('blur'));
        });
    });

    window.addEventListener("click", (event) => {
        const dropdowns = document.querySelectorAll(".dropdown-content");
        dropdowns.forEach(dropdown => {
            if (dropdown.classList.contains('show')) {
                const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]');
                const checkedBoxes = Array.from(checkboxes).filter(checkbox => checkbox.checked);
                if (checkedBoxes.length === 0) {
                    dropdown.classList.remove('show');
                }
            }
        });
    });
});
