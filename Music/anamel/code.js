import React, { useState, useContext, useEffect, createContext } from "react";
import { FaStore, FaHome, FaBoxOpen, FaUsers, FaSignInAlt, FaUser, FaSignOutAlt, FaShoppingCart, FaStar, FaStarHalfAlt, FaTrashAlt, FaTimes, FaShoppingBasket, FaArrowLeft } from "react-icons/fa";

// CSS styles inline for simplicity; can be extracted to CSS files if preferred
const styles = {
  root: {
    fontFamily: "'Tajawal', sans-serif",
    direction: "rtl",
    backgroundColor: "#f9f9f9",
    color: "#333",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column"
  },
  container: {
    width: "90%",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 15px",
  },
  header: {
    background: "linear-gradient(135deg, #27ae60, #2ecc71)",
    color: "white",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    padding: "15px 0",
  },
  navList: {
    display: "flex",
    gap: "20px",
    listStyle: "none",
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    cursor: "pointer",
    transition: "color 0.3s ease",
  },
  navLinkHover: {
    color: "#f8f9fa",
  },
  cartCountBadge: {
    background: "#e74c3c",
    borderRadius: "50%",
    padding: "2px 7px",
    fontSize: "0.8rem",
    color: "white",
    marginLeft: "5px",
  },
  hero: {
    background: "url('https://source.unsplash.com/random/1600x900/?farm,countryside') center/cover no-repeat",
    height: "500px",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    textAlign: "center",
  },
  heroOverlay: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(39, 174, 96, 0.85)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px"
  },
  heroTitle: {
    fontSize: "3rem",
    marginBottom: "20px",
    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
  },
  heroText: {
    fontSize: "1.3rem",
    marginBottom: "30px",
    maxWidth: "600px"
  },
  btn: {
    backgroundColor: "#e74c3c",
    border: "none",
    borderRadius: "12px",
    padding: "12px 30px",
    color: "white",
    fontWeight: "600",
    fontSize: "1rem",
    cursor: "pointer",
    margin: "0 10px",
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    transition: "background-color 0.3s ease, transform 0.3s ease",
  },
  btnSecondary: {
    backgroundColor: "#27ae60",
  },
  btnHover: {
    backgroundColor: "#c0392b",
    transform: "translateY(-3px)",
  },
  featuresSection: {
    padding: "50px 0",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    flexWrap: "wrap"
  },
  featureBox: {
    flex: "1",
    minWidth: "200px",
    backgroundColor: "white",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    borderRadius: "12px",
    padding: "30px 20px",
    textAlign: "center",
    cursor: "default",
    transition: "all 0.3s ease",
  },
  featureIcon: {
    fontSize: "3rem",
    color: "#2ecc71",
    marginBottom: "15px"
  },
  productsSection: {
    padding: "80px 0",
    backgroundColor: "#f9f9f9",
  },
  productsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
    gap: "30px",
  },
  productCard: {
    backgroundColor: "white",
    borderRadius: "15px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    overflow: "hidden",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
  productCardHover: {
    transform: "translateY(-10px)",
    boxShadow: "0 15px 25px rgba(0,0,0,0.2)",
  },
  productImageBox: {
    height: "220px",
    overflow: "hidden",
    flexShrink: 0,
  },
  productImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  },
  productInfo: {
    padding: "20px",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  productName: {
    fontSize: "1.3rem",
    marginBottom: "8px",
  },
  productDescription: {
    color: "#666",
    fontSize: "0.9rem",
    marginBottom: "12px",
    flexGrow: 1
  },
  priceRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid #eee",
    paddingTop: "15px",
  },
  priceText: {
    fontSize: "1.2rem",
    fontWeight: "700",
    color: "#2c3e50",
  },
  priceDeleted: {
    color: "#999",
    fontWeight: "400",
    marginLeft: "8px",
    textDecoration: "line-through",
    fontSize: "0.9rem"
  },
  buyBtn: {
    backgroundColor: "#27ae60",
    border: "none",
    borderRadius: "12px",
    color: "white",
    padding: "8px 15px",
    fontWeight: "600",
    fontSize: "0.9rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    transition: "background-color 0.3s ease",
  },
  buyBtnHover: {
    backgroundColor: "#2ecc71",
  },
  cartButton: {
    position: "fixed",
    bottom: "30px",
    left: "30px",
    backgroundColor: "#27ae60",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
    color: "white",
    fontSize: "1.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    zIndex: 3000,
    transition: "background-color 0.3s ease",
  },
  cartBadge: {
    position: "absolute",
    top: "-5px",
    right: "-5px",
    backgroundColor: "#e74c3c",
    color: "white",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    fontSize: "12px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cartSidebar: {
    position: "fixed",
    top: 0,
    right: 0,
    width: "400px",
    maxWidth: "90vw",
    height: "100vh",
    backgroundColor: "white",
    boxShadow: "-5px 0 20px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    transition: "transform 0.3s ease",
    zIndex: 2000,
  },
  cartSidebarHidden: {
    transform: "translateX(100%)",
  },
  cartHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #eee",
    paddingBottom: "10px",
    marginBottom: "20px"
  },
  cartTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  closeCartBtn: {
    background: "transparent",
    border: "none",
    fontSize: "1.4rem",
    cursor: "pointer",
    color: "#e74c3c",
  },
  cartList: {
    flexGrow: 1,
    overflowY: "auto",
    paddingRight: "10px",
  },
  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px solid #eee",
    gap: "5px",
  },
  cartItemInfo: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  cartItemName: {
    fontWeight: "600",
  },
  cartItemPrice: {
    color: "#666",
    fontSize: "0.9rem",
  },
  quantityControls: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  quantityBtn: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    border: "1px solid #ddd",
    backgroundColor: "#f9f9f9",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "1rem",
    userSelect: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  removeBtn: {
    background: "transparent",
    border: "none",
    color: "#e74c3c",
    cursor: "pointer",
    fontSize: "1.2rem",
  },
  cartFooter: {
    borderTop: "1px solid #eee",
    paddingTop: "15px",
    marginTop: "15px",
  },
  totalPrice: {
    fontWeight: "700",
    fontSize: "1.2rem",
    marginBottom: "15px",
  },
  checkoutBtn: {
    backgroundColor: "#27ae60",
    border: "none",
    borderRadius: "12px",
    color: "white",
    padding: "15px",
    fontWeight: "700",
    fontSize: "1rem",
    cursor: "pointer",
    width: "100%",
    transition: "background-color 0.3s ease",
  },
  modalOverlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.65)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: "12px",
    maxWidth: "600px",
    width: "90%",
    padding: "20px",
    position: "relative",
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },
  modalCloseBtn: {
    position: "absolute",
    top: "15px",
    left: "15px",
    border: "none",
    background: "transparent",
    fontSize: "1.5rem",
    cursor: "pointer",
    color: "#333",
  },
  modalImage: {
    flex: "1 1 300px",
    borderRadius: "12px",
    objectFit: "cover",
    width: "100%",
    maxHeight: "320px",
  },
  modalInfo: {
    flex: "1 1 300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: "1.8rem",
    marginBottom: "15px",
  },
  modalDescription: {
    marginBottom: "20px",
    fontSize: "1rem",
    color: "#666",
  },
  modalPrice: {
    fontSize: "1.4rem",
    fontWeight: "700",
    color: "#27ae60",
    marginBottom: "20px",
  }
};

