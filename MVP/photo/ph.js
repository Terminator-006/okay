
const nextButton = document.getElementById('next-button');
document.addEventListener('DOMContentLoaded', function (){
    nextButton.addEventListener('click', function () {
        
        if (!nextButton.disabled) {
          window.location.href = '../Accepted/index.html'; // Redirect to the next page
        }
      });
});