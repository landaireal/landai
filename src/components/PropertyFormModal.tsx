import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { propertyStorage, StoredProperty } from '../services/storage';

interface Props {
  property: StoredProperty | null;
  onClose: () => void;
  onSave: () => void;
}

export default function PropertyFormModal({ property, onClose, onSave }: Props) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    type: 'Villa',
    status: 'Active' as 'Active' | 'Pending' | 'Sold',
    image: '',
    description: ''
  });

  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title,
        price: property.price.toString(),
        location: property.location,
        bedrooms: property.bedrooms.toString(),
        bathrooms: property.bathrooms.toString(),
        area: property.area.toString(),
        type: property.type,
        status: property.status,
        image: property.image,
        description: property.description || ''
      });
    }
  }, [property]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (property) {
      // Update existing property
      propertyStorage.update(property.id, {
        title: formData.title,
        price: parseFloat(formData.price),
        location: formData.location,
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        area: parseInt(formData.area),
        type: formData.type,
        status: formData.status,
        image: formData.image,
        description: formData.description
      });
    } else {
      // Create new property
      propertyStorage.create({
        title: formData.title,
        price: parseFloat(formData.price),
        location: formData.location,
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        area: parseInt(formData.area),
        type: formData.type,
        status: formData.status,
        image: formData.image || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
        description: formData.description
      });
    }
    
    onSave();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {property 
              ? (language === 'ar' ? 'تعديل العقار' : 'Edit Property')
              : (language === 'ar' ? 'إضافة عقار جديد' : 'Add New Property')
            }
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {language === 'ar' ? 'العنوان' : 'Title'}
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {language === 'ar' ? 'السعر (USD)' : 'Price (USD)'}
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {language === 'ar' ? 'الموقع' : 'Location'}
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {language === 'ar' ? 'غرف النوم' : 'Bedrooms'}
              </label>
              <input
                type="number"
                value={formData.bedrooms}
                onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {language === 'ar' ? 'الحمامات' : 'Bathrooms'}
              </label>
              <input
                type="number"
                value={formData.bathrooms}
                onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {language === 'ar' ? 'المساحة (قدم مربع)' : 'Area (sq ft)'}
              </label>
              <input
                type="number"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {language === 'ar' ? 'النوع' : 'Type'}
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                required
              >
                <option value="Villa">Villa</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Apartment">Apartment</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Studio">Studio</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {language === 'ar' ? 'الحالة' : 'Status'}
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                required
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Sold">Sold</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {language === 'ar' ? 'رابط الصورة' : 'Image URL'}
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {language === 'ar' ? 'الوصف (اختياري)' : 'Description (Optional)'}
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl font-semibold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
            >
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              {language === 'ar' ? 'حفظ' : 'Save'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
