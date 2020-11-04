import styled from '@emotion/styled';
import { Avatar, CircularProgress, Grid, Typography } from '@material-ui/core';
import { Item } from 'models/main';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { appSelector } from 'store/AppSlice';

const Img = styled.img({
    maxHeight: 140,
    maxWidth: 140,
});

const CustomGrid = styled(Grid)({
    '&:hover': {
        boxShadow: '0 1px 8px #b5b5b5',
    },
    '&:active': {
        boxShadow: 'inset 0 0 12px #b5b5b5',
    },
});

// const MarketSelected = styled.div({
//     height: 150,
// });

const Container = styled.div({
    padding: 50,
});

const ProductList: FC = () => {
    const { data } = useSelector(appSelector);

    return data.products?.status === 'OK' ? (
        <Container>
            <Grid
                container
                alignItems="center"
                style={{ padding: '50px 0 30px' }}
            >
                <Avatar src={data.products.items[0].parent_category.icon} />
                <Typography
                    variant="h6"
                    style={{
                        width: '90%',
                        borderBottom: '1px solid #6ad76e',
                    }}
                >
                    {data.products.items[0].parent_category.name}
                </Typography>
            </Grid>
            <Grid container spacing={3}>
                {data?.products?.items.map((product: Item) => (
                    <CustomGrid
                        container
                        item
                        md={2}
                        xs={1}
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <Img alt={product.name} src={product.picture} />
                        <Typography color="textSecondary">
                            {product.name}
                        </Typography>
                        <Typography color="textSecondary">
                            {product.price}
                        </Typography>
                    </CustomGrid>
                ))}
            </Grid>
        </Container>
    ) : (
        <h2>
            <CircularProgress color="secondary" />
            Cargando
        </h2>
    );
};

export default ProductList;
