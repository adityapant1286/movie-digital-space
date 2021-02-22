import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Switch from "@material-ui/core/Switch";
import Avatar from '@material-ui/core/Avatar';
// import A from '../../../../public/logo192.png'
import { makeStyles } from '@material-ui/core/styles';


const userStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    appBar: {
    },
    switchTrack: {
        backgroundColor: theme.palette.grey[50],
    },
    title: {
        flexGrow: 1
    },
    avatar: {
        marginRight: theme.spacing(1),
        fontSize: 12,
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.main
    },
    avatarSmall: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
}));

const MediaAppBar = (props) => {

    const classes = userStyles();    

    return (
        <article className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                {/* <Avatar alt="logo" src={`${process.env.PUBLIC_URL}/logo192.png`} /> */}
                    <Avatar alt="logo" 
                            className={`${classes.avatar} ${classes.avatarSmall}`}>PT</Avatar>
                    <Typography variant="h6" className={classes.title}>
                        Prince's Theatre
                    </Typography>
                    <Switch checked={props.darkMode} classes={{ track: classes.switchTrack }}
                                onChange={props.toggleDarkMode} />
                </Toolbar>
            </AppBar>
        </article>
    );
};

export default MediaAppBar;