import React, { useState, useEffect } from 'react';
import { ShoppingCart, Calendar, Mail, Phone, Instagram, Heart, Star, ChevronLeft, ChevronRight, X, Plus, Minus, Check } from 'lucide-react';

const BakeBloomWebsite = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    name: '', email: '', phone: '', date: '', eventType: '', guests: '', message: ''
  });
  const [orderForm, setOrderForm] = useState({
    name: '', email: '', phone: '', delivery: 'pickup', address: '', notes: ''
  });
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [notification, setNotification] = useState('');

  // Sample Products Data
  const products = [
    {
      id: 1, name: 'Classic Vanilla Cake', category: 'Cakes', price: 4500, 
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
      description: 'Moist vanilla layers with buttercream frosting'
    },
    {
      id: 2, name: 'Chocolate Truffle Cake', category: 'Cakes', price: 5200,
      image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800',
      description: 'Rich chocolate ganache with truffle cream'
    },
    {
      id: 3, name: 'Red Velvet Delight', category: 'Cakes', price: 4800,
      image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=800',
      description: 'Signature red velvet with cream cheese frosting'
    },
    {
      id: 4, name: 'Artisan Croissants', category: 'Pastries', price: 250,
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800',
      description: 'Buttery, flaky French croissants (per piece)'
    },
    {
      id: 5, name: 'Fruit Tart Collection', category: 'Pastries', price: 1800,
      image: 'https://images.unsplash.com/photo-1519915212116-7cfef71f1d3e?w=800',
      description: 'Assorted seasonal fruit tarts (6 pieces)'
    },
    {
      id: 6, name: 'Cupcake Box', category: 'Cupcakes', price: 2400,
      image: 'https://images.unsplash.com/photo-1599785209796-786432b228bc?w=800',
      description: 'Gourmet cupcakes, mixed flavors (12 pieces)'
    },
    {
      id: 7, name: 'Wedding Cake Custom', category: 'Special Orders', price: 25000,
      image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800',
      description: '3-tier custom designed wedding cake (base price)'
    },
    {
      id: 8, name: 'Birthday Cake Special', category: 'Special Orders', price: 6500,
      image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800',
      description: 'Custom themed birthday cake with decorations'
    }
  ];

  const galleryImages = [
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200',
    'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=1200',
    'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1200',
    'https://images.unsplash.com/photo-1557308536-ee471ef2c390?w=1200',
    'https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=1200',
    'https://images.unsplash.com/photo-1562440499-64c9a111f713?w=1200'
  ];

  const categories = ['All', ...new Set(products.map(p => p.category))];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  useEffect(() => {
    const savedCart = localStorage.getItem('bakebloom-cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('bakebloom-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    showNotification('Added to cart!');
  };

  const updateQuantity = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    console.log('Booking:', bookingForm);
    showNotification('Booking request submitted! We\'ll contact you soon.');
    setBookingForm({ name: '', email: '', phone: '', date: '', eventType: '', guests: '', message: '' });
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    console.log('Order:', { items: cart, customer: orderForm });
    showNotification('Order placed successfully! Check your email for confirmation.');
    setCart([]);
    setShowCart(false);
    setOrderForm({ name: '', email: '', phone: '', delivery: 'pickup', address: '', notes: '' });
  };

  return (
    <div style={{
      fontFamily: '"Playfair Display", "Georgia", serif',
      background: '#FFF9F0',
      color: '#2C1810',
      minHeight: '100vh'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Lato:wght@300;400;700&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body { overflow-x: hidden; }
        
        .section-enter { 
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        .product-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }
        
        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px rgba(139, 69, 19, 0.15);
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #C17855 0%, #8B4513 100%);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s;
        }
        
        .btn-primary:hover::before {
          left: 100%;
        }
        
        .btn-primary:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 30px rgba(139, 69, 19, 0.3);
        }
        
        .floating { animation: float 3s ease-in-out infinite; }
        
        .gradient-text {
          background: linear-gradient(135deg, #C17855 0%, #8B4513 50%, #D4A574 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .glass {
          background: rgba(255, 249, 240, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(193, 120, 85, 0.2);
        }
        
        input, textarea, select {
          font-family: 'Lato', sans-serif;
        }
        
        .gallery-img {
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .notification {
          position: fixed;
          top: 100px;
          right: 30px;
          background: #2C1810;
          color: white;
          padding: 16px 24px;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
          z-index: 10000;
          animation: slideInRight 0.4s ease-out;
        }
        
        @keyframes slideInRight {
          from { transform: translateX(400px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>

      {/* Notification */}
      {notification && (
        <div className="notification" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Check size={20} />
          <span style={{ fontFamily: 'Lato, sans-serif', fontWeight: '400' }}>{notification}</span>
        </div>
      )}

      {/* Navigation */}
      <nav className="glass" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '20px 5%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 5px 30px rgba(0,0,0,0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '45px',
            height: '45px',
            background: 'linear-gradient(135deg, #C17855, #8B4513)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '24px',
            fontWeight: '700'
          }}>B</div>
          <span style={{ fontSize: '26px', fontWeight: '700', letterSpacing: '1px' }}>
            <span className="gradient-text">BakeBloom</span>
          </span>
        </div>
        
        <div style={{ 
          display: 'flex', 
          gap: '35px',
          fontFamily: 'Lato, sans-serif',
          fontSize: '15px',
          fontWeight: '400'
        }}>
          {['Home', 'Portfolio', 'Shop', 'Booking', 'Contact'].map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                textDecoration: 'none',
                color: '#2C1810',
                fontWeight: '500',
                transition: 'all 0.3s',
                borderBottom: activeSection === item.toLowerCase() ? '2px solid #C17855' : 'none',
                paddingBottom: '4px'
              }}
              onClick={(e) => {
                e.preventDefault();
                setActiveSection(item.toLowerCase());
                document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {item}
            </a>
          ))}
        </div>

        <button
          onClick={() => setShowCart(true)}
          style={{
            background: 'linear-gradient(135deg, #C17855, #8B4513)',
            border: 'none',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '25px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontFamily: 'Lato, sans-serif',
            fontWeight: '600',
            position: 'relative',
            transition: 'all 0.3s'
          }}
          className="btn-primary"
        >
          <ShoppingCart size={18} />
          Cart
          {cartCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              background: '#DC2626',
              color: 'white',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: '700'
            }}>
              {cartCount}
            </span>
          )}
        </button>
      </nav>

      {/* Hero Section */}
      <section id="home" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '0 5%',
        background: 'linear-gradient(135deg, #FFF9F0 0%, #FFE8D6 50%, #F5E6D3 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(193,120,85,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)'
        }} />
        
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '80px', width: '100%' }}>
          <div style={{ flex: 1 }} className="section-enter">
            <div style={{
              display: 'inline-block',
              background: 'rgba(193, 120, 85, 0.1)',
              padding: '8px 20px',
              borderRadius: '25px',
              marginBottom: '20px',
              fontFamily: 'Lato, sans-serif',
              fontSize: '14px',
              fontWeight: '600',
              color: '#8B4513'
            }}>
              🎂 Nairobi's Finest Artisan Bakery
            </div>
            
            <h1 style={{
              fontSize: '72px',
              fontWeight: '700',
              lineHeight: '1.1',
              marginBottom: '25px',
              letterSpacing: '-1px'
            }}>
              Where Every
              <br />
              <span className="gradient-text">Slice Tells</span>
              <br />
              a Story
            </h1>
            
            <p style={{
              fontSize: '20px',
              lineHeight: '1.8',
              marginBottom: '40px',
              fontFamily: 'Lato, sans-serif',
              fontWeight: '300',
              color: '#5C4033',
              maxWidth: '550px'
            }}>
              Handcrafted cakes, pastries, and desserts made with love and the finest ingredients. 
              From intimate celebrations to grand events, we bake your dreams into reality.
            </p>
            
            <div style={{ display: 'flex', gap: '15px' }}>
              <button
                onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
                style={{
                  padding: '18px 40px',
                  fontSize: '16px',
                  border: 'none',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  color: 'white',
                  fontWeight: '600',
                  fontFamily: 'Lato, sans-serif'
                }}
              >
                Order Now
              </button>
              <button
                onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  padding: '18px 40px',
                  fontSize: '16px',
                  border: '2px solid #C17855',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  background: 'transparent',
                  color: '#8B4513',
                  fontWeight: '600',
                  fontFamily: 'Lato, sans-serif',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#C17855';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#8B4513';
                }}
              >
                <Calendar size={18} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
                Book Custom Order
              </button>
            </div>
          </div>
          
          <div style={{ flex: 1, position: 'relative' }} className="floating">
            <img 
              src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&h=800&fit=crop"
              alt="Signature Cake"
              style={{
                width: '100%',
                maxWidth: '600px',
                borderRadius: '30px',
                boxShadow: '0 40px 100px rgba(139, 69, 19, 0.3)',
                transform: 'rotate(2deg)'
              }}
            />
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              background: 'white',
              padding: '20px',
              borderRadius: '20px',
              boxShadow: '0 15px 40px rgba(0,0,0,0.1)',
              transform: 'rotate(-5deg)'
            }}>
              <Star size={24} style={{ color: '#FFB800', fill: '#FFB800' }} />
              <div style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', marginTop: '8px', fontWeight: '600' }}>
                5.0 Rating
              </div>
              <div style={{ fontFamily: 'Lato, sans-serif', fontSize: '12px', color: '#666' }}>
                500+ Reviews
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" style={{
        padding: '120px 5%',
        background: 'white'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '70px' }}>
            <span style={{
              color: '#C17855',
              fontSize: '16px',
              fontWeight: '600',
              letterSpacing: '2px',
              fontFamily: 'Lato, sans-serif'
            }}>OUR MASTERPIECES</span>
            <h2 style={{
              fontSize: '56px',
              fontWeight: '700',
              marginTop: '15px',
              marginBottom: '20px'
            }}>
              <span className="gradient-text">Portfolio</span> of Excellence
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#5C4033',
              fontFamily: 'Lato, sans-serif',
              fontWeight: '300',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Every creation is a testament to our passion for perfection and attention to detail
            </p>
          </div>

          <div style={{ position: 'relative', marginBottom: '60px' }}>
            <div style={{
              width: '100%',
              height: '600px',
              borderRadius: '30px',
              overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(0,0,0,0.15)',
              position: 'relative'
            }}>
              <img 
                src={galleryImages[currentGalleryIndex]}
                alt="Gallery"
                className="gallery-img"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              
              <button
                onClick={() => setCurrentGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
                style={{
                  position: 'absolute',
                  left: '30px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.95)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-50%) scale(1.1)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(-50%) scale(1)'}
              >
                <ChevronLeft size={28} color="#8B4513" />
              </button>

              <button
                onClick={() => setCurrentGalleryIndex((prev) => (prev + 1) % galleryImages.length)}
                style={{
                  position: 'absolute',
                  right: '30px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.95)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-50%) scale(1.1)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(-50%) scale(1)'}
              >
                <ChevronRight size={28} color="#8B4513" />
              </button>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              marginTop: '25px'
            }}>
              {galleryImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentGalleryIndex(idx)}
                  style={{
                    width: idx === currentGalleryIndex ? '40px' : '12px',
                    height: '12px',
                    borderRadius: '6px',
                    border: 'none',
                    background: idx === currentGalleryIndex ? '#C17855' : '#D4A574',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                />
              ))}
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px'
          }}>
            {[
              { title: 'Custom Designs', desc: 'Unique cakes tailored to your vision', icon: '🎨' },
              { title: 'Premium Ingredients', desc: 'Only the finest, freshest ingredients', icon: '⭐' },
              { title: 'Artisan Craftsmanship', desc: 'Every detail perfected by hand', icon: '👨‍🍳' },
              { title: 'Event Catering', desc: 'Full-service for weddings & events', icon: '🎉' }
            ].map((feature, idx) => (
              <div key={idx} style={{
                background: 'linear-gradient(135deg, #FFF9F0 0%, #FFE8D6 100%)',
                padding: '40px 30px',
                borderRadius: '20px',
                textAlign: 'center',
                border: '1px solid rgba(193, 120, 85, 0.1)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(139, 69, 19, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>{feature.icon}</div>
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: '600',
                  marginBottom: '12px',
                  color: '#8B4513'
                }}>{feature.title}</h3>
                <p style={{
                  fontSize: '15px',
                  color: '#5C4033',
                  fontFamily: 'Lato, sans-serif',
                  lineHeight: '1.6'
                }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop Section */}
      <section id="shop" style={{
        padding: '120px 5%',
        background: 'linear-gradient(180deg, white 0%, #FFF9F0 100%)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{
              color: '#C17855',
              fontSize: '16px',
              fontWeight: '600',
              letterSpacing: '2px',
              fontFamily: 'Lato, sans-serif'
            }}>READY TO ORDER</span>
            <h2 style={{
              fontSize: '56px',
              fontWeight: '700',
              marginTop: '15px',
              marginBottom: '20px'
            }}>
              Our <span className="gradient-text">Signature</span> Collection
            </h2>
          </div>

          <div style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'center',
            marginBottom: '50px',
            flexWrap: 'wrap'
          }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '12px 30px',
                  border: selectedCategory === cat ? 'none' : '2px solid #C17855',
                  background: selectedCategory === cat ? 'linear-gradient(135deg, #C17855, #8B4513)' : 'transparent',
                  color: selectedCategory === cat ? 'white' : '#8B4513',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontWeight: '600',
                  fontFamily: 'Lato, sans-serif',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== cat) {
                    e.target.style.background = '#C17855';
                    e.target.style.color = 'white';
                    e.target.style.borderColor = '#C17855';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== cat) {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#8B4513';
                    e.target.style.borderColor = '#C17855';
                  }
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '35px'
          }}>
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="product-card"
                onClick={() => setSelectedProduct(product)}
                style={{
                  background: 'white',
                  borderRadius: '25px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
                }}
              >
                <div style={{ position: 'relative', overflow: 'hidden', height: '280px' }}>
                  <img 
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    background: 'white',
                    borderRadius: '50%',
                    width: '45px',
                    height: '45px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <Heart size={20} color="#C17855" />
                  </div>
                </div>
                
                <div style={{ padding: '25px' }}>
                  <div style={{
                    display: 'inline-block',
                    background: 'rgba(193, 120, 85, 0.1)',
                    padding: '4px 12px',
                    borderRadius: '15px',
                    fontSize: '12px',
                    fontFamily: 'Lato, sans-serif',
                    fontWeight: '600',
                    color: '#8B4513',
                    marginBottom: '12px'
                  }}>
                    {product.category}
                  </div>
                  
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: '600',
                    marginBottom: '10px',
                    color: '#2C1810'
                  }}>
                    {product.name}
                  </h3>
                  
                  <p style={{
                    fontSize: '14px',
                    color: '#5C4033',
                    fontFamily: 'Lato, sans-serif',
                    marginBottom: '20px',
                    lineHeight: '1.6'
                  }}>
                    {product.description}
                  </p>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      fontSize: '28px',
                      fontWeight: '700',
                      color: '#C17855'
                    }}>
                      KSh {product.price.toLocaleString()}
                    </span>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="btn-primary"
                      style={{
                        padding: '12px 24px',
                        border: 'none',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: '600',
                        fontFamily: 'Lato, sans-serif',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <ShoppingCart size={16} />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" style={{
        padding: '120px 5%',
        background: 'linear-gradient(135deg, #2C1810 0%, #4A2C1C 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50px',
          left: '-50px',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(193,120,85,0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)'
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{
              color: '#D4A574',
              fontSize: '16px',
              fontWeight: '600',
              letterSpacing: '2px',
              fontFamily: 'Lato, sans-serif'
            }}>CUSTOM ORDERS</span>
            <h2 style={{
              fontSize: '56px',
              fontWeight: '700',
              marginTop: '15px',
              marginBottom: '20px'
            }}>
              Book Your <span style={{ color: '#D4A574' }}>Dream</span> Cake
            </h2>
            <p style={{
              fontSize: '18px',
              opacity: 0.9,
              fontFamily: 'Lato, sans-serif',
              fontWeight: '300',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Let's create something extraordinary together. Fill out the form below and we'll bring your vision to life.
            </p>
          </div>

          <form onSubmit={handleBookingSubmit} style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            padding: '50px',
            borderRadius: '30px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '25px',
              marginBottom: '25px'
            }}>
              <input
                type="text"
                placeholder="Full Name"
                required
                value={bookingForm.name}
                onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                style={{
                  padding: '18px 20px',
                  borderRadius: '15px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.borderColor = '#D4A574';
                }}
                onBlur={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
              />
              
              <input
                type="email"
                placeholder="Email Address"
                required
                value={bookingForm.email}
                onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                style={{
                  padding: '18px 20px',
                  borderRadius: '15px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.borderColor = '#D4A574';
                }}
                onBlur={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
              />
              
              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={bookingForm.phone}
                onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                style={{
                  padding: '18px 20px',
                  borderRadius: '15px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.borderColor = '#D4A574';
                }}
                onBlur={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
              />
              
              <input
                type="date"
                placeholder="Event Date"
                required
                value={bookingForm.date}
                onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                style={{
                  padding: '18px 20px',
                  borderRadius: '15px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.borderColor = '#D4A574';
                }}
                onBlur={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
              />
              
              <select
                required
                value={bookingForm.eventType}
                onChange={(e) => setBookingForm({...bookingForm, eventType: e.target.value})}
                style={{
                  padding: '18px 20px',
                  borderRadius: '15px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: bookingForm.eventType ? 'white' : 'rgba(255, 255, 255, 0.5)',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.borderColor = '#D4A574';
                }}
                onBlur={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                <option value="" style={{ color: '#2C1810' }}>Event Type</option>
                <option value="wedding" style={{ color: '#2C1810' }}>Wedding</option>
                <option value="birthday" style={{ color: '#2C1810' }}>Birthday</option>
                <option value="corporate" style={{ color: '#2C1810' }}>Corporate Event</option>
                <option value="anniversary" style={{ color: '#2C1810' }}>Anniversary</option>
                <option value="other" style={{ color: '#2C1810' }}>Other</option>
              </select>
              
              <input
                type="number"
                placeholder="Number of Guests"
                required
                min="1"
                value={bookingForm.guests}
                onChange={(e) => setBookingForm({...bookingForm, guests: e.target.value})}
                style={{
                  padding: '18px 20px',
                  borderRadius: '15px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.borderColor = '#D4A574';
                }}
                onBlur={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
              />
            </div>
            
            <textarea
              placeholder="Tell us about your dream cake... (flavor, design, theme, special requirements)"
              rows="6"
              required
              value={bookingForm.message}
              onChange={(e) => setBookingForm({...bookingForm, message: e.target.value})}
              style={{
                width: '100%',
                padding: '18px 20px',
                borderRadius: '15px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: '15px',
                outline: 'none',
                resize: 'vertical',
                marginBottom: '30px',
                fontFamily: 'Lato, sans-serif',
                transition: 'all 0.3s'
              }}
              onFocus={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                e.target.style.borderColor = '#D4A574';
              }}
              onBlur={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
            />
            
            <button
              type="submit"
              className="btn-primary"
              style={{
                width: '100%',
                padding: '20px',
                border: 'none',
                borderRadius: '15px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                fontFamily: 'Lato, sans-serif',
                color: 'white',
                background: 'linear-gradient(135deg, #D4A574 0%, #C17855 100%)'
              }}
            >
              <Calendar size={18} style={{ verticalAlign: 'middle', marginRight: '10px' }} />
              Submit Booking Request
            </button>
          </form>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{
        padding: '120px 5%',
        background: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{
              color: '#C17855',
              fontSize: '16px',
              fontWeight: '600',
              letterSpacing: '2px',
              fontFamily: 'Lato, sans-serif'
            }}>GET IN TOUCH</span>
            <h2 style={{
              fontSize: '56px',
              fontWeight: '700',
              marginTop: '15px',
              marginBottom: '20px'
            }}>
              Let's <span className="gradient-text">Connect</span>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '40px'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #FFF9F0 0%, #FFE8D6 100%)',
              padding: '45px 35px',
              borderRadius: '25px',
              textAlign: 'center',
              border: '1px solid rgba(193, 120, 85, 0.1)',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 50px rgba(139, 69, 19, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                background: 'linear-gradient(135deg, #C17855, #8B4513)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <Phone size={32} color="white" />
              </div>
              <h3 style={{
                fontSize: '22px',
                fontWeight: '600',
                marginBottom: '12px',
                color: '#8B4513'
              }}>Phone</h3>
              <p style={{
                fontSize: '16px',
                color: '#5C4033',
                fontFamily: 'Lato, sans-serif'
              }}>+254 XXX XXX XXX</p>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #FFF9F0 0%, #FFE8D6 100%)',
              padding: '45px 35px',
              borderRadius: '25px',
              textAlign: 'center',
              border: '1px solid rgba(193, 120, 85, 0.1)',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 50px rgba(139, 69, 19, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                background: 'linear-gradient(135deg, #C17855, #8B4513)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <Mail size={32} color="white" />
              </div>
              <h3 style={{
                fontSize: '22px',
                fontWeight: '600',
                marginBottom: '12px',
                color: '#8B4513'
              }}>Email</h3>
              <p style={{
                fontSize: '16px',
                color: '#5C4033',
                fontFamily: 'Lato, sans-serif'
              }}>hello@bakebloom.co.ke</p>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #FFF9F0 0%, #FFE8D6 100%)',
              padding: '45px 35px',
              borderRadius: '25px',
              textAlign: 'center',
              border: '1px solid rgba(193, 120, 85, 0.1)',
              transition: 'all 0.3s',
              cursor: 'pointer'
            }}
            onClick={() => window.open('https://www.instagram.com/bakebloom_byboboh/', '_blank')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 50px rgba(139, 69, 19, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                background: 'linear-gradient(135deg, #C17855, #8B4513)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <Instagram size={32} color="white" />
              </div>
              <h3 style={{
                fontSize: '22px',
                fontWeight: '600',
                marginBottom: '12px',
                color: '#8B4513'
              }}>Instagram</h3>
              <p style={{
                fontSize: '16px',
                color: '#5C4033',
                fontFamily: 'Lato, sans-serif'
              }}>@bakebloom_byboboh</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: 'linear-gradient(135deg, #2C1810 0%, #4A2C1C 100%)',
        color: 'white',
        padding: '50px 5%',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '15px' }}>
            <span className="gradient-text" style={{ color: '#D4A574' }}>BakeBloom</span> by Boboh
          </h3>
          <p style={{
            fontSize: '15px',
            opacity: 0.8,
            marginBottom: '30px',
            fontFamily: 'Lato, sans-serif'
          }}>
            Crafting sweet memories, one slice at a time 🎂
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '30px'
          }}>
            <a href="#home" style={{ color: '#D4A574', textDecoration: 'none', fontFamily: 'Lato, sans-serif' }}>Home</a>
            <a href="#portfolio" style={{ color: '#D4A574', textDecoration: 'none', fontFamily: 'Lato, sans-serif' }}>Portfolio</a>
            <a href="#shop" style={{ color: '#D4A574', textDecoration: 'none', fontFamily: 'Lato, sans-serif' }}>Shop</a>
            <a href="#booking" style={{ color: '#D4A574', textDecoration: 'none', fontFamily: 'Lato, sans-serif' }}>Booking</a>
            <a href="#contact" style={{ color: '#D4A574', textDecoration: 'none', fontFamily: 'Lato, sans-serif' }}>Contact</a>
          </div>
          <p style={{
            fontSize: '14px',
            opacity: 0.6,
            fontFamily: 'Lato, sans-serif'
          }}>
            © 2024 BakeBloom by Boboh. All rights reserved. Made with ❤️ in Nairobi.
          </p>
        </div>
      </footer>

      {/* Shopping Cart Modal */}
      {showCart && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          display: 'flex',
          justifyContent: 'flex-end',
          zIndex: 10000,
          backdropFilter: 'blur(5px)'
        }}
        onClick={() => setShowCart(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'white',
              width: '100%',
              maxWidth: '500px',
              height: '100vh',
              overflowY: 'auto',
              boxShadow: '-5px 0 30px rgba(0,0,0,0.3)',
              animation: 'slideInRight 0.3s ease-out'
            }}
          >
            <div style={{
              position: 'sticky',
              top: 0,
              background: 'white',
              padding: '25px',
              borderBottom: '1px solid #E5E5E5',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 1
            }}>
              <h2 style={{ fontSize: '28px', fontWeight: '700' }}>Your Cart</h2>
              <button
                onClick={() => setShowCart(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '5px'
                }}
              >
                <X size={28} color="#2C1810" />
              </button>
            </div>

            {cart.length === 0 ? (
              <div style={{
                padding: '60px 25px',
                textAlign: 'center',
                color: '#999'
              }}>
                <ShoppingCart size={80} style={{ opacity: 0.3, marginBottom: '20px' }} />
                <p style={{
                  fontSize: '18px',
                  fontFamily: 'Lato, sans-serif'
                }}>Your cart is empty</p>
              </div>
            ) : (
              <>
                <div style={{ padding: '25px' }}>
                  {cart.map(item => (
                    <div key={item.id} style={{
                      display: 'flex',
                      gap: '15px',
                      marginBottom: '20px',
                      padding: '15px',
                      background: '#FFF9F0',
                      borderRadius: '15px'
                    }}>
                      <img 
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: '80px',
                          height: '80px',
                          objectFit: 'cover',
                          borderRadius: '10px'
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <h4 style={{
                          fontSize: '16px',
                          fontWeight: '600',
                          marginBottom: '5px'
                        }}>{item.name}</h4>
                        <p style={{
                          fontSize: '14px',
                          color: '#666',
                          marginBottom: '10px',
                          fontFamily: 'Lato, sans-serif'
                        }}>KSh {item.price.toLocaleString()}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            style={{
                              background: 'white',
                              border: '1px solid #C17855',
                              borderRadius: '50%',
                              width: '30px',
                              height: '30px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer'
                            }}
                          >
                            <Minus size={14} color="#C17855" />
                          </button>
                          <span style={{
                            fontFamily: 'Lato, sans-serif',
                            fontWeight: '600',
                            minWidth: '30px',
                            textAlign: 'center'
                          }}>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            style={{
                              background: 'white',
                              border: '1px solid #C17855',
                              borderRadius: '50%',
                              width: '30px',
                              height: '30px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer'
                            }}
                          >
                            <Plus size={14} color="#C17855" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#DC2626',
                              cursor: 'pointer',
                              marginLeft: 'auto',
                              fontFamily: 'Lato, sans-serif',
                              fontSize: '13px',
                              fontWeight: '600'
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{
                  position: 'sticky',
                  bottom: 0,
                  background: 'white',
                  padding: '25px',
                  borderTop: '1px solid #E5E5E5'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                    fontSize: '24px',
                    fontWeight: '700'
                  }}>
                    <span>Total:</span>
                    <span className="gradient-text">KSh {cartTotal.toLocaleString()}</span>
                  </div>

                  <form onSubmit={handleCheckout}>
                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      value={orderForm.name}
                      onChange={(e) => setOrderForm({...orderForm, name: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        borderRadius: '10px',
                        border: '1px solid #E5E5E5',
                        marginBottom: '12px',
                        fontSize: '14px',
                        fontFamily: 'Lato, sans-serif'
                      }}
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      value={orderForm.email}
                      onChange={(e) => setOrderForm({...orderForm, email: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        borderRadius: '10px',
                        border: '1px solid #E5E5E5',
                        marginBottom: '12px',
                        fontSize: '14px',
                        fontFamily: 'Lato, sans-serif'
                      }}
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      required
                      value={orderForm.phone}
                      onChange={(e) => setOrderForm({...orderForm, phone: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        borderRadius: '10px',
                        border: '1px solid #E5E5E5',
                        marginBottom: '12px',
                        fontSize: '14px',
                        fontFamily: 'Lato, sans-serif'
                      }}
                    />
                    <select
                      value={orderForm.delivery}
                      onChange={(e) => setOrderForm({...orderForm, delivery: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        borderRadius: '10px',
                        border: '1px solid #E5E5E5',
                        marginBottom: '12px',
                        fontSize: '14px',
                        fontFamily: 'Lato, sans-serif'
                      }}
                    >
                      <option value="pickup">Pickup</option>
                      <option value="delivery">Delivery</option>
                    </select>
                    {orderForm.delivery === 'delivery' && (
                      <input
                        type="text"
                        placeholder="Delivery Address"
                        required
                        value={orderForm.address}
                        onChange={(e) => setOrderForm({...orderForm, address: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '12px 15px',
                          borderRadius: '10px',
                          border: '1px solid #E5E5E5',
                          marginBottom: '12px',
                          fontSize: '14px',
                          fontFamily: 'Lato, sans-serif'
                        }}
                      />
                    )}
                    <textarea
                      placeholder="Special instructions (optional)"
                      value={orderForm.notes}
                      onChange={(e) => setOrderForm({...orderForm, notes: e.target.value})}
                      rows="3"
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        borderRadius: '10px',
                        border: '1px solid #E5E5E5',
                        marginBottom: '15px',
                        fontSize: '14px',
                        fontFamily: 'Lato, sans-serif',
                        resize: 'vertical'
                      }}
                    />
                    <button
                      type="submit"
                      className="btn-primary"
                      style={{
                        width: '100%',
                        padding: '16px',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: '600',
                        fontFamily: 'Lato, sans-serif',
                        color: 'white'
                      }}
                    >
                      Place Order
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '20px',
          backdropFilter: 'blur(5px)'
        }}
        onClick={() => setSelectedProduct(null)}>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'white',
              borderRadius: '30px',
              maxWidth: '900px',
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 25px 80px rgba(0,0,0,0.4)',
              display: 'flex',
              animation: 'fadeInUp 0.3s ease-out'
            }}
          >
            <img 
              src={selectedProduct.image}
              alt={selectedProduct.name}
              style={{
                width: '50%',
                objectFit: 'cover'
              }}
            />
            <div style={{ padding: '40px', flex: 1 }}>
              <button
                onClick={() => setSelectedProduct(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  float: 'right'
                }}
              >
                <X size={28} color="#2C1810" />
              </button>
              
              <div style={{
                display: 'inline-block',
                background: 'rgba(193, 120, 85, 0.1)',
                padding: '6px 14px',
                borderRadius: '15px',
                fontSize: '13px',
                fontFamily: 'Lato, sans-serif',
                fontWeight: '600',
                color: '#8B4513',
                marginBottom: '15px'
              }}>
                {selectedProduct.category}
              </div>
              
              <h2 style={{
                fontSize: '36px',
                fontWeight: '700',
                marginBottom: '15px'
              }}>
                {selectedProduct.name}
              </h2>
              
              <p style={{
                fontSize: '18px',
                color: '#5C4033',
                fontFamily: 'Lato, sans-serif',
                lineHeight: '1.8',
                marginBottom: '25px'
              }}>
                {selectedProduct.description}
              </p>
              
              <div style={{
                fontSize: '42px',
                fontWeight: '700',
                color: '#C17855',
                marginBottom: '30px'
              }}>
                KSh {selectedProduct.price.toLocaleString()}
              </div>
              
              <button
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '18px',
                  border: 'none',
                  borderRadius: '15px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600',
                  fontFamily: 'Lato, sans-serif',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BakeBloomWebsite;