import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.chaingrid.xyz'; // Adjust as needed

const Otp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || ''; // Get email from Register.jsx

  const [formData, setFormData] = useState({
    otp: '',
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

    if (validate()) {
      try {
        const response = await axios.post(`${API_BASE_URL}/public/otp/`, {
          email,
          otp: formData.otp,
        });

        console.log('OTP verification successful:', response.data);
        // Redirect to success page or dashboard
        navigate('/dashboard'); // Adjust the redirect URL as needed
      } catch (error) {
        console.error('OTP verification failed:', error);
        setErrors({ submit: 'OTP verification failed. Please try again.' });
        setIsSubmitting(false);
      }
    } else {
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
     
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

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
              Verify OTP for <span className="text-white">ChainGrid</span>
            </h1>
            <p className="mt-4 text-gray-300 max-w-xl mx-auto text-lg">
              Enter the 6-digit OTP sent to {email || 'your email'} to verify your account.
            </p>
          </div>

          {errors.submit && <p className="text-center text-red-500 mb-4">{errors.submit}</p>}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="otp" className="block text-sm font-semibold mb-2 text-gray-300">
                OTP Code
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                value={formData.otp}
                onChange={handleChange}
                className={`w-full rounded-lg bg-background/50 border border-blue-500/30 text-white placeholder-gray-400 px-5 py-2 input-glow transition duration-300 ${
                  errors.otp ? 'border-red-500' : ''
                }`}
                placeholder="Enter 6-digit OTP"
                maxLength="6"
              />
              {errors.otp && <p className="mt-2 text-sm text-red-500">{errors.otp}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 rounded-lg shadow-lg shadow-blue-500/30 text-white font-extrabold text-lg transition-all duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>

        <p className="mt-8 text-center text-red-400 text-sm">Please check your mail inbox !</p>
          {/* <p className="mt-8 text-center text-gray-400 text-sm">
            Didn't receive an OTP?{' '}
            <a href="#" className="text-blue-400 hover:text-blue-600 font-semibold">
              Resend OTP
            </a>
          </p> */}
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

export default Otp;