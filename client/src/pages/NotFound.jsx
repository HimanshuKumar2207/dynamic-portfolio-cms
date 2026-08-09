import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="max-w-content mx-auto px-6 md:px-8 py-40 text-center">
    <span className="eyebrow justify-center mb-6">404</span>
    <h1 className="font-display text-3xl md:text-4xl font-semibold text-navy">Page not found</h1>
    <p className="mt-4 text-soft">The page you're looking for doesn't exist or was moved.</p>
    <Link to="/" className="btn-primary mt-8 inline-flex">Back home</Link>
  </div>
);

export default NotFound;
