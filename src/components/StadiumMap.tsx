import React from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { MOCK_STADIUM_DATA } from '../lib/mockData';
import { Navigation, Clock, Utensils, Info, AlertTriangle } from 'lucide-react';

const StadiumMap: React.FC = () => {
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

    const center = { lat: 51.556, lng: -0.2795 };

    if (!API_KEY || API_KEY.startsWith("YOUR_")) {
        return (
            <div className="h-full w-full glass-panel relative overflow-hidden group">
                {/* Background Visual Element */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <ellipse cx="50" cy="50" rx="45" ry="35" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        <ellipse cx="50" cy="50" rx="35" ry="25" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.2" />
                        <line x1="50" y1="15" x2="50" y2="85" stroke="currentColor" strokeWidth="0.2" />
                    </svg>
                </div>

                <div className="relative z-10 h-full flex flex-col p-6">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-black italic tracking-tighter text-gradient uppercase">Premium Arena Flow</h3>
                            <p className="text-[10px] text-secondary font-bold uppercase tracking-widest">Synthetic Visualization • Offline</p>
                        </div>
                        <div className="flex gap-2">
                            <div className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full flex items-center gap-2">
                                <AlertTriangle size={12} className="text-orange-400" />
                                <span className="text-[10px] font-bold text-orange-400">Live Traffic</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
                        {MOCK_STADIUM_DATA.map((poi, i) => (
                            <div
                                key={i}
                                className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-premium-accent/30 hover:bg-white/10 transition-all cursor-default group/card"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div className={`p-2 rounded-lg ${poi.density > 0.7 ? 'bg-red-500/20 text-red-400' : 'bg-premium-accent/20 text-premium-accent'
                                        }`}>
                                        {poi.type === 'gate' ? <Navigation size={14} /> : poi.type === 'restroom' ? <Info size={14} /> : <Utensils size={14} />}
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className={`text-[10px] font-black ${poi.density > 0.7 ? 'text-red-400' : 'text-premium-accent'}`}>
                                            {Math.round(poi.density * 100)}%
                                        </span>
                                        <div className="w-12 h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
                                            <div
                                                className={`h-full transition-all duration-1000 ${poi.density > 0.7 ? 'bg-red-500' : 'bg-premium-accent'}`}
                                                style={{ width: `${poi.density * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <h4 className="text-xs font-bold text-premium-highlight group-hover/card:text-premium-accent transition-colors leading-tight mb-1">
                                    {poi.section}
                                </h4>
                                <div className="flex items-center gap-1.5 text-secondary">
                                    <Clock size={10} />
                                    <span className="text-[10px] font-medium uppercase tracking-tighter">{poi.waitTime}m Wait</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-secondary">
                        <p className="text-[9px] font-bold uppercase">Dynamic Routing Enabled</p>
                        <button className="text-[9px] font-black text-premium-accent uppercase hover:underline">Download Arena PDF</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <APIProvider apiKey={API_KEY}>
                <Map
                    defaultCenter={center}
                    defaultZoom={17}
                    mapId="STADIUM_MAP_ID"
                    colorScheme='DARK'
                    disableDefaultUI={true}
                >
                    {MOCK_STADIUM_DATA.map((poi, idx) => (
                        <Marker
                            key={idx}
                            position={center}
                            label={poi.section}
                        />
                    ))}
                </Map>
            </APIProvider>
        </div>
    );
};

export default StadiumMap;
