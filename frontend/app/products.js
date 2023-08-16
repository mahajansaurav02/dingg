import { useState, useEffect } from 'react';
import Login from './login';
import './style.css'

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('http://localhost:5000/getProducts');
        console.log(response)
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setProducts(data);
          console.log(products)
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
     
      <h1>Products</h1>
      <div className='item'>  <ul >
        {products.data.map((product) => (
          <li key={product.id}>
            <img style={{width:200, height:150} } src={product.productImage} alt={product.title} />
           <h4>{product.title}   </h4>
            
            
            <h6>Rs-{product.price}</h6>
            
          </li>
        ))}
      </ul></div>
    
      
      
      
    </div>
  );
}
