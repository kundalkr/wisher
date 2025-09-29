import { Canvas, FabricImage } from "fabric";
import React, { useEffect, useRef, useState } from "react";
import birthdayimg from "./birthday/Birthdayconstants";
import { useParams } from "react-router-dom";
import "../css/components.css"

const Framelaout = () => {
    const params = useParams();
    const { id } = params;
    const canvasRef = useRef(null);
    const [Canvase, setCanvase] = useState(null);
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
                    console.log(Maincanvas);
                    Maincanvas.renderAll();
                    setCanvase(Maincanvas);
                    Maincanvas.toDataURL('image/png');
                }
                return () => Maincanvas.dispose();
            }
        })
    }, [id]);
    const handleFileChange = (e, pictureId) => {
        console.log(birthdayimg);
        const file = e.target.files[0];
        birthdayimg.find((frame) => {
            if (frame.id === parseInt(id)) {
                frame.PictureLocation.find((loca) => {
                    if (loca.id === pictureId) {
                        FabricImage.fromURL(URL.createObjectURL(file)).then((img) => {
                            // img.onSelect((e.)=>{});
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
        console.log(e);
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
                                top: `${picture.location.top}px`, color: "white", border: "2px solid red", transform: `rotate(${picture.location.rotate ? picture.location.rotate : 0}deg)`
                            }}
                            onChange={(e) => handleFileChange(e, picture.id)}
                        />)
                    ))
                }
            </div>
            <button onClick={handleDownload} className="button type1" >
                <span className="btn-txt">Download</span>
            </button>
        </div >
    );

};



export default Framelaout