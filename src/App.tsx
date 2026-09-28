import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Heart,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  addToCart,
  removeFromCart,
  setCategory,
  setQuantity,
  setSearch,
  setSort,
  toggleWishlist,
} from "./features/shop/shopSlice";
import { categories, products, type Product } from "./data/products";

const money = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

function App() {
  const [notice, setNotice] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const search = useAppSelector((state) => state.shop.search);
  const dispatch = useAppDispatch();
  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);
  useEffect(() => {
    const focusSearch = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (
        window.matchMedia("(min-width: 761px)").matches &&
        event.key === "/" &&
        !["INPUT", "TEXTAREA"].includes(target.tagName) &&
        !target.isContentEditable
      ) {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);

  return (
    <div className="site-shell">
      <div className="announcement">
        <Sparkles size={13} /> Considered essentials. Free shipping on orders
        over $120.{" "}
        <Link to="/">
          Explore the edit <ArrowRight size={13} />
        </Link>
      </div>
      <header className="header">
        <button
          className="icon-button mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        <Link className="wordmark" to="/" aria-label="Gate of Purchase home">
          <span className="wordmark-gate">
            GATE<span className="wordmark-dot">.</span>
          </span>
          <span className="wordmark-sub">OF PURCHASE</span>
        </Link>
        <nav
          className={`main-nav ${menuOpen ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            Shop all
          </NavLink>
          <a href="/#new-arrivals" onClick={() => setMenuOpen(false)}>
            New arrivals
          </a>
          <a href="/#our-story" onClick={() => setMenuOpen(false)}>
            Our story
          </a>
        </nav>
        <form
          className="header-search"
          onSubmit={(event) => {
            event.preventDefault();
            navigate("/");
            document
              .getElementById("new-arrivals")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <Search size={17} aria-hidden="true" />
          <input
            ref={searchRef}
            value={search}
            onChange={(event) => dispatch(setSearch(event.target.value))}
            placeholder="Search the edit"
            aria-label="Search products"
          />
          <kbd>/</kbd>
        </form>
        <div className="header-actions">
          <Link
            className="icon-button wishlist-shortcut"
            to="/wishlist"
            aria-label="Wishlist"
          >
            <Heart size={19} />
            <span className="action-label">Saved</span>
          </Link>
          <Link
            className="icon-button bag-shortcut"
            to="/cart"
            aria-label="Shopping bag"
          >
            <ShoppingBag size={19} />
            <span className="bag-count">
              {useAppSelector((state) =>
                state.shop.cart.reduce(
                  (total, item) => total + item.quantity,
                  0,
                ),
              )}
            </span>
          </Link>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage notify={showNotice} />} />
          <Route
            path="/products/:slug"
            element={<ProductPage notify={showNotice} />}
          />
          <Route path="/wishlist" element={<SavedPage notify={showNotice} />} />
          <Route path="/cart" element={<CartPage notify={showNotice} />} />
          <Route
            path="*"
            element={
              <EmptyState
                eyebrow="404 — Wrong turn"
                title="This page has left the building."
                action="Back to the shop"
                to="/"
              />
            }
          />
        </Routes>
      </main>
      <Footer notify={showNotice} />
      {notice && (
        <div className="toast" role="status">
          <span className="toast-check">
            <Check size={14} />
          </span>
          {notice}
        </div>
      )}
    </div>
  );
}

function HomePage({ notify }: { notify: (message: string) => void }) {
  const dispatch = useAppDispatch();
  const { category, search, sort } = useAppSelector((state) => state.shop);
  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const categoryMatch =
        category === "All pieces" || product.category === category;
      const searchMatch = `${product.name} ${product.category} ${product.color}`
        .toLowerCase()
        .includes(search.toLowerCase());
      return categoryMatch && searchMatch;
    });
    if (sort === "price-low") filtered.sort((a, b) => a.price - b.price);
    if (sort === "price-high") filtered.sort((a, b) => b.price - a.price);
    return filtered;
  }, [category, search, sort]);

  return (
    <>
      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-line" />
            THE EVERYDAY EDIT — 01
          </div>
          <h1>
            Objects
            <br />
            in <em>motion.</em>
          </h1>
          <p>
            Good things earn their place. Meet the considered layers and
            everyday essentials made to go wherever the day takes you.
          </p>
          <a className="button button-dark" href="#new-arrivals">
            Shop the collection <ArrowRight size={17} />
          </a>
          <div className="hero-foot">
            <span>
              <strong>01 / 04</strong> &nbsp; A little less, a lot better.
            </span>
            <ArrowDown size={16} />
          </div>
        </div>
        <div className="hero-visual">
          <img
            src={products[0].image}
            alt="Model wearing the Studio overshirt"
          />
          <div className="hero-photo-label">
            <span className="label-kicker">THE NEW UNIFORM</span>
            <span>
              Made for real life<span className="accent-dot">.</span>
            </span>
          </div>
          <div className="hero-stamp">
            <span>GOP</span>
            <span>EST.</span>
            <span>2024</span>
          </div>
        </div>
        <div className="hero-note">
          DESIGNED WITH INTENTION <span>✳</span> WORN ON REPEAT
        </div>
      </section>

      <section className="value-strip" aria-label="Store benefits">
        <div>
          <span className="value-index">01</span>
          <span>Made to last, made to live in</span>
        </div>
        <div>
          <span className="value-index">02</span>
          <span>Free shipping over $120</span>
        </div>
        <div>
          <span className="value-index">03</span>
          <span>30-day easy returns</span>
        </div>
        <div>
          <span className="value-index">04</span>
          <span>Thoughtful by design</span>
        </div>
      </section>

      <section className="catalog-section section-wrap" id="new-arrivals">
        <div className="section-heading">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-line" />
              THE GOOD STUFF
            </div>
            <h2>
              Current <em>favourites.</em>
            </h2>
          </div>
          <Link className="text-link desktop-all" to="/">
            View all pieces <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="catalog-toolbar">
          <div
            className="category-tabs"
            role="group"
            aria-label="Filter by category"
          >
            {categories.map((item) => (
              <button
                key={item}
                className={
                  category === item ? "category-tab active" : "category-tab"
                }
                onClick={() => dispatch(setCategory(item))}
              >
                {item}
                <span>
                  {item === "All pieces"
                    ? products.length
                    : products.filter((product) => product.category === item)
                        .length}
                </span>
              </button>
            ))}
          </div>
          <label className="sort-select">
            <SlidersHorizontal size={15} />
            <span className="sort-label">Sort</span>
            <select
              aria-label="Sort products"
              value={sort}
              onChange={(event) =>
                dispatch(
                  setSort(
                    event.target.value as
                      "featured" | "price-low" | "price-high",
                  ),
                )
              }
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
            <ChevronDown size={14} />
          </label>
        </div>
        {visibleProducts.length ? (
          <div className="product-grid">
            {visibleProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                notify={notify}
              />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <Search size={24} />
            <h3>Nothing in this edit just yet.</h3>
            <p>Try another search or browse all of our pieces.</p>
            <button
              className="button button-dark"
              onClick={() => {
                dispatch(setSearch(""));
                dispatch(setCategory("All pieces"));
              }}
            >
              Show all pieces
            </button>
          </div>
        )}
        <div className="catalog-bottom">
          <span>
            Showing {visibleProducts.length} of {products.length} pieces
          </span>
          <a href="#top" className="text-link">
            Back to top <ArrowUpRight size={15} />
          </a>
        </div>
      </section>

      <section className="story-band" id="our-story">
        <div className="story-image">
          <img
            src={products[7].image}
            alt="A closer look at the latest Gate of Purchase collection"
          />
          <span className="story-image-tag">THE DAILY UNIFORM — ISSUE 01</span>
        </div>
        <div className="story-copy">
          <div className="eyebrow">
            <span className="eyebrow-line" />A NOTE ON BUYING WELL
          </div>
          <h2>
            Fewer things.
            <br />
            <em>Better stories.</em>
          </h2>
          <p>
            We make room for pieces that feel right today and still feel right
            years from now. Clear shapes, useful details, honest materials.
            Nothing extra. Nothing to prove.
          </p>
          <a className="text-link" href="#new-arrivals">
            Get to know the collection <ArrowRight size={16} />
          </a>
          <span className="story-mark">G</span>
        </div>
      </section>

      <section className="newsletter">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-line" />
            LETTERS FROM THE GATE
          </div>
          <h2>
            A good thing,
            <br />
            <em>now and then.</em>
          </h2>
        </div>
        <Newsletter notify={notify} />
      </section>
    </>
  );
}

function ProductCard({
  product,
  index,
  notify,
}: {
  product: Product;
  index: number;
  notify: (message: string) => void;
}) {
  const dispatch = useAppDispatch();
  const saved = useAppSelector((state) =>
    state.shop.wishlist.includes(product.id),
  );
  return (
    <article
      className="product-card"
      style={{ animationDelay: `${index * 45}ms` }}
    >
      <div className="product-image-wrap">
        <Link
          className="product-image-link"
          to={`/products/${product.slug}`}
          aria-label={`View ${product.name}`}
        >
          <img
            src={product.image}
            alt={product.name}
            loading={index > 3 ? "lazy" : "eager"}
          />
          {product.badge && (
            <span className="product-badge">{product.badge}</span>
          )}
        </Link>
        <button
          className={`wish-button ${saved ? "is-saved" : ""}`}
          aria-label={
            saved
              ? `Remove ${product.name} from saved items`
              : `Save ${product.name}`
          }
          onClick={() => dispatch(toggleWishlist(product.id))}
        >
          <Heart size={17} fill={saved ? "currentColor" : "none"} />
        </button>
        <button
          className="quick-add"
          onClick={() => {
            dispatch(addToCart({ productId: product.id, size: "M" }));
            notify(`${product.name} · M added to your bag`);
          }}
        >
          <Plus size={15} /> Quick add
        </button>
      </div>
      <div className="product-info">
        <div className="product-title-line">
          <Link to={`/products/${product.slug}`} className="product-name">
            {product.name}
          </Link>
          <span className="product-price">{money(product.price)}</span>
        </div>
        <div className="product-subline">
          <span>{product.color}</span>
          {product.oldPrice && <del>{money(product.oldPrice)}</del>}
        </div>
      </div>
    </article>
  );
}

function ProductPage({ notify }: { notify: (message: string) => void }) {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);
  const dispatch = useAppDispatch();
  const [size, setSize] = useState("M");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const saved = useAppSelector((state) =>
    product ? state.shop.wishlist.includes(product.id) : false,
  );
  if (!product)
    return (
      <EmptyState
        eyebrow="Piece not found"
        title="Looks like this one moved on."
        action="Back to the collection"
        to="/"
      />
    );

  return (
    <section className="product-detail section-wrap">
      <Link className="back-link" to="/">
        <ArrowLeft size={15} /> Back to the collection
      </Link>
      <div className="product-detail-layout">
        <div className="detail-image">
          <img src={product.image} alt={product.name} />
          <span className="detail-image-caption">
            GATE OF PURCHASE / OBJECT STUDY {product.id}
          </span>
        </div>
        <div className="detail-copy">
          <div className="eyebrow">
            <span className="eyebrow-line" />
            {product.category.toUpperCase()} — THE DAILY EDIT
          </div>
          <h1>
            {product.name}
            <span className="accent-dot">.</span>
          </h1>
          <div className="detail-price">
            {money(product.price)}{" "}
            {product.oldPrice && <del>{money(product.oldPrice)}</del>}
          </div>
          <p className="detail-description">{product.description}</p>
          <div className="detail-divider" />
          <div className="detail-option-label">
            Colour <span>{product.color.split(" / ")[0]}</span>
          </div>
          <div className="detail-option-label size-label">
            Size{" "}
            <button onClick={() => setSizeGuideOpen(true)}>
              Size guide <ArrowUpRight size={13} />
            </button>
          </div>
          <div className="size-picker">
            {["XS", "S", "M", "L", "XL"].map((item) => (
              <button
                key={item}
                className={size === item ? "size-chip selected" : "size-chip"}
                onClick={() => setSize(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <button
            className="button button-dark add-detail"
            onClick={() => {
              dispatch(addToCart({ productId: product.id, size }));
              notify(`${product.name} · ${size} added to your bag`);
            }}
          >
            Add to bag <span>{money(product.price)}</span>
            <ShoppingBag size={16} />
          </button>
          <button
            className={`detail-save ${saved ? "saved" : ""}`}
            onClick={() => dispatch(toggleWishlist(product.id))}
          >
            <Heart size={16} fill={saved ? "currentColor" : "none"} />
            {saved ? "Saved to your wishlist" : "Save for later"}
          </button>
          <div className="detail-promises">
            <div>
              <Check size={15} /> Free shipping over $120
            </div>
            <div>
              <Check size={15} /> Easy 30-day returns
            </div>
            <div>
              <Check size={15} /> Thoughtful by design
            </div>
          </div>
        </div>
      </div>
      <section className="related-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-line" />
              THE REST OF THE STORY
            </div>
            <h2>
              You may also <em>like.</em>
            </h2>
          </div>
        </div>
        <div className="product-grid">
          {products
            .filter((item) => item.id !== product.id)
            .slice(0, 4)
            .map((item, index) => (
              <ProductCard
                key={item.id}
                product={item}
                index={index}
                notify={notify}
              />
            ))}
        </div>
      </section>
      {sizeGuideOpen && (
        <div className="modal-backdrop" onClick={() => setSizeGuideOpen(false)}>
          <div
            className="size-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="size-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              aria-label="Close size guide"
              onClick={() => setSizeGuideOpen(false)}
            >
              <X size={18} />
            </button>
            <div className="eyebrow">
              <span className="eyebrow-line" />
              FIND YOUR FIT
            </div>
            <h2 id="size-title">
              Size guide<span className="accent-dot">.</span>
            </h2>
            <p>
              Our pieces have a relaxed, everyday fit. Between sizes? We
              recommend sizing down.
            </p>
            <div className="fit-note">
              <strong>Relaxed, everyday fit</strong>
              <span>
                Between sizes? We recommend sizing down. A complete measurement
                chart will be added with verified garment specs.
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function SavedPage({ notify }: { notify: (message: string) => void }) {
  const savedIds = useAppSelector((state) => state.shop.wishlist);
  const savedProducts = products.filter((product) =>
    savedIds.includes(product.id),
  );
  return (
    <section className="collection-page section-wrap">
      <div className="eyebrow">
        <span className="eyebrow-line" />
        YOUR PERSONAL EDIT
      </div>
      <div className="section-heading">
        <div>
          <h1>
            The keepers<span className="accent-dot">.</span>
          </h1>
          <p className="collection-subtitle">Pieces you had a feeling about.</p>
        </div>
        <span className="collection-count">
          {savedProducts.length.toString().padStart(2, "0")} / SAVED
        </span>
      </div>
      {savedProducts.length ? (
        <div className="product-grid">
          {savedProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              notify={notify}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          eyebrow="Nothing saved yet"
          title="Keep the good ones close."
          description="Tap the heart on anything that catches your eye. We'll keep your edit right here."
          action="Find your favourites"
          to="/"
        />
      )}
    </section>
  );
}

function CartPage({ notify }: { notify: (message: string) => void }) {
  const lines = useAppSelector((state) => state.shop.cart);
  const dispatch = useAppDispatch();
  const items = lines
    .map((line) => ({
      ...line,
      product: products.find((product) => product.id === line.productId),
    }))
    .filter((line): line is typeof line & { product: Product } =>
      Boolean(line.product),
    );
  const subtotal = items.reduce(
    (sum, line) => sum + line.product.price * line.quantity,
    0,
  );
  const shipping = subtotal === 0 || subtotal >= 120 ? 0 : 8;
  if (!items.length)
    return (
      <section className="collection-page section-wrap">
        <div className="eyebrow">
          <span className="eyebrow-line" />
          YOUR BAG
        </div>
        <EmptyState
          eyebrow="A fresh start"
          title="Your bag is taking a breather."
          description="When something feels right, add it here and pick up where you left off."
          action="Explore the collection"
          to="/"
        />
      </section>
    );
  return (
    <section className="cart-page section-wrap">
      <div className="eyebrow">
        <span className="eyebrow-line" />
        GOOD CHOICES
      </div>
      <div className="section-heading">
        <div>
          <h1>
            Your bag<span className="accent-dot">.</span>
          </h1>
          <p className="collection-subtitle">
            {items.reduce((sum, line) => sum + line.quantity, 0)} pieces, chosen
            well.
          </p>
        </div>
        <Link className="text-link" to="/">
          Keep browsing <ArrowRight size={15} />
        </Link>
      </div>
      <div className="cart-layout">
        <div className="cart-lines">
          {items.map(({ product, quantity, size }) => (
            <article className="cart-line" key={`${product.id}-${size}`}>
              <Link
                className="cart-line-image"
                to={`/products/${product.slug}`}
              >
                <img src={product.image} alt={product.name} />
              </Link>
              <div className="cart-line-info">
                <span className="eyebrow cart-line-category">
                  {product.category}
                </span>
                <Link
                  to={`/products/${product.slug}`}
                  className="cart-line-name"
                >
                  {product.name}
                </Link>
                <span className="cart-line-color">
                  {product.color.split(" / ")[0]} · {size}
                </span>
                <div className="quantity-control">
                  <button
                    aria-label={`Decrease ${product.name} quantity`}
                    onClick={() =>
                      dispatch(
                        setQuantity({
                          productId: product.id,
                          size,
                          quantity: quantity - 1,
                        }),
                      )
                    }
                  >
                    <Minus size={14} />
                  </button>
                  <span>{quantity}</span>
                  <button
                    aria-label={`Increase ${product.name} quantity`}
                    onClick={() =>
                      dispatch(
                        setQuantity({
                          productId: product.id,
                          size,
                          quantity: quantity + 1,
                        }),
                      )
                    }
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
              <div className="cart-line-end">
                <span>{money(product.price * quantity)}</span>
                <button
                  className="remove-button"
                  onClick={() =>
                    dispatch(removeFromCart({ productId: product.id, size }))
                  }
                >
                  <Trash2 size={14} /> Remove
                </button>
              </div>
            </article>
          ))}
        </div>
        <aside className="order-summary">
          <div className="eyebrow">
            <span className="eyebrow-line" />
            ORDER SUMMARY
          </div>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{money(subtotal)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping ? money(shipping) : "Complimentary"}</span>
          </div>
          <div className="shipping-meter">
            <div className="meter-track">
              <span
                style={{ width: `${Math.min((subtotal / 120) * 100, 100)}%` }}
              />
            </div>
            <p>
              {subtotal >= 120
                ? "You have unlocked free shipping."
                : `${money(120 - subtotal)} away from complimentary shipping.`}
            </p>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>{money(subtotal + shipping)}</span>
          </div>
          <button
            className="button button-dark checkout-button"
            onClick={() =>
              notify(
                "Demo checkout — connect a payment provider to accept orders.",
              )
            }
          >
            Continue to checkout <ArrowRight size={16} />
          </button>
          <p className="secure-note">
            Demo storefront. No payment details are collected.
          </p>
          <div className="payment-marks">
            <span>VISA</span>
            <span>mastercard</span>
            <span>AMEX</span>
            <span>PayPal</span>
          </div>
        </aside>
      </div>
    </section>
  );
}

function EmptyState({
  eyebrow,
  title,
  description,
  action,
  to,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action: string;
  to: string;
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <ShoppingBag size={22} />
      </div>
      <div className="eyebrow">
        <span className="eyebrow-line" />
        {eyebrow}
      </div>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
      <Link className="button button-dark" to={to}>
        {action}
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}

function Newsletter({ notify }: { notify: (message: string) => void }) {
  const [email, setEmail] = useState("");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email.trim()) {
      notify(
        "Newsletter sign-up preview — connect an email service to collect subscriptions.",
      );
      setEmail("");
    }
  };
  return (
    <form className="newsletter-form" onSubmit={submit}>
      <p>
        New drops, useful notes, and the occasional good idea.
        <br />
        No noise. Promise.
      </p>
      <label className="newsletter-input">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your email address"
          aria-label="Your email address"
          required
        />
        <button type="submit" aria-label="Subscribe to newsletter">
          <ArrowRight size={18} />
        </button>
      </label>
      <span>By subscribing, you agree to our privacy policy.</span>
    </form>
  );
}

function Footer({ notify }: { notify: (message: string) => void }) {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Link className="wordmark footer-wordmark" to="/">
            <span className="wordmark-gate">
              GATE<span className="wordmark-dot">.</span>
            </span>
            <span className="wordmark-sub">OF PURCHASE</span>
          </Link>
          <p>
            Thoughtful essentials
            <br />
            for the way you move.
          </p>
        </div>
        <div className="footer-links">
          <div>
            <span className="footer-heading">THE SHOP</span>
            <Link to="/">Shop all</Link>
            <a href="/#new-arrivals">New arrivals</a>
            <Link to="/wishlist">Saved pieces</Link>
          </div>
          <div>
            <span className="footer-heading">HERE TO HELP</span>
            <button
              onClick={() =>
                notify("Customer care details will be added soon.")
              }
            >
              Contact us
            </button>
            <button
              onClick={() =>
                notify("Easy 30-day returns. Your piece should feel right.")
              }
            >
              Shipping & returns
            </button>
            <button
              onClick={() =>
                notify(
                  "Your privacy matters. We only use your details for your order.",
                )
              }
            >
              Privacy policy
            </button>
          </div>
          <div>
            <span className="footer-heading">COME SAY HI</span>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram <ArrowUpRight size={12} />
            </a>
            <a
              href="https://www.pinterest.com/"
              target="_blank"
              rel="noreferrer"
            >
              Pinterest <ArrowUpRight size={12} />
            </a>
            <button onClick={() => notify("Thanks for stopping by.")}>
              Journal <ArrowUpRight size={12} />
            </button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 GATE OF PURCHASE. MADE TO BE WORN.</span>
        <span>
          LESS, BUT BETTER. <span className="accent-dot">✳</span>
        </span>
        <a href="#top">BACK TO TOP ↑</a>
      </div>
    </footer>
  );
}

export default App;
