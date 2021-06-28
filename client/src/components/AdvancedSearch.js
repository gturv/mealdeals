import React from 'react';
import useStyles from './styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import Slider from '@material-ui/core/Slider';
import { StarOutline, Star, MonetizationOnOutlined, MonetizationOn, FavoriteBorderOutlined, Favorite, } from '@material-ui/icons';


const AdvancedSearch = ({ handleValChange, handlePriceChange, handleQualityChange, price, val, rating, quality, setQuality, setAllYouCanEat, allYouCanEat }) => {
    const classes = useStyles()



    const renderPrice = () => {
        switch (price) {
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
        switch (quality) {
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
        switch (val) {
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

    return (
        <div className={classes.accordion}>
            <Accordion >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    >
                    <Typography style={{ align: 'centre', fontSize: '2vw', display: 'flex', marginTop: 0, marginBottom: 0 }}>Advanced</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div style={{margin: 'auto', width: '100%'}}>
                        <Grid container spacing={1}>
                            <Grid item xs={3}>
                    <div style={{position: 'relative', right: 3}}>{renderQuality()}</div>
                    <Slider
                        aria-labelledby="discrete-slider"
                        step={1}
                        valueLabelDisplay='off'
                        min={0}
                        max={3}
                        className={classes.slider}
                        name="quality"
                        onChange={(e, v) => handleQualityChange(e, v) }
                        value={quality}
                    />
                    <Typography>Quality</Typography>
                    </Grid>
                    <Grid item xs={3}>
                    <div style={{position: 'relative', right: 3}}>{renderPrice()}</div>
                    
                    <Slider
                        aria-labelledby="discrete-slider"
                        step={1}
                        valueLabelDisplay='off'
                        min={0}
                        max={3}
                        className={classes.slider}
                        name="price"
                        onChange={(e, v) => handlePriceChange(e, v)}
                        value={price}
                    />
                    <Typography>Price</Typography>
                    </Grid>
                    <Grid item xs={3}>
                    <div style={{position: 'relative', right: 3}}>{renderValue()}</div>
                    
                    <Slider
                        aria-labelledby="discrete-slider"
                        step={1}
                        valueLabelDisplay='off'
                        min={0}
                        max={3}
                        className={classes.slider}
                        name="value"
                        onChange={(e, v) => handleValChange(e, v)}
                        value={val}
                    />
                    <Typography>Value</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControlLabel  control={<Checkbox name="ayce" color="primary" onChange={e => setAllYouCanEat(e.target.checked)} value={allYouCanEat} />} label="All you can eat" />
                    </Grid>
                    </Grid>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
};

export default AdvancedSearch;