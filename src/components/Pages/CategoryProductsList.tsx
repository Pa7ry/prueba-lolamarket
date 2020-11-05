import styled from '@emotion/styled';
import {
    Avatar,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    CircularProgress,
    Grid,
    Typography,
} from '@material-ui/core';
import { Category_C, Item2 } from 'models/main';
import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { appSelector } from 'store/AppSlice';

const CustomCard = styled(Card)({
    width: '100%',
    padding: 15,
});

const Container = styled.div({
    padding: '50px',
});

const CategoryProductsList: FC = () => {
    // type ProductsLocation = {  }
    const location = useLocation<any>();
    const { data } = useSelector(appSelector);

    useEffect(() => {
        console.log(location.state);
    }, [location]);

    const prodcutView = (category: any, items: Item2[]) => {
        return (
            <>
                <Grid
                    container
                    alignItems="center"
                    style={{ padding: '50px 0 30px' }}
                >
                    <Avatar src={category.icon} />
                    <Typography
                        variant="h6"
                        style={{
                            width: '95%',
                            borderBottom: '1px solid #6ad76e',
                        }}
                    >
                        {category.name}
                    </Typography>
                </Grid>
                <Grid container spacing={3} style={{ padding: '0 50px' }}>
                    {items.map((item: Item2) => (
                        <Grid
                            container
                            item
                            md={2}
                            sm={6}
                            xs={12}
                            direction="column"
                            alignItems="center"
                        >
                            <CustomCard>
                                <CardActionArea>
                                    <CardMedia
                                        style={{
                                            height: '140px',
                                            backgroundSize: 'contain',
                                        }}
                                        title={item.name}
                                        image={item.picture}
                                    />
                                    <CardContent style={{ paddingTop: '30px' }}>
                                        <Typography align="right">
                                            {item.price} €
                                        </Typography>
                                        <div>
                                            <Typography align="left">
                                                {item.name}
                                            </Typography>
                                        </div>
                                    </CardContent>
                                </CardActionArea>
                            </CustomCard>
                        </Grid>
                    ))}
                </Grid>
            </>
        );
    };

    return data.categoryProducts?.status === 'OK' ? (
        <Container>
            {location.state.categories
                ? data?.categoryProducts?.categories.map(
                      (category: Category_C) =>
                          prodcutView(category, category.items)
                  )
                : prodcutView(
                      location.state.items[0].parent_category,
                      location.state.items
                  )}
        </Container>
    ) : (
        <h2>
            <CircularProgress color="secondary" />
            Cargando
        </h2>
    );
};

export default CategoryProductsList;
