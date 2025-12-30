import React from "react";
import modulesJSONData from './moduleRegistry.json'; // ← Changed this line

import {
  Brain,
  Code,
  Zap,
  Crown,
  Calendar,
  Film,
  Clock,
  Sparkles,
  Flame,
  Layers,
  Camera,
  FileText,
  Activity,
  Mountain,
  Users,
  Heart,
  Anchor,
  Ghost,
  Database,
  Eye,
  GitBranch,
  AlertTriangle,
  RotateCcw,
  Copy,
  Moon,
  Shield,
  RefreshCw,
  Book,
  Ticket,
  Car,
  DoorOpen,
  Code2,
  Ship,
  Image,

} from "lucide-react";

// Type for the raw JSON structure
interface RawModuleData {
  id: string;
  path: string;
  title: string;
  subtitle: string;
  concept: string;
  icon: string; // String in JSON
  colorClass: string;
  bgClass: string;
  component: string; // String in JSON
  wrapperProps: {
    bgClass: string;
    textClass?: string;
    fontClass?: string;
  };
  enabled: boolean;
}

export interface ModuleConfig {
  id: string;
  path: string;
  title: string;
  subtitle: string;
  concept: string;
  icon: React.ComponentType<any>;
  colorClass: string;
  bgClass: string;
  component: () => Promise<{ default: React.ComponentType }>;
  wrapperProps: {
    bgClass: string;
    textClass?: string;
    fontClass?: string;
  };
  enabled: boolean;
}

// Icon mapping - maps JSON string names to actual Lucide components
const iconMap: Record<string, React.ComponentType<any>> = {
  Brain,
  Code,
  Wand: Zap,
  Calendar,
  Zap,
  Door: DoorOpen,
  Crown,
  Image,
  Clock,
  Code2,
  Ship,
  RotateCcw,
  Film,
  Ticket,
  Car,
};


// Transform JSON data into proper ModuleConfig format
export const moduleRegistry: ModuleConfig[] = modulesJSONData.map( // ← No type assertion needed
  (raw: RawModuleData): ModuleConfig => ({
    ...raw,
    icon: iconMap[raw.icon] || Brain,
    component: () => import(`../modules/${raw.id}/index.tsx`),
  })
);


/**
 * UTILITY FUNCTIONS
 */

// Get all enabled modules
export const getEnabledModules = (): ModuleConfig[] => {
  return moduleRegistry.filter((module) => module.enabled);
};

// Get module by ID
export const getModuleById = (id: string): ModuleConfig | undefined => {
  return moduleRegistry.find((module) => module.id === id);
};

// Get module by path
export const getModuleByPath = (path: string): ModuleConfig | undefined => {
  return moduleRegistry.find((module) => module.path === path);
};

// Count enabled vs total modules
export const getModuleStats = () => {
  const total = moduleRegistry.length;
  const enabled = moduleRegistry.filter((m) => m.enabled).length;
  const disabled = total - enabled;

  return { total, enabled, disabled };
};