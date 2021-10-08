import {
    CircularProgress,
    Container,
    Grid,
    makeStyles,
    Slider,
    Typography,
    Paper,
    TextField,
    Radio,
    FormControl, RadioGroup, FormControlLabel
} from "@material-ui/core";
import {useState, useEffect} from "react";
import {useHistory,useLocation} from "react-router-dom";

import axios from "axios";

import ProductCard from "../components/ProductCard";

const useStyles = makeStyles({
   root: {
       marginTop:20,
   },
    loader: {
       width:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems: 'center',
    },
    paper: {
       marginBottom: '1rem',
        padding: '13px',
    },
    filters: {
       padding: "0 1.5rem",
    },
    priceRangeInputs: {
       display: 'flex',
        justifyContent: 'space-between',
    }
})


const ProductsPage = () =>  {
    //Material Ui style
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const params = location.search ? location.search : null;

    // Component state
    const [products, setProducts] = useState([]);
    const [loading,setLoading] = useState(false);

    const [sliderMax, setSliderMax] = useState(1000);
    const[priceRange,setPriceRange] = useState([25,75]);

    const[filter,setFilter] = useState('');

    useEffect(() => {
        let cancel;

        const fetchData = async () => {
            setLoading(true);
            try {
                let query;

                if(params && !filter) {
                    query = params;
                } else {
                    query = filter;
                }

                const {data} = await axios({
                    method: 'GET',
                    url: `/api/v1/tz${query}`,
                    cancelToken: new axios.CancelToken((c) => (cancel = c))
                });

                setProducts(data.data);
                setLoading(false);

            } catch (e) {
                console.log(e.response.data);
            }
        };


    fetchData();

    },[filter,params]);

    const onSliderCommitHandler = (e,newValue) => {
        buildRangeFilter(newValue);
    };

    const buildRangeFilter = (newValue) => {
        const urlFilter =`?price[gte]=${newValue[0]}&price[lte]=${newValue[1]}`;

        setFilter(urlFilter);

        history.push(urlFilter);
    }

    return (
        <Container className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <Typography gutterBottom>Фильтр</Typography>

                        <div className={classes.filters}>
                            <Slider
                                min={0}
                                max={sliderMax}
                                value={priceRange}
                                valueLabelDisplay='auto'
                                onChange={(e, newValue)=> setPriceRange(newValue)}
                                onChangeCommitted={onSliderCommitHandler}
                            />

                            <div className={classes.priceRangeInputs}>
                                <TextField
                                    size='small'
                                    id='lower'
                                    label='Минимальная цена'
                                    variant='outlined'
                                    type='number'
                                    disabled={loading}
                                    value={0}
                                    />

                                <TextField
                                    size='small'
                                    id='upper'
                                    label='Максимальная цена'
                                    variant='outlined'
                                    type='number'
                                    disabled={loading}
                                    value={75}
                                />
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Typography gutterBottom>Сортировать</Typography>

                        <FormControl component='fieldset' className={classes.filters}>
                            <RadioGroup
                                aria-label='price-order'
                                name='price-order'
                            >
                                <FormControlLabel
                                    control={<Radio/>}
                                    label='Цена: По убыванию'
                                    disabled={loading}
                                />

                                <FormControlLabel
                                    control={<Radio/>}
                                    label='Цена: По возрастанию'
                                    disabled={loading}
                                />
                            </RadioGroup>
                        </FormControl>

                    </Grid>
                </Grid>
            </Paper>

            <Grid container spacing={2}>
                {loading ? (
                    <div className={classes.loader}>
                        <CircularProgress size='3rem' thickness={5}/>
                    </div>
                ) : (
                    products.map(product => (
                            <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                                <ProductCard product={product}/>
                            </Grid>
                        ))
                    )}

            </Grid>

        </Container>
    );
}

export default ProductsPage;