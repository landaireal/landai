import { Users, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BlueberryTeam() {
  const team = [
    {
      name: 'Sarah Al-Mansoori',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
      bio: '15+ years in luxury real estate'
    },
    {
      name: 'Ahmed Hassan',
      role: 'Chief Technology Officer',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
      bio: 'AI & blockchain expert'
    },
    {
      name: 'Fatima Khan',
      role: 'Head of Investment',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
      bio: 'Wealth management specialist'
    },
    {
      name: 'Omar Abdullah',
      role: 'Director of Operations',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
      bio: 'Property development veteran'
    }
  ];

  return (
    <section className="py-20 px-4 blueberry-section-bg">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="badge-blueberry-light inline-flex items-center gap-2 mb-6">
            <Users className="w-4 h-4" />
            <span>Our Team</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black blueberry-text mb-6">
            Meet the Experts
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Driven by passion, powered by expertise
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card-compact group text-center hover:scale-105 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative mb-6 mx-auto w-32 h-32">
                <div className="absolute inset-0 blueberry-gradient rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                <img
                  src={member.image}
                  alt={member.name}
                  className="relative w-full h-full object-cover rounded-full border-4 border-white dark:border-zinc-900 shadow-xl"
                />
              </div>

              {/* Content */}
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">
                {member.name}
              </h3>
              <div className="badge-blueberry-light mb-3 inline-block">
                {member.role}
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {member.bio}
              </p>

              {/* Social Links */}
              <div className="flex justify-center gap-3">
                <button className="p-2 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors">
                  <Linkedin className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </button>
                <button className="p-2 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors">
                  <Mail className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
