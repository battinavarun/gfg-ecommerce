import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import { keyframes } from "@mui/system";

const ShowProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({
    title: "",
    image: "",
    price: "",
    description: "",
    category: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [productId]);

  const fadeIn = keyframes`
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: 4,
        backgroundColor: "#f7f7f7",
        minHeight: "100vh",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 800,
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          animation: `${fadeIn} 0.6s ease-out`,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#fff",
            width: { xs: "100%", md: "50%" },
            position: "relative",
            p: 4,
          }}
        >
          <CardMedia
            component="img"
            image={product.image}
            alt={product.title}
            sx={{
              maxHeight: 300,
              objectFit: "contain",
              width: "auto",
              maxWidth: "100%",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />
          <IconButton
            aria-label="add to favorites"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: "rgba(255,255,255,0.9)",
              "&:hover": { bgcolor: "rgba(255,255,255,1)" },
            }}
          >
            <FavoriteBorderIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardContent sx={{ flex: "1 0 auto", p: 4 }}>
            <Chip
              label={product.category}
              size="small"
              sx={{
                bgcolor: "#e0f2f1",
                color: "#00796b",
                fontWeight: 500,
                mb: 2,
              }}
            />
            
            <Typography
              variant="h5"
              component="h1"
              sx={{
                fontWeight: "bold",
                mb: 1,
                lineHeight: 1.2,
              }}
            >
              {product.title}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Rating
                readOnly
                name="product-rating"
                value={Number(product.rating?.rate) || 0}
                precision={0.5}
                sx={{ mr: 1 }}
              />
              <Typography variant="body2" color="text.secondary">
                ({product.rating?.count || 0} reviews)
              </Typography>
            </Box>

            <Typography
              variant="h4"
              component="div"
              sx={{
                fontWeight: "bold",
                color: "#0a5e55",
                my: 2,
              }}
            >
              ${Number(product.price).toFixed(2)}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mb: 3,
                lineHeight: 1.6,
                maxHeight: 200,
                overflow: "auto",
              }}
            >
              {product.description}
            </Typography>

            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Button
                variant="contained"
                startIcon={<ShoppingCartIcon />}
                sx={{
                  bgcolor: "#0a5e55",
                  py: 1.5,
                  px: 4,
                  fontWeight: "bold",
                  "&:hover": {
                    bgcolor: "#084c44",
                  },
                }}
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                sx={{
                  color: "#0a5e55",
                  borderColor: "#0a5e55",
                  "&:hover": {
                    borderColor: "#084c44",
                    bgcolor: "rgba(10, 94, 85, 0.04)",
                  },
                }}
              >
                Buy Now
              </Button>
            </Box>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default ShowProduct;