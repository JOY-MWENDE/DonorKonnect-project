// Landing Page — Simple, clean overview of DonorKonnect
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Heart,
} from 'lucide-react';
import Logo from '../components/Logo';
import { useAuth } from '../auth';
import { HeroClinicIllustration, HeartbeatWave } from '../assets/illustrations';

export default function Landing() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', color: '#fff' }}>
      {/* Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(15, 23, 42, 0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '12px 24px',
        }}
      >
        <div
          style={{
            maxWidth: 1000,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <Logo size={34} />
            <div>
              <div style={{ color: '#fff', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em', lineHeight: 1 }}>
                DonorKonnect
              </div>
              <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.68rem' }}>
                Blood Donation & Emergency
              </div>
            </div>
          </Link>

          {/* Quick Nav Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {user ? (
              <button
                className="btn btn-primary"
                onClick={() => navigate('/dashboard')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '7px 16px',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                }}
              >
                <span>Dashboard ({user.bloodGroup})</span>
                <ArrowRight size={15} />
              </button>
            ) : (
              <>
                <button
                  className="btn btn-ghost"
                  onClick={() => navigate('/login')}
                  style={{ color: '#fff', fontSize: '0.84rem', padding: '7px 14px' }}
                >
                  Sign In
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate('/register')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '7px 16px',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                  }}
                >
                  <span>Become a Donor</span>
                  <ArrowRight size={15} />
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, maxWidth: 1000, width: '100%', margin: '0 auto', padding: '32px 20px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* Simple Hero Section */}
        <section
          style={{
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: 20,
            padding: '40px 36px',
            boxShadow: '0 16px 36px rgba(0, 0, 0, 0.28)',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 32, alignItems: 'center' }} className="landing-hero-grid">
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: '0.78rem',
                  color: '#f87171',
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  padding: '4px 10px',
                  borderRadius: 999,
                  fontWeight: 600,
                  marginBottom: 16,
                }}
              >
                <Sparkles size={13} />
                <span>Real-Time Blood Donor Lifeline</span>
              </div>

              <h1
                style={{
                  fontSize: 'clamp(1.9rem, 3.8vw, 2.7rem)',
                  lineHeight: 1.18,
                  fontWeight: 800,
                  color: '#fff',
                  marginBottom: 16,
                  letterSpacing: '-0.02em',
                }}
              >
                A Simple Way to Donate Blood &amp; Save Lives.
              </h1>

              <p
                style={{
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  color: 'rgba(255, 255, 255, 0.85)',
                  marginBottom: 28,
                  maxWidth: 500,
                }}
              >
                DonorKonnect connects voluntary blood donors directly with hospitals in urgent need. Register in seconds, get notified during emergencies, and help save lives when it matters most.
              </p>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
                {user ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate('/dashboard')}
                    style={{ padding: '10px 22px', fontSize: '0.92rem', fontWeight: 700 }}
                  >
                    Go to Your Dashboard
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate('/register')}
                    style={{ padding: '10px 22px', fontSize: '0.92rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 8 }}
                  >
                    <Heart size={16} />
                    <span>Join as a Donor</span>
                  </button>
                )}

                <button
                  className="btn btn-outline"
                  onClick={() => navigate(user ? '/emergency' : '/login')}
                  style={{
                    padding: '10px 20px',
                    fontSize: '0.92rem',
                    color: '#fff',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    background: 'rgba(255, 255, 255, 0.08)',
                  }}
                >
                  View Emergency Requests
                </button>
              </div>

              <div style={{ maxWidth: 360, opacity: 0.85 }}>
                <HeartbeatWave height={22} stroke="#ffffff" strokeWidth={2} animated={true} />
              </div>
            </div>

            {/* Illustration */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 16,
                  padding: 18,
                  width: '100%',
                  maxWidth: 380,
                }}
              >
                <HeroClinicIllustration />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Clean Footer */}
      <footer
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(15, 23, 42, 0.95)',
          padding: '20px 24px',
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '0.78rem',
        }}
      >
        <div
          style={{
            maxWidth: 1000,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Logo size={24} />
            <span style={{ color: '#fff', fontWeight: 700 }}>DonorKonnect</span>
            <span>· Blood Donation &amp; Emergency Dispatch</span>
          </div>
          <div>&copy; 2026 DonorKonnect. Voluntary Lifesaver Network.</div>
        </div>
      </footer>
    </div>
  );
}
