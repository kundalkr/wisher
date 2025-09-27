import birthdayimg from "./Birthdayconstants"
import { Link } from "react-router-dom";
const Birthdayframe = () => {
    return (
        <>
            <div>
                {
                    birthdayimg.map((frame) => {
                        return (<a href={"/frame/"+frame.id} key={frame.id+23}><img src={frame.pictureLink} key={frame.id} style={{ width: "200px", height: "300px" , marginLeft:"10px "}} /></a>)
                    }
                    )
                }
            </div>
        </>
    )
}
export default Birthdayframe;