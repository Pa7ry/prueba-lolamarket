import styled from '@emotion/styled';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
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

const MarketSelected = styled.div({
    height: 150,
});

const Container = styled.div({
    padding: 50,
});

const ProductList: FC = () => {
    const { data } = useSelector(appSelector);

    return data.products?.status === 'OK' ? (
        <Container>
            <MarketSelected>
                <img
                    alt={data.marketSelected?.name}
                    src={data.marketSelected?.logotype}
                />
                <Typography variant="h4">
                    {data.marketSelected?.description}
                </Typography>
            </MarketSelected>
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
