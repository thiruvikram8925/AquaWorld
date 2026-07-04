import { Product, Category, Review } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'ro',
    title: 'RO Water Purifiers',
    description: 'Advanced Reverse Osmosis systems removing heavy metals, salts, and chemical impurities with absolute precision.',
    image: 'https://images.unsplash.com/photo-1585829365294-06d3b0e5aa3b?auto=format&fit=crop&w=600&q=80',
    count: 12
  },
  {
    id: 'uv',
    title: 'UV Water Purifiers',
    description: 'High-intensity Ultraviolet chambers destroying 99.99% of bacteria, viruses, and pathogens instantly.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
    count: 8
  },
  {
    id: 'uf',
    title: 'UF Systems',
    description: 'Hollow-fiber Ultrafiltration membranes providing physical filtration without electricity or chemical use.',
    image: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=600&q=80',
    count: 6
  },
  {
    id: 'commercial',
    title: 'Commercial RO Plants',
    description: 'Heavy-duty water purification plants for schools, offices, factories, and residential high-rises.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
    count: 4
  },
  {
    id: 'domestic',
    title: 'Domestic RO Systems',
    description: 'Compact, elegant, multi-stage water purifiers custom-tailored for modern family kitchens.',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
    count: 15
  },
  {
    id: 'filters',
    title: 'Water Filters',
    description: 'Premium Sediment, Pre-Carbon, Post-Carbon, and Mineral booster replacement cartridges.',
    image: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=600&q=80',
    count: 24
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Aqua HydroPure NXT',
    brand: 'Aqua World',
    shortDesc: 'Ultra-luxurious RO+UV+UF multi-stage active copper mineral purifier.',
    fullDesc: 'The flagship Aqua HydroPure NXT represents the pinnacle of drinking water engineering. Featuring an advanced 10-stage purification system infused with active copper, zinc, and alkaline mineral boosters, it delivers water that is not only pristine but actively enhances your body’s immunity and metabolic health.',
    features: [
      'Alkaline Mineral Balancer',
      'Active Copper Charge Technology',
      'Intelligent LED Indicator Panel',
      'Water-saving Recovery Module',
      '7-Stage Filtration'
    ],
    technology: 'RO + UV + UF',
    capacity: '12L',
    installationType: 'Wall Mounted',
    color: 'Black',
    rating: 4.9,
    price: 24999,
    originalPrice: 32999,
    discountBadge: '24% OFF',
    image: 'https://images.unsplash.com/photo-1585829365294-06d3b0e5aa3b?auto=format&fit=crop&w=800&q=80',
    isBestSeller: true,
    isNewArrival: false
  },
  {
    id: 'p2',
    name: 'Grand Plus RO',
    brand: 'Kent',
    shortDesc: 'Classic trusted RO+UV filtration with patented mineral retention system.',
    fullDesc: 'The Kent Grand Plus combines classical high-capacity performance with modern elegance. Trusted by millions of families, its patented Mineral ROTM technology retains key natural minerals in purified water using an advanced TDS Controller, guaranteeing refreshing, healthy water.',
    features: [
      'Mineral ROTM technology',
      'In-tank UV sterilization',
      'Fully automatic operation',
      'High purification capacity of 20L/hr',
      'Leak-proof push-fit fittings'
    ],
    technology: 'RO + UV',
    capacity: '8L',
    installationType: 'Wall Mounted',
    color: 'White',
    rating: 4.7,
    price: 18500,
    originalPrice: 21000,
    discountBadge: '12% OFF',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=800&q=80',
    isBestSeller: true,
    isNewArrival: false
  },
  {
    id: 'p3',
    name: 'Aqua Genesis Glass',
    brand: 'Aqua World',
    shortDesc: 'Stunning minimalist design with touch screen water dispensing and UV protection.',
    fullDesc: 'A design masterpiece, the Aqua Genesis Glass features an absolute-black tempered glass front pane with interactive touch controls, customizable dispensing volumes, and continuous ultraviolet tank sterilization. Its ultra-slim profile complements any contemporary luxury kitchen.',
    features: [
      'Tempered Glass Facia',
      'Touch Panel Controls & Volume Preset',
      'Ambient LED Nightlight',
      'Sleek Space-saving Profile',
      'Dual-pass UV protection'
    ],
    technology: 'RO + UV + UF',
    capacity: '7L',
    installationType: 'Dispatch',
    color: 'Black',
    rating: 4.8,
    price: 29500,
    originalPrice: 38000,
    discountBadge: '22% OFF',
    image: 'https://images.unsplash.com/photo-1609137144813-17277864f77c?auto=format&fit=crop&w=800&q=80',
    isBestSeller: false,
    isNewArrival: true
  },
  {
    id: 'p4',
    name: 'Bolt Sleek UV',
    brand: 'Livpure',
    shortDesc: 'Compact high-speed UV + UF purifier perfect for municipal water sources.',
    fullDesc: 'The Livpure Bolt Sleek is engineered specifically for tap and municipal water supplies. Powered by a high-intensity 11W UV sterilization lamp and structural Ultrafiltration, it removes suspended matter, bacteria, and cysts instantly while preserving the water’s natural dissolved mineral balance.',
    features: [
      'High-speed 11W UV Lamp',
      'Hollow-Fiber UF Membrane',
      'Slim ergonomic cabinet',
      'Cartridge life indicator alarms',
      'Energy-saver sleep mode'
    ],
    technology: 'UV + UF',
    capacity: '7L',
    installationType: 'Wall Mounted',
    color: 'Blue',
    rating: 4.5,
    price: 8999,
    originalPrice: 11999,
    discountBadge: '25% OFF',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80',
    isBestSeller: false,
    isNewArrival: false
  },
  {
    id: 'p5',
    name: 'Aqua Elite Pro',
    brand: 'Aqua World',
    shortDesc: 'Heavy-duty smart RO purifier with high-efficiency water recovery technology.',
    fullDesc: 'The ultimate ecological choice, the Aqua Elite Pro features our breakthrough Smart Water-Saving technology, reducing rejected water by up to 60%. Equipped with real-time water quality sensors and filter health monitors on a gorgeous digital dashboard, it keeps you fully in control of your health.',
    features: [
      '60% Water Recovery Ratio',
      'TDS & Filter Health Digital Dashboard',
      'Multi-stage Eco filtration',
      'High-flow booster pump',
      'Built-in Leakage protection sensor'
    ],
    technology: 'RO + UV + UF',
    capacity: '12L',
    installationType: 'Dispatch',
    color: 'Silver',
    rating: 4.9,
    price: 34000,
    originalPrice: 42000,
    discountBadge: '19% OFF',
    image: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=800&q=80',
    isBestSeller: true,
    isNewArrival: true
  },
  {
    id: 'p6',
    name: 'Aquaguard Ritz RO',
    brand: 'Aquaguard',
    shortDesc: 'Advanced active copper and zinc booster RO + UV purifier with stainless steel tank.',
    fullDesc: 'Elegance meets absolute purity. The Aquaguard Ritz features a high-grade medical-class 304 Stainless Steel storage tank, providing supreme chemical resistance, absolute hygienic durability, and a completely lead-free storage container. Backed by patented Active Copper and Zinc booster filters.',
    features: [
      '304 Stainless Steel Tank',
      'Active Copper & Zinc minerals',
      'Dual UV e-boiling protection',
      'Mineral Guard technology',
      'Elegant black-silver dual tone'
    ],
    technology: 'RO + UV',
    capacity: '8L',
    installationType: 'Wall Mounted',
    color: 'Silver',
    rating: 4.6,
    price: 21999,
    originalPrice: 25999,
    discountBadge: '15% OFF',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    isBestSeller: false,
    isNewArrival: false
  },
  {
    id: 'p7',
    name: 'Aqua Commerce 50',
    brand: 'Aqua World',
    shortDesc: 'Commercial heavy-duty high-flow RO purification plant for corporate offices.',
    fullDesc: 'The Aqua Commerce 50 is a powerhouse commercial RO purifier capable of delivering up to 50 liters of pristine purified water per hour. Crafted with dual commercial-grade RO membranes and double pre-sediment protection, it is the perfect robust and safe drinking solution for executive workspaces, boardrooms, and clinics.',
    features: [
      'High purification capacity: 50L/hr',
      'Dual commercial-grade RO membranes',
      'Heavy-duty stainless steel frame panel',
      'Automatic dry-run cut-off switch',
      'Real-time input/output TDS monitoring'
    ],
    technology: 'RO',
    capacity: '50L',
    installationType: 'Dispatch',
    color: 'Silver',
    rating: 4.8,
    price: 44999,
    originalPrice: 55000,
    discountBadge: '18% OFF',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    isBestSeller: false,
    isNewArrival: true
  },
  {
    id: 'p8',
    name: 'Pureit Copper+ RO',
    brand: 'Pureit',
    shortDesc: 'Infuses water with 99.8% pure copper dynamically for enriched health.',
    fullDesc: 'Pureit Copper+ RO is an intelligent purifier that infuses drinking water with exact, metered amounts of 99.8% pure copper ions in real-time. This ancient Ayurvedic benefit is paired with a highly sophisticated 7-stage RO+UV+MF filtration grid, ensuring maximum hygiene, delicious taste, and robust vitality.',
    features: [
      'Dynamic Copper Charge technology',
      '7-stage advanced RO+UV+MF grid',
      'Dual water dispensing option (Copper/Normal)',
      'Smart sense filter life indicators',
      'Double protection purity lock'
    ],
    technology: 'RO + UV',
    capacity: '8L',
    installationType: 'Dispatch',
    color: 'Black',
    rating: 4.6,
    price: 19999,
    originalPrice: 24999,
    discountBadge: '20% OFF',
    image: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=800&q=80',
    isBestSeller: false,
    isNewArrival: false
  },
  {
    id: 'p9',
    name: 'Aqua Guard Classic UF',
    brand: 'Aqua World',
    shortDesc: 'Non-electric chemical-free gravity-based ultrafiltration water purifier.',
    fullDesc: 'The perfect economical and eco-friendly choice for locations with stable water supplies. The Aqua Guard Classic UF operates entirely without electricity or tap pressure, using passive high-precision gravity-driven Ultrafiltration membranes to clear suspended impurities and micro-bacterial pathogens.',
    features: [
      'Zero electricity or battery required',
      'Zero rejected water discharge',
      'High capacity 20L total storage',
      'Food-grade break-resistant polymer tank',
      'Simple DIY filter cartridge replacement'
    ],
    technology: 'UF',
    capacity: '12L',
    installationType: 'Dispatch',
    color: 'White',
    rating: 4.4,
    price: 5499,
    originalPrice: 6999,
    discountBadge: '21% OFF',
    image: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=800&q=80',
    isBestSeller: false,
    isNewArrival: false
  },
  {
    id: 'p10',
    name: 'Aqua Aura Pro Elite',
    brand: 'Aqua World',
    shortDesc: 'Elite-grade 10-stage ultra-luxury table-top RO+UV+UF purifier.',
    fullDesc: 'The epitome of pure luxury drinking water. Designed for high-end corporate suites and luxurious domestic interiors, the Aqua Aura Pro Elite features custom carbon fiber styling, fully autonomous hot and cold water dispensing, and an ultra-powerful multi-pass industrial UV sterilizer chamber.',
    features: [
      'Premium Carbon Fiber design styling',
      'Autonomous Hot & Cold dispensing options',
      '10-stage ultra-purity multi-pass grid',
      'Intelligent self-cleaning tank automation',
      'Wireless diagnostics mobile companion app'
    ],
    technology: 'RO + UV + UF',
    capacity: '25L',
    installationType: 'Dispatch',
    color: 'Silver',
    rating: 5.0,
    price: 49999,
    originalPrice: 59999,
    discountBadge: '17% OFF',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    isBestSeller: true,
    isNewArrival: true
  },
  {
    id: 'p11',
    name: 'Aqua Pro Plant 250',
    brand: 'Aqua World',
    shortDesc: 'Heavy-duty industrial RO plant designed for schools, hospitals, and large buildings.',
    fullDesc: 'The Aqua Pro Plant 250 is our highest capacity commercial Reverse Osmosis system, generating up to 250 liters of pure mineralized water per hour. Ideal for schools, hospitals, manufacturing units, and corporate campuses, it features triple-membrane filtration, a robust steel skid frame, and intelligent auto-flushing cycles.',
    features: [
      'Industrial recovery rate up to 70%',
      'Triple-stage high-pressure pump system',
      'Advanced digital control telemetry',
      'Stainless steel 316 structure skid frame',
      'Integrated sand and carbon pre-media'
    ],
    technology: 'RO',
    capacity: '250L',
    installationType: 'Dispatch',
    color: 'Silver',
    rating: 4.9,
    price: 95000,
    originalPrice: 120000,
    discountBadge: '20% OFF',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    isBestSeller: false,
    isNewArrival: true
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Rajesh Malhotra',
    rating: 5,
    text: 'Aqua World installed our Office RO plant in Chennai. The water quality went from 800 TDS to a crisp 45 TDS! Absolute top-notch customer support and professional, timely installation.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    designation: 'Director, Malhotra FinCorp'
  },
  {
    id: 'r2',
    name: 'Priya Sharma',
    rating: 5,
    text: 'The HydroPure NXT is an absolute beauty in my new modular kitchen! It looks like a luxury item but functions like a high-tech lab. My children love the water taste, and I love the filter safety!',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
    designation: 'Architect & Home Maker'
  },
  {
    id: 'r3',
    name: 'Amitabh Sen',
    rating: 5,
    text: 'Extremely impressed with the service of Aqua World. They scheduled the expert installation within 4 hours of purchasing on the website. Water tastes pure and soft. Strongly recommend.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
    designation: 'Retired ISRO Scientist'
  },
  {
    id: 'r4',
    name: 'Sneha Fernandez',
    rating: 5,
    text: 'We bought the Tabletop Aqua Aura for our boutique hotel lobby. It has been a massive hit. The hot and cold dispensing is smooth, and the stainless-steel carbon aesthetic matches our interiors flawlessly.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80',
    designation: 'Managing Partner, Serene Boutique Stays'
  }
];

