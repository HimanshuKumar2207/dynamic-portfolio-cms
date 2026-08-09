import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api/axios';
import SectionRenderer from '../components/SectionRenderer';
import Loader from '../components/Loader';

// Renders any page (home / about / work / contact) purely from whatever
// Section documents the admin has created for that slug, in order.
const DynamicPage = ({ slug }) => {
  const [sections, setSections] = useState(null);

  useEffect(() => {
    let active = true;
    setSections(null);
    api.get('/sections', { params: { page: slug } }).then(({ data }) => {
      if (active) setSections(data);
    }).catch(() => {
      if (active) setSections([]);
    });
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    return () => { active = false; };
  }, [slug]);

  if (sections === null) return <Loader label="Loading page" />;

  if (sections.length === 0) {
    return (
      <div className="max-w-content mx-auto px-6 md:px-8 py-40 text-center">
        <p className="font-mono text-sm text-soft">
          No sections have been published for this page yet — add some from the admin panel.
        </p>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      {sections.map((section) => (
        <SectionRenderer key={section._id} section={section} />
      ))}
    </motion.div>
  );
};

export default DynamicPage;
