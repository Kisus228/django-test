import classes from "./TextInput.module.css";
import Select from "react-select";
import icon from "../../../assets/icon.png"

const dot = (type = null) => {
    if (type === null) return null;
    return (
        {
            display: 'flex',
            ':before': {
                backgroundRepeat: "no-repeat",
                backgroundSize: 80,
                backgroundPosition: -20 * (type.type),
                backgroundImage: `url(${icon})`,
                backgroundColor: "transparent",
                content: '" "',
                marginRight: 5,
                marginTop: 2,
                height: 20,
                width: 20,
            },
        })
};

const SelectInput = ({label, ...props}) => {
    const zind = props.zind !== undefined ? props.zind : 0;
    return (
        <>
            <div className={classes.input_text_wrapper}>
                <label className={classes.label}>{label}</label>
                <Select
                    styles={{
                        option: (styles, {data}) => ({
                            ...styles,
                            ...dot(data),
                            '&:last-of-type': {
                                borderBottomLeftRadius: 15,
                                borderBottomRightRadius: 15,
                                marginBottom: -4,
                            }
                        }),
                        menu: (styles) => ({
                            ...styles,
                            marginTop: -18,
                            paddingTop: 15,
                            borderBottomLeftRadius: 15,
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 15,
                            zIndex: 1 + zind,
                        }),
                        input: (styles) => ({
                            ...styles,
                            marginTop: 0,
                            height: 16,
                            paddingTop: 1,
                            paddingBottom: 1,
                            boxSizing: 'border-box',
                            color: '#000000',
                            fontSize: 13,
                            fontFamily: 'Arial',
                        }),
                        control: (styles) => ({
                            ...styles,
                            borderRadius: 15,
                            minHeight: 0,
                            height: 30,
                            zIndex: 2 + zind,
                        }),
                        singleValue: (styles) => ({
                            ...styles,
                            color: '#000000',
                            fontSize: 13,
                            height: 16,
                            fontFamily: 'Arial',
                        }),
                        placeholder: (styles) => ({
                            ...styles,
                            color: '#C4C4C4',
                            fontSize: 13,
                            fontFamily: 'Arial',
                        }),
                        valueContainer: (styles) => ({
                            ...styles,
                            height: 26,
                            paddingTop: 1,
                            paddingBottom: 1,
                            boxSizing: 'border-box',
                            marginTop: -1,
                        }),
                        indicatorsContainer: (styles) => ({
                            ...styles,
                            height: 30,
                        }),
                        multiValueLabel: (styles) => ({
                            ...styles,
                            padding: 0,
                            paddingRight: 4,
                        }),
                        multiValue: (styles) => ({
                            ...styles,
                            height: 20,
                            verticalAlign: "center",
                            borderRadius: 20,
                            //backgroundColor: "rgba(255,255,255,0)",
                        }),
                        multiValueRemove: (styles) => ({
                            ...styles,
                            width: 20,
                            borderRadius: 20,
                            ':hover': {
                                backgroundColor: "red",
                                color: 'white',
                            },
                        }),
                    }}
                    {...props}>
                </Select>
            </div>
        </>
    );
};

export default SelectInput;