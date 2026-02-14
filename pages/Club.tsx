
import React from 'react';
import { Shield, Trophy, Target, Heart, Users, Award } from 'lucide-react';
import { CLUB_HISTORY, MANAGEMENT_TEAM } from '../constants';

const Club: React.FC = () => {
   return (
      <div className="min-h-screen bg-white font-sans">

         {/* Hero Section */}
         <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
               <img
                  src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=90&w=2400"
                  alt="Club Heritage"
                  className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-white" />
            </div>

            <div className="relative z-10 text-center text-white px-4 sm:px-6">
               <div className="inline-flex items-center gap-2 mb-4 sm:mb-6 bg-white/10 backdrop-blur-sm px-4 sm:px-6 py-2 rounded-full border border-white/20">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-nv-yellow" />
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider">Established 1988</span>
               </div>
               <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black mb-4 sm:mb-6 tracking-tight">
                  Our Story
               </h1>
               <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto font-light">
                  The journey of Narmada Valley Football Club
               </p>
            </div>
         </section>

         {/* About Section */}
         <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
            <div className="prose prose-lg max-w-none">
               <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-nv-blue mb-6 sm:mb-8">About Narmada Valley FC</h2>

               <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  Founded in 1988 on the banks of the sacred Narmada River in Jabalpur, Madhya Pradesh, Narmada Valley Football Club (NVFC) has grown from humble beginnings into one of India's most respected football institutions. What started as a group of passionate local players gathering on dusty grounds near Tilwara Ghat has evolved into a professional club that represents the pride and aspirations of Central India.
               </p>

               <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  Our club embodies the spirit of the Narmada Valley—resilient, flowing, and life-giving. We believe football is more than just a sport; it's a vehicle for community development, youth empowerment, and regional pride. Over the past three decades, NVFC has become synonymous with excellence, integrity, and unwavering commitment to the beautiful game.
               </p>

               <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  Today, NVFC competes at the highest levels of Indian football, playing our home matches at the magnificent Narmada Arena—a 35,000-capacity stadium that stands as a testament to our journey from local heroes to national contenders. Our blue and yellow colors are worn with pride by players who understand they represent not just a club, but an entire region's dreams.
               </p>
            </div>
         </section>

         {/* Vision & Mission */}
         <section className="bg-gray-50 py-12 sm:py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">

                  {/* Vision */}
                  <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
                     <div className="w-12 h-12 sm:w-14 sm:h-14 bg-nv-blue rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                        <Target className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                     </div>
                     <h3 className="text-2xl sm:text-3xl font-bold text-nv-blue mb-3 sm:mb-4">Our Vision</h3>
                     <p className="text-gray-700 leading-relaxed text-lg">
                        To establish Narmada Valley Football Club as a beacon of excellence in Indian football, inspiring the next generation of athletes while putting Madhya Pradesh on the national and international football map. We envision a future where NVFC is recognized not only for sporting success but also for our contribution to community development and youth empowerment.
                     </p>
                  </div>

                  {/* Mission */}
                  <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
                     <div className="w-12 h-12 sm:w-14 sm:h-14 bg-nv-yellow rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                        <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-nv-blue" />
                     </div>
                     <h3 className="text-2xl sm:text-3xl font-bold text-nv-blue mb-3 sm:mb-4">Our Mission</h3>
                     <p className="text-gray-700 leading-relaxed text-lg">
                        To compete with integrity and passion at the highest levels of Indian football while nurturing local talent through our academy system. We are committed to providing world-class training facilities, fostering a culture of excellence, and creating opportunities for young players from Central India to achieve their professional football dreams.
                     </p>
                  </div>

               </div>
            </div>
         </section>

         {/* Core Values */}
         <section className="py-12 sm:py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-nv-blue mb-8 sm:mb-10 md:mb-12 text-center">Our Core Values</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">

               <div className="text-center p-8">
                  <div className="w-16 h-16 bg-nv-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                     <Shield className="w-8 h-8 text-nv-blue" />
                  </div>
                  <h3 className="text-2xl font-bold text-nv-blue mb-3">Integrity</h3>
                  <p className="text-gray-600 leading-relaxed">
                     We play the game with honesty, respect, and fairness. Our reputation is built on ethical conduct both on and off the field.
                  </p>
               </div>

               <div className="text-center p-8">
                  <div className="w-16 h-16 bg-nv-yellow/20 rounded-full flex items-center justify-center mx-auto mb-6">
                     <Users className="w-8 h-8 text-nv-blue" />
                  </div>
                  <h3 className="text-2xl font-bold text-nv-blue mb-3">Community</h3>
                  <p className="text-gray-600 leading-relaxed">
                     We are deeply rooted in the Narmada Valley community, committed to giving back and inspiring the next generation.
                  </p>
               </div>

               <div className="text-center p-8">
                  <div className="w-16 h-16 bg-nv-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                     <Award className="w-8 h-8 text-nv-blue" />
                  </div>
                  <h3 className="text-2xl font-bold text-nv-blue mb-3">Excellence</h3>
                  <p className="text-gray-600 leading-relaxed">
                     We strive for the highest standards in training, performance, and professionalism in every aspect of our operations.
                  </p>
               </div>

            </div>
         </section>

         {/* History Timeline */}
         <section className="bg-nv-blue py-12 sm:py-16 md:py-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
               <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 text-center">Our Journey</h2>
               <p className="text-gray-300 text-center mb-10 sm:mb-12 md:mb-16 text-base sm:text-lg">Key milestones in our club's history</p>

               <div className="space-y-8">
                  {CLUB_HISTORY.map((milestone, idx) => (
                     <div key={idx} className="flex gap-4 sm:gap-6 md:gap-8 items-start group">
                        <div className="flex-shrink-0 w-16 sm:w-20 md:w-24 text-right">
                           <span className="text-xl sm:text-2xl md:text-3xl font-bold text-nv-yellow">{milestone.year}</span>
                        </div>
                        <div className="flex-shrink-0 pt-1 sm:pt-2">
                           <div className="w-3 h-3 sm:w-4 sm:h-4 bg-nv-yellow rounded-full group-hover:scale-150 transition-transform" />
                        </div>
                        <div className="flex-1 pb-6 sm:pb-8">
                           <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">{milestone.title}</h3>
                           <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{milestone.description}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Leadership Team */}
         <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
               <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-nv-blue mb-3 sm:mb-4 text-center">Leadership Team</h2>
               <p className="text-gray-600 text-center mb-10 sm:mb-12 md:mb-16 text-base sm:text-lg">The visionaries guiding our club's future</p>

               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
                  {MANAGEMENT_TEAM.map((member, idx) => (
                     <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                        <div className="aspect-[4/5] overflow-hidden bg-gray-200">
                           <img
                              src={member.image}
                              alt={member.name}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                           />
                        </div>
                        <div className="p-6">
                           <h3 className="text-2xl font-bold text-nv-blue mb-1">{member.name}</h3>
                           <p className="text-nv-yellow font-semibold mb-3 uppercase tracking-wide text-sm">{member.role}</p>
                           <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Stadium Section */}
         <section className="py-12 sm:py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">

                  <div className="order-2 lg:order-1">
                     <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-nv-blue mb-4 sm:mb-6">Narmada Arena</h2>
                     <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                        Our home, the Narmada Arena, is a state-of-the-art 35,000-capacity stadium that opened in 2018. Featuring a FIFA-certified hybrid pitch, world-class training facilities, and one of the best matchday atmospheres in Indian football, the Arena is where our dreams come to life.
                     </p>
                     <p className="text-gray-700 leading-relaxed mb-8 text-lg">
                        From the passionate North Stand to the family-friendly South End, every corner of the stadium pulses with the blue and yellow spirit. The Narmada Arena isn't just a venue—it's our fortress, our home, our pride.
                     </p>

                     <div className="flex gap-8">
                        <div>
                           <div className="text-4xl font-bold text-nv-blue mb-1">35,000</div>
                           <div className="text-gray-600 uppercase text-sm font-semibold tracking-wide">Capacity</div>
                        </div>
                        <div>
                           <div className="text-4xl font-bold text-nv-blue mb-1">2018</div>
                           <div className="text-gray-600 uppercase text-sm font-semibold tracking-wide">Inaugurated</div>
                        </div>
                        <div>
                           <div className="text-4xl font-bold text-nv-blue mb-1">FIFA</div>
                           <div className="text-gray-600 uppercase text-sm font-semibold tracking-wide">Certified</div>
                        </div>
                     </div>
                  </div>

                  <div className="order-1 lg:order-2">
                     <div className="rounded-2xl overflow-hidden shadow-xl">
                        <img
                           src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=1200"
                           alt="Narmada Arena"
                           className="w-full h-full object-cover"
                        />
                     </div>
                  </div>

               </div>
            </div>
         </section>

         {/* Closing Statement */}
         <section className="bg-nv-yellow py-12 sm:py-16 md:py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
               <Trophy className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-nv-blue mx-auto mb-6 sm:mb-8" />
               <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-nv-blue mb-4 sm:mb-6">
                  More Than a Club
               </h2>
               <p className="text-xl text-nv-blue/80 leading-relaxed">
                  We are a family, a community, and a movement. Together, we are writing the next chapter of Indian football history, one match at a time. Join us on this incredible journey.
               </p>
            </div>
         </section>

      </div>
   );
};

export default Club;
