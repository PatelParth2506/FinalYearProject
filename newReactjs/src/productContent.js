const products = [
  {
    id: 1,
    title: "Asus ProArt GeForce RTX 4070",
    price: 999.99,
    category: "Graphic Cards",
    description:
      "The SFF-ready ProArt GeForce RTX ™ 4070 SUPER OC Edition 12GB GDDR6X brings elegant and minimalist style to empower creator PC builds with full-scale GeForce RTX ™ 40 SUPER Series performance.",
    image: "/src/assets/img/Asus ProArt GeForce RTX 4070.jpg",
  },
  {
    id: 2,
    title: "Intel Core i9-14900K",
    price: 589.0,
    category: "Processors",
    description:
      "Intel Core i9-14900K - 24 cores (8 P-cores + 16 E-cores) - 32 threads - Base P-core Frequency: 3.2 GHz - Max Turbo Frequency: 6.0 GHz - Socket LGA 1700 - Unlocked.",
    image: "/src/assets/img/Intel Core i9-14900K.jpg",
  },
  {
    id: 3,
    title: "Samsung 990 Pro 2TB NVMe SSD",
    price: 169.99,
    category: "Storage",
    description:
      "Samsung 990 PRO Series - 2TB PCIe Gen4 NVMe M.2 Internal SSD (MZ-V9P2T0B/AM) - Read/Write Speed up to 7,450/6,900 MB/s - Optimized for Gaming, Graphics, Data Analytics, and More.",
    image: "/src/assets/img/Samsung 990 Pro 2TB.jpg",
  },
  {
    id: 4,
    title: "Corsair Vengeance DDR5 32GB (2x16GB) 6000MHz",
    price: 119.99,
    category: "Memory",
    description:
      "Corsair Vengeance 32GB (2x16GB) DDR5 6000MHz C36 PC5-48000 Desktop Memory - Black.",
    image: "/src/assets/img/Corsair Vengeance DDR5 32GB.jpg",
  },
  {
    id: 5,
    title: "NZXT H5 Flow Compact Mid-Tower Airflow Case",
    price: 94.99,
    category: "Cases",
    description:
      "NZXT H5 Flow Compact Mid-Tower PC Case - High Airflow Perforated Front Panel - Tempered Glass Side Panel - Cable Management - Black.",
    image: "/src/assets/img/NZXT H5 Flow Black.jpg",
  },
  {
    id: 6,
    title: "Corsair RM850x (2021) 850W 80+ Gold PSU",
    price: 149.99,
    category: "Power Supplies",
    description:
      "Corsair RM850x (2021) 850 Watt 80+ Gold Certified Fully Modular ATX Power Supply.",
    image: "/src/assets/img/Corsair RM850x 850W.jpg",
  },
  {
    id: 7,
    title: 'LG 27GP850-B UltraGear 27" QHD 165Hz Gaming Monitor',
    price: 399.0,
    category: "Monitors",
    description:
      "LG 27GP850-B UltraGear Gaming Monitor - 27-inch QHD (2560 x 1440) IPS Display, 1ms Response Time, 165Hz (OC 180Hz), NVIDIA G-SYNC Compatible, AMD FreeSync Premium Pro.",
    image: "/src/assets/img/LG 27GP850-B.webp",
  },
  {
    id: 8,
    title: "Logitech G Pro X Superlight Wireless Gaming Mouse",
    price: 129.99,
    category: "Peripherals",
    description:
      "Logitech G PRO X SUPERLIGHT Wireless Gaming Mouse, LIGHTSPEED Wireless, Lightweight (63g), HERO 25K Sensor, 5 Buttons, 70 Hour Battery Life, Optional DPI from 100-25,600.",
    image: "/src/assets/img/Logitech G Pro X Superlight.webp",
  },
  {
    id: 9,
    title: "SteelSeries Apex Pro Mechanical Gaming Keyboard",
    price: 199.99,
    category: "Peripherals",
    description:
      "SteelSeries Apex Pro Mechanical Gaming Keyboard - Adjustable Actuation Switches - OLED Smart Display - RGB Backlit - Compact Form Factor.",
    image: "/src/assets/img/SteelSeries Apex Pro.webp",
  },
  {
    id: 10,
    title: "Bose QuietComfort 45 Headphones",
    price: 279.0,
    category: "Audio",
    description:
      "Bose QuietComfort 45 Wireless Noise Cancelling Headphones - Over-Ear Headphones with up to 24 Hours of Battery Life - Black.",
    image: "/src/assets/img/Bose QC45.webp",
  },
  {
    id: 11,
    title: "Apple MacBook Air M2",
    price: 1099.0,
    category: "Laptops",
    description:
      "Apple MacBook Air (M2, 2023) - 13.6-inch Liquid Retina Display, Apple M2 Chip, 8GB RAM, 256GB SSD, macOS, Space Gray.",
    image: "/src/assets/img/MacBook_Air_M2.webp",
  },
  {
    id: 12,
    title: "Dell XPS 15 9530",
    price: 1899.99,
    category: "Laptops",
    description:
      "Dell XPS 15 9530 - 15.6-inch 3.5K OLED Touch Display, Intel Core i7-13700H, 16GB RAM, 512GB SSD, NVIDIA RTX 4050, Windows 11.",
    image: "/src/assets/img/Dell_XPS_15.webp",
  },
  {
    id: 13,
    title: "ASUS ROG Zephyrus G14",
    price: 1699.99,
    category: "Laptops",
    description:
      "ASUS ROG Zephyrus G14 (2023) - 14-inch QHD 165Hz, AMD Ryzen 9 7940HS, 16GB DDR5, 1TB SSD, NVIDIA RTX 4060, Windows 11.",
    image: "/src/assets/img/ROG_Zephyrus_G14.webp",
  },
  {
    id: 14,
    title: "HP Spectre x360 14",
    price: 1599.0,
    category: "Laptops",
    description:
      "HP Spectre x360 14 - 13.5-inch OLED Touchscreen, Intel Core i7-1365U, 16GB RAM, 1TB SSD, Windows 11, Nightfall Black.",
    image: "/src/assets/img/HP_Spectre_x360.webp",
  },
  {
    id: 15,
    title: "Lenovo Legion 5 Pro",
    price: 1499.0,
    category: "Laptops",
    description:
      "Lenovo Legion 5 Pro (2023) - 16-inch WQXGA 165Hz, AMD Ryzen 7 7745HX, 16GB RAM, 1TB SSD, NVIDIA RTX 4070, Windows 11.",
    image: "/src/assets/img/Legion_5_Pro.webp",
  },
  {
    id: 16,
    title: "Acer Predator Helios 16",
    price: 1799.99,
    category: "Laptops",
    description:
      "Acer Predator Helios 16 - 16-inch WQXGA 240Hz, Intel Core i9-13900HX, 32GB DDR5, 1TB SSD, NVIDIA RTX 4080, Windows 11.",
    image: "/src/assets/img/Predator_Helios_16.webp",
  },
  {
    id: 17,
    title: "EVGA SuperNOVA 1000 G5",
    price: 199.99,
    category: "Power Supplies",
    description:
      "EVGA SuperNOVA 1000 G5 - 1000W 80+ Gold Certified Fully Modular Power Supply, ECO Mode, 10-Year Warranty.",
    image: "/src/assets/img/EVGA_SuperNOVA_1000_G5.webp",
  },
  {
    id: 18,
    title: "Seasonic Focus GX-750",
    price: 129.99,
    category: "Power Supplies",
    description:
      "Seasonic Focus GX-750 - 750W 80+ Gold Fully Modular Power Supply, Compact Size, Silent Fan Control.",
    image: "/src/assets/img/Seasonic_Focus_GX_750.webp",
  },
  {
    id: 19,
    title: "Lian Li O11 Dynamic XL",
    price: 229.99,
    category: "Cases",
    description:
      "Lian Li O11 Dynamic XL - Full Tower Case, Tempered Glass Side Panel, Aluminum Build, High Airflow.",
    image: "/src/assets/img/Lian_Li_O11_Dynamic_XL.webp",
  },
  {
    id: 20,
    title: "Cooler Master HAF 700 EVO",
    price: 349.99,
    category: "Cases",
    description:
      "Cooler Master HAF 700 EVO - High Airflow E-ATX Full Tower Case, ARGB Fans, Tempered Glass Panel.",
    image: "/src/assets/img/Cooler_Master_HAF_700_EVO.webp",
  },
  {
    id: 21,
    title: "Fractal Design Meshify C",
    price: 119.99,
    category: "Cases",
    description:
      "Fractal Design Meshify C - Compact ATX Mid Tower, High Airflow Mesh Front Panel, Tempered Glass.",
    image: "/src/assets/img/Fractal_Design_Meshify_C.webp",
  },
  {
    id: 22,
    title: "ASUS ROG Swift PG27AQDM",
    price: 799.99,
    category: "Monitors",
    description:
      "ASUS ROG Swift PG27AQDM - 27-inch OLED Gaming Monitor, 1440p, 240Hz, 0.03ms, G-SYNC Compatible.",
    image: "/src/assets/img/ASUS_ROG_Swift_PG27AQDM.webp",
  },
  {
    id: 23,
    title: "Gigabyte M32U",
    price: 699.99,
    category: "Monitors",
    description:
      "Gigabyte M32U - 32-inch 4K UHD Gaming Monitor, 144Hz, 1ms, HDR400, FreeSync Premium Pro.",
    image: "/src/assets/img/Gigabyte_M32U.webp",
  },
  {
    id: 24,
    title: "LG UltraGear 45GR95QE",
    price: 1699.99,
    category: "Monitors",
    description:
      "LG UltraGear 45GR95QE - 45-inch OLED UltraWide, 240Hz, 0.03ms, G-SYNC & FreeSync, HDR10.",
    image: "/src/assets/img/LG_UltraGear_45GR95QE.webp",
  },
  {
    id: 25,
    title: "Dell Alienware AW3423DW",
    price: 1299.99,
    category: "Monitors",
    description:
      "Dell Alienware AW3423DW - 34-inch QD-OLED Ultrawide Monitor, 175Hz, G-SYNC Ultimate, HDR 1000.",
    image: "/src/assets/img/Dell_Alienware_AW3423DW.webp",
  },
  {
    id: 26,
    title: "Intel Core i7-13700K",
    price: 409.99,
    category: "Processors",
    description:
      "Intel Core i7-13700K - 16 cores (8 P-cores + 8 E-cores) - 24 threads - Base P-core Frequency: 3.4 GHz - Max Turbo Frequency: 5.4 GHz - Socket LGA 1700 - Unlocked.",
    image: "/src/assets/img/Intel Core i7-13700K.jpg",
  },
  {
    id: 27,
    title: "Intel Core i5-13600K",
    price: 319.99,
    category: "Processors",
    description:
      "Intel Core i5-13600K - 14 cores (6 P-cores + 8 E-cores) - 20 threads - Base P-core Frequency: 3.5 GHz - Max Turbo Frequency: 5.1 GHz - Socket LGA 1700 - Unlocked.",
    image: "/src/assets/img/Intel Core i5-13600K.jpg",
  },
  {
    id: 28,
    title: "AMD Ryzen 9 7950X",
    price: 599.99,
    category: "Processors",
    description:
      "AMD Ryzen 9 7950X - 16 Cores - 32 Threads - Base Clock: 4.5 GHz - Max Boost Clock: 5.7 GHz - Socket AM5 - Unlocked for Overclocking.",
    image: "/src/assets/img/AMD Ryzen 9 7950X.jpg",
  },
  {
    id: 29,
    title: "AMD Ryzen 7 7800X3D",
    price: 429.99,
    category: "Processors",
    description:
      "AMD Ryzen 7 7800X3D - 8 Cores - 16 Threads - Base Clock: 4.2 GHz - Max Boost Clock: 5.0 GHz - Socket AM5 - 3D V-Cache for gaming performance.",
    image: "/src/assets/img/AMD Ryzen 7 7800X3D.jpg",
  },
  {
    id: 30,
    title: "AMD Ryzen 5 7600X",
    price: 299.99,
    category: "Processors",
    description:
      "AMD Ryzen 5 7600X - 6 Cores - 12 Threads - Base Clock: 4.7 GHz - Max Boost Clock: 5.3 GHz - Socket AM5 - Unlocked for Overclocking.",
    image: "/src/assets/img/AMD Ryzen 5 7600X.jpg",
  },
  {
    id: 31,
    title: "NVIDIA GeForce RTX 4090 Founders Edition",
    price: 1599.99,
    category: "Graphic Cards",
    description:
      "NVIDIA GeForce RTX 4090 Founders Edition - 24GB GDDR6X - DLSS 3 - Ray Tracing - PCIe 4.0 - HDMI & DisplayPort.",
    image: "/src/assets/img/NVIDIA GeForce RTX 4090.jpg",
  },
  {
    id: 32,
    title: "MSI Gaming GeForce RTX 4080 SUPER",
    price: 1199.99,
    category: "Graphic Cards",
    description:
      "MSI Gaming GeForce RTX 4080 SUPER 16GB GDDR6X - Triple Fan Cooling - Overclocked Performance.",
    image: "/src/assets/img/MSI GeForce RTX 4080 SUPER.jpg",
  },
  {
    id: 33,
    title: "Gigabyte Radeon RX 7900 XTX Gaming OC",
    price: 999.99,
    category: "Graphic Cards",
    description:
      "Gigabyte Radeon RX 7900 XTX Gaming OC - 24GB GDDR6 - RDNA 3 - Ray Tracing - HDMI & DisplayPort.",
    image: "/src/assets/img/Gigabyte Radeon RX 7900 XTX.jpg",
  },
  {
    id: 34,
    title: "ASUS Dual GeForce RTX 4060 Ti OC Edition",
    price: 449.99,
    category: "Graphic Cards",
    description:
      "ASUS Dual GeForce RTX 4060 Ti OC Edition - 8GB GDDR6 - Dual-Fan - DLSS 3 - Ray Tracing.",
    image: "/src/assets/img/ASUS RTX 4060 Ti.jpg",
  },
  {
    id: 35,
    title: "Razer DeathAdder V3 Pro Wireless Gaming Mouse",
    price: 149.99,
    category: "Peripherals",
    description:
      "Razer DeathAdder V3 Pro Wireless - Ultra-lightweight - Focus Pro 30K Optical Sensor - 90-hour Battery Life.",
    image: "/src/assets/img/Razer DeathAdder V3 Pro.jpg",
  },
  {
    id: 36,
    title: "Logitech G915 TKL Wireless Mechanical Keyboard",
    price: 229.99,
    category: "Peripherals",
    description:
      "Logitech G915 TKL - Low Profile Mechanical Keyboard - LIGHTSPEED Wireless - RGB Backlit - Tenkeyless.",
    image: "/src/assets/img/Logitech G915 TKL.jpg",
  },
  {
    id: 37,
    title: "HyperX Cloud II Wireless Gaming Headset",
    price: 159.99,
    category: "Audio",
    description:
      "HyperX Cloud II Wireless - 7.1 Surround Sound - 53mm Drivers - 30-hour Battery Life - Noise-Canceling Mic.",
    image: "/src/assets/img/HyperX Cloud II Wireless.jpg",
  },
  {
    id: 38,
    title: "Corsair HS80 RGB Wireless Premium Gaming Headset",
    price: 179.99,
    category: "Audio",
    description:
      "Corsair HS80 RGB Wireless - Dolby Atmos - 50mm Drivers - Broadcast-Grade Mic - 20-hour Battery Life.",
    image: "/src/assets/img/Corsair HS80 Wireless.jpg",
  },
  {
    id: 39,
    title: "Elgato Stream Deck MK.2",
    price: 149.99,
    category: "Peripherals",
    description:
      "Elgato Stream Deck MK.2 - 15 Customizable LCD Keys - Direct Integration with OBS, Twitch, YouTube, and More.",
    image: "/src/assets/img/Elgato Stream Deck MK2.jpg",
  },
];

export default products;
