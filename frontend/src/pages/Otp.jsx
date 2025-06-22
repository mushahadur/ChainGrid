import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Otp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    otp: '',
    token: localStorage.getItem('otp_token') || '', // Assume token is stored from set-data
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.otp) {
      newErrors.otp = 'OTP is required';
    } else if (!/^\d{6}$/.test(formData.otp)) {
      newErrors.otp = 'OTP must be a 6-digit number';
    }

    if (!formData.token) {
      newErrors.token = 'Session token is missing. Please request a new OTP.';
    }

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
    setErrors({});

    if (!validate()) {
      setIsSubmitting(false);
      return;
    }

    try {
      // Verify OTP
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/send-otp`, {
        token: formData.token,
        otp: formData.otp,
      });

      if (response.data.success) {
        localStorage.removeItem('otp_token'); // Clean up token
        navigate('/download'); // Redirect to download path
      } else {
        setErrors({ submit: response.data.message || 'OTP verification failed.' });
      }
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || 'OTP verification failed. Please try again.',
      });
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
    <section className="relative min-h-screen flex items-center justify-center bg-gray-900 text-white font-inter">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
      <div className="relative z-10 w-full max-w-md mx-auto p-8 bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-2xl border border-blue-500/30">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Verify OTP
          </h1>
          <p className="mt-3 text-gray-300 text-sm">
            Enter the 6-digit OTP sent to your email to verify your account.
          </p>
        </div>

        {errors.submit && (
          <p className="text-center text-red-400 mb-4 text-sm">{errors.submit}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-200 mb-2">
              OTP Code
            </label>
            <input
              id="otp"
              name="otp"
              type="text"
              value={formData.otp}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg bg-gray-700/50 border ${
                errors.otp ? 'border-red-500' : 'border-blue-500/40'
              } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-center tracking-widest`}
              placeholder="123456"
              maxLength="6"
              autoComplete="off"
            />
            {errors.otp && <p className="mt-2 text-sm text-red-400">{errors.otp}</p>}
            {errors.token && <p className="mt-2 text-sm text-red-400">{errors.token}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 rounded-lg text-white font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Check your email (including spam/junk) for the OTP.
        </p>
        <p className="mt-2 text-center text-gray-400 text-sm">
          Didn't receive an OTP?{' '}
          <a href="/request-otp" className="text-blue-400 hover:underline">
            Request a new one
          </a>
        </p>
      </div>

      <style jsx>{`
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </section>
  );
};

export default Otp;