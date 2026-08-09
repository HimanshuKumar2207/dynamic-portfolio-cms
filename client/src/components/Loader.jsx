import React from 'react';

const Loader = ({ label = 'Loading' }) => (
  <div className="flex items-center justify-center py-24 text-soft">
    <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest">
      <span className="w-2 h-2 rounded-full bg-teal animate-ping" />
      {label}
    </div>
  </div>
);

export default Loader;
