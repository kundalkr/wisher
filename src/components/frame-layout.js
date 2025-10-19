import { Canvas, FabricImage } from "fabric";
import { useEffect, useRef, useState } from "react";
import birthdayimg from "./birthday/Birthdayconstants";
import { useParams } from "react-router-dom";
import "../css/components.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import ImageCropper from "./utils-component/imgCropper";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Imgcompressor from "./utils-component/imgCompressor.js";
import { Imgcompressorforall } from "./utils-component/imgCompressor.js";

const Framelaout = () => {
    const params = useParams();
    const { id } = params;
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const [Canvase, setCanvase] = useState(null);
    const [selected, setSelected] = useState(null);
    const [pic, setPicture] = useState(null);
    const [showCropper, setShowCropper] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [canvasHeight, setcanvasHeight] = useState(null);
    const frame = birthdayimg.find(frame => frame.id === parseInt(id));

    const W0 = frame.Reso.width;
    const H0 = frame.Reso.height;

    useEffect(() => {
        const imager = new Image(); imager.src = frame.pictureLink;
        imager.onload = () => {
            Imgcompressor(imager.src, window.outerHeight, window.outerWidth)
                .then((url) => {
                    const imgElement = new Image();
                    imgElement.src = url;
                    imgElement.onload = () => {
                        const Maincanvas = new Canvas(canvasRef.current, {
                            width: (window.outerWidth < imgElement.width) ? window.outerWidth : imgElement.width,
                            height: (window.outerHeight < imgElement.height) ? window.outerHeight : imgElement.height,
                            originX: 'left',
                            originY: 'top',
                            backgroundImage: new FabricImage(imgElement),
                            selection: false, allowTouchScrolling: true, imageSmoothingEnabled: true
                        });
                        Maincanvas.on("selection:created", (e) => {
                            setSelected(e.selected[0]);
                        });
                        Maincanvas.on("selection:cleared", () => {
                            setSelected(null);
                        });
                        Maincanvas.requestRenderAll()
                        setcanvasHeight(Maincanvas.getHeight());
                        setCanvase(Maincanvas);
                        return () => Maincanvas.dispose();
                    }
                })
        }
    }, [id]);

    const handleFileChange = (e, pictureId) => {
        const file = e.target.files[0];
        Imgcompressorforall(file)
            .then((url) => {
                frame.PictureLocation.find((loca) => {
                    if (loca.id === pictureId) {
                        FabricImage.fromURL(url).then((img) => {
                            img.set({
                                left: (window.outerWidth < W0) ? (Math.trunc(loca.location.left * (window.outerWidth / W0))) : W0,
                                top: (window.outerHeight < H0) ? Math.trunc(loca.location.top * (canvasHeight / H0)) : H0,
                                scaleX: (window.outerWidth < W0) ? Math.trunc(loca.reso.width * (window.outerWidth / W0)) / img.width :(0),
                                scaleY: Math.trunc(loca.reso.height * (canvasHeight / H0)) / img.height,
                                lockScalingX: true,
                                lockScalingY: true,
                                lockSkewingX: true,
                                lockSkewingY: true,
                                lockRotation: true,
                                lockMovementX: true,
                                lockMovementY: true,
                            })
                            if (loca.location.rotate) {
                                img.rotate(loca.location.rotate);
                            }
                            Canvase.renderAll(); Canvase.add(img);
                        })
                    }
                })
            })
            .catch((err) => console.error("Compression failed:", err));
        e.target.style.display = "none";
    }

    const handleDownload = () => {
        if (!Canvase) return;
        const dataURL = Canvase.toDataURL({
            format: "png",
            quality: 1,
            multiplier: 2
        });
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "edited-canvas.png";
        link.click();
    };
    function deleteActiveObject() {
        const activeObj = Canvase.getActiveObject();
        console.log(activeObj);
        if (activeObj) {
            Canvase.remove(activeObj);
        }
    }
    function changePicture() {
        fileInputRef.current.click();
    }
    function handlenewfile(e, { selected }, { picture }) {
        deleteActiveObject();
        const file = e.target.files[0];
        Imgcompressorforall(file)
            .then((url) => {
                FabricImage.fromURL(url).then((img) => {
                    img.set({
                        top: picture.location.top,
                        left: picture.location.left,
                        scaleX: picture.reso.width / img.width,
                        scaleY: picture.reso.height / img.height,
                        lockScalingX: true,
                        lockScalingY: true,
                        lockSkewingX: true,
                        lockSkewingY: true,
                        lockRotation: true,
                        lockMovementX: true,
                        lockMovementY: true,
                    })
                    if (picture.location.rotate) {
                        img.rotate(picture.location.rotate);
                    }
                    Canvase.add(img); Canvase.renderAll();
                })
            })
    }
    const handleCropClick = () => {
        const activeObject = Canvase.getActiveObject();
        setSelectedImage(activeObject);
        setShowCropper(true);
    };
    const handleCroppedData = (value) => {
        if (value == 3456) {
            closeCropper();
        } else {
            console.log(555555);
            closeCropper();
            const obje = Canvase.getActiveObject();
            if (obje) {
                Canvase.remove(obje);
            }
            FabricImage.fromURL(value).then((img) => {
                img.set({
                    top: pic.location.top,
                    left: pic.location.left,
                    scaleX: pic.reso.width / img.width,
                    scaleY: pic.reso.height / img.height,
                    lockScalingX: true,
                    lockScalingY: true,
                    lockSkewingX: true,
                    lockSkewingY: true,
                    lockRotation: true,
                    lockMovementX: true,
                    lockMovementY: true,
                })
                img.rotate(obje.angle);
                Canvase.add(img);
                Canvase.renderAll();
            })
        }
    };
    function closeCropper() {
        setShowCropper(false);
    }
    return (
        <div>
            <div>
                <canvas ref={canvasRef} style={{ border: "1px solid blue" }} />
                {
                    frame.PictureLocation.map((picture) => (
                        (
                            <input
                                type="file"
                                key={picture.id}
                                id={`${picture.id}`}
                                style={{
                                    width: `${Math.trunc(picture.reso.width * (window.outerWidth / W0))}px`, height: `${Math.trunc(picture.reso.height * (canvasHeight / H0))}px`,
                                    position: "absolute",
                                    left: `${Math.trunc(picture.location.left * (window.outerWidth / W0))}px`,
                                    top: `${Math.trunc(picture.location.top * (canvasHeight / H0))}px`, color: "white", border: "10px solid red", transform: `rotate(${picture.location.rotate ? picture.location.rotate : 0}deg)`
                                }}
                                onChange={(e) => handleFileChange(e, picture.id)}
                            />
                        )
                    ))
                }
            </div>
            {console.log((window.outerHeight / H0))}
            <button onClick={handleDownload} className="button type1" >
                <span className="btn-txt">Download</span>
            </button>
            {selected && (
                frame.PictureLocation.map((picture) => (
                    selected.top === picture.location.top || (Math.trunc(selected.top) === (picture.location.rotate ? picture.location.input.top : picture.location.top)) ? (
                        <div className="main" key={picture.id} style={{ position: "absolute", top: `${picture.location.top}px`, left: `${picture.location.left}px`, zIndex: 1111111 }}>
                            <div className="up">
                                <button className="card1" id="myBtn" onClick={() => { handleCropClick(); setPicture(picture) }}>
                                    <i className="bi bi-crop"></i> Crop
                                </button>
                                {showCropper && (
                                    <ImageCropper
                                        image={selectedImage}
                                        sendData={handleCroppedData}
                                    />
                                )}
                                <button className="card2 btn btn-success" onClick={changePicture}>
                                    <i className="bi bi-cloud-upload"></i> Change
                                </button>
                                <input type="file"
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                    onChange={(e) => handlenewfile(e, { selected }, { picture })} />
                            </div>
                            <div className="down">
                                <button className="card3 btn btn-success" onClick={deleteActiveObject}>
                                    <i className="bi bi-trash3"></i>Delete
                                </button>
                                <button className="card4 btn btn-success">
                                    <i className="bi bi-check-circle"></i>
                                </button>
                            </div>
                        </div>
                    ) : (0)
                )
                ))}
            {console.log(selected)}
        </div>
    );
};
export default Framelaout