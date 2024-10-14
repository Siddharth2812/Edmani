import Student from "../../assets/studentcap.png";
import University from "../../assets/universityicon.png";
import Sports from "../../assets/sports.png";
import User from '../../assets/user.png';
import "./userSelection.css"

const userSelection = () => {
    return (
        <div>
            <div className="pageTitle">
                <h1 >
                    Select User Type:
                </h1>
            </div>
            <div className="userType">
                <a href="/login/student" className="loginOption" style={{textDecoration:"none"}} >
                    <img src={Student} alt="Student Hat" height="80px"></img>
                    <h3> Student </h3>
                </a>
                <a href="/login/college" className="loginOption" style={{textDecoration:"none"}} >
                    <img src={University} alt="University Icon" height="80px"></img>
                    <h3> College </h3>
                </a>
                <a href="/login/sports" className="loginOption" style={{textDecoration:"none"}} >
                    <img src={Sports} alt="Sports Icon" height="80px"></img>
                    <h3> Games and Sports </h3>
                </a>
                <a href="/login/personal" className="loginOption"style={{textDecoration:"none"}} >
                    <img src={User} alt="User Icon" height="80px"></img>
                    <h3 > Personal Use </h3>
                </a>
            </div>
        </div>
    );
};

export default userSelection;
