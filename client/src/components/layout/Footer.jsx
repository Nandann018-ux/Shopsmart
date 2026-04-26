import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Globe, Mail, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg)', paddingTop: '100px', paddingBottom: '40px' }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '60px', marginBottom: '80px' }}>
          
          {/* Brand Info */}
          <div>
            <Link to="/" style={{ fontWeight: 900, fontSize: '18px', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '24px' }}>
              Urban Gear
            </Link>
            <p className="t-body" style={{ maxWidth: '300px', fontSize: '11px', lineHeight: 1.8 }}>
              Engineered necessities for the modern city explorer. High-performance field gear designed with architectural discipline.
            </p>
            <div style={{ display: 'flex', gap: '20px', marginTop: '32px' }}>
              <Camera size={18} style={{ color: 'var(--text-muted)' }} />
              <Globe size={18} style={{ color: 'var(--text-muted)' }} />
              <Mail size={18} style={{ color: 'var(--text-muted)' }} />
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="t-label-bright" style={{ marginBottom: '24px' }}>Deployment</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['All Units', 'Field Shirts', 'Ground Force', 'Time Pieces', 'Eye Wear'].map(l => (
                <li key={l}>
                  <Link to="/shop" className="t-label" style={{ fontSize: '10px', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--text)'} onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="t-label-bright" style={{ marginBottom: '24px' }}>Service</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Order Status', 'Field Testing', 'Shipping Details', 'Returns Policy', 'Contact Support'].map(l => (
                <li key={l}>
                  <span className="t-label" style={{ fontSize: '10px', cursor: 'default' }}>{l}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="t-label-bright" style={{ marginBottom: '24px' }}>Policy</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Privacy Protocol', 'Terms of Service', 'Security Standards', 'Cookies'].map(l => (
                <li key={l}>
                  <span className="t-label" style={{ fontSize: '10px', cursor: 'default' }}>{l}</span>
                </li>
              ))}
              <li style={{ marginTop: '12px' }}>
                <a href="https://outfit.hellohello.is" target="_blank" rel="noreferrer" className="t-label" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '9px' }}>
                  Visual Ref: Outfit <ArrowUpRight size={10} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '40px', borderTop: '1px solid var(--border)' }}>
          <div>
            <p className="t-label" style={{ fontSize: '9px' }}>© {currentYear} URBAN GEAR OPERATIONS. ALL RIGHTS RESERVED.</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p className="t-label" style={{ fontSize: '9px' }}>HQ // BENGALURU, INDIA</p>
            <p className="t-label" style={{ fontSize: '9px', marginTop: '4px' }}>IST · {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false })}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
