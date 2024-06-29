document.addEventListener('DOMContentLoaded', function () {
    const nextButton = document.getElementById('next-button');
    const fileInputs = document.querySelectorAll('input[type="file"]');
    let filesUploaded = 0;

    fileInputs.forEach(input => {
        input.addEventListener('change', function () {
            if (input.files.length > 0) {
                filesUploaded++;
                if (filesUploaded === 4) {
                    nextButton.disabled = false;
                    nextButton.style.opacity = '1';
                    nextButton.style.cursor = 'pointer';
                }
            }
        });
    });

    nextButton.addEventListener('click', function () {
        if (!nextButton.disabled) {
            window.location.href = '../Accepted/index.html'; // Redirect to the next page
        }
    });
});

// let input_box = document.querySelectorAll('.box')

// input_box.forEach(inp => {
//     inp.addEventListener('click',()=>{
        
//     })
// });
// for box 1
function previewImage1(event) {
    // alert()
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            const ele = document.getElementById('okay');
            const p = document.getElementById('p1');
            const po = document.getElementById('p2');
            const sv = document.getElementById('svg');
           
            ele.style.gap ='0px';
            p.style.display='none';
            po.style.display ='none';
            sv.style.display ='none';
            img.src = e.target.result;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.borderRadius ='6px';
            img.style.objectFit ='cover';
            const imagePreview = document.getElementById('imagePreview1');
            imagePreview.innerHTML = '';
            imagePreview.appendChild(img);
            imagePreview.style.width ='100%';
            imagePreview.style.height ='100%';
        }
        reader.readAsDataURL(file);
    }
}
// for box 2
function previewImage2(event) {
    // alert()
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            const ele = document.getElementById('ok2');
            const p = document.getElementById('p3');
            const po = document.getElementById('p4');
            const sv = document.getElementById('svg2');
            ele.style.gap ='0px';
            p.style.display='none';
            po.style.display ='none';
            sv.style.display ='none';
            
            img.src = e.target.result;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.borderRadius ='6px';
            img.style.objectFit ='cover';
            const imagePreview = document.getElementById('imagePreview2');
            imagePreview.innerHTML = '';
            imagePreview.appendChild(img);
            imagePreview.style.width ='100%';
            imagePreview.style.height ='100%';
        }
        reader.readAsDataURL(file);
    }
}
// for box 2
function previewImage3(event) {
    // alert()
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            const ele = document.getElementById('ok3');
            const p = document.getElementById('p5');
            const po = document.getElementById('p6');
            const sv = document.getElementById('svg3');
            ele.style.gap ='0px';
            p.style.display='none';
            po.style.display ='none';
            sv.style.display ='none';
            
            img.src = e.target.result;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.borderRadius ='6px';
            img.style.objectFit ='cover';
            const imagePreview = document.getElementById('imagePreview3');
            imagePreview.innerHTML = '';
            imagePreview.appendChild(img);
            imagePreview.style.width ='100%';
            imagePreview.style.height ='100%';
        }
        reader.readAsDataURL(file);
    }
}
// for box 1
function previewImage4(event) {
    // alert()
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            const ele = document.getElementById('ok4');
            const p = document.getElementById('p7');
            const po = document.getElementById('p8');
            const sv = document.getElementById('svg4');
            ele.style.gap ='0px';
            p.style.display='none';
            po.style.display ='none';
            sv.style.display ='none';
            
            img.src = e.target.result;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.borderRadius ='6px';
            img.style.objectFit ='cover';
            const imagePreview = document.getElementById('imagePreview4');
            imagePreview.innerHTML = '';
            imagePreview.appendChild(img);
            imagePreview.style.width ='100%';
            imagePreview.style.height ='100%';
        }
        reader.readAsDataURL(file);
    }
}
