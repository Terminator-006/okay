
const nextButton = document.getElementById('next-button');
document.addEventListener('DOMContentLoaded', function (){
    nextButton.addEventListener('click', function () {
        
        if (!nextButton.disabled) {
          window.location.href = '../Accepted/index.html'; // Redirect to the next page
        }
      });
});// let input_box = document.querySelectorAll('.box')

// input_box.forEach(inp => {
//     inp.addEventListener('click',()=>{
        
//     })
// });
// for box 1
function previewImage(event) {
    // alert()
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.maxWidth = '100%';
            img.style.maxHeight = '100%';
            const imagePreview = document.getElementById('imagePreview1');
            imagePreview.innerHTML = '';
            imagePreview.appendChild(img);
        }
        reader.readAsDataURL(file);
    }
}
// for box 1
function previewImage(event) {
    // alert()
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.maxWidth = '100%';
            img.style.maxHeight = '100%';
            const imagePreview = document.getElementById('imagePreview2');
            imagePreview.innerHTML = '';
            imagePreview.appendChild(img);
        }
        reader.readAsDataURL(file);
    }
}
// for box 2
function previewImage(event) {
    // alert()
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.maxWidth = '100%';
            img.style.maxHeight = '100%';
            const imagePreview = document.getElementById('imagePreview3');
            imagePreview.innerHTML = '';
            imagePreview.appendChild(img);
        }
        reader.readAsDataURL(file);
    }
}
// for box 1
function previewImage(event) {
    // alert()
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.maxWidth = '100%';
            img.style.maxHeight = '100%';
            const imagePreview = document.getElementById('imagePreview4');
            imagePreview.innerHTML = '';
            imagePreview.appendChild(img);
        }
        reader.readAsDataURL(file);
    }
}