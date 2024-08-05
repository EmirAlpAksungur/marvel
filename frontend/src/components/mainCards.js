import axios from 'axios';
import { Grid, Container, CircularProgress } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Skeleton from '@mui/material/Skeleton';
import MainCardItem from './mainCardsItem'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InfinitScroll from 'react-infinite-scroll-component';

const MainCards = () => {
    const [cards, setCards] = useState([]);
    const [isLoad, setisLoad] = useState(false)
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    useEffect(() => {
        try {

            axios({
                method: 'get',
                url: 'https://gateway.marvel.com:443/v1/public/characters?limit=30&ts=1&apikey=ac706a482fbb17c49a107b2d16e2c67f&hash=7dcdd3b377863e1d90f45bc8e7421564'
            })
                .then((data) => {
                    console.log(data);

                    setCards([data.data.data.results]);
                    setisLoad(true);
                });
        } catch (err) {
            console.log(err);

        }
    }, [])
    const aaa = () => {
        console.log("...loading");

        axios({
            method: 'get',
            url: `https://gateway.marvel.com:443/v1/public/characters?limit=30&offset=${cards[0].length}&ts=1&apikey=ac706a482fbb17c49a107b2d16e2c67f&hash=7dcdd3b377863e1d90f45bc8e7421564`
        })
            .then((data) => {
                cards[0].push(...data.data.data.results)
                setCards([...cards]);
            });

    }
    if (isLoad) {
        return (
            <InfinitScroll dataLength={cards[0].length} next={aaa} hasMore={true} loader={<Grid container justifyContent={"center"} alignItems={"center"} sx={{ height: "80px" }}><CircularProgress /></Grid>} >
                <Container spacing={2}>
                    <Grid container spacing={4}>
                        <MainCardItem cards={cards} />
                    </Grid>
                </Container>
            </InfinitScroll>

        )
    }
    else {
        return (
            <Container spacing={2}>
                <Grid container spacing={4}>
                    {[...Array(30)].map((e, i) => (
                        <Grid key={i} item xs={4}>
                            <Item>
                                <Skeleton variant="rectangular" width={345} height={200} />
                                <Box sx={{ pt: 0.5 }} display="flex" justifyContent="center" alignItems="center">
                                    <Skeleton width="40%" height={30} />
                                </Box>
                            </Item>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        )
    }





}

export default MainCards