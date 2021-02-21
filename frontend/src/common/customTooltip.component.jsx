import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const useCustomTooltipStyles = makeStyles((theme) => ({
    arrow: {
      color: theme.palette.primary.main,
    },
    tooltip: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
        fontSize: 'small'
    },
}));


const CustomTooltip = (props) => {
    const classes = useCustomTooltipStyles();
    const reactRef = React.createRef();
    return <Tooltip ref={reactRef} arrow classes={classes} {...props} />
};

export default CustomTooltip;