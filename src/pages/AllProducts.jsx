import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import axios from "axios";
import ProductList from "../components/ProductList/ProductList";
import "./AllProducts.css";

const AllProducts = () => {

    const [count,setCount] = useState(0);
    const [products,setProducts] = useState([]);

    useEffect(() => {
        //console.log("inside useEffect with no dependence array");
        
    });

    useEffect(() => {
       axios.get('https://fakestoreapi.com/products')
       .then((res)=>{
        setProducts(()=>res.data);
    })
    .catch((err)=>{
        console.log(err);
        
    })
    },[]);

    useEffect(() => {
        //console.log("inside useEffect with count as the dependence array");
        
    },[count]);


    return (
        <div>
            {/* <button onClick={()  => setCount(count+1)}>Increment</button>
            <h2>Count : {count}</h2> */}
            <h1> ALL Products Page</h1>
            <ProductList products={products} />
        </div>
    )
}

export default AllProducts;