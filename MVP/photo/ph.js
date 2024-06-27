// document.querySelectorAll('input[type="file"]').forEach(input => {
//     input.addEventListener('change', (event) => {
//       if (!event.target.files.length) {
//         event.target.value = '';
//       }
//       checkInputs();
//     });
//   });

//   function checkInputs() {
//     const inputs = document.querySelectorAll('input[type="file"]');
//     let allFilled = true;
//     inputs.forEach(input => {
//       if (!input.files.length) {
//         allFilled = false;
//       }
//     });
//     document.getElementById('next-button').disabled = !allFilled;
//   }
const nextButton = document.getElementById('next-button');
document.addEventListener('DOMContentLoaded', function (){
    nextButton.addEventListener('click', function () {
        
        if (!nextButton.disabled) {
          window.location.href = '../Accepted/index.html'; // Redirect to the next page
        }
      });
});