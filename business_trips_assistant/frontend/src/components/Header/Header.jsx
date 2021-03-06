import classes from "./Header.module.css";
import logo from "./../../assets/logo.png";
import {compose} from "redux";
import {connect} from "react-redux";
import withLoginRedirect from "../../Hoc/LoginRedirect";
import {deleteAuthLoginTC} from "../../redux/authReducer";
import {useState} from "react";
import cn from "classnames";

const Header = (props) => {
    const [exitMode, setMode] = useState(false);


    const onExit = () => {
        props.deleteAuthLoginTC()
    }

    return (
        <header className={classes.header_container}>
            <div className={classes.logo_container}>
                <img src={logo} alt="logo"/>
            </div>
            <button className={cn(classes.profile_name_container, {[classes.exit_mode]: exitMode})}
                    onClick={() => setMode(true)} onBlur={() => setMode(false)}>
                <div className={classes.profile_name_content}>
                    <div>
                        {props.username}
                    </div>
                </div>
                {
                    exitMode && props.isAuth
                        ? <div className={classes.exit_container}>
                            <div onClick={onExit}>
                                Выйти
                            </div>
                        </div>
                        : null
                }
            </button>
        </header>
    );
}

const mapStateToProps = (state) => {
    return {
        username: state.auth.username,
    }
};

export default compose(connect(mapStateToProps, {deleteAuthLoginTC}), withLoginRedirect)(Header);
