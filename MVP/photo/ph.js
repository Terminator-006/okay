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

    function compressImage(imageFile) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(imageFile);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const maxWidth = 800;
                    const maxHeight = 800;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    canvas.toBlob((blob) => {
                        const compressedFile = new File([blob], imageFile.name, {
                            type: imageFile.type,
                            lastModified: Date.now(),
                        });
                        resolve(compressedFile);
                    }, 'image/jpeg', 0.7);
                };
                img.onerror = (error) => {
                    reject(error);
                };
            };
            reader.onerror = (error) => {
                reject(error);
            };
        });
    }

    async function convertToBase64(imageFile) {
        const compressedFile = await compressImage(imageFile);
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.readAsDataURL(compressedFile);
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = error => {
                reject(error);
            };
        });
    }

    async function getFileInputValues() {
        const fileInputValues = [];
        const fileInputs = document.querySelectorAll('input[type="file"]');
      
        for (const input of fileInputs) {
            if (input.files.length > 0) {
                const base64 = await convertToBase64(input.files[0]);
                fileInputValues.push(base64);
            }
        }
      
        return fileInputValues;
    }

    nextButton.addEventListener('click', async function () {
        const fileInputValues = await getFileInputValues();
        let data = {};
        data["email"] = localStorage.getItem("userEmail");
        data["CouplePhoto1"] = fileInputValues[0];
        data["CouplePhoto2"] = fileInputValues[1];
        data["MalePicture"] = fileInputValues[2];
        data["FemalePicture"] = fileInputValues[3];
        console.log(data);
        try {
            const response = await fetch('https://regnum-backend-bice.vercel.app/update-details', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data),
            });
    
            if (response.ok) {
              alert("submitted!");
              window.location.href = '../Accepted/index.html';
            } else {
              const errorData = await response.json();
              console.error('Error updating user information:', errorData);
            }
        } catch (error) {
            console.error('Error updating user information:', error);
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