// -------- CONTEXT -------- //
const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("storeCart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("storeCart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => {
      const existIndex = prev.findIndex(item => item.id === product.id);
      if (existIndex >= 0) {
        const newCart = [...prev];
        newCart[existIndex].quantity += 1;
        return newCart;
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decreaseQuantity = (id) => {
    setCart(prev => {
      const target = prev.find(item => item.id === id);
      if (target.quantity === 1) {
        return prev.filter(item => item.id !== id);
      } else {
        return prev.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item);
      }
    });
  };

  const clearCart = () => setCart([]);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, totalPrice, totalCount }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

// -------- NAVBAR -------- //
const Navbar = () => {
  const { totalCount } = useCart();

  return (
    <header style={styles.header}>
      <div style={{ ...styles.container, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontWeight: 700, fontSize: "1.8rem", display: "flex", alignItems: "center", gap: "8px" }}>
          <FaStore /> منصة الريف
        </h1>
        <nav>
          <ul style={styles.navList}>
            <li><a href="#home" style={styles.navLink}><FaHome /> الرئيسية</a></li>
            <li><a href="#products" style={styles.navLink}><FaBoxOpen /> المنتجات</a></li>
            <li><a href="#sellers" style={styles.navLink}><FaUsers /> البائعون</a></li>
          </ul>
        </nav>
        <div style={{ position: "relative", cursor: "pointer" }} aria-label="سلة المشتريات">
          <FaShoppingCart size={28} style={{ color: "white" }} />
          {totalCount > 0 && <span style={styles.cartCountBadge}>{totalCount}</span>}
        </div>
      </div>
    </header>
  );
};

// -------- HERO -------- //
const Hero = () => {
  return (
    <section style={styles.hero} id="home">
      <div style={styles.heroOverlay}>
        <h1 style={styles.heroTitle}>أفضل المنتجات الريفية الطبيعية</h1>
        <p style={styles.heroText}>منتجات محلية 100% بأجود الأنواع مباشرة من قلب الطبيعة</p>
        <div>
          <button style={styles.btn}><FaShoppingBasket /> تصفح المنتجات</button>
          <button style={{...styles.btn, ...styles.btnSecondary}}><FaStore /> سجل كبائع</button>
        </div>
      </div>
    </section>
  );
};

// -------- FEATURE BOX -------- //
const Feature = ({ icon, title, description }) => (
  <div style={styles.featureBox}>
    <div style={styles.featureIcon}>{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

// -------- FEATURES -------- //
const Features = () => (
  <section style={styles.featuresSection}>
    <Feature icon={<FaTruck />} title="توصيل سريع" description="توصيل لجميع المناطق" />
    <Feature icon={<FaLeaf />} title="منتجات طبيعية" description="بدون مواد حافظة" />
    <Feature icon={<FaMedal />} title="جودة عالية" description="ضمان الرضا التام" />
  </section>
);

// -------- PRODUCT CARD -------- //
const ProductCard = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ ...styles.productCard, ...(hovered ? styles.productCardHover : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {product.badge && (
        <div style={{
          position: "absolute",
          top: "15px",
          right: "15px",
          backgroundColor: product.badge.type === "sale" ? "#e74c3c" : "#27ae60",
          color: "white",
          padding: "5px 10px",
          borderRadius: "30px",
          fontSize: "0.8rem",
          fontWeight: "600",
          zIndex: 10,
        }}>
          {product.badge.text}
        </div>
      )}
      <div style={styles.productImageBox} onClick={() => onQuickView(product)}>
        <img
          src={product.image}
          alt={product.name}
          style={{ ...styles.productImage, transform: hovered ? "scale(1.05)" : "scale(1)" }}
        />
      </div>
      <div style={styles.productInfo}>
        <h3 style={styles.productName}>{product.name}</h3>
        <p style={styles.productDescription}>{product.description}</p>
        <div style={styles.priceRow}>
          <div>
            {product.oldPrice ? (
              <>
                <span style={styles.priceDeleted}>{product.oldPrice} دج</span>
                <span style={styles.priceText}>{product.price} دج</span>
              </>
            ) : (
              <span style={styles.priceText}>{product.price} دج</span>
            )}
          </div>
          <button
            style={styles.buyBtn}
            onClick={() => addToCart(product)}
            title={"أضف " + product.name + " للسلة"}
          >
            <FaShoppingCart /> إضافة للسلة
          </button>
        </div>
      </div>
    </div>
  );
};

// -------- PRODUCT LIST -------- //
const ProductList = ({ products, onQuickView }) => (
  <section style={styles.productsSection} id="products">
    <div style={styles.container}>
      <h2 style={{ textAlign: "center", marginBottom: "40px", fontSize: "2.2rem", color: "#2c3e50" }}>
        <FaBoxOpen /> منتجاتنا المميزة
      </h2>
      <div style={styles.productsGrid}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
        ))}
      </div>
    </div>
  </section>
);

