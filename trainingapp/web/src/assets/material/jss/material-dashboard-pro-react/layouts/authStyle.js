import {
    whiteColor,
    blackColor,
    hexToRgb
} from "../../material-dashboard-pro-react";

const pagesStyle = theme => ({
    wrapper: {
        // padding: "70px 0 0 0",
        height: "auto",
        // minHeight: "100vh",
        position: "relative",
        top: "0"      
    },
    fullPage: {
        padding: "70px 0 0 0",
        position: "relative",
        // minHeight: "100vh",
        display: "flex!important",
        margin: "0",
        border: "0",
        color: whiteColor,
        alignItems: "center",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        height: "100%",
        [theme.breakpoints.down("sm")]: {
            minHeight: "fit-content!important"
        },
        "& footer": {
            position: "absolute",
            bottom: "0",
            width: "100%",
            border: "none !important"
        },
        "&:before": {
            backgroundColor: "rgba(" + hexToRgb(blackColor) + ", 0)"
        },
        "&:before,&:after": {
            display: "block",
            content: '""',
            position: "absolute",
            width: "100%",
            height: "100%",
            top: "0",
            left: "0",
            zIndex: "2"
        }
    }
});

export default pagesStyle;