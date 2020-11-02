import styled from '@emotion/styled';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import { Category3, Item2 } from 'models/main';
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

const Container = styled.div({
    padding: 50,
});

const CategoryProductsList: FC = () => {
    const { data } = useSelector(appSelector);

    return data.categoryProducts?.status === 'OK' ? (
        <Container>
            {data?.categoryProducts?.categories.map((category: Category3) => (
                <>
                    <Typography variant="h6">{category.name}</Typography>
                    <Grid container spacing={3}>
                        {category?.items.map((item: Item2) => (
                            <CustomGrid
                                container
                                item
                                md={2}
                                xs={1}
                                direction="column"
                                justify="center"
                                alignItems="center"
                            >
                                <Img alt={item.name} src={item.picture} />
                                <Typography color="textSecondary">
                                    {item.name}
                                </Typography>
                                <Typography color="textSecondary">
                                    {item.price}
                                </Typography>
                            </CustomGrid>
                        ))}
                    </Grid>
                    ;
                </>
            ))}
        </Container>
    ) : (
        <h2>
            <CircularProgress color="secondary" />
            Cargando
        </h2>
    );
};

export default CategoryProductsList;
