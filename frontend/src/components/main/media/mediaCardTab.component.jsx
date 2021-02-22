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

import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Typography from "@material-ui/core/Typography";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Badge from '@material-ui/core/Badge';

import { makeStyles } from '@material-ui/core/styles';

import { getLowestPrice } from '../../../helpers/mediaComponent.helper';

const userStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,        
    },
    toolbar: theme.mixins.toolbar,
    tab: {
        minWidth: 0
    },
    tabPanel: {
        padding: theme.spacing(2),
        paddingTop: "1.5rem"
    },
    lowPriceBadge: {
        // backgroundColor: "transparent",
        // color: theme.palette.primary.main,
        fontFamily: "system-ui, -webkit-pictograph",
        fontWeight: "700",
        fontSize: "small",
        padding: 0,
        top: "4px",
        right: "-10px",
    },
}));


const MediaCardTab =  (props) => {

    const classes = userStyles();

    const [selectedTab, setSelectedTab] = useState(0);
    const detailsData = props.details;    
    const pricingData = props.pricing;
    const lowestPriceProvider = getLowestPrice(pricingData);

    const handleTabChange = (event, selected) => {        
        setSelectedTab(selected);
    }

    return (        
        <div key={uuidv4()} className={classes.root}>
            <div>
            <AppBar key={uuidv4()} position="static" color="default" elevation={3}>
                <Tabs value={selectedTab} variant="fullWidth"
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="Movie Info"                    
                >
                    <Tab label="Price" id="priceTab" className={classes.tab} aria-controls="priceTabPanel"/>
                    <Tab label="Info" id="infoTab" className={classes.tab} aria-controls="infoTabPanel"/>
                    <Tab label="Cast" id="castTab" className={classes.tab} aria-controls="castTabPanel"/>
                </Tabs>
            </AppBar>
                <article key={uuidv4()} hidden={selectedTab !== 0} className={classes.tabPanel}
                        role="tabpanel" id="priceTabPanel" aria-labelledby="priceTab">
                    <Typography  variant="body2" component="div">
                        {
                            pricingData.map(p => (
                                <React.Fragment key={uuidv4()}>
                                    {
                                        p.provider === lowestPriceProvider.provider
                                        ? (<Badge color="primary" badgeContent={<span>&#8600;</span>} 
                                                    classes={{ colorPrimary: classes.lowPriceBadge }}>
                                            <Typography variant="subtitle1" 
                                                        component="div">{p.provider}:</Typography>
                                            </Badge>)
                                        : (<Typography variant="subtitle1" component="div">{p.provider}:</Typography>)
                                    }
                                    <Typography variant="h6" 
                                                color="textSecondary" 
                                                component="div">{p.price}</Typography>
                                </React.Fragment>
                            ))
                        }
                    </Typography>
                </article>
                <article key={uuidv4()} hidden={selectedTab !== 1} className={classes.tabPanel}
                        role="tabpanel" id="infoTabPanel" aria-labelledby="infoTab">
                    <Typography  variant="body2" component="div">
                        <Typography variant="subtitle1" component="div">Year:</Typography>
                        <Typography variant="body2" gutterBottom
                                    color="textSecondary" component="div">
                            {detailsData.Year}
                        </Typography>

                        <Typography variant="subtitle1" component="div">Rated:</Typography>
                        <Typography variant="body2" gutterBottom
                                    color="textSecondary" component="div">
                            {detailsData.Rated}
                        </Typography>

                        <Typography variant="subtitle1" component="div">Genere:</Typography>
                        <Typography variant="body2" gutterBottom
                                    color="textSecondary" component="div">
                            {detailsData.Genere}
                        </Typography>

                        <Typography variant="subtitle1" component="div">Released:</Typography>
                        <Typography variant="body2" gutterBottom
                                    color="textSecondary" component="div">
                            {detailsData.Released}
                        </Typography>
                        <Typography variant="subtitle1" component="div">Duration:</Typography>
                        <Typography variant="body2" gutterBottom
                                    color="textSecondary" component="div">
                            {detailsData.Runtime}
                        </Typography>
                        <Typography variant="subtitle1" component="div">Language:</Typography>
                        <Typography variant="body2" gutterBottom
                                    color="textSecondary" component="div">
                            {detailsData.Language}
                        </Typography>

                        <Typography variant="subtitle1" component="div">Country:</Typography>
                        <Typography variant="body2"
                                    color="textSecondary" component="div">
                            {detailsData.Country}
                        </Typography>

                    </Typography>
                </article>
                <article key={uuidv4()} hidden={selectedTab !== 2} className={classes.tabPanel}
                        role="tabpanel" id="castTabPanel" aria-labelledby="castTab">
                    <Typography  variant="body2" component="div">
                        <Typography variant="subtitle1" component="div">Actors:</Typography>
                        <Typography variant="body2" gutterBottom
                                    color="textSecondary" component="div">
                            {detailsData.Actors}
                        </Typography>

                        <Typography variant="subtitle1" component="div">Director:</Typography>
                        <Typography variant="body2" gutterBottom
                                    color="textSecondary" component="div">
                            {detailsData.Director}
                        </Typography>

                        <Typography variant="subtitle1" component="div">Writer:</Typography>
                        <Typography variant="body2" gutterBottom
                                    color="textSecondary" component="div">
                            {detailsData.Writer}
                        </Typography>

                        <Typography variant="subtitle1" component="div">Production:</Typography>
                        <Typography variant="body2" 
                                    color="textSecondary" component="div">
                            {detailsData.Production}
                        </Typography>

                        {/* <Typography variant="subtitle1" component="div">Plot:</Typography>
                        <Typography variant="body2" color="textSecondary" component="div">{detailsData.Plot}</Typography> */}
                    </Typography>
                </article>
            </div>
        </div>
    );
};

export default MediaCardTab;