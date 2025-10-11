import { Canvas, FabricImage } from "fabric";
import { useEffect, useRef, useState } from "react";
import birthdayimg from "./birthday/Birthdayconstants";
const birthdayimgs = birthdayimg[0];
const BASE_WIDTH = birthdayimgs.Reso.width;
const BASE_HEIGHT = birthdayimgs.Reso.height;

const ResponsiveCanvas = () => {
    const canvasRef = useRef(null);
    const [canva, setCanvas] = useState(null);
    useEffect(() => {
        const img = new Image(); img.src = birthdayimgs.pictureLink;
        const c = new Canvas(canvasRef.current, {
            width: BASE_WIDTH,
            height: BASE_HEIGHT,
            originX: 'left',
            originY: 'top',
            backgroundImage: new FabricImage(img),
            preserveObjectStacking: true,
        });
        preserveObjectStacking: true

        c.renderAll();
        FabricImage.fromURL(birthdayimgs.testimages, (img) => {
            img.set({
                left: birthdayimgs.PictureLocation[1].location.left,
                top: birthdayimgs.PictureLocation[1].location.top,
                width: birthdayimgs.PictureLocation[1].reso.width,
                height: birthdayimgs.PictureLocation[1].reso.height
            });
            c.add(img);
            c.renderAll();
            console.log("hrewhb cbbahd agdd hahd hadh ajd g");
        })
        const handleResize = () => {
            resizeCanvas(c);
        };
        window.addEventListener("resize", handleResize);
        resizeCanvas(c); // initial call
        setCanvas(c);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const resizeCanvas = (canva) => {
        if (!canva) return;
        const container = document.getElementById("canvas-wrapper");
        const scale = container.clientWidth / BASE_WIDTH;
        const zoom = scale;
        canva.setWidth(BASE_WIDTH * scale);
        canva.setHeight(BASE_HEIGHT * scale);
        canva.setZoom(zoom);
    };
    return (
        <div id="canvas-wrapper" style={{ width: "100%", maxWidth: `${birthdayimgs.Reso.width + 5}px`, margin: "auto" }}>
            <canvas ref={canvasRef} />
        </div>
    );
}
export default ResponsiveCanvas;