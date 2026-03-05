import Services from '../components/Services';
import NeuralArchitect from '../components/NeuralArchitect';
import OrbitalScanner from '../components/OrbitalScanner';
import HolographicFloorplan from '../components/HolographicFloorplan';
import AITimeTravel from '../components/AITimeTravel';
import Heatmap from '../components/Heatmap';
import SmartCityMatrix from '../components/SmartCityMatrix';
import ARPortal from '../components/ARPortal';
import MetaverseTour from '../components/MetaverseTour';
import FractionalOwnership from '../components/FractionalOwnership';
import DroneScanner from '../components/DroneScanner';
import Ledger from '../components/Ledger';
import BiometricApproval from '../components/BiometricApproval';
import PredictiveAnalytics from '../components/PredictiveAnalytics';
import { useLanguage } from '../context/LanguageContext';

export default function ServicesPage() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
          {t('services.title')}
        </h1>
        <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto">
          {t('services.subtitle')}
        </p>
      </div>
      <Services />
      <NeuralArchitect />
      <OrbitalScanner />
      <HolographicFloorplan />
      <AITimeTravel />
      <Heatmap />
      <SmartCityMatrix />
      <ARPortal />
      <MetaverseTour />
      <FractionalOwnership />
      <DroneScanner />
      <Ledger />
      <BiometricApproval />
      <PredictiveAnalytics />
    </div>
  );
}
