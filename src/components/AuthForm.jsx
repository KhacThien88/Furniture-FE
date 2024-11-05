import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, loginUser } from '../slices/userSlice';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ mode }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === 'signup' && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const action =
      mode === 'signup' ? registerUser(formData) : loginUser(formData);
    const result = await dispatch(action);

    if (result.meta.requestStatus === 'fulfilled') {
      if (mode === 'signup') {
        navigate('/login'); // Redirect to login page after successful signup
      } else {
        navigate('/'); // Redirect to home page after successful login
      }
    }
  };

  return (
    <div className='auth-form w-80 mx-auto p-4 bg-white rounded shadow-md'>
      <h2 className='text-2xl font-bold mb-4 text-center'>
        {mode === 'login' ? 'Login' : 'Sign Up'}
      </h2>
      <form onSubmit={handleSubmit}>
        {mode === 'signup' && (
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>Username</label>
            <input
              type='text'
              name='username'
              value={formData.username}
              onChange={handleChange}
              className='w-full p-2 border rounded'
              required
            />
          </div>
        )}
        <div className='mb-4'>
          <label className='block text-gray-700 mb-2'>Email</label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className='w-full p-2 border rounded'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 mb-2'>Password</label>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            className='w-full p-2 border rounded'
            required
          />
        </div>
        {mode === 'signup' && (
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>Confirm Password</label>
            <input
              type='password'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              className='w-full p-2 border rounded'
              required
            />
          </div>
        )}
        {error && <p className='text-red-500'>{error}</p>}
        <button
          type='submit'
          className='w-full bg-lime-500 text-white p-2 rounded hover:bg-lime-600'
          disabled={loading}
        >
          {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
