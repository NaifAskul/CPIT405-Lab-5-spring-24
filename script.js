const selectedImage = document.getElementById('imgId');
let imgWidth = "600";
let imgHeight = "600";
const zoomIn_Button = document.getElementById('zoomin');
zoomIn_Button.style.display = "none";
const zoomOut_Button = document.getElementById('zoomout');
zoomOut_Button.style.display = "none";
let delete_button;

function zoomIn() {
    selectedImage.width *= 1.5;
    selectedImage.height *= 1.5;
}

function zoomOut() {
    selectedImage.width /= 1.5;
    selectedImage.height /= 1.5;
}

function handleMouseWheel(event) {
    console.log(event.deltaY);
    if (event.deltaY < 0) {
        zoomIn();
    } else {
        zoomOut();
    }
}

function handleBrowseImage() {
    const imgDiv = document.getElementsByClassName("imgDiv")[0];
    const imageInput = document.getElementById('Cimg');
    const selectedFileName = document.getElementById('selectedFileName');
    imageInput.click();

    if (!delete_button) {
        delete_button = document.createElement('button');
        delete_button.innerText = 'Click to Delete the image';

        delete_button.addEventListener('click', function () {
            imgDiv.removeChild(selectedImage);
            delete_button.parentNode.removeChild(delete_button);
            zoomIn_Button.style.display = "none";
            zoomOut_Button.style.display = "none";
            selectedFileName.innerText = 'No file chosen';
        });

        imgDiv.insertAdjacentElement("afterend", delete_button);
    }

    imageInput.addEventListener('change', function () {
        selectedFileName.innerText = this.value || 'No file chosen';

        const ImgReader = new FileReader();

        ImgReader.onload = function (e) {
            selectedImage.src = e.target.result;
            selectedImage.width = imgWidth;
            selectedImage.height = imgHeight;
            imgDiv.appendChild(selectedImage);
            zoomIn_Button.style.display = "";
            zoomOut_Button.style.display = "";
            imgDiv.insertAdjacentElement("afterend", delete_button);
        };

        ImgReader.readAsDataURL(this.files[0]);
    });
}
