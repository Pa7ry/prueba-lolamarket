import styled from '@emotion/styled';
import {
    Card,
    CardContent,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    Typography,
} from '@material-ui/core';
import { Check, Edit } from '@material-ui/icons';
import fetcher from 'config/fetcher';
import {
    CategoriesResponse,
    PostalCodeResponse,
    SessionToken,
} from 'models/main';
import React, { FC, useEffect, useState } from 'react';

const ImgContainer = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
});

const Content = styled.div({
    display: 'flex',
    flexFlow: 'row wrap',
    padding: 30,
});

const CustomCard = styled(Card)({
    width: 150,
    minHeight: 150,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    margin: '0 10px 10px 0',
    '&:hover': {
        boxShadow: '0 1px 8px #b5b5b5',
    },
    '&:active': {
        boxShadow: 'inset 0 0 12px #b5b5b5',
    },
});

const PostalCode = styled.div({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
});

const SelectShop: FC = () => {
    const [shops, setShops] = useState<PostalCodeResponse | undefined>(
        undefined
    );

    const [token, setToken] = useState<string>('');

    const [disabled, setDisabled] = useState<boolean>(true);

    const [postalCode, setPostalCode] = useState<string>('28028');

    useEffect(() => {
        fetcher<SessionToken>('/user/session').then((res: SessionToken) => {
            setToken(res.token);
            getMarkets(postalCode, res.token);
        });
    }, []);

    const getMarkets = (zip: string, token_?: string) => {
        setPostalCode(zip);
        fetcher<PostalCodeResponse>('/user/postalcode', {
            token: token_ ? token_ : token,
            postalcode: Number(zip),
        }).then((res: PostalCodeResponse) => setShops(res));
    };

    const getMarketCategories = (id: number) => {
        fetcher<CategoriesResponse>('/company/categories', {
            token: token,
            company_id: id,
        }).then((res: CategoriesResponse) => console.log(res));
    };

    return (
        <Content>
            <PostalCode>
                <InputLabel htmlFor="postal-code">Código postal</InputLabel>
                <Input
                    id="postal-code"
                    defaultValue={postalCode}
                    disabled={disabled}
                    onChange={event =>
                        event.target.value.length === 5 &&
                        getMarkets(event.target.value)
                    }
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle edit postal code"
                                onClick={() => setDisabled(!disabled)}
                            >
                                {disabled ? <Edit /> : <Check />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </PostalCode>
            {shops?.services.map(services =>
                services.markets.map(market => (
                    <CustomCard
                        key={market.id}
                        onClick={() => getMarketCategories(market.id)}
                    >
                        <ImgContainer>
                            <img src={market.logotype} />
                        </ImgContainer>
                        <CardContent>
                            <Typography color="textSecondary">
                                {services.delivery}
                            </Typography>
                        </CardContent>
                    </CustomCard>
                ))
            )}
        </Content>
    );
};

export default SelectShop;
