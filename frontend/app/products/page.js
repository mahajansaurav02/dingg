"use client"

import { useState, useEffect } from 'react';
import router from 'next/router'
import Link from 'next/link';
import './style.css'

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('http://localhost:5000/getProducts');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    }


    fetchProducts();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="card-container">

      <h1>Featured Products</h1>
      <div className='item'>  <ul >
        {products.data.map((product) => (
          <li key={product._id}>
            <Link href={`/products/${product._id}`}>
              <img style={{ width: 200, height: 150 }} src={product.productImage} alt={product.title} />
              <h4>{product.title}   </h4>

              <h6>Rs-{product.price}</h6>
            </Link>

          </li>
        ))}
      </ul></div>




    </div>
  );
}
