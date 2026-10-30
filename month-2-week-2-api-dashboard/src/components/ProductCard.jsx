
function ProductCard({ product, onView }) {
  return (
    <article className="product-card">
      <div className="product-image">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
        />
        <span className="product-category">
          {product.category.replaceAll('-', ' ')}
        </span>
      </div>

      <div className="product-info">
        <div className="product-rating">
          <span aria-hidden="true">★</span> {product.rating ?? 'N/A'}
          <span className="stock">
            {product.stock ?? '—'} in stock
          </span>
        </div>

        <h3>{product.title}</h3>
        <p>{product.description}</p>

        <div className="product-bottom">
          <strong>${Number(product.price).toFixed(2)}</strong>
          <span className="product-id">ID {product.id}</span>
        </div>

        <button
          className="view-button"
          type="button"
          onClick={() => onView(product)}
        >
          View details
        </button>
      </div>
    </article>
  )
}

export default ProductCard
