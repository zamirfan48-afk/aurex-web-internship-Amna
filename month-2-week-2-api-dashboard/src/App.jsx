
import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import SearchBar from './components/SearchBar.jsx'
import CategoryFilter from './components/CategoryFilter.jsx'
import ProductList from './components/ProductList.jsx'
import ProductModal from './components/ProductModal.jsx'
import './App.css'

const API_URL = 'https://dummyjson.com/products'
const DELETED_PRODUCTS_KEY = 'product-explorer-deleted-products'

function getDeletedProductIds() {
  try {
    const storedIds = window.localStorage.getItem(DELETED_PRODUCTS_KEY)
    if (!storedIds) return []

    const parsedIds = JSON.parse(storedIds)
    return Array.isArray(parsedIds)
      ? parsedIds.filter((id) => typeof id === 'number' || typeof id === 'string')
      : []
  } catch (err) {
    console.error('Unable to read locally deleted products.', err)
    return []
  }
}

function App() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionError, setActionError] = useState('')
  const [notice, setNotice] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [modalMode, setModalMode] = useState('view')
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchProducts() {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(`${API_URL}?limit=100`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Unable to load products. Please try again.')
        }

        const data = await response.json()
        const deletedIds = getDeletedProductIds()
        setProducts(data.products.filter((product) => !deletedIds.includes(product.id)))
        setCategories([
          ...new Set(data.products.map((product) => product.category)),
        ].sort())
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Something went wrong.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchProducts()
    return () => controller.abort()
  }, [])

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase()

    return products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)

      const matchesCategory =
        category === 'all' || product.category === category

      return matchesSearch && matchesCategory
    })
  }, [products, search, category])

  function openAddModal() {
    setSelectedProduct(null)
    setModalMode('add')
    setActionError('')
    setNotice('')
  }

  function openProduct(product) {
    setSelectedProduct(product)
    setModalMode('view')
    setActionError('')
    setNotice('')
  }

  function openEditModal(product) {
    setSelectedProduct(product)
    setModalMode('edit')
    setActionError('')
  }

  function closeModal() {
    if (actionLoading) return
    setSelectedProduct(null)
    setModalMode('view')
    setActionError('')
  }

  async function saveProduct(productDetails) {
    try {
      setActionLoading(true)
      setActionError('')

      const isEditing = modalMode === 'edit'
      const url = isEditing
        ? `${API_URL}/${selectedProduct.id}`
        : `${API_URL}/add`

      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productDetails),
      })

      if (!response.ok) {
        throw new Error('Unable to save the product. Please try again.')
      }

      const result = await response.json()

      if (isEditing) {
        setProducts((current) =>
          current.map((product) =>
            product.id === selectedProduct.id
              ? { ...product, ...productDetails, ...result }
              : product,
          ),
        )
      } else {
        setProducts((current) => [
          { ...productDetails, ...result },
          ...current,
        ])
      }

      setSelectedProduct(null)
      setActionError('')
    } catch (err) {
      setActionError(err.message || 'Something went wrong.')
    } finally {
      setActionLoading(false)
    }
  }

  async function deleteProduct(product) {
    if (!product) return

    try {
      setActionLoading(true)
      setActionError('')

      const response = await fetch(`${API_URL}/${product.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Unable to delete the product. Please try again.')
      }

      const deletedIds = getDeletedProductIds()
      const updatedDeletedIds = [...new Set([...deletedIds, product.id])]
      let savedForThisBrowser = true

      try {
        window.localStorage.setItem(
          DELETED_PRODUCTS_KEY,
          JSON.stringify(updatedDeletedIds),
        )
      } catch (storageError) {
        savedForThisBrowser = false
        console.error('Unable to save the deleted product in this browser.', storageError)
      }

      setProducts((current) =>
        current.filter((item) => item.id !== product.id),
      )
      setSelectedProduct(null)
      setNotice(
        savedForThisBrowser
          ? 'Product deleted from this browser. DummyJSON does not persist the server-side change.'
          : 'Product removed from the current list, but browser storage failed, so it may return after reloading.',
      )
    } catch (err) {
      setActionError(err.message || 'Something went wrong.')
    } finally {
      setActionLoading(false)
    }
  }

  function restoreOriginalProducts() {
    try {
      window.localStorage.removeItem(DELETED_PRODUCTS_KEY)
      window.location.reload()
    } catch (err) {
      console.error('Unable to restore the original product list.', err)
      setNotice('Unable to clear locally deleted products from browser storage.')
    }
  }

  return (
    <div className="app-shell">
      <Header />

      <main className="dashboard">
        <section className="intro">
          <p className="eyebrow">DISCOVER · EXPLORE · COMPARE</p>
          <h1>Product Explorer</h1>
          <p className="intro-copy">
            Explore products, discover categories, and find what you need.
          </p>
        </section>

        <section className="toolbar" aria-label="Product search and filters">
          <SearchBar value={search} onChange={setSearch} />
          <CategoryFilter
            categories={categories}
            value={category}
            onChange={setCategory}
          />
        </section>

        <div className="results-heading">
          <h2>Products</h2>
          <button className="add-product-button" type="button" onClick={openAddModal}>
            + Add product
          </button>
          {!loading && !error && (
            <span>{filteredProducts.length} results</span>
          )}
        </div>

        {notice && (
          <div className="operation-notice" role="status">
            <span>{notice}</span>
            <button type="button" onClick={restoreOriginalProducts}>
              Restore original list
            </button>
          </div>
        )}

        {loading ? (
          <p className="status-message" role="status">Loading products…</p>
        ) : error ? (
          <div className="error-state" role="alert">
            <p>{error}</p>
            <button type="button" onClick={() => window.location.reload()}>
              Try again
            </button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <p className="status-message">No products match your search.</p>
        ) : (
          <ProductList products={filteredProducts} onView={openProduct} />
        )}
      </main>

      <footer className="footer">
        PRODUCT EXPLORER <span>·</span> POWERED BY DUMMYJSON
      </footer>

      {modalMode !== 'view' || selectedProduct ? (
        <ProductModal
          key={`${modalMode}-${selectedProduct?.id ?? 'new'}`}
          mode={modalMode}
          product={selectedProduct}
          categories={categories}
          loading={actionLoading}
          error={actionError}
          onClose={closeModal}
          onEdit={() => openEditModal(selectedProduct)}
          onSave={saveProduct}
          onDelete={() => deleteProduct(selectedProduct)}
        />
      ) : null}
    </div>
  )
}

export default App
