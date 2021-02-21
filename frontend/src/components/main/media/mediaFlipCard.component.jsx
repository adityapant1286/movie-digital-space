import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import Card from "@material-ui/core/Card";
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/InfoRounded";
import GridListTileBar from '@material-ui/core/GridListTileBar';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfiedRounded';
import PowerOffIcon from '@material-ui/icons/PowerOffTwoTone';
import BackIcon from '@material-ui/icons/BackspaceRounded';


import { blueGrey, orange } from '@material-ui/core/colors';
import { useTheme } from '@material-ui/core/styles';

import "../../../theme/flipCardStyles.css";
import MediaCardTab from './mediaCardTab.component';
import { defaultToast } from '../../../common/toastify.service';
import { getMediaDetails, getLowestPrice } from '../../../helpers/mediaComponent.helper';

const MediaFlipCard = (props) => {

  const [isFlipped, setFlipped] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [isError, setIsError] = useState(false);
  const [pricingAndDetails, setPricingAndDetails] = useState('');

  const data = props.data;
  const theme = useTheme();

  const cardZIndex = 'auto';

  const styles = {
    back: {
      display: isFlipped ? 'content' : 'none',
      height: '100%',
      left: '0',
      position: isFlipped ? 'relative' : 'absolute',
      top: '0',
      width: '100%'
    },
    container: {
      perspective: '1000px',
      zIndex: `${cardZIndex}`,
    },
    flipper: {
      height: '100%',
      position: 'relative',
      width: '100%',
      // margin: '8px 16px',
      maxWidth: '-webkit-fill-available'
    },
    front: {
      display: isFlipped ? 'none' : 'content',
      height: '100%',
      left: '0',
      position: isFlipped ? 'absolute' : 'relative',
      top: '0',
      width: '100%',
      zIndex: '2'
    },
    infoIcon: {
      color: blueGrey[200],
    },
    backIcon: {
        color: orange[500],
    },
    backButton: {
      position: "absolute",
      bottom: 0,
      right: 0,
      margin: "0.5rem 1.1rem 1.8rem 0.5rem",
    },
    content: {
      paddingTop: 0,
    },
    imgStyle: {
      width: "100%",
      height: "auto",      
    },
    syncProgressWrapper: {
      position: "relative",
      paddingRight: theme.spacing(2),
    },
    syncProgress: {
      position: "absolute",
      top: 5,
      left: 5,
      zIndex: 1  
    },
    gridList: {
      width: 500,
      height: 450,
    },
    gridTile: {
        width: "100%",
        height: "100%"
    },
    errorPaper: {
      paddingTop: theme.spacing(3),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    errorText: {
        padding: theme.spacing(2),
        display: "flex",
        alignItems: "center"
    },
  };

  const handleFlip = () => {
    setFlipped(!isFlipped);
  };

  const handleLoadData = () => {
    setFlipped(!isFlipped);

    setSyncing(true);

    if (!syncing) {
      getMediaDetails(data.title, data.providers)
        .pipe(
            map(result => result),
            catchError(err => of(handleDataLoadError(err)))
          )
          .subscribe(pricingWithDetails => {
            // console.log(pricingWithDetails);
            const lowestPriceProvider = getLowestPrice(pricingWithDetails.pricing);
            
            defaultToast('Loswest Price', lowestPriceProvider.provider + ': ' + lowestPriceProvider.price);

            setPricingAndDetails(pricingWithDetails);
            setSyncing(false);
          });
    }

  }

  const handleDataLoadError = (err) => {
    console.log(err);
    setIsError(true);
    setSyncing(false);
  };


  const flipButton = (front = false) => (
      front 
        ? (<div style={styles.syncProgressWrapper}>
            <IconButton edge="end" size="small"
                        onClick={handleLoadData} aria-label="info">
                <InfoIcon style={styles.infoIcon} fontSize="large" />
            </IconButton>
          </div>)
        : (<IconButton edge="end" size="small" style={styles.backButton} 
                      onClick={handleFlip} aria-label="back" >
            <BackIcon style={styles.backIcon} fontSize="large" />
          </IconButton>)
  );

  const errorOccurred = () => (
    <div style={styles.errorPaper}>
        <SentimentDissatisfiedIcon color="primary" fontSize="large" style={{fontSize: "2rem"}} />
        <Typography variant="h5" align="center" color="primary" style={styles.errorText}>                
          Opps!
        </Typography>
        <Typography variant="h5" align="center" color="primary" style={styles.errorText}>                
            Something went wrong.
        </Typography>
        <PowerOffIcon color="primary" style={{fontSize: "2.5rem"}} />
        <Typography variant="h6" align="center" color="primary" style={styles.errorText}>
            Please try again
        </Typography>
    </div>
);


  // name, baseUrl, clientId, id, status, locale, timezone, createDate, updateDate
  return (
      <div key={uuidv4()} style={styles.flipper}>        
        <Paper elevation={4} style={styles.front}>
            <GridListTile key={data.poster} style={styles.gridTile} component="div" >
              { 
                  syncing 
                    && (<LinearProgress color="secondary" style={{backgroundColor: theme.palette.primary.main}}  />) 
              }
              <img src={data.poster} alt={data.title} style={styles.imgStyle} />
              <GridListTileBar style={{height: "18%"}}
                                title={<span style={{whiteSpace: "break-spaces"}}>{data.title}</span>}
                                actionIcon={  flipButton(true) }
                        />
            </GridListTile>
        </Paper>
        
        <Card style={styles.back}>
            {
              isError 
                ? errorOccurred() 
                : pricingAndDetails && (<MediaCardTab pricing={pricingAndDetails.pricing} details={pricingAndDetails.details} />)
            }
            {  flipButton() }
        </Card>
      </div>
  );
};

export default MediaFlipCard;
