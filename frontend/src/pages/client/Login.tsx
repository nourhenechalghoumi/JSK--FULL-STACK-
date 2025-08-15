import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface LoginForm {
  email: string;
  password: string;
}

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const loginForm = useForm<LoginForm>();
  const registerForm = useForm<RegisterForm>();

  const onLoginSubmit = async (data: LoginForm) => {
    setIsSubmitting(true);
    setError('');

    try {
      const success = await login(data.email, data.password);
      if (success) {
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onRegisterSubmit = async (data: RegisterForm) => {
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const success = await register(data.name, data.email, data.password);
      if (success) {
        navigate('/');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Toggle Buttons */}
          <div className="flex rounded-lg bg-gray-100 p-1 mb-8">
            <button
              onClick={() => {
                setIsLogin(true);
                setError('');
              }}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                isLogin
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <LogIn className="h-4 w-4 inline mr-2" />
              Login
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setError('');
              }}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                !isLogin
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <UserPlus className="h-4 w-4 inline mr-2" />
              Register
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {isLogin ? (
            // Login Form
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                <p className="text-gray-600 mb-6">Sign in to your account</p>
              </div>

              <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="login-email"
                  {...loginForm.register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Please enter a valid email'
                    }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
                {loginForm.formState.errors.email && (
                  <p className="mt-1 text-sm text-red-600">{loginForm.formState.errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="login-password"
                  {...loginForm.register('password', { required: 'Password is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
                {loginForm.formState.errors.password && (
                  <p className="mt-1 text-sm text-red-600">{loginForm.formState.errors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                ) : (
                  <LogIn className="h-5 w-5 mr-2" />
                )}
                {isSubmitting ? 'Signing In...' : 'Sign In'}
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Demo Admin: admin@esports.com / admin123
                </p>
              </div>
            </form>
          ) : (
            // Register Form
            <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h2>
                <p className="text-gray-600 mb-6">Join the JSK Esports community</p>
              </div>

              <div>
                <label htmlFor="register-name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="register-name"
                  {...registerForm.register('name', { required: 'Name is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
                {registerForm.formState.errors.name && (
                  <p className="mt-1 text-sm text-red-600">{registerForm.formState.errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="register-email"
                  {...registerForm.register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Please enter a valid email'
                    }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
                {registerForm.formState.errors.email && (
                  <p className="mt-1 text-sm text-red-600">{registerForm.formState.errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="register-password"
                  {...registerForm.register('password', { 
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Create a password"
                />
                {registerForm.formState.errors.password && (
                  <p className="mt-1 text-sm text-red-600">{registerForm.formState.errors.password.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="register-confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="register-confirmPassword"
                  {...registerForm.register('confirmPassword', { required: 'Please confirm your password' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Confirm your password"
                />
                {registerForm.formState.errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{registerForm.formState.errors.confirmPassword.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                ) : (
                  <UserPlus className="h-5 w-5 mr-2" />
                )}
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;