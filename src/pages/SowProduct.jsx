import React, { useEffect, useState } from "react";
import { useParams } from "react-router"; 
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from '@mui/material/Rating';
import './ShowProduct.css';


const ShowProduct = () => {
  const { productId } = useParams();
 const [product, setProduct] = useState({
  title: "",
  image: "",
  price: "",
  description: "",
});


  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [productId]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <Card sx={{ mt: 15, maxWidth: 345, mx: "auto" }}>
      <CardMedia
        sx={{ height: 200 }}
        image={product.image}
        title={product.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          $ {product.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        {/* <Rating readOnly name="size-small" defaultValue={product.rating.rate} size="small" /> */}
        <Rating
  readOnly
  name="size-small"
  value={Number(product.rating?.rate) || 0}
  size="small"
/>

      </CardContent>
    </Card>
  );
};

export default ShowProduct;
