import React, { useRef, useState } from "react";
import Cropper from "react-cropper";
import "../../../node_modules/react-cropper/node_modules/cropperjs/dist/cropper.css"

const ImageCropper = (props) => {
  console.log(props);
  const cropperRef = useRef(null);
  const [image, setImage] = useState(props.image._originalElement.src);

  const [cropped, setCropped] = useState(null);
  const onCrop = () => {
    if (cropperRef.current && cropperRef.current.cropper) {
      setCropped(cropperRef.current.cropper.getCroppedCanvas().toDataURL());
    }
    const downloadbtn = document.getElementById("downloadcrop");
    if (downloadbtn) {
      downloadbtn.style.display = "block";
    }
  };
  const handleCropDownload = () => {
    const link = document.createElement("a");
    link.href = cropped;
    link.download = "edited-canvas.png";
    link.click();
  };
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <Cropper
        src={image}
        style={{ height: 400, width: "50%" }}
        initialAspectRatio={1}
        guides={true}
        ref={cropperRef}
        viewMode={1}
        background={false}
        responsive={true}
        autoCropArea={1}
        checkOrientation={false}
      />
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
      <button
        onClick={() =>props.sendData(cropperRef.current.cropper.getCroppedCanvas().toDataURL())}
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
      {cropped && (
        <div>
          <h3>Cropped Result:</h3>
          <img src={cropped} alt="cropped" style={{ maxWidth: "100%" }} />
        </div>
      )}


      <button
        onClick={handleCropDownload}
        style={{
          display: "none",
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
      </button>
    </div>
  );
};

export default ImageCropper;
