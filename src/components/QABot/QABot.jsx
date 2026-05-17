import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight, RotateCcw, MessageCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

/* ─── Inline SVG floor plan previews ─── */
const PLANS = {
  std: {
    label: '3 BHK Standard — 1,817 Sq.Ft',
    price: '~₹1.99 Cr',
    svg: (
      <svg viewBox="0 0 300 210" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        <defs>
          <linearGradient id="pgrad" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#00b7fb" stopOpacity="0.18"/>
            <stop offset="1" stopColor="#1ded54" stopOpacity="0.12"/>
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="298" height="208" rx="6" fill="url(#pgrad)" stroke="#1ded54" strokeWidth="1.2" strokeOpacity="0.4"/>
        {/* Master bed */}
        <rect x="8"  y="8"  width="95" height="80" rx="3" fill="rgba(29,237,84,0.08)"  stroke="#1ded54" strokeWidth="1" strokeOpacity="0.5"/>
        <text x="55" y="42" textAnchor="middle" fontSize="7.5" fill="currentColor" opacity=".8" fontWeight="600">Master</text>
        <text x="55" y="53" textAnchor="middle" fontSize="7"   fill="currentColor" opacity=".6">Bedroom</text>
        <text x="55" y="64" textAnchor="middle" fontSize="6.5" fill="currentColor" opacity=".45">~14×12 ft</text>
        {/* Bed 2 */}
        <rect x="111" y="8"  width="80"  height="75" rx="3" fill="rgba(0,183,251,0.08)" stroke="#00b7fb" strokeWidth="1" strokeOpacity="0.5"/>
        <text x="151" y="40" textAnchor="middle" fontSize="7.5" fill="currentColor" opacity=".8" fontWeight="600">Bedroom 2</text>
        <text x="151" y="52" textAnchor="middle" fontSize="6.5" fill="currentColor" opacity=".45">~12×10 ft</text>
        {/* Bed 3 */}
        <rect x="199" y="8"  width="93"  height="75" rx="3" fill="rgba(0,183,251,0.08)" stroke="#00b7fb" strokeWidth="1" strokeOpacity="0.5"/>
        <text x="245" y="40" textAnchor="middle" fontSize="7.5" fill="currentColor" opacity=".8" fontWeight="600">Bedroom 3</text>
        <text x="245" y="52" textAnchor="middle" fontSize="6.5" fill="currentColor" opacity=".45">~11×10 ft</text>
        {/* Living & Dining */}
        <rect x="8"  y="96" width="155" height="106" rx="3" fill="rgba(29,237,84,0.06)" stroke="#1ded54" strokeWidth="1" strokeOpacity="0.5"/>
        <text x="85"  y="143" textAnchor="middle" fontSize="8"   fill="currentColor" opacity=".8" fontWeight="600">Living &amp; Dining</text>
        <text x="85"  y="156" textAnchor="middle" fontSize="6.5" fill="currentColor" opacity=".45">~22×16 ft</text>
        {/* Kitchen */}
        <rect x="171" y="96"  width="80" height="65" rx="3" fill="rgba(0,183,251,0.07)" stroke="#00b7fb" strokeWidth="1" strokeOpacity="0.5"/>
        <text x="211" y="126" textAnchor="middle" fontSize="7.5" fill="currentColor" opacity=".8" fontWeight="600">Kitchen</text>
        <text x="211" y="138" textAnchor="middle" fontSize="6.5" fill="currentColor" opacity=".45">~12×10 ft</text>
        {/* Balcony 1 */}
        <rect x="171" y="169" width="80" height="33" rx="3" fill="rgba(29,237,84,0.05)" stroke="#1ded54" strokeWidth="1" strokeDasharray="3,2" strokeOpacity="0.5"/>
        <text x="211" y="189" textAnchor="middle" fontSize="6.5" fill="currentColor" opacity=".6">Balcony 1</text>
        {/* Balcony 2 */}
        <rect x="259" y="96" width="33" height="106" rx="3" fill="rgba(29,237,84,0.05)" stroke="#1ded54" strokeWidth="1" strokeDasharray="3,2" strokeOpacity="0.5"/>
        <text x="275" y="148" textAnchor="middle" fontSize="6" fill="currentColor" opacity=".6" transform="rotate(-90,275,148)">Balcony 2</text>
        {/* Bathrooms */}
        <rect x="8"   y="89" width="42" height="6" rx="1" fill="rgba(255,255,255,0.04)" stroke="#00b7fb" strokeWidth="0.8" strokeOpacity="0.35"/>
        <text x="29"  y="95" textAnchor="middle" fontSize="5.5" fill="currentColor" opacity=".4">Bath</text>
      </svg>
    ),
  },
  premium: {
    label: '3 BHK Premium — 2,400 Sq.Ft',
    price: '~₹2.64 Cr',
    svg: (
      <svg viewBox="0 0 300 210" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        <defs>
          <linearGradient id="pgradp" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#00b7fb" stopOpacity="0.18"/>
            <stop offset="1" stopColor="#1ded54" stopOpacity="0.12"/>
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="298" height="208" rx="6" fill="url(#pgradp)" stroke="#1ded54" strokeWidth="1.2" strokeOpacity="0.4"/>
        {/* Master */}
        <rect x="8"   y="8"   width="110" height="90" rx="3" fill="rgba(29,237,84,0.08)"  stroke="#1ded54" strokeWidth="1" strokeOpacity="0.5"/>
        <text x="63"  y="48"  textAnchor="middle" fontSize="7.5" fill="currentColor" opacity=".8" fontWeight="600">Master Suite</text>
        <text x="63"  y="59"  textAnchor="middle" fontSize="7"   fill="currentColor" opacity=".6">w/ Walk-in Closet</text>
        <text x="63"  y="70"  textAnchor="middle" fontSize="6.5" fill="currentColor" opacity=".45">~15×13 ft</text>
        {/* Bed 2 */}
        <rect x="126" y="8"   width="85"  height="82" rx="3" fill="rgba(0,183,251,0.08)" stroke="#00b7fb" strokeWidth="1" strokeOpacity="0.5"/>
        <text x="168" y="44"  textAnchor="middle" fontSize="7.5" fill="currentColor" opacity=".8" fontWeight="600">Bedroom 2</text>
        <text x="168" y="56"  textAnchor="middle" fontSize="6.5" fill="currentColor" opacity=".45">~13×11 ft</text>
        {/* Bed 3 */}
        <rect x="219" y="8"   width="73"  height="82" rx="3" fill="rgba(0,183,251,0.08)" stroke="#00b7fb" strokeWidth="1" strokeOpacity="0.5"/>
        <text x="255" y="44"  textAnchor="middle" fontSize="7.5" fill="currentColor" opacity=".8" fontWeight="600">Bedroom 3</text>
        <text x="255" y="56"  textAnchor="middle" fontSize="6.5" fill="currentColor" opacity=".45">~12×10 ft</text>
        {/* Living */}
        <rect x="8"   y="106" width="165" height="96" rx="3" fill="rgba(29,237,84,0.06)" stroke="#1ded54" strokeWidth="1" strokeOpacity="0.5"/>
        <text x="90"  y="153" textAnchor="middle" fontSize="8"   fill="currentColor" opacity=".8" fontWeight="600">Living &amp; Dining</text>
        <text x="90"  y="165" textAnchor="middle" fontSize="6.5" fill="currentColor" opacity=".45">~24×18 ft</text>
        {/* Kitchen */}
        <rect x="181" y="106" width="78"  height="60" rx="3" fill="rgba(0,183,251,0.07)" stroke="#00b7fb" strokeWidth="1" strokeOpacity="0.5"/>
        <text x="220" y="134" textAnchor="middle" fontSize="7.5" fill="currentColor" opacity=".8" fontWeight="600">Kitchen</text>
        <text x="220" y="146" textAnchor="middle" fontSize="6.5" fill="currentColor" opacity=".45">~14×10 ft</text>
        {/* Balconies */}
        <rect x="181" y="174" width="78"  height="28" rx="3" fill="rgba(29,237,84,0.05)" stroke="#1ded54" strokeWidth="1" strokeDasharray="3,2" strokeOpacity="0.5"/>
        <text x="220" y="191" textAnchor="middle" fontSize="6.5" fill="currentColor" opacity=".6">Balcony 1</text>
        <rect x="267" y="8"   width="25"  height="96" rx="3" fill="rgba(29,237,84,0.05)" stroke="#1ded54" strokeWidth="1" strokeDasharray="3,2" strokeOpacity="0.5"/>
        <text x="279" y="60"  textAnchor="middle" fontSize="5.5" fill="currentColor" opacity=".6" transform="rotate(-90,279,60)">Balcony 2</text>
        <rect x="8"   y="97"  width="165" height="8" rx="1" fill="rgba(0,183,251,0.05)" stroke="#00b7fb" strokeWidth="0.8" strokeOpacity="0.3"/>
        <text x="90"  y="104" textAnchor="middle" fontSize="5.5" fill="currentColor" opacity=".35">Bathrooms</text>
      </svg>
    ),
  },
  grand: {
    label: '3 BHK Grand — 3,675 Sq.Ft',
    price: '~₹4.04 Cr',
    svg: (
      <svg viewBox="0 0 300 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        <defs>
          <linearGradient id="pgradg" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#00b7fb" stopOpacity="0.2"/>
            <stop offset="1" stopColor="#1ded54" stopOpacity="0.14"/>
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="298" height="218" rx="6" fill="url(#pgradg)" stroke="#1ded54" strokeWidth="1.2" strokeOpacity="0.45"/>
        {/* Master suite */}
        <rect x="8"   y="8"   width="118" height="95" rx="3" fill="rgba(29,237,84,0.09)"  stroke="#1ded54" strokeWidth="1" strokeOpacity="0.55"/>
        <text x="67"  y="48"  textAnchor="middle" fontSize="7.5" fill="currentColor" opacity=".8" fontWeight="600">Master Suite</text>
        <text x="67"  y="59"  textAnchor="middle" fontSize="6.5" fill="currentColor" opacity=".6">Walk-in + Ensuite</text>
        <text x="67"  y="70"  textAnchor="middle" fontSize="6.5" fill="currentColor" opacity=".45">~16×14 ft</text>
        {/* Bed 2 */}
        <rect x="134" y="8"   width="80"  height="85" rx="3" fill="rgba(0,183,251,0.08)" stroke="#00b7fb" strokeWidth="1" strokeOpacity="0.5"/>
        <text x="174" y="45"  textAnchor="middle" fontSize="7.5" fill="currentColor" opacity=".8" fontWeight="600">Bedroom 2</text>
        <text x="174" y="57"  textAnchor="middle" fontSize="6.5" fill="currentColor" opacity=".45">~13×12 ft</text>
        {/* Bed 3 */}
        <rect x="222" y="8"   width="70"  height="85" rx="3" fill="rgba(0,183,251,0.08)" stroke="#00b7fb" strokeWidth="1" strokeOpacity="0.5"/>
        <text x="257" y="45"  textAnchor="middle" fontSize="7.5" fill="currentColor" opacity=".8" fontWeight="600">Bedroom 3</text>
        <text x="257" y="57"  textAnchor="middle" fontSize="6.5" fill="currentColor" opacity=".45">~13×11 ft</text>
        {/* Study */}
        <rect x="8"   y="111" width="68"  height="55" rx="3" fill="rgba(255,200,0,0.08)" stroke="#E8B020" strokeWidth="1" strokeOpacity="0.5"/>
        <text x="42"  y="137" textAnchor="middle" fontSize="7.5" fill="currentColor" opacity=".8" fontWeight="600">Study</text>
        <text x="42"  y="149" textAnchor="middle" fontSize="6.5" fill="currentColor" opacity=".45">~10×9 ft</text>
        {/* Living */}
        <rect x="84"  y="101" width="150" height="110" rx="3" fill="rgba(29,237,84,0.06)" stroke="#1ded54" strokeWidth="1" strokeOpacity="0.5"/>
        <text x="159" y="154" textAnchor="middle" fontSize="8"   fill="currentColor" opacity=".8" fontWeight="600">Living &amp; Dining</text>
        <text x="159" y="166" textAnchor="middle" fontSize="6.5" fill="currentColor" opacity=".45">~26×20 ft</text>
        {/* Kitchen */}
        <rect x="242" y="101" width="50"  height="68" rx="3" fill="rgba(0,183,251,0.07)" stroke="#00b7fb" strokeWidth="1" strokeOpacity="0.5"/>
        <text x="267" y="133" textAnchor="middle" fontSize="7"   fill="currentColor" opacity=".8" fontWeight="600">Kitchen</text>
        <text x="267" y="144" textAnchor="middle" fontSize="6"   fill="currentColor" opacity=".45">Chef's</text>
        {/* Wrap balcony */}
        <rect x="8"   y="174" width="68"  height="38" rx="3" fill="rgba(29,237,84,0.05)" stroke="#1ded54" strokeWidth="1" strokeDasharray="3,2" strokeOpacity="0.5"/>
        <text x="42"  y="196" textAnchor="middle" fontSize="6.5" fill="currentColor" opacity=".6">Balcony 1</text>
        <rect x="242" y="177" width="50"  height="35" rx="3" fill="rgba(29,237,84,0.05)" stroke="#1ded54" strokeWidth="1" strokeDasharray="3,2" strokeOpacity="0.5"/>
        <text x="267" y="197" textAnchor="middle" fontSize="6.5" fill="currentColor" opacity=".6">Balcony 2</text>
        {/* Balcony 3 wrap-around */}
        <rect x="134" y="8"   width="158" height="12" rx="3" fill="rgba(29,237,84,0.04)" stroke="#1ded54" strokeWidth="0.8" strokeDasharray="3,2" strokeOpacity="0.4"/>
        <text x="213" y="16"  textAnchor="middle" fontSize="5.5" fill="currentColor" opacity=".4">Balcony 3 (wrap-around)</text>
      </svg>
    ),
  },
}

