
import { useState } from 'react'

function ProductModal({
  mode,
  product,
  categories,
  loading,
  error,
  onClose,
  onEdit,
  onSave,
  onDelete,
}) {
  const [confirmingDelete, setConfirmingDelete] = useState(false)
  const [form, setForm] = useState(() => ({
    title: product?.title || '',
    description: product?.description || '',
    price: String(product?.price ?? ''),
    category: product?.category || categories[0] || '',
    thumbnail: product?.thumbnail || '',
  }))

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    onSave({
      title: form.title.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      category: form.category.trim(),
      thumbnail: form.thumbnail.trim() ||
        'https://dummyjson.com/image/400x300',
    })
  }

  const isForm = mode === 'add' || mode === 'edit'

  return (
    <div className="modal-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <section
        className="product-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          className="modal-close"
          type="button"
          onClick={onClose}
          disabled={loading}
          aria-label="Close dialog"
        >
          ×
        </button>

        {isForm ? (
          <>
            <p className="eyebrow">
              {mode === 'add' ? 'NEW ENTRY' : 'UPDATE ENTRY'}
            </p>
            <h2 id="modal-title">
              {mode === 'add' ? 'Add product' : 'Edit product'}
            </h2>

            <form className="product-form" onSubmit={handleSubmit}>
              <label>
                Product name
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  maxLength={100}
                />
              </label>

              <label>
                Description
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows="3"
                />
              </label>

              <label>
                Price
                <input
                  name="price"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Category
                <input
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  list="product-categories"
                />
                <datalist id="product-categories">
                  {categories.map((item) => (
                    <option value={item} key={item} />
                  ))}
                </datalist>
              </label>

              <label>
                Image URL (optional)
                <input
                  name="thumbnail"
                  type="url"
                  value={form.thumbnail}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
              </label>

              {error && <p className="modal-error" role="alert">{error}</p>}

              <button className="modal-primary" type="submit" disabled={loading}>
                {loading ? 'Saving…' : mode === 'add' ? 'Add product' : 'Save changes'}
              </button>
            </form>
          </>
        ) : (
          <>
            <p className="eyebrow">PRODUCT DETAILS</p>
            <h2 id="modal-title">{product.title}</h2>

            <img
              className="modal-product-image"
              src={product.thumbnail}
              alt={product.title}
            />

            <p className="modal-category">{product.category}</p>
            <p className="modal-description">{product.description}</p>

            <div className="modal-product-meta">
              <strong>${product.price.toFixed(2)}</strong>
              <span>★ {product.rating ?? 'Not rated'}</span>
              <span>{product.stock ?? '—'} in stock</span>
            </div>

            {error && <p className="modal-error" role="alert">{error}</p>}

            {confirmingDelete ? (
              <div className="delete-confirmation" role="group" aria-label="Confirm product deletion">
                <p>
                  Delete this product from the current list? DummyJSON does not
                  permanently save deletions.
                </p>
                <div className="modal-actions">
                  <button
                    className="modal-primary"
                    type="button"
                    onClick={() => setConfirmingDelete(false)}
                    disabled={loading}
                  >
                    Keep product
                  </button>
                  <button
                    className="modal-delete"
                    type="button"
                    onClick={onDelete}
                    disabled={loading}
                  >
                    {loading ? 'Deleting…' : 'Confirm delete'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="modal-actions">
                <button className="modal-primary" type="button" onClick={onEdit}>
                  Edit product
                </button>
                <button
                  className="modal-delete"
                  type="button"
                  onClick={() => setConfirmingDelete(true)}
                  disabled={loading}
                >
                  Delete product
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  )
}

export default ProductModal
