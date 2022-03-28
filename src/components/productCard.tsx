import { navigate } from "gatsby";
import React from "react";
import styled from "styled-components";
import { Product } from "../@types/product";
import { ThemeContextType, Theme } from "../@types/theme";
import { ThemeContext } from "../contexts/themeContext";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from '@mui/material/Button';
import {  } from '@mui/material/colors';

interface Props {
  item: Product;
}

const PriceText = styled.div`
  color: green;
  font-weight: bold;
  font-size: 1.3rem;
  width: 100%;
  text-align: center;
  margin: 0.1rem;
  padding: 0;
`;

export const ProductCard = ({ item }: Props) => {
  const { theme, changeTheme } = React.useContext(
    ThemeContext
  ) as ThemeContextType;

  return (
    <>
      <Card sx={{minWidth: 200}}>
        <CardHeader
          title={item.name}
          sx={{fontSize: '0.4rem'}}
          // subheader="September 14, 2016"
        />
        {item.images.length > 0 ? (
          <CardMedia component="img" sx={{minHeight: 250, width: 'auto'}} image={item.images[0].src} />
        ) : (
          <span>no image</span>
        )}
        <CardContent>
          {/* Using price * 1 to remove the trailing zeros from the number returned from wordpress */}
          <PriceText>${item.price * 1}</PriceText>
        </CardContent>
        <CardActions disableSpacing>
          <Button size="small" variant="text" onClick={() => navigate("/wcProducts/" + item.slug)}>
            View Item
          </Button>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};
