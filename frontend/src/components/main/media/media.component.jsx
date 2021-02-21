import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CircularProgress from "@material-ui/core/CircularProgress";
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfiedRounded';
import PowerOffIcon from '@material-ui/icons/PowerOffTwoTone';

import { makeStyles } from '@material-ui/core/styles';

import MediaFlipCard from './mediaFlipCard.component';
import { getListing } from '../../../helpers/mediaComponent.helper';


const userStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    toolbar: theme.mixins.toolbar,
    mediaContainer: {
        padding: theme.spacing(3),
    },
    toolbarMargin: {
        marginTop: "4rem",
    },
    errorPaper: {
        height: "50vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    errorText: {
        padding: theme.spacing(3),
        display: "flex",
        alignItems: "center"
    },
    listingSpinner: {
        // position: "relative",
        top: "50%",
        left: "50%",
        // marginTop: -12,
        // marginLeft: -12,
    }
}));


const Media = (props) => {

    const classes = userStyles();
    const [isError, setIsError] = useState(false);
    const [dataLoading, setDataLoading] = useState(false);
    const [allMedia, setAllMedia] = useState([]);

    useEffect(() => {

        setDataLoading(true); // show loading

        getListing()
            .pipe(
                map(result => result),
                catchError(err => of(handleDataLoadError(err)))
            )
            .subscribe(mediaData => {

                if (mediaData) {
                    setAllMedia(_.defaultTo(mediaData, []));
                }
                setDataLoading(false);
            })

    }, []);

    const handleDataLoadError = (err) => {
        console.log(err);
        setIsError(true);
        setDataLoading(false);
    };

    const loadingSpinner = () => {
        return (
            <div key={uuidv4()} className={classes.toolbarMargin}>
                <CircularProgress key={uuidv4()} size={48} 
                                className={classes.listingSpinner} 
                                color="primary" />
                <div>Loading...</div>
            </div>
        );
    };

    const lonelyHere = () => (
        <Typography variant="h4" align="center" 
                    className={classes.toolbarMargin}>
            It is lonely here!
        </Typography>
    );

    const mediaGrid = () => (
        <Grid container spacing={3} className={classes.toolbarMargin}>
            {
                allMedia.map(obj => (
                    <Grid key={uuidv4()} item xs={12} sm={6} md={4} lg={3} >
                        <MediaFlipCard data={obj}/>
                    </Grid>
                ))
            }
        </Grid>
    );

    const errorOccurred = () => (
        <Paper className={`${classes.toolbarMargin} ${classes.errorPaper}`} >
            
            <Typography variant="h3" align="center" color="primary" className={classes.errorText}>                
            <SentimentDissatisfiedIcon color="primary" fontSize="large" style={{fontSize: "3.5rem"}} /> Opps!
            </Typography>
            <Typography variant="h4" align="center" color="primary" className={classes.errorText}>                
                Something went wrong. <PowerOffIcon color="primary" style={{fontSize: "3rem"}} />
            </Typography>
            <Typography variant="h5" align="center" color="primary" className={classes.errorText}>
                Please try again
            </Typography>
        </Paper>
    );

    return (
        <article className={classes.root} >
            <div className={`${classes.toolbar} ${classes.mediaContainer}`}>
            {
                dataLoading 
                    ? loadingSpinner() 
                    : isError 
                        ? errorOccurred() 
                        : _.isEmpty(allMedia)
                            ? lonelyHere()
                            : mediaGrid()
            }
            </div>
        </article>
    );
};

export default Media;