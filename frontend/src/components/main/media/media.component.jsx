import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { of } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CircularProgress from "@material-ui/core/CircularProgress";

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
    const [dataLoading, setDataLoading] = useState(false);
    const [allMedia, setAllMedia] = useState([]);

    useEffect(() => {

        setDataLoading(true); // show loading

        getListing()
            .pipe(
                mergeMap(result => result),
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
        setDataLoading(false);
    };

    const loadingSpinner = () => {
        return (
            <div key={uuidv4()}>
                <CircularProgress key={uuidv4()} size={48} 
                                className={classes.listingSpinner} 
                                color="primary" />
                <div>Loading...</div>
            </div>
        );
    };

    return (
        <article className={classes.root} >
            <div className={`${classes.toolbar} ${classes.mediaContainer}`}>
            {
                dataLoading 
                    ? loadingSpinner() 
                    : _.isEmpty(allMedia)
                        ? (<Typography variant="h4" 
                                align="center" 
                                className={classes.toolbarMargin}>
                                It is lonely here!
                            </Typography>)
                        : (
                            <Grid container spacing={3} className={classes.toolbarMargin}>
                                {
                                    allMedia.map(obj => (
                                        <Grid key={uuidv4()} item xs={3}>
                                            <MediaFlipCard data={obj}/>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        )
            }
            </div>
        </article>
    );
};

export default Media;