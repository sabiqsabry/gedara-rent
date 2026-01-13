import { 
  FaWifi, 
  FaHotTub, 
  FaFirstAid, 
  FaFireExtinguisher,
  FaCar
} from "react-icons/fa"
import { 
  MdKitchen, 
  MdLocalLaundryService, 
  MdPool,
  MdWorkspaces,
  MdSmokeFree
} from "react-icons/md"
import { 
  TbAirConditioning,
  TbAlarm
} from "react-icons/tb"
import { 
  GiHeatHaze
} from "react-icons/gi"
import { 
  PiTelevision
} from "react-icons/pi"
import { 
  CgGym
} from "react-icons/cg"
import { 
  AiFillCar
} from "react-icons/ai"

export const amenities = [
  // Essentials
  { 
    id: "wifi", 
    name: "Wifi", 
    icon: FaWifi, 
    category: "ESSENTIALS" as const
  },
  { 
    id: "kitchen", 
    name: "Kitchen", 
    icon: MdKitchen, 
    category: "ESSENTIALS" as const
  },
  { 
    id: "air-conditioning", 
    name: "Air Conditioning", 
    icon: TbAirConditioning, 
    category: "ESSENTIALS" as const
  },
  { 
    id: "heating", 
    name: "Heating", 
    icon: GiHeatHaze, 
    category: "ESSENTIALS" as const
  },
  { 
    id: "tv", 
    name: "TV", 
    icon: PiTelevision, 
    category: "ESSENTIALS" as const
  },
  { 
    id: "washer", 
    name: "Washer", 
    icon: MdLocalLaundryService, 
    category: "ESSENTIALS" as const
  },
  
  // Features
  { 
    id: "pool", 
    name: "Pool", 
    icon: MdPool, 
    category: "FEATURES" as const
  },
  { 
    id: "hot-tub", 
    name: "Hot Tub", 
    icon: FaHotTub, 
    category: "FEATURES" as const
  },
  { 
    id: "free-parking", 
    name: "Free Parking", 
    icon: AiFillCar, 
    category: "FEATURES" as const
  },
  { 
    id: "gym", 
    name: "Gym", 
    icon: CgGym, 
    category: "FEATURES" as const
  },
  { 
    id: "workspace", 
    name: "Workspace", 
    icon: MdWorkspaces, 
    category: "FEATURES" as const
  },
  
  // Safety
  { 
    id: "smoke-alarm", 
    name: "Smoke Alarm", 
    icon: MdSmokeFree, 
    category: "SAFETY" as const
  },
  { 
    id: "first-aid-kit", 
    name: "First Aid Kit", 
    icon: FaFirstAid, 
    category: "SAFETY" as const
  },
  { 
    id: "fire-extinguisher", 
    name: "Fire Extinguisher", 
    icon: FaFireExtinguisher, 
    category: "SAFETY" as const
  },
  { 
    id: "carbon-monoxide-alarm", 
    name: "Carbon Monoxide Alarm", 
    icon: TbAlarm, 
    category: "SAFETY" as const
  },
] as const

export type AmenityCategory = typeof amenities[number]["category"]
