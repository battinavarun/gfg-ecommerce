import React from "react";
import Product from "../Product/Product";
import Grid from '@mui/material/Grid';
import './ProductList.css';

const ProductList = (props) => {
    return (
        <div>
            <h1>Product List</h1>
            <Grid container spacing={2} >
            {
                props.products.map((product) => {
                    // Grid below represents a coloum
                    return <Grid key={product.id} size={{sm: 12,md: 6, lg:3}} > 
                    <Product
                        id={product.id}
                        key = {product.id}
                        title={product.title}
                        price={product.price}
                        image={product.image}
                        description={product.description}
                    />
                    </Grid>
                })
            }
            </Grid>
        </div>
    )
}

export default ProductList;