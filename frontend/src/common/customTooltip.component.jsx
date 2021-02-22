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