// -------- QUICK VIEW MODAL -------- //
const QuickViewModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div style={{ ...styles.modalOverlay }} onClick={onClose} aria-modal="true" role="dialog" aria-labelledby="quick-view-title" tabIndex={-1}>
      <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button aria-label="إغلاق العرض السريع" style={styles.modalCloseBtn} onClick={onClose}>
          <FaTimes />
        </button>
        <img src={product.image} alt={product.name} style={styles.modalImage} />
        <div style={styles.modalInfo}>
          <h2 id="quick-view-title" style={styles.modalTitle}>{product.name}</h2>
          <p style={styles.modalDescription}>{product.description}</p>
          <p style={styles.modalPrice}>{product.price} دج</p>
          <button
            style={{ ...styles.buyBtn, width: "100%" }}
            onClick={() => {
              onClose();
              product.onAddToCart(product);
            }}
          >
            <FaShoppingCart /> إضافة للسلة
          </button>
        </div>
      </div>
    </div>
  );
};

// -------- CART SIDEBAR -------- //
const CartSidebar = ({ onClose }) => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, totalPrice, clearCart } = useCart();

  return (
    <aside style={{ ...styles.cartSidebar }}>
      <div style={styles.cartHeader}>
        <h2 style={styles.cartTitle}><FaShoppingCart /> سلة المشتريات</h2>
        <button aria-label="إغلاق السلة" onClick={onClose} style={styles.closeCartBtn}><FaTimes /></button>
      </div>
      <ul style={styles.cartList}>
        {cart.length === 0 && <li>السلة فارغة</li>}
        {cart.map(item => (
          <li key={item.id} style={styles.cartItem}>
            <div style={styles.cartItemInfo}>
              <span style={styles.cartItemName}>{item.name}</span>
              <span style={styles.cartItemPrice}>{item.price} دج × {item.quantity}</span>
              <div style={styles.quantityControls}>
                <button onClick={() => decreaseQuantity(item.id)} style={styles.quantityBtn} aria-label={"نقص كمية " + item.name}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQuantity(item.id)} style={styles.quantityBtn} aria-label={"زيادة كمية " + item.name}>+</button>
              </div>
            </div>
            <button onClick={() => removeFromCart(item.id)} style={styles.removeBtn} aria-label={"حذف " + item.name}><FaTrashAlt /></button>
          </li>
        ))}
      </ul>
      <div style={styles.cartFooter}>
        <p style={styles.totalPrice}>المجموع: {totalPrice} دج</p>
        {cart.length > 0 && <button style={styles.checkoutBtn} onClick={() => {
          alert('تم إتمام الشراء بنجاح! شكراً لتعاملكم معنا.');
          clearCart();
          onClose();
        }}>إتمام الشراء</button>}
      </div>
    </aside>
  );
};

