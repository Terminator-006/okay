document.addEventListener('DOMContentLoaded', function () {
  const inputs = document.querySelectorAll('input');
  const select = document.getElementById('gender');
  const nextButton = document.getElementById('nextButton');
  const dobInput = document.getElementById('dob');
  // const phoneInput = document.getElementById('phoneNumber');
  const emError = document.getElementById('em-error');
  // const emError2 = document.getElementById('em-error2');
  console.log(inputs);

  function updateButtonState() {
    let allFilled = true;
    inputs.forEach(inp => {
      if (!inp.value) {
        allFilled = false;
      }
    });

    if (!select.value) {
      allFilled = false;
    }

    if (!allFilled) {
      nextButton.disabled = true;
      nextButton.style.opacity = '0.5';
      nextButton.style.cursor = 'not-allowed';
    } else {
      nextButton.disabled = false;
      nextButton.style.opacity = '1';
      nextButton.style.cursor = 'pointer';
    }
  }

  function isValidAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 21) {
      emError.style.display = 'flex';
      // emError2.style.display ='flex';
      // phoneInput.style.border ='3px solid red';
      dobInput.style.border = '3px solid red';
     
      return false;
    } else {
      emError.style.display = 'none';
      // emError2.style.display ='none';
      // phoneInput.style.border = '';
      dobInput.style.border = ''; // Reset to default style
      
      return true;
    }
  }

  nextButton.addEventListener('click', async function () {
    console.log("Button Clicked!");
    const dob = dobInput.value;

    if (!isValidAge(dob)) // also check is valid number
    {
      return;
    }

    if (!nextButton.disabled) {
      let data = {};
      data["email"] = localStorage.getItem("userEmail");
      data["FullName"] = document.getElementById("name").value;
      data["DateOfBirth"] = dob;
      data["City"] = document.getElementById("city").value;
      data["PhoneNumber"] = document.getElementById("phoneNumber").value;
      data["CountryCode"] = document.getElementById("countryCode").value;
      data["Gender"] = select.value;
      console.log(data);

      try {
        const response = await fetch('https://regnum-backend-bice.vercel.app/update-details', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          alert("submitted!");
          window.location.href = '../Financial/index.html';
        } else {
          const errorData = await response.json();
          console.error('Error updating user information:', errorData);
        }
      } catch (error) {
        console.error('Error updating user information:', error);
      }
    }
  });

  inputs.forEach(input => {
    input.addEventListener('input', function () {
      updateButtonState();

      if (input.value) {
        input.classList.add('filled');
      } else {
        input.classList.remove('filled');
      }
    });

    input.addEventListener('focus', function () {
      input.style.border = '1px solid black';
      input.style.borderRadius = '3px';
    });

    input.addEventListener('blur', function () {
      if (input.value) {
        input.style.borderRadius = '6px';
      }
    });
  });

  select.addEventListener('change', updateButtonState);

  dobInput.addEventListener('focus', function () {
    emError.style.display = 'none';
    dobInput.style.border = ''; // Reset border style when focusing on input again
                                //also check for phone number

  });

  updateButtonState();
});

const name = document.getElementById("name");
const dob  = document.getElementById('dob');
const city = document.getElementById("city");
const phoneNumber = document.getElementById("phoneNumber");
const countryCode = document.getElementById("countryCode");
const gender = document.getElementById('gender');

let arr = [name , dob , city , phoneNumber , countryCode , gender];
console.log(arr);

for (let i = 0; i < arr.length; i++) {
  arr[i].addEventListener("input", () => {
    arr[i].style.border = "3px solid black";
    arr[i].style.fontWeight = "600";
  });

  arr[i].addEventListener("blur", () => {
    if (arr[i].value) {
      arr[i].style.border = "2px solid gray";
    } else {
      arr[i].style.border = "1px solid black";
      arr[i].style.fontWeight = "normal";
    }
  });
}