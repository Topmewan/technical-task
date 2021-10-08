import {Avatar, Button, Card, CardActions, CardContent, CardHeader, Typography} from "@material-ui/core";
import {Rating} from "@material-ui/lab";

const formatter = new Intl.NumberFormat('ru-RU',{
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits:2,
});

const ProductCard = ({product}) => {
    return (
        <Card>
            <CardHeader
                avatar={<Avatar/>}
                title={<Typography variant='h6'>{product.name}</Typography>}
            />
            <CardContent>
                <Typography variant='caption'>{product.description}</Typography>

                <Typography variant='h6' gutterBottom>{formatter.format(product.price)}</Typography>

                <Rating
                    value={product.rating}
                    readOnly
                    name={product.name}
                    size='small'
                    precision={0.5}
                />
            </CardContent>

            <CardActions>
                <Button variant='contained' size='small' color='primary'>Выбрать</Button>
                <Button  size='small' color='primary'>Узнать больше</Button>

            </CardActions>
        </Card>

);
}

export default ProductCard;