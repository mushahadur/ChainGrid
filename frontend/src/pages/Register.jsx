import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

// Constants
const VALIDATION_RULES = {
  name: {
    required: true,
    minLength: 3,
    maxLength: 255,
    pattern: /^[a-zA-Z\s-]+$/,
    message: 'Name can only contain letters, spaces, and hyphens',
  },
  username: {
    required: true,
    minLength: 3,
    maxLength: 255,
    pattern: /^[a-zA-Z0-9_]+$/,
    message: 'Username can only contain letters, numbers, and underscores',
  },
  email: {
    required: true,
    pattern: /\S+@\S+\.\S+/,
    message: 'Invalid email format',
  },
  password: {
    required: true,
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
    message: 'Password must be at least 8 characters with one uppercase, one lowercase, and one number.',
  },
};

const Register = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // Extract referId from URL
  const getReferId = () => new URLSearchParams(window.location.search).get('referId') || '';
  const referId = getReferId();

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    referral_code: referId,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({});

  // Validation function
  const validateField = useCallback((name, value) => {
    const rule = VALIDATION_RULES[name];
    if (!rule) return '';

    if (rule.required && !value.trim()) return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    if (value && rule.minLength && value.length < rule.minLength)
      return `${name.charAt(0).toUpperCase() + name.slice(1)} must be at least ${rule.minLength} characters`;
    if (value && rule.maxLength && value.length > rule.maxLength)
      return `${name.charAt(0).toUpperCase() + name.slice(1)} must not exceed ${rule.maxLength} characters`;
    if (value && rule.pattern && !rule.pattern.test(value)) return rule.message;

    return '';
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};
    Object.keys(VALIDATION_RULES).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    if (!formData.password_confirmation) {
      newErrors.password_confirmation = 'Please confirm your password';
    } else if (formData.password_confirmation !== formData.password) {
      newErrors.password_confirmation = 'Passwords must match';
    }

    return newErrors;
  }, [formData, validateField]);

  // Handle input changes
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    },
    [errors]
  );

  // Handle field blur
  const handleBlur = useCallback(
    (e) => {
      const { name, value } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));

      if (name === 'password_confirmation') {
        const confirmError = value !== formData.password ? 'Passwords must match' : '';
        setErrors((prev) => ({ ...prev, password_confirmation: confirmError }));
      } else {
        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    },
    [formData.password, validateField]
  );

  // API call
  const registerUser = async (userData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/set-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        localStorage.setItem('otp_token', response.data.token);
        localStorage.setItem('user_email', formData.email);
        if (data.errors) {
          throw { message: 'Validation error', errors: data.errors };
        }
        throw new Error(data.message || 'Registration failed');
      }

      return data;
    } catch (error) {
      console.error('Registration API Error:', error);
      throw error;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      toast({
        title: 'Validation Error',
        description: 'Please fix the errors below.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const apiData = {
        name: formData.name.trim(),
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
        password_confirmation: formData.password_confirmation,
        ...(formData.referral_code.trim() && { referral_code: formData.referral_code.trim() }),
      };

      const response = await registerUser(apiData);
      toast({
        title: 'Success',
        description: 'Registration successful! Check your email for OTP.',
      });

      // Store token securely (e.g., in state management or HTTP-only cookie)
      // Avoid localStorage for sensitive data
      navigate('/otp');
    } catch (error) {
      if (error.errors) {
        setErrors(error.errors);
        toast({
          title: 'Validation Error',
          description: 'Please fix the errors below.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: error.message || 'Registration failed. Please try again.',
          variant: 'destructive',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen pt-20 mt-20 pb-16 bg-slate-900 text-slate-100">
      <div className="container mx-auto px-4 max-w-md">
        <div className="bg-slate-800/80 backdrop-blur-md border border-blue-500/20 rounded-2xl p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Join ChainGrid
            </h1>
            <p className="mt-2 text-slate-400 text-sm">Create your account to start mining cryptocurrency</p>
          </div>

          {/* Form */}
          <div className="space-y-4">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-slate-300">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 rounded-lg bg-slate-700/50 border text-white placeholder-slate-400 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200
                    ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 hover:border-slate-500'}`}
                  placeholder="Enter your full name"
                  autoComplete="name"
                />
                {errors.name && touched.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                )}
              </div>

              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium mb-2 text-slate-300">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 rounded-lg bg-slate-700/50 border text-white placeholder-slate-400 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200
                    ${errors.username ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 hover:border-slate-500'}`}
                  placeholder="Choose a username"
                  autoComplete="username"
                />
                {errors.username && touched.username && (
                  <p className="mt-1 text-sm text-red-400">{errors.username}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-slate-300">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 rounded-lg bg-slate-700/50 border text-white placeholder-slate-400 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200
                    ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 hover:border-slate-500'}`}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
                {errors.email && touched.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2 text-slate-300">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 rounded-lg bg-slate-700/50 border text-white placeholder-slate-400 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200
                    ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 hover:border-slate-500'}`}
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                />
                {errors.password && touched.password && (
                  <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="password_confirmation" className="block text-sm font-medium mb-2 text-slate-300">
                  Confirm Password
                </label>
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 rounded-lg bg-slate-700/50 border text-white placeholder-slate-400 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200
                    ${errors.password_confirmation ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 hover:border-slate-500'}`}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                />
                {errors.password_confirmation && touched.password_confirmation && (
                  <p className="mt-1 text-sm text-red-400">{errors.password_confirmation}</p>
                )}
              </div>

              {/* Referral Code Field */}
              <div>
                <label htmlFor="referral_code" className="block text-sm font-medium mb-2 text-slate-300">
                  Referral Code <span className="text-slate-500">(Optional)</span>
                </label>
                <input
                  id="referral_code"
                  name="referral_code"
                  type="text"
                  value={formData.referral_code}
                  onChange={handleChange}
                  readOnly={!!referId}
                  className={`w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200
                    ${referId ? 'cursor-not-allowed opacity-75' : 'hover:border-slate-500'}`}
                  placeholder="Enter referral code"
                />
                {referId && (
                  <p className="mt-1 text-xs text-blue-400">Referral code applied from invite link</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
                  disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed
                  rounded-lg font-semibold text-white shadow-lg hover:shadow-blue-500/25 
                  transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-400">
                Already have an account?{' '}
                <button
                  onClick=''
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </div>
        </div>
    </section>
  );
};

export default Register;