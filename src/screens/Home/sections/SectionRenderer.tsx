import React from 'react';
import { Animated } from 'react-native';
import { SectionConfig } from '@types';
import { SectionWrapper } from './SectionWrapper';
import { HeroBannerSection } from './HeroBannerSection';
import { CategoryChipsSection } from './CategoryChipsSection';
import { QuickActionsSection } from './QuickActionsSection';
import { ServiceGridSection } from './ServiceGridSection';
import { DoctorCarouselSection } from './DoctorCarouselSection';
import { OfferStripSection } from './OfferStripSection';

interface SectionRendererProps {
  section: SectionConfig;
  scrollY?: Animated.Value;
  onNavigateBooking?: (params?: any) => void;
  onNavigatePrescriptions?: () => void;
  onNavigateAdmin?: () => void;
}

export const SectionRenderer: React.FC<SectionRendererProps> = React.memo(({
  section,
  scrollY,
  onNavigateBooking,
  onNavigatePrescriptions,
  onNavigateAdmin,
}) => {
  if (!section || !section.type) {
    return null;
  }

  const handleAction = (action?: string) => {
    if (!action) return;
    if (action.includes('bookings')) {
      onNavigateBooking?.();
    } else if (action.includes('prescriptions')) {
      onNavigatePrescriptions?.();
    } else if (action.includes('admin') || action.includes('festival')) {
      onNavigateAdmin?.();
    }
  };

  const renderSectionContent = () => {
    switch (section.type) {
      case 'hero_banner':
        return (
          <HeroBannerSection
            items={section.items as any}
            scrollY={scrollY}
            onCtaPress={handleAction}
          />
        );

      case 'category_chips':
        return (
          <CategoryChipsSection
            items={section.items as any}
            onSelectCategory={() => onNavigateBooking?.()}
          />
        );

      case 'quick_actions':
        return (
          <QuickActionsSection
            items={section.items as any}
            onActionPress={handleAction}
          />
        );

      case 'service_grid':
        return (
          <ServiceGridSection
            items={section.items as any}
            onServicePress={service =>
              onNavigateBooking?.({
                serviceName: service.name,
                feeInr: service.priceInr,
              })
            }
          />
        );

      case 'doctor_carousel':
        return (
          <DoctorCarouselSection
            items={section.items as any}
            onDoctorPress={doc =>
              onNavigateBooking?.({
                doctorId: doc.doctorId,
                doctorName: doc.name,
                specialty: doc.specialty,
                feeInr: doc.feeInr,
                clinicName: doc.clinicName,
              })
            }
          />
        );

      case 'offer_strip':
        return (
          <OfferStripSection
            items={section.items as any}
            onActionPress={() => onNavigateBooking?.()}
          />
        );

      default:
        // Resilience requirement: "An unknown section type must render nothing and never crash."
        return null;
    }
  };

  const content = renderSectionContent();
  if (!content) {
    return null;
  }

  return (
    <SectionWrapper
      id={section.id}
      title={section.title}
      background={section.background}
    >
      {content}
    </SectionWrapper>
  );
});
