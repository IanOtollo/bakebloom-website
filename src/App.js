import React, { useState } from 'react';
import { Mail, Phone, Lock, CheckCircle, CreditCard, Smartphone } from 'lucide-react';

const BakeBloomWebsite = () => {
  // ===== PAYMENT GATE CONTROL =====
  
  const SHOW_PAYMENT_GATE = true;
  
  // DEVELOPER PAYMENT DETAILS
  const PAYMENT_INFO = {
    email: "ianotollo@gmail.com",
    mpesaNumber: "0700 399 641",
    paybill: "714777",
    accountNumber: "254700399641",
    whatsapp: "254112993859"
  };
  // ================================

  if (SHOW_PAYMENT_GATE) {
    return (
      <div style={{
        fontFamily: '"Playfair Display", "Georgia", serif',
        background: 'linear-gradient(135deg, #FFF9F0 0%, #FFE8D6 50%, #F5E6D3 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'auto',
        zIndex: 999999
      }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Lato:wght@300;400;600;700&display=swap');
          
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(2deg); }
          }
          
          @keyframes shine {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          
          .payment-container {
            animation: fadeInUp 0.8s ease-out;
          }
          
          .lock-badge {
            animation: float 3s ease-in-out infinite;
          }
          
          .payment-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .payment-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 50px rgba(139, 69, 19, 0.2);
          }
          
          .gradient-text {
            background: linear-gradient(135deg, #C17855 0%, #8B4513 50%, #D4A574 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
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
            transform: scale(1.02);
            box-shadow: 0 10px 30px rgba(139, 69, 19, 0.4);
          }
          
          .info-badge {
            transition: all 0.3s ease;
          }
          
          .info-badge:hover {
            transform: scale(1.05);
          }
        `}</style>

        <div className="payment-container" style={{
          maxWidth: '800px',
          width: '100%',
          margin: '0 auto'
        }}>
          {/* Header with Lock Badge */}
          <div style={{
            textAlign: 'center',
            marginBottom: '40px'
          }}>
            <div className="lock-badge" style={{
              width: '120px',
              height: '120px',
              background: 'linear-gradient(135deg, #C17855, #8B4513)',
              borderRadius: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 30px',
              boxShadow: '0 20px 50px rgba(139, 69, 19, 0.3)',
              border: '4px solid white'
            }}>
              <Lock size={60} color="white" strokeWidth={2} />
            </div>

            <div style={{
              display: 'inline-block',
              background: 'rgba(193, 120, 85, 0.1)',
              padding: '8px 20px',
              borderRadius: '25px',
              marginBottom: '20px',
              fontFamily: 'Lato, sans-serif',
              fontSize: '14px',
              fontWeight: '600',
              color: '#8B4513',
              letterSpacing: '1px'
            }}>
              🎂 WEBSITE READY
            </div>

            <h1 style={{
              fontSize: '48px',
              fontWeight: '700',
              marginBottom: '15px',
              color: '#2C1810',
              lineHeight: '1.2'
            }}>
              <span className="gradient-text">BakeBloom</span> by Boboh
            </h1>

            <p style={{
              fontSize: '20px',
              color: '#5C4033',
              fontFamily: 'Lato, sans-serif',
              fontWeight: '300',
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Your professional bakery website is complete and ready to launch. 
              Complete payment to activate all features.
            </p>
          </div>

          {/* Features Included */}
          <div style={{
            background: 'white',
            borderRadius: '25px',
            padding: '35px',
            marginBottom: '30px',
            boxShadow: '0 15px 40px rgba(139, 69, 19, 0.1)',
            border: '1px solid rgba(193, 120, 85, 0.1)'
          }}>
            <h3 style={{
              fontSize: '22px',
              fontWeight: '700',
              color: '#2C1810',
              marginBottom: '25px',
              fontFamily: 'Playfair Display, serif',
              textAlign: 'center'
            }}>
              ✨ Website Features Included
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px'
            }}>
              {[
                { icon: '🎨', text: 'Portfolio Gallery' },
                { icon: '🛒', text: 'E-commerce Shop' },
                { icon: '📅', text: 'Booking System' },
                { icon: '💳', text: 'Payment Ready' },
                { icon: '📱', text: 'Mobile Responsive' },
                { icon: '⚡', text: 'Fast & Optimized' }
              ].map((feature, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div className="info-badge" style={{
                    width: '45px',
                    height: '45px',
                    background: 'linear-gradient(135deg, #FFF9F0 0%, #FFE8D6 100%)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                    flexShrink: 0
                  }}>
                    {feature.icon}
                  </div>
                  <span style={{
                    fontSize: '15px',
                    color: '#5C4033',
                    fontFamily: 'Lato, sans-serif',
                    fontWeight: '500'
                  }}>
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Information Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '30px'
          }}>
            {/* M-Pesa Card */}
            <div className="payment-card" style={{
              background: 'white',
              borderRadius: '20px',
              padding: '30px',
              boxShadow: '0 10px 30px rgba(139, 69, 19, 0.1)',
              border: '2px solid rgba(193, 120, 85, 0.1)'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #10B981, #059669)',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <Smartphone size={32} color="white" />
              </div>

              <h4 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#2C1810',
                marginBottom: '20px',
                fontFamily: 'Playfair Display, serif'
              }}>
                M-Pesa Payment
              </h4>

              <div style={{
                fontFamily: 'Lato, sans-serif',
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#5C4033'
              }}>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '13px', color: '#999', marginBottom: '4px' }}>
                    Send Money to:
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#10B981' }}>
                    {PAYMENT_INFO.mpesaNumber}
                  </div>
                </div>

                <div style={{
                  borderTop: '1px solid #E5E5E5',
                  paddingTop: '15px',
                  marginTop: '15px'
                }}>
                  <div style={{ fontSize: '13px', color: '#999', marginBottom: '8px' }}>
                    Or Paybill:
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', color: '#666' }}>Business Number:</span>
                    <span style={{ fontWeight: '700', color: '#2C1810' }}>{PAYMENT_INFO.paybill}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '13px', color: '#666' }}>Account:</span>
                    <span style={{ fontWeight: '700', color: '#2C1810' }}>{PAYMENT_INFO.accountNumber}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="payment-card" style={{
              background: 'white',
              borderRadius: '20px',
              padding: '30px',
              boxShadow: '0 10px 30px rgba(139, 69, 19, 0.1)',
              border: '2px solid rgba(193, 120, 85, 0.1)'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #C17855, #8B4513)',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <Mail size={32} color="white" />
              </div>

              <h4 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#2C1810',
                marginBottom: '20px',
                fontFamily: 'Playfair Display, serif'
              }}>
                Contact Developer
              </h4>

              <div style={{
                fontFamily: 'Lato, sans-serif',
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#5C4033'
              }}>
                <div style={{ marginBottom: '15px' }}>
                  <div style={{ fontSize: '13px', color: '#999', marginBottom: '4px' }}>
                    Email:
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: '600', color: '#C17855', wordBreak: 'break-all' }}>
                    {PAYMENT_INFO.email}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '13px', color: '#999', marginBottom: '4px' }}>
                    Phone/WhatsApp:
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#2C1810' }}>
                    +{PAYMENT_INFO.whatsapp}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
            marginBottom: '30px'
          }}>
            <a
              href={`https://wa.me/${PAYMENT_INFO.whatsapp}?text=Hi!%20I'm%20ready%20to%20activate%20my%20BakeBloom%20website.%20I've%20completed%20the%20payment.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '18px 30px',
                borderRadius: '15px',
                color: 'white',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '600',
                fontFamily: 'Lato, sans-serif',
                boxShadow: '0 10px 30px rgba(139, 69, 19, 0.3)',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <Phone size={20} />
              WhatsApp Confirmation
            </a>

            <a
              href={`mailto:${PAYMENT_INFO.email}?subject=BakeBloom Website Payment&body=Hi,%0D%0A%0D%0AI have completed the payment for the BakeBloom website.%0D%0A%0D%0APlease activate the website.%0D%0A%0D%0AThank you!`}
              className="btn-primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '18px 30px',
                borderRadius: '15px',
                color: 'white',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '600',
                fontFamily: 'Lato, sans-serif',
                boxShadow: '0 10px 30px rgba(139, 69, 19, 0.3)',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <Mail size={20} />
              Email Confirmation
            </a>
          </div>

          {/* Instructions */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '30px',
            border: '1px solid rgba(193, 120, 85, 0.2)',
            textAlign: 'center'
          }}>
            <h4 style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#2C1810',
              marginBottom: '15px',
              fontFamily: 'Playfair Display, serif'
            }}>
              📋 Activation Process
            </h4>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              fontFamily: 'Lato, sans-serif',
              fontSize: '15px',
              color: '#5C4033',
              textAlign: 'left',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '30px',
                  height: '30px',
                  background: 'linear-gradient(135deg, #C17855, #8B4513)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '700',
                  flexShrink: 0
                }}>1</div>
                <span>Complete payment via M-Pesa</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '30px',
                  height: '30px',
                  background: 'linear-gradient(135deg, #C17855, #8B4513)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '700',
                  flexShrink: 0
                }}>2</div>
                <span>Send confirmation via WhatsApp or Email</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '30px',
                  height: '30px',
                  background: 'linear-gradient(135deg, #C17855, #8B4513)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '700',
                  flexShrink: 0
                }}>3</div>
                <span>Website activated within 1 hour</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '30px',
                  height: '30px',
                  background: 'linear-gradient(135deg, #10B981, #059669)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <CheckCircle size={18} color="white" />
                </div>
                <span style={{ fontWeight: '600', color: '#10B981' }}>Start accepting orders!</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={{
            marginTop: '30px',
            textAlign: 'center',
            fontFamily: 'Lato, sans-serif',
            fontSize: '14px',
            color: '#999'
          }}>
            <p>
              🔒 Secure payment • Professional support • Fast activation
            </p>
            <p style={{ marginTop: '10px' }}>
              All website features are complete and tested. Ready to launch immediately.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ===== WEBSITE UNLOCKED - SHOW FULL SITE =====
  return (
    <div style={{
      fontFamily: '"Playfair Display", "Georgia", serif',
      background: '#FFF9F0',
      color: '#2C1810',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '50px',
      textAlign: 'center'
    }}>
      <div>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>
          <span className="gradient-text">BakeBloom</span> by Boboh
        </h1>
        <p style={{ fontSize: '20px', color: '#666', fontFamily: 'Lato, sans-serif' }}>
          ✅ Website Activated! Ready to use.
        </p>
        <p style={{ fontSize: '16px', color: '#999', marginTop: '20px', fontFamily: 'Lato, sans-serif' }}>
          Replace this file with the full bakebloom-website.jsx code.
        </p>
      </div>
      
      <style>{`
        .gradient-text {
          background: linear-gradient(135deg, #C17855 0%, #8B4513 50%, #D4A574 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </div>
  );
};

export default BakeBloomWebsite;
