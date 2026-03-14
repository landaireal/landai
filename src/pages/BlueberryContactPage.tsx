import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';
import SEO from '../components/SEO';

export default function BlueberryContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      detail: 'info@landai.ae',
      link: 'mailto:info@landai.ae'
    },
    {
      icon: Phone,
      title: 'Call Us',
      detail: '+971 4 123 4567',
      link: 'tel:+97141234567'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      detail: 'Dubai Marina, UAE',
      link: 'https://maps.google.com'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      detail: 'Mon-Fri: 9AM-6PM',
      link: null
    }
  ];

  return (
    <>
      <SEO 
        title="Contact Us - Land AI Real Estate"
        description="Get in touch with our team for property inquiries and support"
      />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 blueberry-section-bg">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="badge-blueberry-light inline-flex items-center gap-2 mb-6"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Us</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black blueberry-text mb-6"
          >
            Let's Start a Conversation
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-400"
          >
            We're here to help you find your dream property
          </motion.p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <motion.a
              key={index}
              href={info.link || undefined}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`card-compact text-center group ${info.link ? 'cursor-pointer' : ''}`}
            >
              <div className="inline-flex p-4 blueberry-gradient rounded-2xl mb-4 shadow-xl group-hover:scale-110 transition-transform duration-500">
                <info.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {info.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                {info.detail}
              </p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-4 blueberry-section-bg">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-standard"
          >
            <h2 className="text-3xl font-black blueberry-text mb-8 text-center">
              Send Us a Message
            </h2>

            {submitted ? (
              <div className="alert-blueberry text-center">
                <div className="flex items-center gap-3 justify-center">
                  <Send className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  <span className="font-bold text-indigo-700 dark:text-indigo-300">
                    Message sent successfully! We'll get back to you soon.
                  </span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-6 py-4 rounded-2xl border-2 border-indigo-200 dark:border-indigo-800 bg-white dark:bg-slate-900 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-400 font-medium"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-6 py-4 rounded-2xl border-2 border-indigo-200 dark:border-indigo-800 bg-white dark:bg-slate-900 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-400 font-medium"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-indigo-200 dark:border-indigo-800 bg-white dark:bg-slate-900 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-400 font-medium"
                    placeholder="+971 XX XXX XXXX"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-indigo-200 dark:border-indigo-800 bg-white dark:bg-slate-900 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-400 font-medium resize-none"
                    placeholder="Tell us about your property requirements..."
                  />
                </div>
                
                <button type="submit" className="btn-blueberry w-full py-5 text-lg">
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
