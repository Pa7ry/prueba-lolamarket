import React, { FC, useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useDispatch, useSelector } from 'react-redux';
import {
    AppBar,
    Avatar,
    Button,
    Collapse,
    Divider,
    Toolbar,
    Typography,
} from '@material-ui/core';
import styled from '@emotion/styled';
import {
    appSelector,
    getCategoryProducts,
    getProducts,
    setData,
} from 'store/AppSlice';
import { useHistory } from 'react-router-dom';
import { Check, ExpandLess } from '@material-ui/icons';
import routes from 'config/routes';

const CustomList = styled(List)({
    background: '#f5f5f5',
});

const CustomListItem = styled(ListItem)({
    '&:hover': {
        background: '#f5f5f5',
    },
    '&:active': {
        background: '#4fd0531a',
    },
});

const Content = styled.div({
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 12,
});

const CustomTypography = styled(Typography)({
    lineHeight: 1,
    paddingLeft: 10,
});

const SideBar: FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { data } = useSelector(appSelector);
    const [open, setOpen] = useState<boolean>(false);
    const [category__, setCategory] = useState<number>(0);
    const [subcategory__, setSubcategory] = useState<number>(0);

    const showProducts = (
        category_name: string,
        subcategory_name: string,
        subcategory_id: number
    ) => {
        if (subcategory_name) {
            dispatch(getProducts(subcategory_id));
            history.push(
                `/tienda/${data.marketSelected?.shortcut}/${category_name}/${subcategory_name}`
            );
        } else {
            dispatch(getCategoryProducts(category__));
            history.push(
                `/tienda/${data.marketSelected?.shortcut}/${category_name}`
            );
        }

        dispatch(
            setData({
                isSideBarOpen: false,
            })
        );
    };

    return (
        <>
            <Drawer
                open={data.isSideBarOpen}
                style={{ width: '21.7%' }}
                onClose={() =>
                    dispatch(
                        setData({
                            isSideBarOpen: false,
                        })
                    )
                }
            >
                <AppBar
                    position="sticky"
                    style={{
                        backgroundColor: `rgb(${data.marketSelected?.color})`,
                    }}
                >
                    <Toolbar>
                        <Avatar
                            style={{ width: '24px', height: '24px' }}
                            alt={data.marketSelected?.name}
                            src={data.marketSelected?.icon}
                        />
                        <Content>
                            <CustomTypography variant="h6">
                                {data.marketSelected?.name}
                            </CustomTypography>
                            <CustomTypography variant="caption">
                                Comprando en {data.postalCode}
                            </CustomTypography>
                        </Content>
                        <Button
                            onClick={() => {
                                dispatch(
                                    setData({
                                        isSideBarOpen: false,
                                    })
                                );
                                history.push(routes.marketList);
                            }}
                        >
                            Cambiar
                        </Button>
                    </Toolbar>
                </AppBar>
                <div role="presentation">
                    <List>
                        {data.marketCategories?.categories.map(category => (
                            <>
                                <CustomListItem
                                    disableRipple
                                    button
                                    key={category.id}
                                    onClick={() => {
                                        setOpen(!open);
                                        setCategory(
                                            category__ === category.id
                                                ? 0
                                                : category.id
                                        );
                                    }}
                                >
                                    <Avatar
                                        style={{
                                            width: '24px',
                                            height: '24px',
                                        }}
                                        alt={category.name}
                                        src={category.icon}
                                    />
                                    <ListItemText
                                        primary={category.name}
                                        style={{ padding: '0 7px' }}
                                    />
                                    {category.id === category__ && (
                                        <ExpandLess color="action" />
                                    )}
                                </CustomListItem>
                                <Divider variant="middle" />
                                <Collapse
                                    in={category.id === category__}
                                    timeout="auto"
                                    unmountOnExit
                                >
                                    <CustomList disablePadding>
                                        <ListItem
                                            button
                                            onClick={() => {
                                                showProducts(
                                                    category.shortcut,
                                                    '',
                                                    category.id
                                                );
                                                setSubcategory(category.id);
                                            }}
                                        >
                                            <ListItemText
                                                primary={'Ver toda la sección'}
                                            />
                                            {subcategory__ === category.id && (
                                                <Check color="action" />
                                            )}
                                        </ListItem>
                                        <Divider variant="middle" />
                                        {category.categories.map(
                                            subcategory => (
                                                <>
                                                    <ListItem
                                                        button
                                                        key={subcategory.id}
                                                        onClick={() => {
                                                            showProducts(
                                                                category.shortcut,
                                                                subcategory.shortcut,
                                                                subcategory.id
                                                            );
                                                            setSubcategory(
                                                                subcategory.id
                                                            );
                                                        }}
                                                    >
                                                        <Avatar
                                                            style={{
                                                                width: '24px',
                                                                height: '24px',
                                                            }}
                                                            alt={
                                                                subcategory.name
                                                            }
                                                            src={
                                                                subcategory.icon
                                                            }
                                                        />
                                                        <ListItemText
                                                            primary={
                                                                subcategory.name
                                                            }
                                                            style={{
                                                                padding:
                                                                    '0 7px',
                                                            }}
                                                        />
                                                        {subcategory.id ===
                                                            subcategory__ && (
                                                            <Check color="action" />
                                                        )}
                                                    </ListItem>
                                                    <Divider variant="middle" />
                                                </>
                                            )
                                        )}
                                    </CustomList>
                                </Collapse>
                            </>
                        ))}
                    </List>
                </div>
            </Drawer>
        </>
    );
};

export default SideBar;
