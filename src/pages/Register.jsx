// Register page — rich registration with vector art & comprehensive donor profiling
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Droplet, User, Mail, Lock, Phone, MapPin } from 'lucide-react';
import { useAuth } from '../auth';
import { useToast } from '../toast';
import { AuthHeroIllustration } from '../assets/illustrations';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const GENDERS = ['Male', 'Female', 'Other'];

export default function Register() {
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirm: '',
    bloodGroup: '',
    gender: '',
    phone: '',
    location: '',
  });
  const [showPwd, setShowPwd] = useState(false);
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required.';
    if (!form.email) e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email address.';
    if (!form.password) e.password = 'Password is required.';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters.';
    if (form.confirm !== form.password) e.confirm = 'Passwords do not match.';
    if (!form.bloodGroup) e.bloodGroup = 'Please select your blood group.';
    if (!form.gender) e.gender = 'Please select your gender.';
    if (!form.phone.trim()) e.phone = 'Phone number is required.';
    if (!form.location.trim()) e.location = 'Location is required.';
    if (!agree) e.agree = 'You must accept the terms and conditions.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) {
      toast('Please fill in all required fields.', 'error');
      return;
    }
    const res = register(form);
    if (!res.ok) {
      toast(res.error, 'error');
      return;
    }
    toast('Account created successfully! Welcome to DonorKonnect.', 'success');
    navigate('/dashboard');
  };

  const inputIcon = (Icon) => (
    <Icon size={18} style={{ position: 'absolute', left: 14, top: 14, color: 'var(--neutral-400)' }} />
  );

  return (
    <div className="auth-page">
      <aside className="auth-aside">
        <div className="aside-brand">
          <div className="brand-mark" style={{ boxShadow: '0 8px 20px rgba(0,0,0,0.2)' }}>
            <Droplet size={28} fill="#fff" color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, letterSpacing: '-0.02em' }}>DonorKonnect</div>
            <div style={{ fontSize: '0.82rem', opacity: 0.85 }}>Connecting Blood Donors. Saving Lives.</div>
          </div>
        </div>

        <div style={{ margin: '16px 0', display: 'flex', justifyContent: 'center' }}>
          <AuthHeroIllustration />
        </div>

        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: 8 }}>
            Become a Verified Lifesaver
          </h2>
          <p className="aside-quote" style={{ opacity: 0.9 }}>
            Join thousands of voluntary donors who stand ready to give blood when emergencies strike. Registering takes less than 2 minutes.
          </p>
        </div>

        <div className="aside-stats" style={{ paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.2)' }}>
          <div>
            <div className="stat-num">8</div>
            <div className="stat-label">Blood Types</div>
          </div>
          <div>
            <div className="stat-num">24/7</div>
            <div className="stat-label">Support</div>
          </div>
          <div>
            <div className="stat-num">100%</div>
            <div className="stat-label">Free Service</div>
          </div>
        </div>
      </aside>

      <div className="auth-form-side">
        <form
          className="form-card"
          onSubmit={handleSubmit}
          noValidate
          style={{
            maxWidth: 520,
            background: '#ffffff',
            padding: '36px 32px',
            borderRadius: '24px',
            boxShadow: '0 20px 48px rgba(15, 23, 42, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)',
            border: '1px solid var(--neutral-200)',
          }}
        >
          <div className="auth-brand-mobile">
            <div className="brand-name" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <Droplet size={24} fill="var(--primary-600)" color="var(--primary-600)" />
              <span>DonorKonnect</span>
            </div>
            <div className="text-muted text-sm">Connecting Blood Donors. Saving Lives.</div>
          </div>

          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: 4, color: 'var(--neutral-900)' }}>
            Create Donor Account
          </h1>
          <p className="text-muted mb-6">Join the donor network and help patients in need.</p>

          <div className="form-group">
            <label htmlFor="fullName">Full Name <span className="req">*</span></label>
            <div className="password-wrap">
              {inputIcon(User)}
              <input
                id="fullName"
                className={`input ${errors.fullName ? 'error' : ''}`}
                style={{ paddingLeft: 42, height: 44 }}
                placeholder="Joy Mwende"
                value={form.fullName}
                onChange={set('fullName')}
              />
            </div>
            {errors.fullName && <div className="form-error">{errors.fullName}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address <span className="req">*</span></label>
            <div className="password-wrap">
              {inputIcon(Mail)}
              <input
                id="email"
                type="email"
                className={`input ${errors.email ? 'error' : ''}`}
                style={{ paddingLeft: 42, height: 44 }}
                placeholder="you@example.com"
                value={form.email}
                onChange={set('email')}
              />
            </div>
            {errors.email && <div className="form-error">{errors.email}</div>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="form-group">
              <label htmlFor="password">Password <span className="req">*</span></label>
              <div className="password-wrap">
                {inputIcon(Lock)}
                <input
                  id="password"
                  type={showPwd ? 'text' : 'password'}
                  className={`input ${errors.password ? 'error' : ''}`}
                  style={{ paddingLeft: 42, paddingRight: 40, height: 44 }}
                  placeholder="Min. 6 chars"
                  value={form.password}
                  onChange={set('password')}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPwd(!showPwd)}
                  aria-label={showPwd ? 'Hide password' : 'Show password'}
                >
                  {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <div className="form-error">{errors.password}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="confirm">Confirm Password <span className="req">*</span></label>
              <div className="password-wrap">
                {inputIcon(Lock)}
                <input
                  id="confirm"
                  type={showPwd ? 'text' : 'password'}
                  className={`input ${errors.confirm ? 'error' : ''}`}
                  style={{ paddingLeft: 42, height: 44 }}
                  placeholder="Re-enter"
                  value={form.confirm}
                  onChange={set('confirm')}
                />
              </div>
              {errors.confirm && <div className="form-error">{errors.confirm}</div>}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="form-group">
              <label htmlFor="bloodGroup">Blood Group <span className="req">*</span></label>
              <select
                id="bloodGroup"
                className={`select ${errors.bloodGroup ? 'error' : ''}`}
                style={{ height: 44, fontWeight: 700 }}
                value={form.bloodGroup}
                onChange={set('bloodGroup')}
              >
                <option value="">Select</option>
                {BLOOD_GROUPS.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
              {errors.bloodGroup && <div className="form-error">{errors.bloodGroup}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender <span className="req">*</span></label>
              <select
                id="gender"
                className={`select ${errors.gender ? 'error' : ''}`}
                style={{ height: 44 }}
                value={form.gender}
                onChange={set('gender')}
              >
                <option value="">Select</option>
                {GENDERS.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
              {errors.gender && <div className="form-error">{errors.gender}</div>}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="form-group">
              <label htmlFor="phone">Phone Number <span className="req">*</span></label>
              <div className="password-wrap">
                {inputIcon(Phone)}
                <input
                  id="phone"
                  className={`input ${errors.phone ? 'error' : ''}`}
                  style={{ paddingLeft: 42, height: 44 }}
                  placeholder="+254 700 000 000"
                  value={form.phone}
                  onChange={set('phone')}
                />
              </div>
              {errors.phone && <div className="form-error">{errors.phone}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="location">City / Location <span className="req">*</span></label>
              <div className="password-wrap">
                {inputIcon(MapPin)}
                <input
                  id="location"
                  className={`input ${errors.location ? 'error' : ''}`}
                  style={{ paddingLeft: 42, height: 44 }}
                  placeholder="Nairobi, Kenya"
                  value={form.location}
                  onChange={set('location')}
                />
              </div>
              {errors.location && <div className="form-error">{errors.location}</div>}
            </div>
          </div>

          <div className="checkbox-row mb-6 mt-2">
            <input
              id="agree"
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <label htmlFor="agree" style={{ fontSize: '0.85rem' }}>
              I agree to the <a href="#terms" onClick={(e) => { e.preventDefault(); toast('Terms: voluntary donor terms & emergency contact rights apply.', 'info'); }}>Terms & Conditions</a> and consent to be contacted for urgent blood needs.
            </label>
          </div>
          {errors.agree && <div className="form-error mb-4">{errors.agree}</div>}

          <button
            type="submit"
            className="btn btn-primary btn-block btn-lg"
            style={{ height: 48, fontWeight: 700 }}
          >
            Create Donor Account
          </button>

          <div className="text-center mt-5">
            <span className="text-muted text-sm">Already have an account? </span>
            <Link to="/login" style={{ fontWeight: 700 }}>Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
