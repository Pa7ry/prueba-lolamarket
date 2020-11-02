import React, { FC, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useDispatch, useSelector } from 'react-redux';
import {
    AppBar,
    Avatar,
    Collapse,
    CssBaseline,
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

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

const CustomAvatar = styled(Avatar)({
    height: 19.5,
    width: 19,
});

const CustomListItemIcon = styled(ListItem)({
    width: 33,
    padding: 0,
});

const CustomList = styled(List)({
    background: 'aliceblue',
    margin: '0 -24px',
    padding: '0 24px',
});

const MidiAvatar = styled(Avatar)({
    height: 24,
    width: 24,
    MarginRight: 12,
});

const Content = styled.div({
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 12,
});

const CustomTypography = styled(Typography)({
    lineHeight: 1,
});

const SideBar: FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { data } = useSelector(appSelector);
    const classes = useStyles();
    const [open, setOpen] = useState<boolean>(false);
    const [category__, setCategory] = useState<number>(0);

    const SideBarAppBar = styled(AppBar)({
        width: 298,
        left: 0,
        right: 'auto',
        padding: 0,
        backgroundColor: `rgb(${data.marketSelected?.color})`,
    });

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
                onClose={() =>
                    dispatch(
                        setData({
                            isSideBarOpen: false,
                        })
                    )
                }
            >
                <CssBaseline />
                <SideBarAppBar>
                    <Toolbar>
                        <MidiAvatar
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
                    </Toolbar>
                </SideBarAppBar>
                <Toolbar />
                <div className={clsx(classes.list)} role="presentation">
                    <List>
                        {data.marketCategories?.categories.map(category => (
                            <>
                                <ListItem
                                    button
                                    key={category.id}
                                    onClick={() => {
                                        setOpen(!open);
                                        setCategory(category.id);
                                    }}
                                >
                                    <CustomListItemIcon button>
                                        <CustomAvatar
                                            alt={category.name}
                                            src={category.icon}
                                        />
                                    </CustomListItemIcon>
                                    <ListItemText primary={category.name} />
                                </ListItem>
                                <Collapse
                                    in={
                                        open && category.id === category__
                                            ? true
                                            : false
                                    }
                                    timeout="auto"
                                    unmountOnExit
                                >
                                    <CustomList>
                                        <ListItem
                                            button
                                            onClick={() =>
                                                showProducts(
                                                    category.shortcut,
                                                    '',
                                                    category.id
                                                )
                                            }
                                        >
                                            <ListItemText
                                                primary={'Ver toda la sección'}
                                            />
                                        </ListItem>
                                        {category.categories.map(
                                            subcategory => (
                                                <ListItem
                                                    button
                                                    key={subcategory.id}
                                                    onClick={() =>
                                                        showProducts(
                                                            category.shortcut,
                                                            subcategory.shortcut,
                                                            subcategory.id
                                                        )
                                                    }
                                                >
                                                    <CustomListItemIcon button>
                                                        <CustomAvatar
                                                            alt={
                                                                subcategory.name
                                                            }
                                                            src={
                                                                subcategory.icon
                                                            }
                                                        />
                                                    </CustomListItemIcon>
                                                    <ListItemText
                                                        primary={
                                                            subcategory.name
                                                        }
                                                    />
                                                </ListItem>
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