// -------- MAIN APP -------- //
const App = () => {
  const [showCart, setShowCart] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // منتاجات تجريبية - استبدل الصور بالمسارات الصحيحة أو روابط مباشرة
  const productsList = [
    {
      id: 1,
      name: "عسل طبيعي",
      description: "عسل جبلي نقي 100%",
      price: 1500,
      image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?&auto=format&fit=crop&w=600&q=80",
      badge: { type: "featured", text: "منتج مميز" }
    },
    {
      id: 2,
      name: "بيض طازج",
      description: "بيض بلدي طازج من دجاج طبيعي",
      price: 400,
      image: "https://images.unsplash.com/photo-1574226516831-e1dff420e8f8?&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      name: "زبدة الغنم",
      description: "طبيعية وخالية من الإضافات",
      price: 1170,
      oldPrice: 1300,
      image: "https://images.unsplash.com/photo-1612961402624-53d451a9a8f8?&auto=format&fit=crop&w=600&q=80",
      badge: { type: "sale", text: "تخفيض 10%" }
    },
    {
      id: 4,
      name: "زيت الزيتون",
      description: "زيت زيتون طبيعي عالي الجودة",
      price: 1400,
      image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 5,
      name: "لبن رائب",
      description: "مصدر طبيعي للبروبيوتيك",
      price: 600,
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?&auto=format&fit=crop&w=600&q=80"
    }
  ];

  const { addToCart } = useCart();

  // إضافة على السلة مع إغلاق العرض السريع
  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`تمت إضافة ${product.name} إلى السلة`);
    setQuickViewProduct(null);
    setShowCart(true);
  };

  return (
    <div style={styles.root}>
      <Navbar />
      <Hero />
      <Features />
      <ProductList products={productsList.map(p => ({...p, onAddToCart: handleAddToCart}))} onQuickView={setQuickViewProduct} />
      <CartButton onClick={() => setShowCart(true)} />
      {showCart && <CartSidebar onClose={() => setShowCart(false)} />}
      {quickViewProduct && (
        <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}
      <Footer />
    </div>
  );
};

// -------- CART BUTTON (FLOATING) -------- //
const CartButton = ({ onClick }) => {
  const { totalCount } = useCart();
  return (
    <button 
      aria-label="عرض سلة المشتريات" 
      style={styles.cartButton} 
      onClick={onClick}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
    >
      <FaShoppingCart />
      {totalCount > 0 && <span style={styles.cartBadge}>{totalCount}</span>}
    </button>
  );
};

