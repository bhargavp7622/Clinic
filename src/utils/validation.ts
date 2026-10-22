import { SectionConfig } from '@/types/config.types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateLayoutConfig = (config: any): ValidationResult => {
  const errors: string[] = [];

  if (!config || typeof config !== 'object') {
    return { isValid: false, errors: ['LayoutConfig must be a non-null object'] };
  }

  if (typeof config.version !== 'number') {
    errors.push('Config must contain a numeric "version" property');
  }

  if (!config.theme || typeof config.theme !== 'object') {
    errors.push('Config must contain a "theme" object');
  } else {
    const requiredColors = ['primary', 'secondary', 'background', 'surface', 'textPrimary', 'textSecondary', 'accent'];
    for (const colorKey of requiredColors) {
      if (!config.theme[colorKey] || typeof config.theme[colorKey] !== 'string') {
        errors.push(`theme.${colorKey} is required and must be a string`);
      }
    }
  }

  if (!Array.isArray(config.tabs)) {
    errors.push('Config must contain a "tabs" array');
  } else {
    const validScreens = ['home', 'bookings', 'prescriptions', 'profile'];
    config.tabs.forEach((tab: any, idx: number) => {
      if (!tab.id || !tab.label || !tab.icon || !validScreens.includes(tab.screen)) {
        errors.push(`Tab at index ${idx} has invalid format`);
      }
    });
  }

  if (!Array.isArray(config.sections)) {
    errors.push('Config must contain a "sections" array');
  } else {
    config.sections.forEach((section: any, idx: number) => {
      if (!section.id || typeof section.id !== 'string') {
        errors.push(`Section at index ${idx} is missing an "id"`);
      }
      if (!section.type || typeof section.type !== 'string') {
        errors.push(`Section at index ${idx} is missing a "type"`);
      }
      if (!section.background || typeof section.background !== 'object') {
        errors.push(`Section at index ${idx} is missing "background"`);
      } else {
        const validKinds = ['color', 'gradient', 'image'];
        if (!validKinds.includes(section.background.kind)) {
          errors.push(`Section at index ${idx} has invalid background kind: ${section.background.kind}`);
        }
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const sanitizeSections = (sections: SectionConfig[], knownTypes: string[]): SectionConfig[] => {
  if (!Array.isArray(sections)) return [];
  return sections.filter(sec => sec && knownTypes.includes(sec.type));
};
