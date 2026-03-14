import { useState } from 'react';
import { Maximize2, Minimize2, RotateCw, ZoomIn, ZoomOut, Layers, Eye, EyeOff, Box } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  propertyId: string;
  propertyTitle: string;
}

interface Room {
  id: string;
  name: string;
  area: number;
  furniture: string[];
  color: string;
}

export default function Interactive3DFloorPlan({ propertyId, propertyTitle }: Props) {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'2D' | '3D'>('2D');
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [showDimensions, setShowDimensions] = useState(true);
  const [showFurniture, setShowFurniture] = useState(true);

  // Mock room data
  const rooms: Room[] = [
    { id: 'living', name: isAr ? 'غرفة المعيشة' : 'Living Room', area: 450, furniture: ['Sofa', 'TV', 'Coffee Table'], color: 'bg-blue-500/30' },
    { id: 'kitchen', name: isAr ? 'المطبخ' : 'Kitchen', area: 220, furniture: ['Island', 'Cabinets', 'Appliances'], color: 'bg-orange-500/30' },
    { id: 'master', name: isAr ? 'غرفة النوم الرئيسية' : 'Master Bedroom', area: 380, furniture: ['King Bed', 'Wardrobes', 'Dresser'], color: 'bg-purple-500/30' },
    { id: 'bedroom2', name: isAr ? 'غرفة النوم 2' : 'Bedroom 2', area: 280, furniture: ['Queen Bed', 'Desk', 'Closet'], color: 'bg-green-500/30' },
    { id: 'bathroom1', name: isAr ? 'الحمام الرئيسي' : 'Master Bath', area: 120, furniture: ['Bathtub', 'Shower', 'Double Sink'], color: 'bg-cyan-500/30' },
    { id: 'bathroom2', name: isAr ? 'الحمام 2' : 'Bathroom 2', area: 80, furniture: ['Shower', 'Sink', 'Toilet'], color: 'bg-teal-500/30' },
  ];

  const totalArea = rooms.reduce((sum, room) => sum + room.area, 0);

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        <Layers className="w-5 h-5 relative z-10" />
        <span className="relative z-10">{isAr ? 'مخطط الطابق 3D' : '3D Floor Plan'}</span>
      </motion.button>

      {/* 3D Floor Plan Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col"
          >
            {/* Header with Controls */}
            <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 backdrop-blur-md border-b border-white/10 p-4">
              <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-white">
                    {isAr ? 'مخطط الطابق التفاعلي' : 'Interactive Floor Plan'}
                  </h3>
                  <p className="text-sm text-white/70">{propertyTitle}</p>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode('2D')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      viewMode === '2D'
                        ? 'bg-cyan-500 text-white'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    2D
                  </button>
                  <button
                    onClick={() => setViewMode('3D')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      viewMode === '3D'
                        ? 'bg-cyan-500 text-white'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    3D
                  </button>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowDimensions(!showDimensions)}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all"
                    title={showDimensions ? 'Hide Dimensions' : 'Show Dimensions'}
                  >
                    {showDimensions ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </button>
                  
                  <button
                    onClick={() => setShowFurniture(!showFurniture)}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all"
                    title={showFurniture ? 'Hide Furniture' : 'Show Furniture'}
                  >
                    <Box className={`w-5 h-5 ${showFurniture ? 'text-white' : 'text-white/50'}`} />
                  </button>

                  <button
                    onClick={() => setZoom(Math.max(50, zoom - 10))}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all"
                  >
                    <ZoomOut className="w-5 h-5" />
                  </button>
                  
                  <span className="text-white font-bold text-sm px-3">{zoom}%</span>
                  
                  <button
                    onClick={() => setZoom(Math.min(200, zoom + 10))}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => setRotation((rotation + 90) % 360)}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all"
                  >
                    <RotateCw className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-white transition-all"
                  >
                    <Minimize2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center p-4 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full max-w-7xl h-full">
                {/* Floor Plan View */}
                <div className="lg:col-span-3 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl overflow-hidden border-2 border-cyan-500/30 flex items-center justify-center">
                  <motion.div
                    animate={{ 
                      scale: zoom / 100,
                      rotate: viewMode === '3D' ? rotation : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                    style={{
                      transform: viewMode === '3D' ? 'perspective(1000px) rotateX(45deg)' : 'none',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* Mock Floor Plan Grid */}
                    <div className="grid grid-cols-3 gap-2 p-8">
                      {/* Living Room */}
                      <motion.div
                        whileHover={{ scale: 1.05, zIndex: 10 }}
                        onClick={() => setSelectedRoom('living')}
                        className={`col-span-2 row-span-2 ${rooms[0].color} backdrop-blur-sm border-2 ${
                          selectedRoom === 'living' ? 'border-cyan-400' : 'border-white/20'
                        } rounded-2xl p-6 cursor-pointer transition-all relative group`}
                        style={{ height: '250px' }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
                        <div className="relative z-10">
                          <p className="text-white font-bold text-lg mb-1">{rooms[0].name}</p>
                          {showDimensions && (
                            <p className="text-white/70 text-sm">{rooms[0].area} sqft</p>
                          )}
                          {showFurniture && (
                            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                              {rooms[0].furniture.map((item, i) => (
                                <span key={i} className="inline-block bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-xs text-white mr-2 mb-2">
                                  {item}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>

                      {/* Kitchen */}
                      <motion.div
                        whileHover={{ scale: 1.05, zIndex: 10 }}
                        onClick={() => setSelectedRoom('kitchen')}
                        className={`${rooms[1].color} backdrop-blur-sm border-2 ${
                          selectedRoom === 'kitchen' ? 'border-cyan-400' : 'border-white/20'
                        } rounded-2xl p-4 cursor-pointer transition-all relative group`}
                        style={{ height: '120px' }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
                        <div className="relative z-10">
                          <p className="text-white font-bold text-sm mb-1">{rooms[1].name}</p>
                          {showDimensions && (
                            <p className="text-white/70 text-xs">{rooms[1].area} sqft</p>
                          )}
                        </div>
                      </motion.div>

                      {/* Bathroom 2 */}
                      <motion.div
                        whileHover={{ scale: 1.05, zIndex: 10 }}
                        onClick={() => setSelectedRoom('bathroom2')}
                        className={`${rooms[5].color} backdrop-blur-sm border-2 ${
                          selectedRoom === 'bathroom2' ? 'border-cyan-400' : 'border-white/20'
                        } rounded-2xl p-4 cursor-pointer transition-all relative`}
                        style={{ height: '120px' }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
                        <div className="relative z-10">
                          <p className="text-white font-bold text-sm">{rooms[5].name}</p>
                          {showDimensions && (
                            <p className="text-white/70 text-xs">{rooms[5].area} sqft</p>
                          )}
                        </div>
                      </motion.div>

                      {/* Master Bedroom */}
                      <motion.div
                        whileHover={{ scale: 1.05, zIndex: 10 }}
                        onClick={() => setSelectedRoom('master')}
                        className={`col-span-2 ${rooms[2].color} backdrop-blur-sm border-2 ${
                          selectedRoom === 'master' ? 'border-cyan-400' : 'border-white/20'
                        } rounded-2xl p-6 cursor-pointer transition-all relative group`}
                        style={{ height: '180px' }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
                        <div className="relative z-10">
                          <p className="text-white font-bold text-lg mb-1">{rooms[2].name}</p>
                          {showDimensions && (
                            <p className="text-white/70 text-sm">{rooms[2].area} sqft</p>
                          )}
                          {showFurniture && (
                            <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                              {rooms[2].furniture.map((item, i) => (
                                <span key={i} className="inline-block bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-xs text-white mr-2 mb-2">
                                  {item}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>

                      {/* Bedroom 2 */}
                      <motion.div
                        whileHover={{ scale: 1.05, zIndex: 10 }}
                        onClick={() => setSelectedRoom('bedroom2')}
                        className={`${rooms[3].color} backdrop-blur-sm border-2 ${
                          selectedRoom === 'bedroom2' ? 'border-cyan-400' : 'border-white/20'
                        } rounded-2xl p-4 cursor-pointer transition-all relative group`}
                        style={{ height: '180px' }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
                        <div className="relative z-10">
                          <p className="text-white font-bold text-sm mb-1">{rooms[3].name}</p>
                          {showDimensions && (
                            <p className="text-white/70 text-xs">{rooms[3].area} sqft</p>
                          )}
                        </div>
                      </motion.div>

                      {/* Master Bath */}
                      <motion.div
                        whileHover={{ scale: 1.05, zIndex: 10 }}
                        onClick={() => setSelectedRoom('bathroom1')}
                        className={`col-span-2 ${rooms[4].color} backdrop-blur-sm border-2 ${
                          selectedRoom === 'bathroom1' ? 'border-cyan-400' : 'border-white/20'
                        } rounded-2xl p-4 cursor-pointer transition-all relative`}
                        style={{ height: '100px' }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
                        <div className="relative z-10">
                          <p className="text-white font-bold text-sm">{rooms[4].name}</p>
                          {showDimensions && (
                            <p className="text-white/70 text-xs">{rooms[4].area} sqft</p>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                {/* Room Details Sidebar */}
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl border-2 border-white/10 p-6 overflow-y-auto">
                  <h4 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                    <Layers className="w-6 h-6 text-cyan-400" />
                    {isAr ? 'تفاصيل الغرف' : 'Room Details'}
                  </h4>

                  {/* Total Area */}
                  <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500/30 rounded-2xl p-4 mb-6">
                    <p className="text-white/70 text-sm mb-1">{isAr ? 'المساحة الإجمالية' : 'Total Area'}</p>
                    <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                      {totalArea} sqft
                    </p>
                  </div>

                  {/* Room List */}
                  <div className="space-y-3">
                    {rooms.map((room) => (
                      <motion.button
                        key={room.id}
                        whileHover={{ x: 4 }}
                        onClick={() => setSelectedRoom(room.id)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                          selectedRoom === room.id
                            ? 'border-cyan-400 bg-cyan-500/10'
                            : 'border-white/10 bg-white/5 hover:border-white/30'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-bold">{room.name}</span>
                          <div className={`w-4 h-4 ${room.color} rounded-full border-2 border-white/30`}></div>
                        </div>
                        <p className="text-white/60 text-sm">{room.area} sqft</p>
                        {selectedRoom === room.id && (
                          <div className="mt-3 pt-3 border-t border-white/10">
                            <p className="text-white/70 text-xs font-semibold mb-2">
                              {isAr ? 'الأثاث' : 'Furniture'}:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {room.furniture.map((item, i) => (
                                <span key={i} className="bg-white/10 px-2 py-1 rounded text-xs text-white">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Instructions */}
            <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 backdrop-blur-md border-t border-white/10 p-4">
              <div className="max-w-7xl mx-auto text-center text-white/70 text-sm">
                {isAr 
                  ? '💡 انقر على أي غرفة لرؤية التفاصيل • استخدم أدوات التكبير والتدوير للاستكشاف'
                  : '💡 Click any room to see details • Use zoom and rotate tools to explore'}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