/* ─── Decision tree ─── */
const TREE = {
  welcome: {
    bot: 'Hi! 👋 I\'m the Marvel Assistant. What would you like to know about Marvel Infra Gachibowli?',
    options: [
      { label: '🏢 About the Project',       next: 'about'      },
      { label: '📐 Floor Plans & Pricing',   next: 'floors'     },
      { label: '📍 Location & Connectivity', next: 'location'   },
      { label: '🌟 Amenities',               next: 'amenities'  },
      { label: '📞 Book a Site Visit',       next: 'register'   },
    ],
  },
  about: {
    bot: 'Marvel Infra Gachibowli is a premium single-tower development on 1.75 acres, right beside the Gachibowli Flyover, Hyderabad.\n\nIt offers spacious 3 BHK residences from 1,817 to 3,675 Sq.Ft at ₹10,999/Sq.Ft with 50+ curated lifestyle amenities.',
    options: [
      { label: '📐 Floor Plans & Pricing', next: 'floors'   },
      { label: '📍 Location Benefits',     next: 'location' },
      { label: '📞 Register Interest',     next: 'register' },
      { label: '← Main Menu',             next: 'welcome'  },
    ],
  },
  floors: {
    bot: 'We offer 3 BHK residences in 3 configurations at ₹10,999/Sq.Ft. Which would you like to explore?',
    options: [
      { label: '3 BHK Standard — 1,817 Sq.Ft', next: 'floor_std'     },
      { label: '3 BHK Premium — 2,400 Sq.Ft',  next: 'floor_premium' },
      { label: '3 BHK Grand   — 3,675 Sq.Ft',  next: 'floor_grand'   },
      { label: '← Main Menu',                  next: 'welcome'       },
    ],
  },
  floor_std: {
    bot: '3 BHK Standard\n\n• Area: ~1,817 Sq.Ft\n• Starting price: ~₹1.99 Cr\n• 3 Beds · 3 Baths · 2 Balconies\n• Open-plan living, modular kitchen',
    options: [
      { label: '👁️ Preview Floor Plan',   next: 'floor_std',    action: 'preview',  planKey: 'std' },
      { label: '⬇️ Download Floor Plans', next: 'floor_std',    action: 'download'                 },
      { label: '📐 Other Configurations', next: 'floors'                                           },
      { label: '📞 Register Interest',    next: 'register'                                         },
      { label: '← Main Menu',            next: 'welcome'                                          },
    ],
  },
  floor_premium: {
    bot: '3 BHK Premium\n\n• Area: ~2,400 Sq.Ft\n• Starting price: ~₹2.64 Cr\n• 3 Beds · 3 Baths · 3 Balconies\n• Spacious kitchen, imported marble flooring',
    options: [
      { label: '👁️ Preview Floor Plan',   next: 'floor_premium', action: 'preview',  planKey: 'premium' },
      { label: '⬇️ Download Floor Plans', next: 'floor_premium', action: 'download'                    },
      { label: '📐 Other Configurations', next: 'floors'                                               },
      { label: '📞 Register Interest',    next: 'register'                                             },
      { label: '← Main Menu',            next: 'welcome'                                              },
    ],
  },
  floor_grand: {
    bot: '3 BHK Grand\n\n• Area: ~3,675 Sq.Ft\n• Starting price: ~₹4.04 Cr\n• 3 Beds · 4 Baths · 3 Balconies\n• Private study, chef\'s kitchen, wrap-around balconies',
    options: [
      { label: '👁️ Preview Floor Plan',   next: 'floor_grand', action: 'preview',  planKey: 'grand' },
      { label: '⬇️ Download Floor Plans', next: 'floor_grand', action: 'download'                   },
      { label: '📐 Other Configurations', next: 'floors'                                            },
      { label: '📞 Register Interest',    next: 'register'                                          },
      { label: '← Main Menu',            next: 'welcome'                                           },
    ],
  },

  location: {
    bot: 'Strategically located beside the Gachibowli Flyover. What would you like to know?',
    options: [
      { label: '🛣️ Outer Ring Road (ORR)', next: 'loc_orr'     },
      { label: '💻 IT Hubs & Tech Parks',  next: 'loc_it'      },
      { label: '🏫 Schools & Hospitals',   next: 'loc_schools' },
      { label: '← Main Menu',             next: 'welcome'     },
    ],
  },
  loc_orr: {
    bot: 'The Outer Ring Road (ORR) is just 200 metres away — seamless access to the Financial District, HITEC City, Hyderabad Airport, and beyond.',
    options: [
      { label: '💻 IT Hubs',   next: 'loc_it'   },
      { label: '← Location',  next: 'location' },
      { label: '← Main Menu', next: 'welcome'  },
    ],
  },
  loc_it: {
    bot: 'Leading IT parks and tech campuses are within 1 KM — walk or a short drive to work. HITEC City, Financial District, and Gachibowli tech corridor are all minutes away.',
    options: [
      { label: '🏫 Schools & Hospitals', next: 'loc_schools' },
      { label: '← Location',            next: 'location'    },
      { label: '← Main Menu',           next: 'welcome'     },
    ],
  },
  loc_schools: {
    bot: 'Top-rated schools and hospitals are within a 2 KM radius. Gachibowli is home to some of Hyderabad\'s finest educational institutions and healthcare facilities.',
    options: [
      { label: '🛣️ ORR Connectivity', next: 'loc_orr' },
      { label: '← Location',         next: 'location' },
      { label: '← Main Menu',        next: 'welcome'  },
    ],
  },

  amenities: {
    bot: '50+ curated lifestyle amenities across wellness, recreation, community, and smart utilities. Which category interests you?',
    options: [
      { label: '🏊 Recreation & Fitness', next: 'amen_rec'       },
      { label: '🧘 Wellness & Spa',       next: 'amen_wellness'  },
      { label: '👶 Kids & Family',        next: 'amen_kids'      },
      { label: '🎭 Community Spaces',     next: 'amen_community' },
      { label: '← Main Menu',            next: 'welcome'        },
    ],
  },
  amen_rec: {
    bot: 'Recreation & Fitness:\n\n🏊 Swimming Pool & Kids\' Pool\n💪 Gymnasium & Open Air Gym\n🎾 Tennis, Basketball & Badminton Courts\n🏃 Jogging & Cycling Tracks\n🏏 Cricket Practice Net',
    options: [
      { label: '🧘 Wellness',  next: 'amen_wellness' },
      { label: '← Amenities', next: 'amenities'     },
      { label: '← Main Menu', next: 'welcome'       },
    ],
  },
  amen_wellness: {
    bot: 'Wellness & Spa:\n\n🧘 Yoga Deck & Meditation Garden\n💆 Spa & Sauna\n♨️ Steam Room & Jacuzzi\n🌿 Reflexology Path\n🏃 Aerobics Studio',
    options: [
      { label: '👶 Kids & Family', next: 'amen_kids' },
      { label: '← Amenities',     next: 'amenities' },
      { label: '← Main Menu',     next: 'welcome'   },
    ],
  },
  amen_kids: {
    bot: 'Kids & Family:\n\n🛝 Kids\' Play Area & Toddler Zone\n💦 Splash Pad & Kids\' Pool\n👶 Creche & Day Care\n🌳 Tree House & Pet Park\n🎮 Teen Hub',
    options: [
      { label: '🎭 Community', next: 'amen_community' },
      { label: '← Amenities', next: 'amenities'      },
      { label: '← Main Menu', next: 'welcome'        },
    ],
  },
  amen_community: {
    bot: 'Community Spaces:\n\n🏛️ Grand Clubhouse & Party Hall\n🎬 Mini Theater & Amphitheater\n☁️ Sky Lounge & Rooftop Garden\n📚 Library & Business Center\n🛍️ Convenience Store',
    options: [
      { label: '🏊 Recreation', next: 'amen_rec'  },
      { label: '← Amenities',  next: 'amenities' },
      { label: '← Main Menu',  next: 'welcome'   },
    ],
  },

  register: {
    bot: 'Great choice! Our team is ready to assist. How would you like to connect?',
    options: [
      { label: '📞 Call: +91 91333 11586', next: 'call',    action: 'call'     },
      { label: '📝 Fill Enquiry Form',     next: 'contact', action: 'navigate' },
      { label: '← Main Menu',             next: 'welcome'                     },
    ],
  },
  call: {
    bot: 'Connecting you now! 📞\n\nCall us at +91 91333 11586\nAvailable Mon–Sat · 10AM–7PM\n\nOur sales team will guide you through the project.',
    options: [
      { label: '📝 Fill Form Instead', next: 'contact', action: 'navigate' },
      { label: '🏠 Main Menu',         next: 'welcome'                     },
    ],
  },
  contact: {
    bot: 'Taking you to our Expression of Interest form. Our team will reach out within 24 hours with pricing and site visit details. 🏠',
    options: [{ label: '← Main Menu', next: 'welcome' }],
  },
}

