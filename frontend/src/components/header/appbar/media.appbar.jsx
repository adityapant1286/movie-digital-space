/* 
    Copyright (C) 2021  
    Author: Aditya Pant
    Email: aditya.java6@gmail.com

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

*/

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Switch from "@material-ui/core/Switch";
import Avatar from '@material-ui/core/Avatar';
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