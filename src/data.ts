import { Property } from "./types";

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: "prop-1",
    title: "The Sula Valley Viticulture Reserve",
    price: 6450000,
    location: "Nashik Valley, Maharashtra",
    region: "Western India",
    acres: 42.5,
    pricePerAcres: 151764,
    category: "Viticulture",
    description: "An extraordinary agricultural estate plot nestled in the prestigious Nashik grapes belt. Features premium fertile soil rich in minerals, exceptional sun exposure, and active, certified organic viticulture zoning.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    verified: true,
    amenities: ["Spring Water Rights", "Dual Wells Installed", "Estate Winery Permit", "3 Phase Power", "Perimeter Security Fence"],
    zoning: "AP (Agricultural Preserve)",
    coords: { x: 38, y: 55 },
    waterRights: true,
    roadAccess: true,
    electricity: true,
    slope: "Gentle"
  },
  {
    id: "prop-2",
    title: "Crest of Vagator Oceanfront Sanctuary",
    price: 18900000,
    location: "Anjuna Cliffside, Goa",
    region: "Western India",
    acres: 12.8,
    pricePerAcres: 1476562,
    category: "Legacy Estate",
    description: "A breathtaking cliffside peninsula providing uninterrupted 270-degree views of the Arabian Sea. Fully approved geological reports and pre-drawn architectural plans for a massive legacy resort compound.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    verified: true,
    amenities: ["Private Cove Path", "Coastal Comm. Approval", "Helipad Authorized", "Municipal Connections", "Retaining Structural Wall"],
    zoning: "R1 (Single Family Estate)",
    coords: { x: 36, y: 68 },
    waterRights: false,
    roadAccess: true,
    electricity: true,
    slope: "Sloped"
  },
  {
    id: "prop-3",
    title: "The Whispering Pines Shimla Retreat",
    price: 4950000,
    location: "Mashobra Heights, Shimla",
    region: "Northern India",
    acres: 85.0,
    pricePerAcres: 58235,
    category: "Residential",
    description: "A majestic alpine wilderness parcel surrounded by towering deodar trees and snow peaks. Private gated driveway access with close proximity to ski clubs and elite resort amenities, yet highly secluded.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    verified: true,
    amenities: ["Ski-in Ski-out Access", "Natural Geothermal Spring", "Gated Forestry Roads", "Fibre Internet Ready", "Underground Utility Lines"],
    zoning: "RES-4 (Low Density Residential)",
    coords: { x: 44, y: 22 },
    waterRights: true,
    roadAccess: true,
    electricity: true,
    slope: "Terraced"
  },
  {
    id: "prop-4",
    title: "Vembanad Lakefront Tropical Acreage",
    price: 11200000,
    location: "Kumarakom Lakefront, Kerala",
    region: "Southern India",
    acres: 54.2,
    pricePerAcres: 206642,
    category: "Agricultural",
    description: "Prestige tropical parcel bordering the pristine Vembanad backwaters. Extremely fertile alluvial loam soil ideal for high-end organic resort cultivation or a private eco-resort sanctuary.",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
    verified: false,
    amenities: ["Private Stream Access", "Eco-Resort Pre-permit", "Coral Reef Views", "Off-grid Solar Array Layout", "Artesian Water Well"],
    zoning: "AG (Agriculture & Conservation)",
    coords: { x: 42, y: 84 },
    waterRights: true,
    roadAccess: true,
    electricity: false,
    slope: "Gentle"
  },
  {
    id: "prop-5",
    title: "Nilgiri Hills Tea Estate Reserve",
    price: 7800000,
    location: "Ooty Slopes, Tamil Nadu",
    region: "Southern India",
    acres: 65.4,
    pricePerAcres: 119266,
    category: "Viticulture",
    description: "A historical South Indian rolling tea estate parcel including centenary cypress paths and private water spring rights, perfect for tea cultivation and luxury heritage cottage developments.",
    image: "https://images.unsplash.com/photo-1444858291040-58fe7d05327e?auto=format&fit=crop&w=1200&q=80",
    verified: true,
    amenities: ["Tea Cultivation Quotas", "Restoration Permission", "Centenary Cypress Paths", "Ancient Water Cisterns", "Fully Paved Road Access"],
    zoning: "H-AG (Historical Agricultural)",
    coords: { x: 46, y: 79 },
    waterRights: true,
    roadAccess: true,
    electricity: true,
    slope: "Terraced"
  },
  {
    id: "prop-6",
    title: "Kanchenjunga Ridge Alpine Plateau",
    price: 14500000,
    location: "Darjeeling Heights, West Bengal",
    region: "Eastern India",
    acres: 38.0,
    pricePerAcres: 381578,
    category: "Commercial",
    description: "An ultra-rare commercial parcel situated in the high Himalayas with sweeping vistas of Mount Kanchenjunga. Authorized for luxury wellness clinic development, eco-domes, or premium lodge structures.",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
    verified: true,
    amenities: ["High Altitude Cable Access", "Glacier Stream Intake", "Elite Clinic Zoning", "Avalanche Safety Deflectors", "High Capacity Power Grid"],
    zoning: "COMM-L (Commercial Lodging)",
    coords: { x: 74, y: 39 },
    waterRights: true,
    roadAccess: false,
    electricity: true,
    slope: "Sloped"
  }
];

