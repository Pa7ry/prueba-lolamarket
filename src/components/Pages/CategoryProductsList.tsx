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
import { Category, Item, Category_C, Item2 } from 'models/main';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setData } from 'store/AppSlice';

const Container = styled.div({
    padding: '50px',
});

const CategoryGrid = styled(Grid)({
    padding: '50px 0 30px',
});

const CategoryTypography = styled(Typography)({
    width: '95%',
    borderBottom: '1px solid #6ad76e',
});

const ProductsGrid = styled(Grid)({
    padding: '0 50px',
});

const CustomCard = styled(Card)({
    width: '100%',
    padding: 15,
});

const CustomCardMedia = styled(CardMedia)({
    height: 140,
    backgroundSize: 'contain',
});

const CustomCardContent = styled(CardContent)({
    paddingTop: 30,
});

const ProgressGrid = styled(Grid)({
    height: '80vh',
});

const CategoryProductsList: FC = () => {
    const location = useLocation<any>();
    const dispatch = useDispatch();

    const showDetails = (data: string) => {
        dispatch(
            setData({
                isDialogOpen: {
                    show: true,
                    dialogMsg: data,
                    dialogTitle: 'PRODUCTO',
                },
            })
        );
    };

    const prodcutView = (category: Category_C | Category, items: any) => {
        return (
            <>
                <CategoryGrid container alignItems="center">
                    <Avatar src={category.icon} />
                    <CategoryTypography variant="h6">
                        {category.name}
                    </CategoryTypography>
                </CategoryGrid>
                <ProductsGrid container spacing={3}>
                    {items.map((item: Item2 | Item) => (
                        <Grid
                            container
                            item
                            lg={2}
                            md={3}
                            sm={6}
                            xs={12}
                            direction="column"
                            alignItems="center"
                        >
                            <CustomCard
                                onClick={() => showDetails(item.description)}
                            >
                                <CardActionArea>
                                    <CustomCardMedia
                                        title={item.name}
                                        image={item.picture}
                                    />
                                    <CustomCardContent>
                                        <Typography align="right">
                                            {item.price} €
                                        </Typography>
                                        <div>
                                            <Typography align="left">
                                                {item.name}
                                            </Typography>
                                        </div>
                                    </CustomCardContent>
                                </CardActionArea>
                            </CustomCard>
                        </Grid>
                    ))}
                </ProductsGrid>
            </>
        );
    };

    return location.state ? (
        <Container>
            {location.state.categories
                ? location.state.categories.map((category: Category_C) =>
                      prodcutView(category, category.items)
                  )
                : prodcutView(
                      location.state.items[0].category,
                      location.state.items
                  )}
        </Container>
    ) : (
        <ProgressGrid container justify="center" alignContent="center">
            <Typography align="center" variant="h4">
                <CircularProgress color="secondary" />
                Cargando...
            </Typography>
        </ProgressGrid>
    );
};

export default CategoryProductsList;
