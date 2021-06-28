import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';
import { StarOutline, Star, MonetizationOnOutlined, MonetizationOn, FavoriteBorderOutlined, Favorite, } from '@material-ui/icons';
import Zoom from '@material-ui/core/Zoom';
import Paper from '@material-ui/core/Paper';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';


import useStyles from './styles';


const DealCard = ({ deal, id, dayText, description, foodURL, logoURL, qualityRating, valueRating, 
    priceRating, time, userDownVotes, userUpVotes, specifyOther, days, signedIn }) => {
    const classes = useStyles();
    console.log('signedIn dealcard', signedIn)

   // const location = useLocation()

    const renderPrice = () => {
        switch (priceRating) {
            case 1: 
                return (<><MonetizationOn/><MonetizationOnOutlined/><MonetizationOnOutlined/></>);
            case 2:
                return (<><MonetizationOn/><MonetizationOn/><MonetizationOnOutlined/></>);
            case 3: 
                return (<><MonetizationOn/><MonetizationOn/><MonetizationOn/></>);
            default:
                return  (<><MonetizationOnOutlined/><MonetizationOnOutlined/><MonetizationOnOutlined/></>);
        }
    };

    const renderQuality = () => {
        switch (qualityRating) {
            case 1: 
                return (<><Favorite/><FavoriteBorderOutlined/><FavoriteBorderOutlined/></>);
            case 2:
                return (<><Favorite/><Favorite/><FavoriteBorderOutlined/></>);
            case 3: 
                return (<><Favorite/><Favorite/><Favorite/></>);
            default:
                return (<><FavoriteBorderOutlined/><FavoriteBorderOutlined/><FavoriteBorderOutlined/></>);
        }
    };

    const renderValue = () => {
        switch (valueRating) {
            case 1: 
                return (<><Star/><StarOutline/><StarOutline/></>);
            case 2:
                return (<><Star/><Star/><StarOutline/></>);
            case 3: 
                return (<><Star/><Star/><Star/></>);
            default:
                return (<><StarOutline/><StarOutline/><StarOutline/></>);
        }
    }

    const adminControls = () => {
        if (signedIn) {
            return (
                <>
                    <Link to={`/edit/${id}`}>Edit</Link>
                    <Link to={`/delete/${id}`}>Del</Link>
                </>
            )
        } else {
            return ""
        } 
    }


    return (
        <div className={classes.root}>
            <Zoom in={true} timeout={300} >
            <Paper className={classes.paper}>
                <Grid container spacing={1} alignItems='center' alignContent='stretch' >
                    <Grid item xs={7}>
                        <img className={classes.image} alt="logo" src={logoURL} style={{marginTop: 0}}/>
                    </Grid>
                    <Grid item xs={5} style={{ textAlign: 'center' }}>
                        <Typography variant="h3" >{specifyOther || deal}</Typography> 
                        <Typography variant='h5'>{dayText || days}</Typography>
                        <Typography variant='subtitle1'>{time}</Typography>  
                    </Grid>
                    </Grid>
                    <div id="foodPic" >
                        <img className={classes.foodPic} alt='logo' src={foodURL} />
                    </div>
                    <div id='description' style={{display: 'block'}}>
                        <Typography variant="h6" style={{margin: '0px 20px'}}>
                            {description}
                        </Typography>
                    </div>
                    <div style={{ margin: 'auto' }}>
                        <span id="quality" style={{ color: 'red', alignSelf: 'center', paddingLeft: '5px', paddingRight: '5px' }}>
                            {renderQuality()}
                        </span>
                        <span id="price" style={{ color: 'green', alignSelf: 'center', paddingLeft: '5px', paddingRight: '5px' }}>
                            {renderPrice()}
                        </span>
                        <span id="value" style={{color: 'orange', alignSelf: 'center', paddingLeft: '5px', paddingRight: '5px' }}>
                            {renderValue()}
                        </span>
                    </div>
                    <div style={{ margin: 'auto'}}>
                        <IconButton style={{ color: 'green', paddingTop:'0', alignSelf: 'center' }} aria-label="Up Vote"><ThumbUpAltIcon/>{userUpVotes}</IconButton>
                        <IconButton style={{ color: 'red', paddingTop:'0', alignSelf: 'center' }} aria-label="Down Vote"><ThumbDownAltIcon/>{userDownVotes}</IconButton>   
                    </div> 
                    <div>
                        {adminControls()}
                    </div>

            </Paper>
            </Zoom>
        </div>
    )
};

export default DealCard

//                        
//                        {renderRating(priceRating, MonetizationOnOutlined, MonetizationOn)}
   /*  const renderRating = (ratingType, outlinedIcon, filledIcon) => {
        switch (ratingType) {
            case 0:
                return (<><`${outlinedIcon}` /><`${outlinedIcon}` /><`${outlinedIcon}`/></>);
            case 1: 
                return (`<${filledIcon}/><${outlinedIcon}/><${outlinedIcon}/>`);
            case 2:
                return (`<${filledIcon}/><${filledIcon}/><${outlinedIcon}/>`);
            case 3: 
                return `<${filledIcon}/><${filledIcon}/><${filledIcon}/>`
        }
    } */