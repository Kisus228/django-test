import classes from "./Transport.module.css";
import TransportForm from "./TransportForm/TransportForm";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import TransportConstructor from "./TransportConstructor/TransportConstructor";
import {
    initializeTransport,
    setTransportTC, uninitializedDataSuccess,
    uninitializedTransportSuccess
} from "../../redux/transportReducer";
import {useEffect, useState} from "react";
import {
    initializeBTInfo,
    postTransportInfoTC,
    putTransportInfoTC,
    uninitializedSuccess
} from "../../redux/businessTripsReducer";

const Transport = (props) => {
    const id = isNaN(Number(props.match.params.businessTripId))
        ? (props.businessTrip.id || 'new')
        : Number(props.match.params.businessTripId);

    const direction = props.match.params.direction;

    const options = [
        {value: 1, label: 'РЖД'},
        {value: 0, label: 'Aviasales'}
    ]

    const [selectedOption, setSelectedOption] = useState([]);

    useEffect(() => {
            props.uninitializedSuccess();
            props.uninitializedDataSuccess();
            props.uninitializedTransportSuccess();
        },
        // eslint-disable-next-line
        []);

    useEffect(() => {
            props.uninitializedDataSuccess();
            props.initializeBTInfo(id).then(() => {
                if (props.initializedBT && !!props.businessTrip.fromCity && !!props.businessTrip.toCity)
                    props.initializeTransport(props.businessTrip.fromCity, props.businessTrip.toCity,
                        selectedOption);
            });
        },
        // eslint-disable-next-line
        [props.initializedBT, selectedOption]);

    if (!props.initializedBT || !props.initializedTransport)
        return null

    const onBuying = (data) => {
        if (id !== 'new') {
            const type = direction === 'there' ? 0 : 1;
            const trip = props.businessTrip.trip !== undefined
                ? props.businessTrip.trip.find(trip => trip.isFirst === type)
                : undefined;
            const dateDeparture = data.trip.localDate0.split('.');
            const dateArrival = data.trip.localDate1.split('.');
            const postData = {
                idBT: id,
                transport: data.trip.type,
                priceTicket: 0,
                isFirst: type,
                transportNumber: data.trip.number,
                dateDeparture: dateDeparture[2] + '-' + dateDeparture[1] + '-' + dateDeparture[0],
                dateArrival: dateArrival[2] + '-' + dateArrival[1] + '-' + dateArrival[0],
                cityFrom: props.codeCityFrom,
                cityTo: props.codeCityTo,
                stationFrom: data.trip.station0,
                stationTo: data.trip.station1,
            }
            if (trip === undefined)
                props.postTransportInfoTC(postData);
            else
                props.putTransportInfoTC(postData);
        }
    }
    return (
        <div className={classes.body_container}>
            <TransportForm {...props} id={id} direction={direction} selectedOption={selectedOption}
                           setSelectedOption={setSelectedOption} options={options}/>
            <div className={classes.body_wrapper}>
                {
                    props.transport !== undefined && props.transportDataSearch !== undefined
                        ? props.transport
                            .map((trip, index) =>
                                <TransportConstructor transportDataSearch={props.transportDataSearch}
                                                      trip={trip} key={index} onBuying={onBuying}/>)
                        : null
                }
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        initializedBT: state.businessTripsData.initialized,
        initializedTransport: state.transportData.initialized,
        transport: state.transportData.transport,
        stationsFrom: state.transportData.stationsFrom,
        stationsTo: state.transportData.stationsTo,
        codeCityFrom: state.transportData.codeCityFrom,
        codeCityTo: state.transportData.codeCityTo,
        transportDataSearch: state.transportData.transportDataSearch,
        businessTrip: state.businessTripsData.businessTrip,
    }
};

export default compose(connect(mapStateToProps,
    {
        setTransportTC,
        initializeBTInfo,
        initializeTransport,
        postTransportInfoTC,
        putTransportInfoTC,
        uninitializedSuccess,
        uninitializedTransportSuccess,
        uninitializedDataSuccess,
    }), withRouter)(Transport);
