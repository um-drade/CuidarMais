# Cuidar+

App mobile (Expo / React Native) de apoio ao cuidado diário: remédios, saúde, contatos de emergência e perfil.

## Como rodar

```bash
npm install
npx expo install react-native-svg   # ícones do novo design (obrigatório, só na primeira vez)
npx expo start
```

## Estrutura do código

```
src/
├── app/                # Rotas (Expo Router)
│   ├── _layout.tsx     # Tema + AuthProvider
│   ├── login.tsx       # Rota de login
│   └── index.tsx       # App principal (abas); redireciona para /login sem sessão
├── screens/            # login, home, medicines, health, contacts, profile
├── components/
│   ├── layout/         # tab-bar, emergency-button, screen-scroll
│   └── ui/             # card, app-button, badge, switch, text-field, icon, icon-box
├── contexts/           # auth-context (sessão do usuário)
├── services/           # auth.ts (autenticação PROVISÓRIA, veja abaixo)
├── theme/              # palette (cores claro/escuro), typography
├── hooks/              # use-app-theme
├── data/               # dados de exemplo
├── utils/              # greeting, medicines (períodos, contagem regressiva)
└── types/              # tipos compartilhados
```