import React from 'react';
import { Shield, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#071324] text-white pt-32 pb-0 border-t border-white/5 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-nv-yellow/5 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10 pb-0">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24">
          {/* Brand Section */}
          <div className="md:col-span-12 lg:col-span-5 space-y-10">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-nv-yellow rounded-[1.5rem] flex items-center justify-center shadow-[0_15px_30px_-5px_rgba(255,215,0,0.3)]">
                <Shield className="h-10 w-10 text-[#071324] fill-[#071324]" />
              </div>
              <div>
                <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-none">NVFC</h2>
                <p className="text-[10px] text-nv-yellow font-black uppercase tracking-[0.4em] mt-1">Valley Legacy • 1995</p>
              </div>
            </div>
            <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-md">
              The beating heart of Central India. Together we rise from the banks of the Narmada to the pinnacle of football.
            </p>
            <div className="flex space-x-5">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, idx) => (
                <a key={idx} href="#" className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl hover:bg-nv-yellow hover:text-[#071324] transition-premium group shadow-xl">
                  <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 lg:col-span-2">
            <h3 className="text-nv-yellow text-[10px] font-black uppercase tracking-[0.5em] mb-10">RESOURCES</h3>
            <ul className="space-y-5 text-gray-400 font-bold text-xs tracking-widest uppercase">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Use</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Stadium Rules</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Media Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-4 lg:col-span-2">
            <h3 className="text-nv-yellow text-[10px] font-black uppercase tracking-[0.5em] mb-10">CONTACT</h3>
            <ul className="space-y-6 text-gray-400 font-bold text-xs tracking-[0.1em] uppercase">
              <li className="flex items-start space-x-4">
                <MapPin className="h-4 w-4 text-nv-yellow shrink-0" />
                <span className="leading-relaxed">Jabalpur Sports City, MP 482001</span>
              </li>
              <li className="flex items-center space-x-4">
                <Phone className="h-4 w-4 text-nv-yellow shrink-0" />
                <span>+91 761 234 5678</span>
              </li>
              <li className="flex items-center space-x-4">
                <Mail className="h-4 w-4 text-nv-yellow shrink-0" />
                <span>info@nvfc.in</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4 lg:col-span-3">
            <h3 className="text-nv-yellow text-[10px] font-black uppercase tracking-[0.5em] mb-10">NEWSLETTER</h3>
            <p className="text-gray-400 text-xs font-bold leading-relaxed mb-8 uppercase tracking-widest">Subscribe for the latest valley updates.</p>
            <form className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  className="bg-white/5 border border-white/10 px-6 py-5 w-full text-white font-black text-[10px] tracking-widest focus:ring-1 focus:ring-nv-yellow outline-none rounded-2xl backdrop-blur-xl"
                />
              </div>
              <button className="w-full bg-white text-[#071324] px-6 py-5 font-black text-[10px] tracking-[0.3em] rounded-2xl hover:bg-nv-yellow transition-premium shadow-2xl">
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        <div className="mt-32 py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 font-bold text-[9px] uppercase tracking-[0.3em]">
            &copy; 2024 Narmada Valley Football Club • Official Website
          </p>
          <div className="flex gap-8 text-gray-500 font-bold text-[9px] uppercase tracking-[0.3em]">
            <span className="hover:text-white cursor-pointer transition-colors">FB</span>
            <span className="hover:text-white cursor-pointer transition-colors">TW</span>
            <span className="hover:text-white cursor-pointer transition-colors">IG</span>
            <span className="hover:text-white cursor-pointer transition-colors">YT</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
