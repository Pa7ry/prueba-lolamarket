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
import { Category3, Item2 } from 'models/main';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { appSelector } from 'store/AppSlice';

const CustomCard = styled(Card)({
    width: '100%',
    padding: 15,
});

const Container = styled.div({
    padding: '50px',
});

const CategoryProductsList: FC = () => {
    const { data } = useSelector(appSelector);

    return data.categoryProducts?.status === 'OK' ? (
        <Container>
            {data?.categoryProducts?.categories.map((category: Category3) => (
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
                        {category?.items.map((item: Item2) => (
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
                                        <CardContent
                                            style={{ paddingTop: '30px' }}
                                        >
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
