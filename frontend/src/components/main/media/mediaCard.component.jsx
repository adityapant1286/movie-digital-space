import React, { useState } from 'react';
import clsx from "clsx";
import { v4 as uuidv4 } from 'uuid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid'

import { makeStyles } from '@material-ui/core/styles';


const userStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    mediaImage: {
        height: 0,
        paddingTop: '56.25%'
    },
    expand: {
        // transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        // transform: 'rotate(180deg)',
    },
    listingSpinner: {
        // position: "relative",
        top: "50%",
        left: "50%",
        // marginTop: -12,
        // marginLeft: -12,
    }
}));

const MediaCard = (props) => {
    const classes = userStyles();
    const data = props.data;
    const [expanded, setExpanded] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleTabChange = (event, selected) => {
        setSelectedTab(selected);
    };

    const renderTabs = () => {

        return (
            <React.Fragment key={uuidv4()}>
                <AppBar key={uuidv4()} position="static" color="default">
                    <Tabs value={selectedTab}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="Movie Tab">
                        <Tab label="Price" id="priceTab" aria-controls="priceTabPanel" />
                        <Tab label="Info" id="infoTab" aria-controls="infoTabPanel" />
                        {/* <Tab label="Cast" id="castTab" aria-controls="castTabPanel" /> */}
                    </Tabs>
                </AppBar>
                <div key={uuidv4()} role="tabpanel" id="priceTabPanel" aria-labelledby="priceTab">
                        <Grid container direction="row"
                                justify="space-between" alignItems="center">
                            {
                                data.providers.map(p => (
                                    <React.Fragment key={uuidv4()}>
                                    <Grid item >
                                        <Typography variant="body2">{p.provider}</Typography>
                                    </Grid>
                                    <Grid item >
                                        <Typography variant="body2">{p.price}</Typography>
                                    </Grid>
                                    </React.Fragment>
                                ))
                            }
                        </Grid>
                </div>
                <div key={uuidv4()} role="tabpanel" id="infoTabPanel" aria-labelledby="infoTab">
                    <Typography variant="h3">Info</Typography>
                </div>
            </React.Fragment>
        );
    };

    return (
        <Card key={uuidv4()} data-media-providers={data.providers}>
            <CardMedia  className={classes.mediaImage}
                        image={data.poster} title={data.title} />
            <CardContent>
                <Typography variant="subtitle1">{data.title}</Typography>                
            </CardContent>
            <CardActions disableSpacing>
                <Button variant="text" color="primary" size="small"
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label={ expanded ? "Close" : "Info"}>
                    { expanded ? "Close" : "Info"}
                </Button>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {
                        renderTabs()
                    }                
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default MediaCard;