import { validateLayoutConfig, sanitizeSections } from '../src/utils/validation';
import { NORMAL_LAYOUT_CONFIG, FESTIVAL_LAYOUT_CONFIG } from '../src/api/mockData';
import { SectionConfig } from '../src/types/config.types';

describe('LayoutConfig Validation & Resilience', () => {
  it('validates standard normal layout config successfully', () => {
    const result = validateLayoutConfig(NORMAL_LAYOUT_CONFIG);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('validates festival layout config successfully', () => {
    const result = validateLayoutConfig(FESTIVAL_LAYOUT_CONFIG);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('detects missing theme colors in invalid config', () => {
    const invalidConfig = {
      version: 1,
      theme: { primary: '#0F766E' }, // Missing secondary, background, surface, etc.
      tabs: [],
      sections: [],
    };
    const result = validateLayoutConfig(invalidConfig);
    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it('detects invalid background kind in section config', () => {
    const invalidConfig = {
      version: 1,
      theme: NORMAL_LAYOUT_CONFIG.theme,
      tabs: NORMAL_LAYOUT_CONFIG.tabs,
      sections: [
        {
          id: 'test-sec',
          type: 'hero_banner',
          background: { kind: 'unsupported_video_bg' as any, value: 'test' },
        },
      ],
    };
    const result = validateLayoutConfig(invalidConfig);
    expect(result.isValid).toBe(false);
    expect(result.errors[0]).toContain('invalid background kind');
  });

  it('sanitizes and gracefully filters out unknown section types', () => {
    const knownTypes = [
      'hero_banner',
      'category_chips',
      'quick_actions',
      'service_grid',
      'doctor_carousel',
      'offer_strip',
    ];

    const testSections: SectionConfig[] = [
      {
        id: 'sec-1',
        type: 'hero_banner',
        background: { kind: 'color', value: '#FFF' },
      },
      {
        id: 'sec-2',
        type: 'ai_experimental_drone_delivery', // Unknown type
        background: { kind: 'color', value: '#FFF' },
      },
      {
        id: 'sec-3',
        type: 'doctor_carousel',
        background: { kind: 'color', value: '#FFF' },
      },
    ];

    const sanitized = sanitizeSections(testSections, knownTypes);
    expect(sanitized).toHaveLength(2);
    expect(sanitized.map(s => s.id)).toEqual(['sec-1', 'sec-3']);
  });
});
