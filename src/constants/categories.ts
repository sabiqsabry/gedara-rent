import { 
  TbBeach, 
  TbMountain, 
  TbPool
} from "react-icons/tb"
import {
  GiWindmill,
  GiIsland,
  GiBoatFishing,
  GiForestCamp,
  GiPalmTree,
  GiCastle
} from "react-icons/gi"
import { IoDiamond } from "react-icons/io5"
import { MdOutlineVilla } from "react-icons/md"

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "Properties near the beach",
    value: "BEACH"
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "Unique windmill stays",
    value: "WINDMILLS"
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "Modern architecture",
    value: "MODERN"
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "Rural retreats",
    value: "COUNTRYSIDE"
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "Properties with pools",
    value: "POOLS"
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "Island getaways",
    value: "ISLANDS"
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "Lakeside properties",
    value: "LAKE"
  },
  {
    label: "Skiing",
    icon: TbMountain,
    description: "Ski destinations",
    value: "SKIING"
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "Historic castles",
    value: "CASTLES"
  },
  {
    label: "Caves",
    icon: TbMountain,
    description: "Cave stays",
    value: "CAVES"
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "Glamping & camping",
    value: "CAMPING"
  },
  {
    label: "Arctic",
    icon: TbMountain,
    description: "Arctic destinations",
    value: "ARCTIC"
  },
  {
    label: "Desert",
    icon: TbMountain,
    description: "Desert stays",
    value: "DESERT"
  },
  {
    label: "Barns",
    icon: TbMountain,
    description: "Converted barns",
    value: "BARNS"
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "Luxury stays",
    value: "LUX"
  },
  {
    label: "Tropical",
    icon: GiPalmTree,
    description: "Tropical destinations",
    value: "TROPICAL"
  },
  {
    label: "Heritage",
    icon: GiCastle,
    description: "Historic properties",
    value: "HERITAGE"
  },
] as const

export type CategoryValue = typeof categories[number]["value"]
