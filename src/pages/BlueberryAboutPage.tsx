import { motion } from 'framer-motion';
import { Building2, Target, Heart, Award } from 'lucide-react';
import SEO from '../components/SEO';
import BlueberryTeam from '../components/BlueberryTeam';

export default function BlueberryAboutPage() {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To revolutionize real estate with AI-powered technology that makes property ownership accessible and transparent for everyone.'
    },
    {
      icon: Heart,
      title: 'Our Vision',
      description: 'A world where finding and owning your dream property is simple, secure, and supported by cutting-edge technology.'
    },
    {
      icon: Award,
      title: 'Our Values',
      description: 'Integrity, innovation, and client-first approach in every transaction. We build lasting relationships based on trust.'
    }
  ];

  return (
    <>
      <SEO 
        title="About Us - Land AI Real Estate"
        description="Learn about our mission to revolutionize real estate with AI technology"
      />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 blueberry-section-bg">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="badge-blueberry-light inline-flex items-center gap-2 mb-6"
          >
            <Building2 className="w-4 h-4" />
            <span>About Land AI</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black blueberry-text mb-6"
          >
            Building the Future of Real Estate
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed"
          >
            We combine cutting-edge AI technology with deep real estate expertise to deliver 
            an unparalleled property search and ownership experience.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { value: '850+', label: 'Properties' },
            { value: '2,400+', label: 'Happy Clients' },
            { value: 'AED 4.2B', label: 'Portfolio Value' },
            { value: '98%', label: 'Satisfaction' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card-blueberry text-center"
            >
              <div className="text-5xl font-black blueberry-text mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-bold text-gray-700 dark:text-gray-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 blueberry-section-bg">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-standard text-center"
              >
                <div className="inline-flex p-6 blueberry-gradient rounded-3xl mb-6 shadow-xl">
                  <value.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-black blueberry-text mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <BlueberryTeam />

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="card-blueberry text-center">
            <h2 className="text-4xl md:text-5xl font-black blueberry-text mb-6">
              Ready to Work With Us?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Let's find your perfect property together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-blueberry">View Properties</button>
              <button className="btn-blueberry-outline">Contact Us</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
