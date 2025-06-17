import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import toast from 'react-hot-toast';

const Register = () => {
  // Extract referId from URL query parameters
  const queryParams = new URLSearchParams(window.location.search);
  const referId = queryParams.get('referId') || '';

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    referralCode: referId, // Initialize with referId if present
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {}; 

    // Username validation
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (formData.username.length > 20) {
      newErrors.username = 'Username must not exceed 20 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords must match';
    }

    // Referral code is optional, no validation needed
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validate()) {
      setIsSubmitting(false);
      toast.error('Please fix the errors in the form');
      return;
    }

    try {
      const payload = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        referral_code: formData.referralCode || null,
      };

      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/register`, payload);

      console.log('Registration response:', response.data); // Debug

      if (response.data.token && response.data.user) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        toast.success('Registration successful! Please verify your OTP.');
        navigate('/otp');
      } else {
        toast.error(response.data.message || 'Registration failed');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred during registration';
      const apiErrors = error.response?.data?.errors || {};
      setErrors({
        ...errors,
        ...Object.keys(apiErrors).reduce((acc, key) => ({
          ...acc,
          [key]: apiErrors[key][0],
        }), {}),
      });
      toast.error(errorMessage);
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isSubmitting) {
      validate();
    }
  }, [formData, isSubmitting]);

  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-[#0f172a] text-[#e0e7ff] font-inter">
      {/* Background elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

      {/* Floating elements */}
      <div className="absolute top-1/3 right-10 md:right-1/6 hidden md:block">
        <div className="w-16 h-16 bg-blue-500/20 backdrop-blur-sm rounded-xl floating"></div>
      </div>
      <div className="absolute bottom-1/4 left-10 md:left-1/5 hidden md:block">
        <div className="w-12 h-12 bg-purple-500/20 backdrop-blur-sm rounded-xl floating" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl">
        <div className="bg-secondary/80 backdrop-blur-sm border border-blue-500/20 rounded-3xl p-10 shadow-xl">
          <div className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent glow-text tracking-tight">
              Register for <span className="text-white">ChainGrid</span>
            </h1>
            <p className="mt-4 text-gray-300 max-w-xl mx-auto text-lg">
              Create your account to start mining cryptocurrency securely and efficiently.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="username" className="block text-sm font-semibold mb-2 text-gray-300">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className={`w-full rounded-lg bg-background/50 border border-blue-500/30 text-white placeholder-gray-400 px-5 py-2 input-glow transition duration-300 ${
                  errors.username ? 'border-red-500' : ''
                }`}
                placeholder="Enter your username"
              />
              {errors.username && <p className="mt-2 text-sm text-red-500">{errors.username}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-300">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full rounded-lg bg-background/50 border border-blue-500/30 text-white placeholder-gray-400 px-5 py-2 input-glow transition duration-300 ${
                  errors.email ? 'border-red-500' : ''
                }`}
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold mb-2 text-gray-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full rounded-lg bg-background/50 border border-blue-500/30 text-white placeholder-gray-400 px-5 py-2 input-glow transition duration-300 ${
                  errors.password ? 'border-red-500' : ''
                }`}
                placeholder="Enter your password"
              />
              {errors.password && <p className="mt-2 text-sm text-red-500">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-2 text-gray-300">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full rounded-lg bg-background/50 border border-blue-500/30 text-white placeholder-gray-400 px-5 py-2 input-glow transition duration-300 ${
                  errors.confirmPassword ? 'border-red-500' : ''
                }`}
                placeholder="Re-enter your password"
              />
              {errors.confirmPassword && <p className="mt-2 text-sm text-red-500">{errors.confirmPassword}</p>}
            </div>

            <div className="mb-2">
              <label htmlFor="referralCode" className="block text-sm font-semibold mb-2 text-gray-300">
                Referral Code (Optional)
              </label>
              {referId ? (
                <input
                  id="referralCode"
                  name="referralCode"
                  type="text"
                  readOnly
                  value={referId}
                  className="w-full rounded-lg bg-background/50 border border-blue-500/30 text-white placeholder-gray-400 px-5 py-2 input-glow transition duration-300"
                  placeholder="Enter referral code"
                />
              ) : (
                <input
                  id="referralCode"
                  name="referralCode"
                  type="text"
                  value={formData.referralCode}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-background/50 border border-blue-500/30 text-white placeholder-gray-400 px-5 py-2 input-glow transition duration-300"
                  placeholder="Enter referral code"
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 rounded-lg shadow-lg shadow-blue-500/30 text-white font-extrabold text-lg transition-all duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </form>

          <p className="mt-8 text-center text-gray-400 text-sm">
            Already have an account?{' '}
            <a href="/login" className="text-blue-400 hover:text-blue-600 font-semibold">
              Login here
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        .gradient-text {
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .glow-text {
          text-shadow: 0 0 8px rgba(139, 92, 246, 0.7), 0 0 15px rgba(59, 130, 246, 0.7);
        }
        .input-glow:focus {
          outline: none;
          box-shadow: 0 0 8px 2px rgba(59, 130, 246, 0.7);
          border-color: #3b82f6;
          background-color: rgba(59, 130, 246, 0.1);
        }
        .floating {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </section>
  );
};

export default Register;