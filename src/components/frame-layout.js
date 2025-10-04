import { Canvas, FabricImage } from "fabric";
import React, { useEffect, useRef, useState } from "react";
import birthdayimg from "./birthday/Birthdayconstants";
import { useParams } from "react-router-dom";
import "../css/components.css"
import "bootstrap-icons/font/bootstrap-icons.css";
import ImageCropper from "./utils-component/imgCropper";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"

const Framelaout = () => {
    const params = useParams();
    const { id } = params;
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const [Canvase, setCanvase] = useState(null);
    const [selected, setSelected] = useState(null);
    useEffect(() => {
        birthdayimg.find((frame) => {
            if (frame.id == parseInt(id)) {
                const imager = new Image(); imager.src = frame.pictureLink;
                imager.onload = () => {
                    const Maincanvas = new Canvas(canvasRef.current, {
                        width: imager.width,
                        height: imager.height,
                        originX: 'left',
                        originY: 'top',
                        backgroundImage: new FabricImage(imager),
                    });
                    Maincanvas.on("selection:created", (e) => {
                        setSelected(e.selected[0]);
                    });
                    Maincanvas.on("selection:cleared", () => {
                        setSelected(null);
                    });
                    // console.log(Maincanvas);
                    Maincanvas.renderAll();
                    setCanvase(Maincanvas);
                    Maincanvas.toDataURL('image/png');
                    const activeObj = Maincanvas.getActiveObject();
                    if (activeObj) {
                        console.log(activeObj);
                        console.log("isoajdooajj  eie qieqw");
                    }
                }
                return () => Maincanvas.dispose();
            }
        })
    }, [id]);

    const handleFileChange = (e, pictureId) => {
        const file = e.target.files[0];
        birthdayimg.find((frame) => {
            if (frame.id === parseInt(id)) {
                frame.PictureLocation.find((loca) => {
                    if (loca.id === pictureId) {
                        FabricImage.fromURL(URL.createObjectURL(file)).then((img) => {
                            img.set({
                                top: loca.location.top,
                                left: loca.location.left,
                                scaleX: loca.reso.width / img.width,
                                scaleY: loca.reso.height / img.height,
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
            }
        })

        e.target.style.display = "none";
        // console.log(e);
    };
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
        FabricImage.fromURL(URL.createObjectURL(file)).then((img) => {
            img.set({
                top: selected.top,
                left: selected.left,
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
    }

    function modalOn() {
        document.getElementById("myModal").style.display = "block";
    }
    function modalClose() {
        document.getElementById("myModal").style.display = "none";
    }
    const handleCroppedData = (value) => {
        const obje = Canvase.getActiveObject();
        console.log(obje);
        if (obje) {
            Canvase.remove(obje);
        }
        FabricImage.fromURL(value).then((img) => {
            img.set({
                top: obje.top,
                left: obje.left,
                scaleX: obje.scaleX,
                scaleY: obje.scaleY,
                lockScalingX: true,
                lockScalingY: true,
                lockSkewingX: true,
                lockSkewingY: true,
                lockRotation: true,
                lockMovementX: true,
                lockMovementY: true,
            })
            Canvase.add(img); Canvase.renderAll();
        })
    };
    return (
        <div style={{ marginLeft: "100px", marginRight: "100px" }}>
            <div>
                <canvas ref={canvasRef} style={{ border: "1px solid blue" }} />
                {
                    birthdayimg.find((frame) => frame.id === parseInt(id))?.PictureLocation.map((picture) => (
                        (<input
                            type="file"
                            key={picture.id}
                            id={`${picture.id}`}
                            style={{
                                width: `${picture.reso.width}px`, height: `${picture.reso.height}px`,
                                marginLeft: "100px", position: "absolute",
                                left: `${picture.location.left}px`,
                                top: `${picture.location.top}px`, color: "white", border: "10px solid red", transform: `rotate(${picture.location.rotate ? picture.location.rotate : 0}deg)`
                            }}
                            onChange={(e) => handleFileChange(e, picture.id)}
                        />)
                    ))
                }
            </div>
            <button onClick={handleDownload} className="button type1" >
                <span className="btn-txt">Download</span>
            </button>
            {selected && (
                birthdayimg.find((frame) => {
                    if (frame.id === parseInt(id)) {
                        frame.PictureLocation.find((picture) =>
                        (selected.top === picture.location.top || (Math.trunc(selected.top) === (picture.location.rotate ? picture.location.input.top : picture.location.top)) ?
                            (<div className="main" key={picture.id} style={{ position: "absolute", top: `${picture.location.top}px`, left: `${picture.location.left}px`,zIndex:1111111 }}>
                                <div className="up">
                                    <button className="card1" id="myBtn" onClick={modalOn}>
                                        <i className="bi bi-crop"></i> Crop
                                    </button>
                                    {/* modal */}
                                    <div id="myModal" className="modal">
                                        <div className="modal-content">
                                            <span className="close" onClick={modalClose}>&times;</span>
                                            <ImageCropper image={Canvase.getActiveObject()} sendData={handleCroppedData} />
                                        </div>
                                    </div>
                                    {/* modal */}
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
                                        {/* {console.log(selected)} */}
                                    </button>
                                    <button className="card4 btn btn-success">
                                        <i className="bi bi-check-circle"></i>
                                    </button>
                                </div>
                            </div>
                            ) : (0))
                        )
                    }
                })
            )}
        </div >
    );
};



export default Framelaout