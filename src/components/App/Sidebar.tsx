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
    Container,
    CssBaseline,
    Toolbar,
    Typography,
} from '@material-ui/core';
import styled from '@emotion/styled';
import { appSelector, setIsSidebarOpen } from 'store/AppSlice';

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

const SideBarAppBar = styled(AppBar)({
    width: 298,
    left: 0,
    right: 'auto',
    padding: 0,
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
    const dispatch = useDispatch();
    const {
        isSideBarOpen,
        postalCode,
        marketSelected,
        marketCategories,
    } = useSelector(appSelector);
    const classes = useStyles();
    const [open, setOpen] = useState<boolean>(false);
    const [category__, setCategory] = useState<number>(0);

    return (
        <div>
            <Drawer
                open={isSideBarOpen}
                onClose={() => dispatch(setIsSidebarOpen(false))}
            >
                <CssBaseline />
                <SideBarAppBar>
                    <Toolbar>
                        <MidiAvatar
                            alt={marketSelected?.name}
                            src={marketSelected?.icon}
                        />
                        <Content>
                            <CustomTypography variant="h6">
                                {marketSelected?.name}
                            </CustomTypography>
                            <CustomTypography variant="caption">
                                Comprando en {postalCode}
                            </CustomTypography>
                        </Content>
                    </Toolbar>
                </SideBarAppBar>
                <Toolbar />
                <Container>
                    <div className={clsx(classes.list)} role="presentation">
                        <List>
                            {marketCategories?.categories.map(category => (
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
                                            {category.categories.map(
                                                subcategory => (
                                                    <ListItem
                                                        button
                                                        key={subcategory.id}
                                                    >
                                                        <CustomListItemIcon
                                                            button
                                                        >
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
                </Container>
            </Drawer>
        </div>
    );
};

export default SideBar;
