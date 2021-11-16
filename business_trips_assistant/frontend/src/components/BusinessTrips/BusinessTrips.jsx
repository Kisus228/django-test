import classes from "./BusinessTrips.module.css";
import {compose} from "redux";
import {connect} from "react-redux";
import {removeBusinessTrip, setBusinessTripsTC} from "../../redux/businessTripsReducer";
import BusinessTripConstructor from "./BusinessTripConstructor/BusinessTripConstructor";
import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";

const BusinessTrips = (props) => {
    const [status, setStatus] = useState("Все");

    useEffect(() => {
        props.setBusinessTripsTC();
    }, []);

    const onDelete = (id) => {
        props.removeBusinessTrip(id);
    }

    const changeFilter = () => {
        switch (status) {
            case "Все":
                setStatus("Активная");
                return;
            case "Активная":
                setStatus("Запланированная");
                return;
            case "Запланированная":
                setStatus("Завершённая");
                return;
            case "Завершённая":
                setStatus("Все");
                return;
            default:
                setStatus("Все");
                return;
        }
    }

    return (
        <div className={classes.body_container}>
            <div className={classes.new_bt}>
                <div>
                    Новая командировка
                </div>
                <NavLink to={`/business-trips/${props.countBusinessTrips}`} className={classes.button}>
                    Создать
                </NavLink>
            </div>
            <div className={classes.filter}>
                <div onClick={changeFilter}>
                    Статус: {status}
                </div>
            </div>
            <div>
                {
                    props.businessTrips !== undefined
                        ? props.businessTrips
                            .filter(bt => (bt.status === status || status === "Все"))
                            .map((businessTrip) =>
                                <BusinessTripConstructor businessTrip={businessTrip}
                                                         onDelete={onDelete}/>)
                        : null
                }
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        countBusinessTrips: state.businessTripsData.nextId,
        businessTrips: state.businessTripsData.businessTrips,
    }
};

export default compose(connect(mapStateToProps, {
    setBusinessTripsTC,
    removeBusinessTrip
}))(BusinessTrips);
