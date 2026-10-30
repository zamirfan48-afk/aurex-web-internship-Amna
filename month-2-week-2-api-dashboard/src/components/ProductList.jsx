
import ProductCard from './ProductCard.jsx'

function ProductList({ products, onView }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onView={onView}
        />
      ))}
    </div>
  )
}

export default ProductList
