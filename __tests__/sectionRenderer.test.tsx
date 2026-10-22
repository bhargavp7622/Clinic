import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { SectionRenderer } from '@/screens/Home/sections/SectionRenderer';
import { ThemeProvider } from '@/context/ThemeContext';
import { NORMAL_LAYOUT_CONFIG } from '@/api/mockData';
import { SectionConfig } from '@/types/config.types';
import { THEME_COLORS } from '@/common/theme';

describe('SectionRenderer Tests', () => {
  it('renders a known section type (offer_strip) without error', () => {
    const offerSection: SectionConfig = {
      id: 'test-offer',
      type: 'offer_strip',
      background: { kind: 'color', value: THEME_COLORS.normal.offerBg },
      title: 'Special Offer',
      items: [
        {
          id: 'off-1',
          text: 'Free WhatsApp follow-up for 7 days',
          couponCode: 'TAPZA',
        },
      ],
    };

    let renderer: any;
    ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(
        <ThemeProvider layoutTheme={NORMAL_LAYOUT_CONFIG.theme}>
          <SectionRenderer section={offerSection} />
        </ThemeProvider>
      );
    });

    expect(renderer.toJSON()).not.toBeNull();
  });

  it('renders null and never crashes on unknown section type', () => {
    const unknownSection: SectionConfig = {
      id: 'test-unknown',
      type: 'quantum_teleportation_clinic',
      background: { kind: 'color', value: THEME_COLORS.normal.surface },
      title: 'Unknown Widget',
      items: [{ id: '1', name: 'Unknown' }],
    };

    let renderer: any;
    expect(() => {
      ReactTestRenderer.act(() => {
        renderer = ReactTestRenderer.create(
          <ThemeProvider layoutTheme={NORMAL_LAYOUT_CONFIG.theme}>
            <SectionRenderer section={unknownSection} />
          </ThemeProvider>
        );
      });
    }).not.toThrow();

    // Must render nothing (null)
    expect(renderer.toJSON()).toBeNull();
  });
});
