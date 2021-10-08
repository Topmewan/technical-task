import {CircularProgress, Container, Grid, makeStyles, Slider, Typography, Paper, TextField} from "@material-ui/core";
import {useState, useEffect} from "react";

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
    }
})


const ProductsPage = () =>  {

    const classes = useStyles();

    const [products, setProducts] = useState([]);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        let cancel;

        const fetchData = async () => {
            setLoading(true);
            try {
                const {data} = await axios({
                    method: 'GET',
                    url: `/api/v1/tz`,
                    cancelToken: new axios.CancelToken((c) => (cancel = c))
                });

                setProducts(data.data);
                setLoading(false);

            } catch (e) {
                console.log(e.response.data);
            }
        };


    fetchData();
    },[])

    return (
        <Container className={classes.root}>
            <Paper>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <Typography gutterBottom>Фильтр</Typography>

                        <div>
                            <Slider
                                min={0}
                                max={100}
                            />

                            <div>
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