import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    imageList: {
        width: 500,
        height: 450,
    },
}));

function MyImageList({data}) {
    const classes = useStyles();
    return (
        <ImageList rowHeight={160} className={classes.imageList} cols={3}>
            {data.map((item) => (
                <ImageListItem key={item} cols={item.cols || 1}>
                    <img src={"/common/download?name="+item} alt={"/common/download?name="+item} />
                </ImageListItem>
            ))}
        </ImageList>
    );
}

export default MyImageList;