/* ─── Typing dots ─── */
function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 rounded-2xl rounded-bl-sm w-fit"
      style={{ background: 'var(--glass-bg)', border: '1px solid var(--border-gold)' }}>
      {[0, 1, 2].map(i => (
        <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-accent"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.14, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

/* ─── Floor plan card ─── */
function PlanCard({ planKey }) {
  const plan = PLANS[planKey]
  if (!plan) return null
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-xl overflow-hidden w-full"
      style={{ border: '1px solid var(--border-gold)', background: 'var(--surface)' }}
    >
      <div className="px-3 py-2 flex items-center justify-between border-b" style={{ borderColor: 'var(--border-subtle)' }}>
        <div>
          <p className="text-xs font-bold text-[var(--text-primary)] leading-tight">{plan.label}</p>
          <p className="text-xs text-accent font-semibold">{plan.price}</p>
        </div>
        <span className="text-[9px] font-bold tracking-widest text-[var(--text-muted)] uppercase px-2 py-0.5 rounded-full"
          style={{ background: 'var(--accent-tint)', border: '1px solid var(--border-gold)' }}>
          Indicative
        </span>
      </div>
      <div className="p-2 text-[var(--text-primary)]">
        {plan.svg}
      </div>
    </motion.div>
  )
}

/* ─── Main widget ─── */
export default function QABot() {
  const [open, setOpen]             = useState(false)
  const [node, setNode]             = useState('welcome')
  const [messages, setMessages]     = useState([{ type: 'bot', text: TREE.welcome.bot }])
  const [typing, setTyping]         = useState(false)
  const [optionsKey, setOptionsKey] = useState(0)
  const bottomRef                   = useRef(null)
  const navigate                    = useNavigate()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const pick = (option) => {
    if (option.action === 'call') {
      window.location.href = 'tel:+919133311586'
    }

    if (option.action === 'download') {
      const link = document.createElement('a')
      link.href = '/floorplans.pdf'
      link.download = 'Marvel-Infra-Gachibowli-Floor-Plans.pdf'
      link.click()
      // Show confirmation message without changing node
      setMessages(prev => [
        ...prev,
        { type: 'user', text: option.label },
        { type: 'bot', text: '📥 Download started! The floor plan PDF is being saved to your device.' },
      ])
      setOptionsKey(k => k + 1)
      return
    }

    // Push user selection bubble
    setMessages(prev => [...prev, { type: 'user', text: option.label }])

    if (option.action === 'preview') {
      // Show plan card immediately — no typing delay needed
      setMessages(prev => [...prev, { type: 'plan', planKey: option.planKey }])
      // Stay on same node, just refresh options
      setOptionsKey(k => k + 1)
      return
    }

    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      const next = TREE[option.next]
      if (next) {
        setMessages(prev => [...prev, { type: 'bot', text: next.bot }])
        setNode(option.next)
        setOptionsKey(k => k + 1)
      }
      if (option.action === 'navigate') {
        setTimeout(() => { navigate('/contact'); setOpen(false) }, 900)
      }
    }, 750)
  }

  const reset = () => {
    setMessages([{ type: 'bot', text: TREE.welcome.bot }])
    setNode('welcome')
    setTyping(false)
    setOptionsKey(k => k + 1)
  }

  const currentOptions = TREE[node]?.options ?? []

  return (
    <>
      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{   opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: 'spring', bounce: 0.22, duration: 0.38 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 flex flex-col rounded-2xl overflow-hidden"
            style={{
              width: 'min(360px, calc(100vw - 2rem))',
              maxHeight: '82vh',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-gold)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.35), var(--glow-gold)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 flex-shrink-0"
              style={{ background: 'var(--gold-gradient)' }}>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/25 flex items-center justify-center font-display font-bold text-[#000e4b] text-base select-none">M</div>
                <div>
                  <div className="text-[#000e4b] font-bold text-sm leading-tight">Marvel Assistant</div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#000e4b]/60 animate-pulse inline-block" />
                    <span className="text-[#000e4b]/70 text-xs font-medium">Online · Ask us anything</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button type="button" onClick={reset} title="Restart"
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-[#000e4b]/10 hover:bg-[#000e4b]/20 text-[#000e4b] transition-colors">
                  <RotateCcw size={13} />
                </button>
                <button type="button" onClick={() => setOpen(false)}
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-[#000e4b]/10 hover:bg-[#000e4b]/20 text-[#000e4b] transition-colors">
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0" style={{ maxHeight: '340px' }}>
              {messages.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.type === 'bot' && (
                    <div className="rounded-2xl rounded-bl-sm px-4 py-2.5 max-w-[88%]"
                      style={{ background: 'var(--glass-bg)', border: '1px solid var(--border-gold)' }}>
                      <p className="text-sm text-[var(--text-primary)] leading-relaxed whitespace-pre-line">{msg.text}</p>
                    </div>
                  )}
                  {msg.type === 'user' && (
                    <div className="rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[88%]"
                      style={{ background: 'var(--gold-gradient)' }}>
                      <p className="text-sm text-[#000e4b] font-semibold leading-snug">{msg.text}</p>
                    </div>
                  )}
                  {msg.type === 'plan' && (
                    <div className="w-full">
                      <PlanCard planKey={msg.planKey} />
                    </div>
                  )}
                </motion.div>
              ))}
              {typing && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                  <TypingDots />
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Options */}
            <div className="flex-shrink-0 px-3 py-3 space-y-1.5 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
              <AnimatePresence mode="wait">
                {!typing && (
                  <motion.div key={optionsKey} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-1.5">
                    {currentOptions.map((opt, i) => (
                      <motion.button key={i} type="button"
                        initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.045, duration: 0.2 }}
                        onClick={() => pick(opt)}
                        className="w-full text-left text-sm px-3.5 py-2.5 rounded-xl border transition-all duration-150 flex items-center justify-between group"
                        style={{ borderColor: 'var(--border-gold)', color: 'var(--text-primary)', background: 'transparent' }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = 'var(--accent-tint)'
                          e.currentTarget.style.color = 'var(--accent)'
                          e.currentTarget.style.borderColor = 'var(--accent)'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = 'transparent'
                          e.currentTarget.style.color = 'var(--text-primary)'
                          e.currentTarget.style.borderColor = 'var(--border-gold)'
                        }}
                      >
                        <span>{opt.label}</span>
                        <ChevronRight size={13} className="flex-shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" />
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              {typing && <p className="text-center text-xs text-[var(--text-muted)] py-1">Getting answer…</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button type="button" onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.93 }}
        className="fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center"
        style={{ background: 'var(--gold-gradient)', boxShadow: '0 8px 32px rgba(29,237,84,0.35)' }}
        aria-label={open ? 'Close assistant' : 'Open Marvel Assistant'}
      >
        {!open && (
          <motion.span className="absolute inset-0 rounded-full pointer-events-none"
            style={{ background: 'var(--gold-gradient)' }}
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
              <X size={22} color="#000e4b" />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
              <MessageCircle size={22} color="#000e4b" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  )
}
