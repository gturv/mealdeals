import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({ //arg is a callback that returns a styling object
    container: { // create a class called container
        backgroundColor: theme.palette.background.paper, // define style using theme
        padding: '20px'
    },
    logo: {
    //    paddingTop: '15px',
        position: 'fixed',
        transform: "rotate(40deg)"
    //    left: '34%',
    //    display: 'inline'
    },
    admin: {
        position: 'relative',
        display: 'inline',
        bottom: '95%',
        left: '90%'

       
    },

    root: { flexGrow: 1 },
    logoo: { marginRight: theme.spacing(2) },
    formControl: {
        margin: theme.spacing(3),
    },
    filterBox: {
        border: "2px",
        borderStyle: "solid",
        borderColor: "gray",
        backgroundColor: "white",
        padding: "20px",
        marginTop: "5px",
        borderRadius: '15px'
    },
    accordion: {
        width: '95%',
        margin: 'auto'
    },
    slider: {
        width: '30%',
        padding: '10px'
    },
    select: {
        minWidth: '183px'
    },
    paper: {
        display: "flex",
        flexWrap: "wrap"
    },
    image: {
        display: 'flex',
        margin: theme.spacing(1, 0),
        objectFit: 'contain',
        width: '100%'
    },
    gridDealCard: {},
    foodPic: {
        objectFit: 'cover',
        height: "100%",
        width: '100%',
        margin: 'auto'
    }
}));

export default useStyles  // then import useStyles from './styles'   which is a .js file