export const BENEFITS = [
  { id: 'b1', title: 'Removes Bacteria', desc: 'Eliminates 99.99% of pathogenic bacteria causing waterborne infections.' },
  { id: 'b2', title: 'Removes Viruses', desc: 'High-intensity UV treatment neutralizes viruses instantly.' },
  { id: 'b3', title: 'Removes Heavy Metals', desc: 'RO membrane rejects harmful lead, arsenic, mercury, and chromium.' },
  { id: 'b4', title: 'Removes Harmful Chemicals', desc: 'Carbon filtration traps pesticides, chlorine, and organic volatile compounds.' },
  { id: 'b5', title: 'Improves Taste', desc: 'Post-carbon treatment and mineral balance give water a sweet, refreshing taste.' },
  { id: 'b6', title: 'Healthy Drinking Water', desc: 'Ensures natural minerals are maintained for optimal hydration.' },
  { id: 'b7', title: 'Protects Your Family', desc: 'Prevents acute and chronic ailments caused by municipal pipe rusty contaminants.' },
  { id: 'b8', title: 'Better Health', desc: 'Properly filtered alkaline-rich water boosts cellular immunity and metabolic rate.' }
];

export const CORE_VALUES = [
  { title: 'Quality', desc: 'We never compromise. Every filter, pipe, booster pump, and seal is tested to sustain high pressure and absolute purity parameters.' },
  { title: 'Innovation', desc: 'Developing smart water-saving circuits, digital monitoring, and touchless dispensing to keep ahead of tomorrow’s challenges.' },
  { title: 'Trust', desc: 'Over a decade of trusted operations servicing domestic and corporate structures with transparent warranties and genuine spares.' },
  { title: 'Customer First', desc: 'Round-the-clock technical support, scheduled annual maintenance checkups, and 4-hour local installation guarantees.' },
  { title: 'Sustainability', desc: 'Committed to decreasing rejected water volume by 60% and designing reusable, eco-conscious cartridge casings.' },
  { title: 'Excellence', desc: 'Crafting luxury water purification systems that represent world-class visual aesthetics and uncompromised health outcomes.' }
];