export const INITIAL_TESTIMONIALS = [
  {
    id: "t-1",
    name: "Maximilian Rothschild",
    role: "Managing Partner, Rothschild Private Equity",
    quote: "Acquiring our 60-acre estate land through Land Bourn was an exceptionally seamless private placement. The digital paperwork, verified aerial soil mapping, and absolute discretion were on par with family-office standards.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    location: "Zürich, Switzerland"
  },
  {
    id: "t-2",
    name: "Elena Rostova",
    role: "Founder, Rostova Viticulture Holdings",
    quote: "Land Bourn's platform allowed us to bypass lengthy middleman negotiations. We matched with verified vineyard lands in Napa Valley, performed zoning queries instantly, and acquired the deeds within three weeks.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    location: "Napa Valley, CA"
  },
  {
    id: "t-3",
    name: "Marcus Sterling",
    role: "Hedge Fund Manager",
    quote: "The interactive vector mapping and the AI Investment Analysis tool allowed my wealth desk to quickly audit development feasibility on coastal Malibus. An indispensable tool for serious land banking.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    location: "New York, NY"
  }
];

export const FAQS = [
  {
    question: "How are land listings verified on Land Bourn?",
    answer: "Every land parcel submitted to Land Bourn undergo a strict Tier-1 verification protocol. This includes satellite deed audits, geological risk screening, municipal zoning certification, and water rights validation by our team of real estate attorneys."
  },
  {
    question: "Is listing a land parcel free for sellers?",
    answer: "Listing is entirely free for sellers. Land Bourn only charges a premium concierge transaction fee of 1.5% upon successful deed escrow closure, which is significantly lower than standard commercial brokerage rates."
  },
  {
    question: "How do buyers securely contact and negotiate with sellers?",
    answer: "Buyers can connect directly using our encrypted secure inquiry system on each card. For institutional buyers, our Land Bourn Wealth Desk can assign a licensed private broker to oversee site investigations, earnest money escrow, and title transfers."
  },,
  {
    question: "Can I schedule physical site visits and drone mapping?",
    answer: "Yes, you can schedule private in-person site inspections, as well as state-of-the-art multi-spectral drone surveys directly through our smart inquiry panel, backed by local partner surveyors in each region."
  },
  {
    question: "Are transactions and deed transfers secure?",
    answer: "All acquisitions are transacted through internationally recognized premium title and escrow firms. We support modern digital contract signing alongside traditional physical deed filings with the relevant county registries."
  }
];
