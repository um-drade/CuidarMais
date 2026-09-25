
import { useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

const screens = [
  {
    id: 'home',
    label: 'Início',
    icon: '🏠',
    title: 'Tela inicial',
    description: 'Bem-vindo ao início da sua jornada.',
    color: '#0b5ed7',
  },
  {
    id: 'agenda',
    label: 'Remédios',
    icon: '💊',
    title: 'Remédios e lembretes',
    description: 'Controle seus medicamentos com clareza.',
    color: '#0f766e',
  },
  {
    id: 'saude',
    label: 'Saúde',
    icon: '❤️',
    title: 'Saúde',
    description: 'Acompanhe hábitos e cuidados diários.',
    color: '#d97706',
  },
  {
    id: 'contatos',
    label: 'Contatos',
    icon: '📞',
    title: 'Contatos de emergência',
    description: 'Acesso rápido aos números importantes.',
    color: '#c2185b',
  },
  {
    id: 'perfil',
    label: 'Perfil',
    icon: '👤',
    title: 'Perfil',
    description: 'Gerencie suas informações pessoais.',
    color: '#6d28d9',
  },
];

const initialReminders = [
  { id: 'losartana', name: 'Losartana', dose: '50 mg', time: '08:00', taken: true },
  { id: 'vitamina', name: 'Vitamina D', dose: '1 cápsula', time: '12:30', taken: false },
  { id: 'colina', name: 'Colina', dose: '2 comprimidos', time: '20:00', taken: false },
];

const healthMetrics = [
  { label: 'Pressão', value: '120/80', unit: 'mmHg', status: 'Normal' },
  { label: 'Pulso', value: '72', unit: 'bpm', status: 'Estável' },
  { label: 'Hidratação', value: '1,8 L', unit: 'hoje', status: 'Boa' },
  { label: 'Atividade', value: '4.500', unit: 'passos', status: 'Atenção' },
];

const emergencyContacts = [
  { id: 'famila', name: 'Família', phone: '(11) 99999-1234', icon: '👨‍👩‍👧‍👦' },
  { id: 'medico', name: 'Médico', phone: '(11) 3333-4455', icon: '🩺' },
  { id: 'ambulancia', name: 'Ambulância', phone: '192', icon: '🚑' },
  { id: 'vizinhos', name: 'Vizinhos', phone: '(11) 98888-7788', icon: '🏡' },
];

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [medicineList, setMedicineList] = useState(initialReminders);
  const scrollViewRef = useRef<ScrollView>(null);
  const { width } = useWindowDimensions();

  const goToScreen = (index: number) => {
    setActiveIndex(index);
    scrollViewRef.current?.scrollTo({
      x: index * width,
      y: 0,
      animated: true,
    });
  };

  const toggleMedicine = (id: string) => {
    setMedicineList((current) =>
      current.map((item) =>
        item.id === id ? { ...item, taken: !item.taken } : item,
      ),
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const nextIndex = Math.round(event.nativeEvent.contentOffset.x / width);
          setActiveIndex(nextIndex);
        }}
      >
        {screens.map((screen) => (
          <View key={screen.id} style={[styles.page, { width }]}>
            {screen.id === 'agenda' ? (
              <View style={styles.medicinePanel}>
                <Text style={styles.panelHeader}>Remédios de hoje</Text>
                <Text style={styles.panelSubtitle}>Próximo lembrete: 20:00</Text>

                <View style={styles.medicineList}>
                  {medicineList.map((medicine) => (
                    <Pressable
                      key={medicine.id}
                      onPress={() => toggleMedicine(medicine.id)}
                      style={[
                        styles.medicineItem,
                        medicine.taken && styles.medicineItemTaken,
                      ]}
                    >
                      <View style={styles.medicineInfo}>
                        <Text style={styles.medicineName}>{medicine.name}</Text>
                        <Text style={styles.medicineDose}>{medicine.dose}</Text>
                        <Text style={styles.medicineTime}>Horário: {medicine.time}</Text>
                      </View>

                      <Text
                        style={[
                          styles.statusBadge,
                          medicine.taken ? styles.statusTaken : styles.statusPending,
                        ]}
                      >
                        {medicine.taken ? 'Tomado' : 'Pendente'}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            ) : screen.id === 'saude' ? (
              <View style={styles.healthPanel}>
                <Text style={styles.panelHeader}>Monitoramento da saúde</Text>
                <Text style={styles.panelSubtitle}>Resumo do dia</Text>

                <View style={styles.metricsGrid}>
                  {healthMetrics.map((metric) => (
                    <View key={metric.label} style={styles.metricCard}>
                      <Text style={styles.metricLabel}>{metric.label}</Text>
                      <Text style={styles.metricValue}>{metric.value}</Text>
                      <Text style={styles.metricUnit}>{metric.unit}</Text>
                      <Text style={styles.metricStatus}>{metric.status}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.alertBox}>
                  <Text style={styles.alertTitle}>Dica de hoje</Text>
                  <Text style={styles.alertText}>Beba água e faça uma caminhada leve.</Text>
                </View>
              </View>
            ) : screen.id === 'contatos' ? (
              <View style={styles.contactsPanel}>
                <Text style={styles.panelHeader}>Contatos de emergência</Text>
                <Text style={styles.panelSubtitle}>Toque para ligar</Text>

                <View style={styles.contactsList}>
                  {emergencyContacts.map((contact) => (
                    <Pressable key={contact.id} style={styles.contactCard}>
                      <Text style={styles.contactIcon}>{contact.icon}</Text>
                      <View style={styles.contactInfo}>
                        <Text style={styles.contactName}>{contact.name}</Text>
                        <Text style={styles.contactPhone}>{contact.phone}</Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
              </View>
            ) : (
              <View style={[styles.card, { borderColor: screen.color }]}>
                <Text style={[styles.badge, { backgroundColor: screen.color }]}>
                  {screen.label}
                </Text>
                <Text style={styles.title}>{screen.title}</Text>
                <Text style={styles.description}>{screen.description}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomNav}>
        {screens.map((screen, index) => {
          const isActive = activeIndex === index;

          return (
            <Pressable
              key={screen.id}
              onPress={() => goToScreen(index)}
              style={[styles.navButton, isActive && styles.navButtonActive]}
            >
              <View style={styles.navButtonContent}>
                <Text style={styles.navIcon}>{screen.icon}</Text>
                <Text style={[styles.navButtonText, isActive && styles.navButtonTextActive]}>
                  {screen.label}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f1e8',
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingVertical: 28,
  },
  card: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    borderWidth: 3,
    padding: 28,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  badge: {
    alignSelf: 'flex-start',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    marginBottom: 18,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#111111',
    marginBottom: 12,
  },
  description: {
    fontSize: 20,
    color: '#1f2937',
    lineHeight: 30,
  },
  medicinePanel: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    borderWidth: 3,
    borderColor: '#0f766e',
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  healthPanel: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: '#fffaf0',
    borderRadius: 24,
    borderWidth: 3,
    borderColor: '#d97706',
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  panelHeader: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0b1f3a',
    marginBottom: 8,
  },
  panelSubtitle: {
    fontSize: 18,
    color: '#374151',
    marginBottom: 18,
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 18,
  },
  metricCard: {
    width: '47%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#f3d49b',
    padding: 16,
  },
  metricLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 30,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 2,
  },
  metricUnit: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 8,
  },
  metricStatus: {
    fontSize: 16,
    fontWeight: '700',
    color: '#166534',
  },
  alertBox: {
    backgroundColor: '#fff7ed',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#fdba74',
    padding: 16,
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#9a4d00',
    marginBottom: 4,
  },
  alertText: {
    fontSize: 18,
    color: '#7c2d12',
    lineHeight: 26,
  },
  contactsPanel: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: '#fff1f2',
    borderRadius: 24,
    borderWidth: 3,
    borderColor: '#c2185b',
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  contactsList: {
    gap: 12,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#fbcfe8',
    padding: 16,
  },
  contactIcon: {
    fontSize: 30,
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 2,
  },
  contactPhone: {
    fontSize: 18,
    color: '#374151',
  },
  medicineList: {
    gap: 12,
  },
  medicineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#d1d5db',
  },
  medicineItemTaken: {
    backgroundColor: '#ecfdf5',
    borderColor: '#16a34a',
  },
  medicineInfo: {
    flex: 1,
    marginRight: 12,
  },
  medicineName: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 2,
  },
  medicineDose: {
    fontSize: 18,
    color: '#374151',
    marginBottom: 2,
  },
  medicineTime: {
    fontSize: 18,
    color: '#374151',
  },
  statusBadge: {
    fontSize: 16,
    fontWeight: '800',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
    textAlign: 'center',
  },
  statusTaken: {
    backgroundColor: '#bbf7d0',
    color: '#166534',
  },
  statusPending: {
    backgroundColor: '#fed7aa',
    color: '#9a4d00',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    gap: 8,
    backgroundColor: '#0b1f3a',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 2,
    borderTopColor: '#0b1f3a',
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e5e7eb',
    borderRadius: 14,
    paddingVertical: 12,
    minHeight: 62,
    height: 62,
    borderWidth: 2,
    borderColor: '#cbd5e1',
  },
  navButtonActive: {
    backgroundColor: '#facc15',
    borderColor: '#f59e0b',
  },
  navButtonContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  navIcon: {
    fontSize: 22,
    lineHeight: 22,
    marginBottom: 2,
  },
  navButtonText: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  navButtonTextActive: {
    color: '#111827',
  },
});