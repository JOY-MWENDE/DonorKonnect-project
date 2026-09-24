// Dashboard — rich visual donor overview with clinic hero scene, ECG pulse, stat cards, quick actions & blood compatibility
import { useNavigate } from 'react-router-dom';
import { Droplet, Heart, Calendar, CalendarClock, Activity, PhoneCall, History, ToggleRight, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../auth';
import { useToast } from '../toast';
import DashboardCard from '../components/DashboardCard';
import StatusBadge from '../components/StatusBadge';
import { getDonations, formatDate, eligibleDate } from '../store';
import { HeroClinicIllustration, HeartbeatWave, BloodCompatibilityMatrix } from '../assets/illustrations';

export default function Dashboard() {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  if (!user) return null;

  const donations = getDonations();
  const total = donations.length;
  const lastDate = user.lastDonation || (donations[0]?.date ?? null);
  const nextEligible = eligibleDate(lastDate);
  const estimatedLivesSaved = total * 3;

  const toggleAvailability = () => {
    const updated = { ...user, available: !user.available };
    updateProfile(updated);
    toast(
      `Your donation status is now ${updated.available ? 'Available' : 'Unavailable'}.`,
      updated.available ? 'success' : 'info'
    );
  };

  const quickActions = [
    { title: 'Donate Blood', sub: 'Record a new donation', icon: Droplet, bg: 'var(--primary-50)', color: 'var(--primary-500)', to: '/donate' },
    { title: 'Emergency Requests', sub: 'Urgent calls near you', icon: PhoneCall, bg: 'var(--error-50)', color: 'var(--error-500)', to: '/emergency' },
    { title: 'Donation History', sub: `${total} records registered`, icon: History, bg: 'var(--warning-50)', color: 'var(--warning-500)', to: '/history' },
    { title: 'Digital Donor Card', sub: 'View & download badge', icon: ShieldCheck, bg: 'var(--primary-50)', color: 'var(--primary-600)', to: '/profile' },
  ];

  return (
    <div>
      {/* Compact Visual Hero Banner */}
      <div className="blood-hero-rich">
        <div className="bhr-container">
          <div className="bhr-content">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
              <div className="bhr-kicker">
                <Sparkles size={13} />
                <span>Lifesaver Network · Active Donor</span>
              </div>
              <div className="bhr-meta-bar" style={{ marginTop: 0 }}>
                <div className="bhr-group-badge">
                  <span className="bhr-group-lbl">Group</span>
                  <span className="bhr-group-val">{user.bloodGroup}</span>
                </div>
                <button
                  onClick={toggleAvailability}
                  style={{
                    background: user.available ? '#10b981' : 'rgba(255, 255, 255, 0.25)',
                    color: '#fff',
                    padding: '4px 12px',
                    borderRadius: 999,
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    border: '1px solid rgba(255,255,255,0.4)',
                    transition: 'all 200ms ease',
                  }}
                  title="Click to toggle availability"
                >
                  <span className={user.available ? 'bhr-pulse-dot' : ''} style={{ background: user.available ? '#fff' : '#cbd5e1' }} />
                  {user.available ? 'Available' : 'Resting'}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
              <h1 className="bhr-title" style={{ fontSize: '1.45rem', marginBottom: 0 }}>
                Welcome back, {user.fullName.split(' ')[0]}!
              </h1>
              <span style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.84rem' }}>
                <strong>{total} donations</strong> recorded · ~<strong>{estimatedLivesSaved} lives protected</strong>
              </span>
            </div>

            {/* Pulsing ECG Rhythm Wave (compact) */}
            <div className="bhr-ecg-track" style={{ marginTop: 2 }}>
              <HeartbeatWave height={20} stroke="#ffffff" strokeWidth={2} animated={true} />
            </div>
          </div>

          {/* Visual Scene Illustration (compact scaled) */}
          <div className="bhr-art" style={{ maxHeight: 110, overflow: 'hidden', display: 'flex', justifyContent: 'flex-end' }}>
            <HeroClinicIllustration style={{ maxHeight: 110, width: 'auto' }} />
          </div>
        </div>
      </div>

      {/* 5 Compact Stat Cards */}
      <div className="cards-grid-5 section-gap">
        <DashboardCard
          icon={Droplet}
          iconBg="var(--primary-50)"
          iconColor="var(--primary-500)"
          label="Blood Group"
          value={user.bloodGroup}
          sub="Registered Type"
        />
        <DashboardCard
          icon={Activity}
          iconBg={user.available ? 'var(--success-50)' : 'var(--neutral-100)'}
          iconColor={user.available ? 'var(--success-500)' : 'var(--neutral-500)'}
          label="Status"
          value={user.available ? 'Available' : 'Resting'}
          sub="Visible to ICUs"
        />
        <DashboardCard
          icon={Heart}
          iconBg="var(--error-50)"
          iconColor="var(--error-500)"
          label="Donations"
          value={total}
          sub={`~${estimatedLivesSaved} lives saved`}
        />
        <DashboardCard
          icon={Calendar}
          iconBg="var(--warning-50)"
          iconColor="var(--warning-500)"
          label="Last Donation"
          value={formatDate(lastDate)}
          sub={lastDate ? 'Verified donor' : 'No records yet'}
        />
        <DashboardCard
          icon={CalendarClock}
          iconBg="var(--primary-50)"
          iconColor="var(--primary-500)"
          label="Next Eligible"
          value={formatDate(nextEligible)}
          sub="Safe 3-mo interval"
        />
      </div>

      {/* Two-Column Lower Hub: Quick Actions & Emergency Urgency on Left, Compatibility Matcher on Right */}
      <div className="dash-columns section-gap">
        {/* Left Column: Urgent Alert + Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Emergency Urgent Banner (compact) */}
          <div
            className="card card-pad"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 241, 242, 0.95) 0%, rgba(254, 226, 226, 0.95) 100%)',
              borderColor: '#fca5a5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              padding: '10px 14px',
              boxShadow: '0 4px 14px rgba(239, 68, 68, 0.12)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                className="dc-icon"
                style={{
                  background: 'linear-gradient(135deg, #dc2626, #991b1b)',
                  color: '#fff',
                  margin: 0,
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  flexShrink: 0,
                }}
              >
                <PhoneCall size={18} />
              </div>
              <div>
                <h4 style={{ margin: 0, color: '#991b1b', fontSize: '0.88rem', fontWeight: 800 }}>
                  Urgent Blood Requests Active
                </h4>
                <p className="text-muted" style={{ margin: 0, fontSize: '0.74rem' }}>
                  Emergency surgeries in Nairobi need matching donors.
                </p>
              </div>
            </div>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => navigate('/emergency')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '5px 12px', fontSize: '0.78rem' }}
            >
              <span>Respond</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Quick Actions (compact 2x2 grid) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {quickActions.map((qa) => (
              <button key={qa.title} className="quick-action" onClick={() => navigate(qa.to)} style={{ padding: '10px 12px', gap: 10 }}>
                <div className="qa-icon" style={{ background: qa.bg, color: qa.color, width: 34, height: 34, borderRadius: 8, margin: 0, flexShrink: 0 }}>
                  <qa.icon size={18} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div className="qa-title" style={{ fontSize: '0.82rem', fontWeight: 700 }}>{qa.title}</div>
                  <div className="qa-sub" style={{ fontSize: '0.7rem' }}>{qa.sub}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Blood Compatibility Matcher */}
        <div>
          <BloodCompatibilityMatrix defaultType={user.bloodGroup} />
        </div>
      </div>
    </div>
  );
}
