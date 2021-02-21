import React from 'react';

import MediaAppBar from './appbar/media.appbar';

const MediaHeader = (props) => {

    return (
        <MediaAppBar toggleDarkMode={props.toggleDarkMode} 
                    darkMode={props.darkMode} 
                    theme={props.theme} />
    );
};

export default MediaHeader;