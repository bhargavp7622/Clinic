import React, { useRef, useMemo, useCallback } from 'react';
import {
  View,
  Animated,
  RefreshControl,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useConfig, useAppTheme } from '@context';
import {
  AppText,
  SearchBar,
  OfflineBanner,
  HeroBannerSkeleton,
  CategoryChipsSkeleton,
  DoctorCardSkeleton,
  ServiceCardSkeleton,
} from '@common';
import { Icon } from '@components';
import { triggerHaptic } from '@utils';
import { useTranslation } from 'react-i18next';
import { createHomeStyles } from './styles';
import { SectionRenderer } from './sections/SectionRenderer';

export const HomeScreen: React.FC = React.memo(() => {
  const navigation = useNavigation<any>();
  const theme = useAppTheme();
  const styles = useMemo(() => createHomeStyles(theme), [theme]);
  const { config, isLoading, refreshConfig } = useConfig();
  const { t } = useTranslation();

  const scrollY = useRef(new Animated.Value(0)).current;

  const headerElevation = scrollY.interpolate({
    inputRange: [0, 40],
    outputRange: [0, 4],
    extrapolate: 'clamp',
  });

  const searchBarHeight = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [46, 0],
    extrapolate: 'clamp',
  });

  const searchBarOpacity = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const handleNavigateBooking = useCallback(
    (params?: any) => {
      navigation.navigate('DoctorBooking', params || {});
    },
    [navigation]
  );

  const handleNavigatePrescriptions = useCallback(() => {
    navigation.navigate('MainTabs', { screen: 'PrescriptionsTab' });
  }, [navigation]);

  const handleNavigateAdmin = useCallback(() => {
    triggerHaptic('light');
    navigation.navigate('AdminConfig');
  }, [navigation]);

  const handleSearchChange = useCallback(
    (query: string) => {
      if (query.trim().length > 0) {
        navigation.navigate('DoctorBooking', { preselectedQuery: query });
      }
    },
    [navigation]
  );

  const festivalName = config.theme.festival?.name ? t(config.theme.festival.name, { defaultValue: config.theme.festival.name }) : '';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar
        barStyle={theme.isFestival ? 'dark-content' : 'light-content'}
      />

      {/* Offline / Resilience Status Banner */}
      <OfflineBanner onAdminPress={handleNavigateAdmin} />

      {/* Shrinking & Reactive Animated Header */}
      <Animated.View
        style={[
          styles.headerWrapper,
          {
            elevation: headerElevation,
          },
        ]}
      >
        {/* Festival Badge Strip if festival config active */}
        {theme.isFestival && config.theme.festival ? (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleNavigateAdmin}
            style={styles.festivalBannerStrip}
          >
            <Icon name="sparkles" size={13} color={theme.colors.surface} />
            <AppText variant="labelSmall" weight="800" color={theme.colors.surface}>
              {festivalName}
            </AppText>
          </TouchableOpacity>
        ) : null}

        {/* Top Branding & Clinic Location Bar */}
        <View style={styles.topBar}>
          <View style={styles.locationContainer}>
            <View style={styles.brandTitleRow}>
              <Icon
                name="activity"
                size={20}
                color={theme.colors.primary}
                strokeWidth={2.5}
              />
              <AppText variant="headlineMedium" weight="800" colorKey="primary" style={{ letterSpacing: -0.4 }}>
                {t('common.app_name')}
              </AppText>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
              <Icon name="map-pin" size={11} color={theme.colors.textSecondary} />
              <AppText variant="bodySmall" colorKey="textSecondary" style={{ marginLeft: 3 }}>
                {t('home.location')}
              </AppText>
            </View>
          </View>

          {/* Admin & Resilience Live Switcher Button */}
          <View style={styles.headerActions}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleNavigateAdmin}
              style={[
                styles.adminButton,
                {
                  backgroundColor: theme.colors.divider,
                },
              ]}
              accessibilityLabel={t('common.admin_settings')}
            >
              <Icon
                name="sliders"
                size={18}
                color={theme.colors.textPrimary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Shrinking Debounced Search Bar */}
        <Animated.View
          style={[
            styles.searchContainer,
            {
              height: searchBarHeight,
              opacity: searchBarOpacity,
              overflow: 'hidden',
            },
          ]}
        >
          <SearchBar
            placeholder={t('common.search_placeholder')}
            onSearchChange={handleSearchChange}
          />
        </Animated.View>
      </Animated.View>

      {/* Main Scrollable Content Band Container */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refreshConfig}
            tintColor={theme.colors.primary}
            colors={[theme.colors.primary]}
          />
        }
      >
        {isLoading && !config.sections?.length ? (
          <View style={styles.skeletonsContainer}>
            <HeroBannerSkeleton />
            <CategoryChipsSkeleton />
            <View style={{ flexDirection: 'row', paddingHorizontal: 16 }}>
              <DoctorCardSkeleton />
              <DoctorCardSkeleton />
            </View>
            <View style={{ flexDirection: 'row', paddingHorizontal: 16 }}>
              <ServiceCardSkeleton />
              <ServiceCardSkeleton />
            </View>
          </View>
        ) : (
          config.sections.map(section => (
            <SectionRenderer
              key={section.id}
              section={section}
              scrollY={scrollY}
              onNavigateBooking={handleNavigateBooking}
              onNavigatePrescriptions={handleNavigatePrescriptions}
              onNavigateAdmin={handleNavigateAdmin}
            />
          ))
        )}
      </Animated.ScrollView>
    </SafeAreaView>
  );
});

export default HomeScreen;
