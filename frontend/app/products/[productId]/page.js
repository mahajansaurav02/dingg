"use client"
 import{ useEffect, useState } from 'react'
 import styles from './details.module.css'
const ProductDetailPage =  (context) => {
    const productId = context.params.productId;
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (productId) {
          // Fetch product details from the backend API
          fetch(`http://localhost:5000/getProduct/${productId}`)
            .then((response) => response.json())
            .then((data) => setProduct(data))
            .catch((error) => console.error('Error fetching product:', error));
        }
      }, [productId]);


  return (
    <div className={styles.productcontainer}>
    {product ? (
      <div>
        <img className={styles.productimage} src={product.productImage} alt={product.title} />
        <h1 className={styles.producttitle}>{product.title}</h1>
        <p className={styles.productdescription}>{product.description}</p>
        <p className={styles.productprice}>Rs {product.price}</p>
      </div>
    ) : (
      <p>Loading...</p>
    )}
  </div>

  );
};

// export async function getServerSideProps(context) {
// console.log(product)
//   return {
//     props: {
//       product,
//     },
//   };
// }

export default ProductDetailPage;
