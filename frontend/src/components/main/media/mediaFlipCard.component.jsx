import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Card from "@material-ui/core/Card";
import Paper from '@material-ui/core/Paper';
import CardActions from "@material-ui/core/CardActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InfoIcon from "@material-ui/icons/InfoRounded";
import GridList from '@material-ui/core/GridList';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import GridListTile from '@material-ui/core/GridListTile';

import { amber, blueGrey } from '@material-ui/core/colors';
import { useTheme } from '@material-ui/core/styles';

import "../../../theme/flipCardStyles.css";
import MediaCardTab from './mediaCardTab.component';
import { infoToast } from '../../../common/toastify.service';

const MediaFlipCard = (props) => {

  const [isFlipped, setFlipped] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const data = props.data;
  const theme = useTheme();

  const frontRotateY = `rotateY(${isFlipped ? 180 : 0}deg)`;
  const backRotateY = `rotateY(${isFlipped ? 0 : -180}deg)`;
  const frontRotateX = `rotateX(${isFlipped ? 180 : 0}deg)`;
  const backRotateX = `rotateX(${isFlipped ? 0 : -180}deg)`;
  const flipDirection = 'horizontal';
  const flipSpeedFrontToBack = 0.6;
  const flipSpeedBackToFront = 0.6;
  const cardZIndex = 'auto';

  const handleFlip = () => {
    setFlipped(!isFlipped);    
  };

  const handleLoadData = () => {
    setFlipped(!isFlipped);
    setSyncing(true);
    if (syncing) {
      infoToast('Loading Data', 'Loading data from providers.');
      setSyncing(false);
      // handle loading      
    }
    console.log(syncing);
  }

  const styles = {
    back: {
      WebkitBackfaceVisibility: 'hidden',
      backfaceVisibility: 'hidden',
      height: '100%',
      left: '0',
      position: isFlipped ? 'relative' : 'absolute',
      top: '0',
      transform: flipDirection === 'horizontal' ? backRotateY : backRotateX,
      transformStyle: 'preserve-3d',
      transition: `${flipSpeedFrontToBack}s`,
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
    //   margin: '8px 16px',
      maxWidth: '-webkit-fill-available'
    },
    front: {
      WebkitBackfaceVisibility: 'hidden',
      backfaceVisibility: 'hidden',
      height: '100%',
      left: '0',
      position: isFlipped ? 'absolute' : 'relative',
      top: '0',
      transform: flipDirection === 'horizontal' ? frontRotateY : frontRotateX,
      transformStyle: 'preserve-3d',
      transition: `${flipSpeedBackToFront}s`,
      width: '100%',
      zIndex: '2'
    },
    infoIcon: {
        color: blueGrey[200],
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
    }
  };

  const flipButton = (front = false) => {
    return (
        <div style={styles.syncProgressWrapper}>
        <IconButton edge="end" size="small"
                    onClick={front ? handleLoadData : handleFlip } aria-label="info">
            <InfoIcon style={styles.infoIcon} fontSize="large" />
        </IconButton>        
        {/* { syncing && (<CircularProgress key={uuidv4()} size={30} thickness={4}
                                        style={styles.syncProgress} color="secondary" />) } */}
        </div>
    );
  };

  // name, baseUrl, clientId, id, status, locale, timezone, createDate, updateDate
  return (
      <div key={uuidv4()} style={styles.flipper}>        
        <GridList cellHeight={300} key={uuidv4()} style={styles.front}>
            <Paper style={{width: "100%", height: "100%"}} elevation={4}>
            { 
                syncing && (<LinearProgress color="secondary" style={{backgroundColor: theme.palette.primary.main}}  />) 
            }
            <GridListTile key={data.poster} style={styles.gridTile} component="div" >
                <img src={data.poster} alt={data.title} />
                <GridListTileBar style={{height: "18%"}}
                                title={<span style={{whiteSpace: "break-spaces"}}>{data.title}</span>}
                                actionIcon={  flipButton(true) }
                        />
            </GridListTile>
            </Paper>
        </GridList>
        
        <Card style={styles.back}>
            {
                <MediaCardTab data={data} />
            }
            <CardActions >
            {  flipButton() }
            </CardActions>
        </Card>
      </div>
  );
};

export default MediaFlipCard;
