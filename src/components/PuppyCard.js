import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import PetsIcon from '@mui/icons-material/Pets';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { addItemToCart, getCart, getPuppyById } from "../utils/API";
import { useState } from "react";
import { SettingsBackupRestoreRounded } from "@mui/icons-material";

const PuppyCard = ({ id, imgURL, name, age, size, price, breed, setFeaturedPuppy, setIsLoading, token, cartItems, setCartItems, inCart }) => {
    const convertedAge = Math.floor(age/12);
    const ageText = age <= 12 ? (age === 1 ? `${age} month` : `${age} months`) : (convertedAge === 1 ? `${convertedAge} year`: `${convertedAge} years`);

    const handleDetailsButtonClick = async (event) => {
        setIsLoading(true);
        const puppyId = Number(event.target.getAttribute('data-details'));
        const puppy = await getPuppyById(puppyId);
        setFeaturedPuppy(puppy);
        setIsLoading(false);                   
    }

    const handleAddToCartButtonClick = async (event) => {
        setIsLoading(true);
        const cartItemId = Number(event.target.getAttribute('data-cart'));
        if (token) {
            const cartItem = await addItemToCart(token, cartItemId);
            const userCart = await getCart(token);
            setCartItems(userCart.cartItems);
        } else {
            const guestCartItems = [ ...cartItems ]
            const cartItem = await getPuppyById(cartItemId);
            if (!guestCartItems.includes(cartItem)) {
                guestCartItems.push(cartItem);
            }
            const guestCartItemsString = JSON.stringify(guestCartItems)
            localStorage.setItem('cartItems', guestCartItemsString);
            setCartItems(guestCartItems);
        }
        setIsLoading(false);
    }

    return <Grid item xs={4}>
        <Paper elevation={6} sx={{ border: '1px solid black' }}>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', position: 'relative', top: 375, height: 0, margin: 0, padding: 0 }}>
                <Button
                    data-details={id}
                    variant="contained"
                    size="medium"
                    color="primary"
                    onClick={handleDetailsButtonClick}
                    sx={{ ml: 1 }}
                >
                    View Details
                </Button>
                <Button
                    data-cart={id}
                    variant="contained"
                    size="medium"
                    color="primary"
                    onClick={handleAddToCartButtonClick}
                    sx={{ mr: 1 }}
                    disabled={inCart}
                >
                    Add To Cart
                </Button>
            </CardActions>
            <img
                src={imgURL}
                alt=""
                className="img"
            />
            <Box paddingX={2}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'start',
                        pt: 1
                    }}
                    >
                        <PetsIcon />
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                alignItems: 'end'
                            }}
                        >
                            <Typography variant="h4" component="h2" sx={{ fontWeight: "bold" }}>
                                {name}
                            </Typography>
                        </Box>
                        <PetsIcon />
                </Box>
                        <Typography variant="h6" component="h2" sx={{ fontWeight: "bold", textAlign: 'center' }}>   
                            {breed}
                        </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'end'
                    }}
                    >
                    <Typography variant="h6" component="h2" sx={{ mt: 1, fontWeight: "bold", display: 'flex', justifyContent: 'center' }}>   
                        Age: {ageText}
                    </Typography>
                    <Typography variant="h6" component="h2" sx={{ ml: 2, mt: 1, fontWeight: "bold", display: 'flex', justifyContent: 'center' }}>   
                        Size: {size}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'end',
                        pb: 1
                    }}
                    >
                        <PetsIcon />
                        <Typography variant="h6" component="h2" sx={{ mt: 1, fontWeight: "bold", display: 'flex', justifyContent: 'center', pb: 1 }}>
                            Price: ${price}
                        </Typography>
                        <PetsIcon />
                </Box>
            </Box>      
        </Paper>
    </Grid>
}

export default PuppyCard;