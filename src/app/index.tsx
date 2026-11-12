import { Redirect } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { EmergencyButton } from '@/components/layout/emergency-button';
import { TabBar } from '@/components/layout/tab-bar';
import { useAuth } from '@/contexts/auth-context';
import { initialMedicines } from '@/data/medicines';
import { screens } from '@/data/screens';
import { useAppTheme } from '@/hooks/use-app-theme';
import { ContactsScreen } from '@/screens/contacts-screen';
import { HealthScreen } from '@/screens/health-screen';
import { HomeScreen } from '@/screens/home-screen';
import { MedicinesScreen } from '@/screens/medicines-screen';
import { ProfileScreen } from '@/screens/profile-screen';
import type { Medicine } from '@/types/app';

export default function App() {
  const theme = useAppTheme();
  const { user, signOut } = useAuth();
  const [activeIndex, setActiveIndex] = useState(0);
  const [medicines, setMedicines] = useState<Medicine[]>(initialMedicines);

  if (!user) {
    return <Redirect href="/login" />;
  }

  const toggleMedicine = (id: string) => {
    setMedicines((current) =>
      current.map((item) => (item.id === id ? { ...item, taken: !item.taken } : item)),
    );
  };

  const renderScreen = () => {
    switch (screens[activeIndex].id) {
      case 'medicines':
        return <MedicinesScreen medicines={medicines} onToggle={toggleMedicine} />;
      case 'health':
        return <HealthScreen />;
      case 'contacts':
        return <ContactsScreen />;
      case 'profile':
        return <ProfileScreen user={user} onSignOut={signOut} />;
      default:
        return <HomeScreen user={user} medicines={medicines} onTakeMedicine={toggleMedicine} />;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>{renderScreen()}</View>
      <EmergencyButton />
      <TabBar items={screens} activeIndex={activeIndex} onSelect={setActiveIndex} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
