import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Grid,Container,Stack, Typography} from '@mui/material'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

const CardItemDetail = () => { 
    const [cards,setCards] = useState([]);
    const [isLoad,setisLoad] = useState(false)
    const [imgUrl,setImgUrl] = useState([])
    var gecici = [];
    useEffect(()=>{
        const id = window.location.pathname.replace('/','');
        
        axios({
            method: 'get',
            url: `https://gateway.marvel.com:443/v1/public/characters/${id}?&ts=1&apikey=ac706a482fbb17c49a107b2d16e2c67f&hash=7dcdd3b377863e1d90f45bc8e7421564`
        })
        .then((data)=>{
            data.data.data.results[0].comics.items.map((e,i)=>{
                axios({
                    method: 'get',
                    url: `${e.resourceURI}?&ts=1&apikey=ac706a482fbb17c49a107b2d16e2c67f&hash=7dcdd3b377863e1d90f45bc8e7421564`
                }).then((a)=>{
                    gecici.push(`${a.data.data.results[0].thumbnail.path}.jpg`)
                })
                console.log(i);
            })
            setCards(data.data.data.results); 
        })
        .then(()=>{
            setTimeout(function(){
                setImgUrl(gecici)
                setisLoad(true)
            }, 2000);
           
        })
        ;
    },[])

    if(isLoad){
        return (
            <Container spacing={2}>
                <Stack sx={{mt:1}}>
                    <Card>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                            <CardMedia  component="img"
                                    height="300"
                                    image= {`${cards[0].thumbnail.path}/portrait_xlarge.jpg`}/>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Typography variant="h3">
                                    {cards[0].name}
                                </Typography>
                                <Typography variant="captain">
                                    {cards[0].description}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Card>
                </Stack>
                <Grid container spacing={3} sx={{mt:1}}>
                    {console.log(imgUrl)}
                    {cards[0].comics.items.map((e,i)=>{
                        {if(i >= 10){
                            return
                        }}
                        return (
                            <Grid key={i} item xs={9} sm={3} sx={{margin:"auto"}}>
                                <CardMedia  component="img"
                                        height="300"
                                        image= {`${imgUrl[i]}`}
                                        />
                                {e.name}
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        )
    }
    else{
        return <div></div>
    }
   
}

export default CardItemDetail