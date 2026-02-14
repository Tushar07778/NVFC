
import React, { useState, useEffect } from 'react';
import { Heart, Shield, Users, Building, CheckCircle2, Target, TrendingUp, Award, ArrowRight } from 'lucide-react';
import { INITIAL_CAMPAIGNS, RECENT_DONATIONS } from '../constants';

const Donate: React.FC = () => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(1000);
  const [selectedCampaign, setSelectedCampaign] = useState(INITIAL_CAMPAIGNS[0].id);
  const [customAmount, setCustomAmount] = useState('');

  const activeCampaign = INITIAL_CAMPAIGNS.find(c => c.id === selectedCampaign) || INITIAL_CAMPAIGNS[0];
  const progressPercentage = (activeCampaign.raised / activeCampaign.target) * 100;

  const presetAmounts = [500, 1000, 5000, 10000];

  const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setAmount(Number(e.target.value));
  };

  return (
    <div className="min-h-screen bg-[#071324] text-white selection:bg-nv-yellow selection:text-nv-blue">
      {/* Cinematic Hero - ENHANCED */}
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center animate-float"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&q=80&w=2000")' }}
        />
        <div className="absolute inset-0 bg-[#071324]/80 animate-gradient" style={{ background: 'linear-gradient(135deg, rgba(7, 19, 36, 0.8) 0%, rgba(255, 215, 0, 0.1) 50%, rgba(7, 19, 36, 0.8) 100%)' }} />
        <div className="relative z-10 text-center px-4 sm:px-6 animate-reveal-up">
          <Heart className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-nv-yellow mx-auto mb-4 sm:mb-6 fill-nv-yellow animate-pulse" />
          <h1 className="font-oswald text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black italic uppercase tracking-tighter leading-none mb-3 sm:mb-4">
            Be The <span className="text-transparent stroke-white text-stroke-thin" style={{ WebkitTextStroke: '1px white' }}>12th Man</span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Your contribution directly fuels the pride of the valley. From the academy pitch to the stadium lights, every rupee counts.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 md:gap-12">

          {/* Left Column: Campaigns & Impact */}
          <div className="lg:col-span-7 space-y-8 sm:space-y-10 md:space-y-12">
            {/* Active Campaign Card - ENHANCED */}
            <div className="glass-strong rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl shimmer">
              <div className="absolute inset-0 shimmer opacity-0 hover:opacity-100 rounded-3xl" />
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-6 h-6 text-nv-yellow" />
                <h2 className="font-oswald text-2xl font-bold uppercase tracking-wide">Current Mission</h2>
              </div>

              <div className="relative h-64 rounded-2xl overflow-hidden mb-8 group">
                <img src={activeCampaign.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Campaign" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1931] to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-oswald text-3xl font-black italic uppercase mb-2">{activeCampaign.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{activeCampaign.description}</p>

                  {/* Progress Bar */}
                  <div className="relative h-4 bg-white/10 rounded-full overflow-hidden mb-2">
                    <div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-nv-yellow to-yellow-600 transition-all duration-1000 ease-out"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs font-black uppercase tracking-wider">
                    <span>Raised: ₹{activeCampaign.raised.toLocaleString()}</span>
                    <span className="text-gray-400">Target: ₹{activeCampaign.target.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 overflow-x-auto pb-2">
                {INITIAL_CAMPAIGNS.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCampaign(c.id)}
                    className={`shrink-0 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${selectedCampaign === c.id ? 'bg-nv-yellow text-nv-blue border-nv-yellow' : 'bg-transparent border-white/20 text-gray-400 hover:text-white'}`}
                  >
                    {c.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Donor Wall - ENHANCED */}
            <div className="glass rounded-3xl p-8 hover-scale">
              <div className="absolute inset-0 shimmer opacity-0 hover:opacity-100 rounded-3xl" />
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-oswald text-xl font-bold uppercase flex items-center gap-2">
                  <Users className="w-5 h-5 text-nv-yellow" /> Recent Supporters
                </h3>
                <button className="text-xs font-bold uppercase tracking-widest text-nv-yellow hover:text-white transition-colors">View All</button>
              </div>
              <div className="space-y-4">
                {RECENT_DONATIONS.map((donor) => (
                  <div key={donor.id} className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-all">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs ${donor.tier === 'Platinum' ? 'bg-gradient-to-br from-slate-300 to-white text-slate-900' :
                        donor.tier === 'Gold' ? 'bg-gradient-to-br from-yellow-400 to-yellow-200 text-yellow-900' :
                          'bg-[#071324] border border-white/20 text-gray-400'
                        }`}>
                        {donor.donorName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">{donor.donorName}</h4>
                        <p className="text-xs text-gray-500">{donor.message || `Donated to ${donor.cause}`}</p>
                      </div>
                    </div>
                    <span className="font-oswald font-bold text-nv-yellow">₹{donor.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Donation Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 text-[#071324] shadow-2xl relative overflow-hidden">

              {step === 1 ? (
                <div className="animate-reveal">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="font-oswald text-3xl font-black italic uppercase">Make Impact</h2>
                    <div className="w-12 h-12 bg-nv-blue/5 rounded-full flex items-center justify-center">
                      <Shield className="w-6 h-6 text-nv-blue" />
                    </div>
                  </div>

                  <div className="space-y-6 mb-8">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">Select Amount</label>
                    <div className="grid grid-cols-2 gap-3">
                      {presetAmounts.map((amt) => (
                        <button
                          key={amt}
                          onClick={() => { setAmount(amt); setCustomAmount(''); }}
                          className={`py-4 rounded-xl font-oswald text-xl font-bold transition-all border-2 ${amount === amt && !customAmount
                            ? 'border-nv-blue bg-nv-blue text-white shadow-lg shadow-nv-blue/30'
                            : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-nv-blue/30'
                            }`}
                        >
                          ₹{amt.toLocaleString()}
                        </button>
                      ))}
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-oswald text-xl font-bold text-gray-400">₹</span>
                      <input
                        type="number"
                        value={customAmount}
                        onChange={handleCustomAmount}
                        placeholder="Custom Amount"
                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl p-4 pl-10 font-oswald text-xl font-bold focus:border-nv-blue focus:ring-0 outline-none transition-all placeholder-gray-300"
                      />
                    </div>
                  </div>

                  {/* Tier Benefits */}
                  <div className="bg-nv-blue/5 rounded-2xl p-6 mb-8 border border-nv-blue/10">
                    <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4 text-nv-blue" /> Unlocked Benefits
                    </h4>
                    <ul className="space-y-2 text-xs text-gray-600">
                      {amount >= 10000 ? (
                        <>
                          <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500" /> Platinum Donor Badge</li>
                          <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500" /> VIP Matchday Experience</li>
                          <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500" /> Name on Stadium Wall</li>
                        </>
                      ) : amount >= 5000 ? (
                        <>
                          <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500" /> Gold Donor Badge</li>
                          <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500" /> Official Jersey</li>
                        </>
                      ) : (
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500" /> Digital Supporter Certificate</li>
                      )}
                    </ul>
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    className="w-full bg-nv-yellow text-nv-blue py-5 rounded-xl font-black uppercase text-lg tracking-widest hover:bg-[#F0C000] transition-all shadow-xl shadow-nv-yellow/20 flex items-center justify-center gap-2 group animate-pulse-glow">
                    Proceed to Pay <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-center text-[10px] text-gray-400 mt-4 font-medium">
                    Secure payment powered by Razorpay. All donations are tax-deductible.
                  </p>
                </div>
              ) : (
                <div className="text-center animate-reveal py-12">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="h-12 w-12 text-green-600" />
                  </div>
                  <h2 className="font-oswald text-4xl font-bold mb-4 uppercase italic">Thank You!</h2>
                  <p className="text-gray-500 mb-8">
                    Your donation of <span className="font-bold text-nv-blue">₹{amount.toLocaleString()}</span> has been initiated. You are making history with us.
                  </p>
                  <button
                    onClick={() => setStep(1)}
                    className="text-nv-blue font-bold uppercase tracking-widest text-xs hover:underline"
                  >
                    Make Another Donation
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Donate;
