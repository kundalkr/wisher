import React, { useRef, useState } from "react"
import Cropper from "react-cropper"
import "../../../node_modules/react-cropper/node_modules/cropperjs/dist/cropper.css"
import "./css/cropper.css"
const ImageCropper = (props) => {
  console.log(props);
  const cropperRef = useRef(null);
  const [image, setImage] = useState(props.image._originalElement.src);
  const [cropped, setCropped] = useState(null);
  const [CroppedButton, getCroppedButton] = useState(false);


  const onCrop = () => {
    if (cropperRef.current && cropperRef.current.cropper) {
      setCropped(cropperRef.current.cropper.getCroppedCanvas().toDataURL());
    }
    getCroppedButton(true);
  };
  const handleCropDownload = () => {
    const link = document.createElement("a");
    link.href = cropped;
    link.download = "edited-canvas.png";
    link.click();
  };
  function modalClose() {
    document.getElementById("myModal").style.display = "none";
  }
  return (
    <>
      {/* modal */}
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={modalClose} style={{ border: "2px solid black", padding: "4px" }}>&times;</span>
          <div id="cropper-div">
            <div style={{ width: "50%", height: "100%", border: "5px solid blue", }}>
              <Cropper id="Cropper"
                ref={cropperRef}
                minContainerHeight={100}
                initialAspectRatio={1}
                src={image}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false}
                guides={true}
              />
            </div>
            <div style={{ width: "50%", height: "500px", border: "5px solid blue", overflow: "hidden" }}>
              {cropped && (
                <>
                  <h3>Cropped Result:</h3>
                  <img
                    src={cropped}
                    alt="cropped"
                    style={{
                      width: "100%",
                      height: "80%",
                      objectFit: "contain",
                      display: "block"
                    }}
                  />
                </>
              )}
            </div>
          </div>
          <button
            onClick={onCrop}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              background: "blue",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Crop Image
          </button>
          {CroppedButton && (<><button
            onClick={() => props.sendData(cropperRef.current.cropper.getCroppedCanvas().toDataURL())}
            style={{
              id: "senddatas",
              marginTop: "10px",
              padding: "8px 16px",
              background: "blue",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            use cropped image
          </button>
            <button
              onClick={handleCropDownload}
              style={{

                id: "senddata",
                marginTop: "10px",
                padding: "8px 16px",
                background: "blue",
                color: "white",
                border: "none",
                borderRadius: "5px",
              }}
            >
              download cropped image
            </button></>)}

        </div>
      </div>
      {/* modal */}



    </>
  );
};

export default ImageCropper;
