import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Switch from "@material-ui/core/Switch";
import { makeStyles } from '@material-ui/core/styles';


const userStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    appBar: {
        // [theme.breakpoints.up('sm')]: {
        //   width: `calc(100% - ${drawerWidth}px)`,
        //   marginLeft: drawerWidth,
        // },
    },
    title: {
        flexGrow: 1
    }
}));

const MediaAppBar = (props) => {

    const classes = userStyles();    

    return (
        <article className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Prince's Theatre
                    </Typography>
                    <Switch checked={props.darkMode} 
                                onChange={props.toggleDarkMode} />
                </Toolbar>
            </AppBar>
        </article>
    );
};

export default MediaAppBar;