// -------- FOOTER -------- //
const Footer = () => (
  <footer style={{ backgroundColor: "#2c3e50", color: "white", padding: "60px 0 20px" }}>
    <div style={styles.container}>
      <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "30px", marginBottom: "30px"}}>
        <div>
          <h3 style={{ marginBottom: "20px", fontSize: "1.3rem" }}>متجر الريف <FaStore style={{ marginLeft: 8 }} /></h3>
          <p>منتجات طبيعية من قلب الريف الجزائري</p>
          <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
            <a href="#" aria-label="Facebook" style={socialLinkStyle}>
              <i className="fab fa-facebook-f" />
            </a>
            <a href="#" aria-label="Instagram" style={socialLinkStyle}>
              <i className="fab fa-instagram" />
            </a>
            <a href="#" aria-label="Twitter" style={socialLinkStyle}>
              <i className="fab fa-twitter" />
            </a>
            <a href="#" aria-label="WhatsApp" style={socialLinkStyle}>
              <i className="fab fa-whatsapp" />
            </a>
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: "20px", fontSize: "1.3rem" }}>روابط سريعة</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li><a href="#home" style={footerLinkStyle}>الرئيسية</a></li>
            <li><a href="#products" style={footerLinkStyle}>المنتجات</a></li>
            <li><a href="#about" style={footerLinkStyle}>عن المتجر</a></li>
            <li><a href="#privacy" style={footerLinkStyle}>سياسة الخصوصية</a></li>
          </ul>
        </div>

        <div>
          <h3 style={{ marginBottom: "20px", fontSize: "1.3rem" }}>اتصل بنا</h3>
          <p><FaMapMarkerAlt /> الجزائر، ولاية الطارف</p>
          <p><FaPhone /> 0123456789</p>
          <p><FaEnvelope /> info@rifestore.dz</p>
        </div>
      </div>
      <div style={{ textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: "20px", color: "#bbb" }}>
        جميع الحقوق محفوظة &copy; 2025 - متجر الريف
      </div>
    </div>
  </footer>
);

const socialLinkStyle = {
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  width: 36,
  height: 36,
  borderRadius: "50%",
  backgroundColor: "rgba(255,255,255,0.1)",
  color: "white",
  textDecoration: "none",
  transition: "background-color 0.3s ease",
  fontSize: "1.2rem",
};

const footerLinkStyle = {
  color: "#bbb",
  textDecoration: "none",
  transition: "color 0.3s ease",
  display: "inline-block",
  marginBottom: 10,
};

const FaTruck = () => <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#2ecc71" viewBox="0 0 24 24"><path d="M20 8h-3V4H3v13h14v-1h4v-3l-3-3zm0 5h-3v-2h3v2zM5 16c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2z"/></svg>
const FaLeaf = () => <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#2ecc71" viewBox="0 0 24 24"><path d="M12 2c-5 0-9 7-9 10a9 9 0 0018 0c0-3-4-10-9-10z"/></svg>
const FaMedal = () => <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#2ecc71" viewBox="0 0 24 24"><path d="M12 2L9 8H3l5 4-2 6 6-4 6 4-2-6 5-4h-6l-3-6z"/></svg>

const FaMapMarkerAlt = () => <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C8.132 2 5 5.132 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.868-3.132-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/></svg>
const FaPhone = () => <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 11.81a15.053 15.053 0 006.12 6.12l2.1-2.1a1 1 0 011.11-.21c1.2.51 2.5.8 3.87.8a1 1 0 011 1v3.7a1 1 0 01-1 1c-9.67 0-17.5-7.83-17.5-17.5a1 1 0 011-1h3.7a1 1 0 011 1c0 1.37.29 2.67.8 3.87a1 1 0 01-.21 1.11l-2.1 2.1z"/></svg>
const FaEnvelope = () => <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4a2 2 0 00-2 2v12c0 1.1.9 2 2 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm-2.3 3.29l-5.44 4.16a1 1 0 01-1.12 0L6.3 7.29A1 1 0 017 6h10a1 1 0 01.7 1.29z"/></svg>

export default function ImprovedStore() {
  return (
    <CartProvider>
      <App />
    </CartProvider>
  );
}

