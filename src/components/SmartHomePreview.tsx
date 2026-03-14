import { useState } from 'react';
import { Home, Lightbulb, Thermometer, Lock, Camera, Wifi, Wind, Droplet, Power } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function SmartHomePreview() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  
  const [devices, setDevices] = useState({
    lights: { on: true, brightness: 80 },
    climate: { temp: 22, mode: 'cool' },
    security: { armed: true, cameras: 4 },
    blinds: { open: 60 },
    energy: { consumption: 45 }
  });

  const toggleLight = () => {
    setDevices(prev => ({
      ...prev,
      lights: { ...prev.lights, on: !prev.lights.on }
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-3xl p-6 border-2 border-indigo-200 dark:border-indigo-500/40 shadow-xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl">
          <Home className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            {isAr ? 'معاينة المنزل الذكي' : 'Smart Home Preview'}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {isAr ? 'نظام IoT المتكامل' : 'Integrated IoT System'}
          </p>
        </div>
      </div>

      {/* Device Controls Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Lighting */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={toggleLight}
          className={`p-4 rounded-2xl border-2 transition-all ${
            devices.lights.on
              ? 'bg-gradient-to-br from-yellow-400 to-orange-400 border-yellow-500 text-white'
              : 'bg-white/50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300'
          }`}
        >
          <Lightbulb className={`w-6 h-6 mb-2 ${devices.lights.on ? 'fill-current' : ''}`} />
          <p className="text-xs font-bold">{isAr ? 'الإضاءة' : 'Lights'}</p>
          <p className="text-xs opacity-80">{devices.lights.on ? 'ON' : 'OFF'}</p>
        </motion.button>

        {/* Climate */}
        <div className="p-4 rounded-2xl border-2 border-blue-200 dark:border-blue-500/30 bg-white dark:bg-slate-800">
          <Thermometer className="w-6 h-6 mb-2 text-blue-600 dark:text-blue-400" />
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{isAr ? 'المناخ' : 'Climate'}</p>
          <p className="text-lg font-black text-blue-600 dark:text-blue-400">{devices.climate.temp}°C</p>
        </div>

        {/* Security */}
        <div className="p-4 rounded-2xl border-2 border-red-200 dark:border-red-500/30 bg-white dark:bg-slate-800">
          <Lock className="w-6 h-6 mb-2 text-red-600 dark:text-red-400" />
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{isAr ? 'الأمان' : 'Security'}</p>
          <p className="text-xs text-red-600 dark:text-red-400 font-semibold">
            {devices.security.armed ? '🔒 Armed' : '🔓 Disarmed'}
          </p>
        </div>

        {/* Energy */}
        <div className="p-4 rounded-2xl border-2 border-green-200 dark:border-green-500/30 bg-white dark:bg-slate-800">
          <Power className="w-6 h-6 mb-2 text-green-600 dark:text-green-400" />
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{isAr ? 'الطاقة' : 'Energy'}</p>
          <p className="text-lg font-black text-green-600 dark:text-green-400">{devices.energy.consumption}%</p>
        </div>
      </div>

      {/* IoT Features */}
      <div className="mt-4 p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-indigo-200 dark:border-indigo-500/30">
        <div className="flex items-center gap-2 mb-3">
          <Wifi className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300">
            {isAr ? 'الأجهزة المتصلة' : 'Connected Devices'}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { icon: Camera, label: '4 Cameras', color: 'text-blue-600 dark:text-blue-400' },
            { icon: Wind, label: 'AC Units', color: 'text-cyan-600 dark:text-cyan-400' },
            { icon: Droplet, label: 'Irrigation', color: 'text-green-600 dark:text-green-400' }
          ].map((device, i) => (
            <div key={i} className="flex items-center gap-1 bg-white dark:bg-slate-700 px-2 py-1 rounded-lg">
              <device.icon className={`w-3 h-3 ${device.color}`} />
              <span className="text-xs text-slate-600 dark:text-slate-300">{device.label}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-center text-slate-500 dark:text-slate-500 mt-4">
        {isAr ? '💡 يمكن التحكم بكل شيء من تطبيق الهاتف' : '💡 Control everything from your phone'}
      </p>
    </motion.div>
  );
}
