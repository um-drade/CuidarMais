import Svg, { Path } from 'react-native-svg';

/** Ícones de traço do design (viewBox 24x24). */
const paths = {
  mail: 'M4 6h16v12H4zM4 7l8 6 8-6',
  lock: 'M6 11h12v9H6zM8 11V8a4 4 0 018 0v3',
  eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 15a3 3 0 100-6 3 3 0 000 6z',
  eyeOff:
    'M3 3l18 18M10.6 6.1A9.8 9.8 0 0112 6c6 0 10 6 10 6a17 17 0 01-3.2 3.9M6.6 7.6A17 17 0 002 12s4 7 10 7c1.8 0 3.3-.4 4.6-1M9.9 9.9a3 3 0 004.2 4.2',
  user: 'M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0',
  pill: 'M10.5 3.5l10 10a4.2 4.2 0 01-6 6l-10-10a4.2 4.2 0 016-6zM8 8l8 8',
  pulse: 'M3 12h4l2-6 4 12 2-6h6',
  drop: 'M12 3s6 6.5 6 11a6 6 0 01-12 0c0-4.5 6-11 6-11z',
  phone:
    'M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z',
  bell: 'M6 17V11a6 6 0 0112 0v6l2 2H4zM10 21h4',
  home: 'M3 11l9-8 9 8M5 10v10h14V10',
  heart: 'M12 21s-8-5-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 10c0 6-8 11-8 11z',
  check: 'M5 12.5l4.5 4.5L19 7.5',
} as const;

export type IconName = keyof typeof paths;

type IconProps = {
  name: IconName;
  color: string;
  size?: number;
};

export function Icon({ name, color, size = 22 }: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d={paths[name]} />
    </Svg>
  );
}
