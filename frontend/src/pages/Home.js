import React, { useState, useEffect } from 'react';
import {Fragment} from 'react';
import ProductCard from '../components/ProductCard';
import { useSearchParams } from 'react-router-dom';

export default function Home() {

    const [products, setProducts] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(()=>{
        fetch(process.env.REACT_APP_API_URL+'/products?'+searchParams)
        .then(res => res.json())
        .then(res => setProducts(res.products))
    },[searchParams]);

    return (
        products.length?
        <Fragment>
            <h1 id="products_heading">Latest Products</h1>

            <section id="products" className="container mt-5">
            <div className="row">
            {products.map((product)=> <ProductCard product={product}/>)}
            </div>
            </section>
        </Fragment>:
        <Fragment>
            <img src='/images/no-product.png' height={400} width={500} />
        </Fragment>
    );
}