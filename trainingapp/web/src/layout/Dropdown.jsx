import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    button:{
        // paddingRight: 30 0.875rem,
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 1.5,
        letterSpacing: 0.15,
        color: "black",
        textTransform: "none",
        '&:hover': {
            color: "#3f51b5",
            textDecoration: "none",
            backgroundColor: "transparent",
        },
    }
}));

export default function Dropdown() {
    const classes = useStyles();
    const [categoryList, setCategoryList] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);

    React.useEffect(() => {
        getCategoryList();
    }, []);

    const getCategoryList = async () => {
        const dataList = await axios({
          url: process.env.REACT_APP_AWS_API_ENDPOINT + '/admin/category/list',
          method: 'get'
        }).then(response => response.data).then((data) => {
          return data;
        });
        if(dataList) { setCategoryList(dataList); }
    };

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return(
        <React.Fragment>
            <Button className={classes.button} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Courses
            </Button>
            <Menu
                id="simple-menu"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin= {{
                    vertical: "top",
                    horizontal: "center"
                }}
                getContentAnchorEl={null}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {categoryList.map((category) => (
                    <MenuItem onClick={handleClose}>{category.name}</MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    );
}
