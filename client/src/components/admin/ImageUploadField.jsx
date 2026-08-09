import React, { useRef, useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import api, { assetUrl } from '../../api/axios';

// Reusable image upload control used anywhere admin needs to attach an
// image: sections, work items, testimonials, site settings/logo.
const ImageUploadField = ({ value, onChange, label }) => {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState('');

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setErr('');
    const formData = new FormData();
    formData.append('image', file);
    try {
      const { data } = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      onChange(data.url);
    } catch (error) {
      setErr(error?.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <div>
      {label && <label className="block text-xs font-medium text-soft mb-2">{label}</label>}
      <div className="flex items-center gap-3">
        {value ? (
          <div className="relative">
            <img src={assetUrl(value)} alt="" className="w-16 h-16 object-cover border border-line rounded-sm" />
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute -top-2 -right-2 bg-white border border-line rounded-full p-0.5 hover:text-red-600"
            >
              <X size={12} />
            </button>
          </div>
        ) : (
          <div className="w-16 h-16 border border-dashed border-line flex items-center justify-center text-soft/50 rounded-sm">
            <Upload size={16} />
          </div>
        )}
        <div>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="text-xs font-medium border border-line px-3 py-2 rounded-sm hover:border-teal hover:text-teal-dark transition-colors inline-flex items-center gap-2"
          >
            {uploading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
            {uploading ? 'Uploading…' : value ? 'Replace image' : 'Upload image'}
          </button>
          {err && <p className="text-xs text-red-600 mt-1">{err}</p>}
        </div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>
    </div>
  );
};

export default ImageUploadField;
