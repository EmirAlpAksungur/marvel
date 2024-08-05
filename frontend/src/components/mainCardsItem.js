import React from 'react'
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid, Link } from '@mui/material';
const mainCardsItem = (cards) => {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
    return(
        cards.cards[0].map((e)=>(
            <Grid key={e.id} item xs={8} sm={6} md={4} sx={{margin:"auto"}}>
                <Link href={`/${e.id}`}>
                    <Item>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardActionArea>
                            <CardMedia
                                component="img"
                                height="200"
                                image= {`${e.thumbnail.path}/portrait_xlarge.jpg`}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                {e.name}
                                </Typography>
                            </CardContent>
                            </CardActionArea>
                        </Card>
                    </Item>
                </Link>
            </Grid>
        ))
    )
}
    


export default mainCardsItem