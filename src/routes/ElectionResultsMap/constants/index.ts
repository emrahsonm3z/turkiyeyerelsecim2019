import { Party, PartyColors } from '../types';

/**
 * Partiler ayrı ayrı, bağımsız adaylar tek renk üzerinden renklendirilecektir.
 */
export const PARTIES: Array<Party> = [
  { id: 1, name: 'Saadet Partisi' },
  { id: 2, name: 'BTP' },
  { id: 3, name: 'TKP' },
  { id: 4, name: 'Vatan Partisi' },
  { id: 5, name: 'BBP' },
  { id: 7, name: 'CHP' },
  { id: 8, name: 'Ak Parti' },
  { id: 9, name: 'DP' },
  { id: 10, name: 'MHP' },
  { id: 11, name: 'İyi Parti' },
  { id: 12, name: 'HDP' },
  { id: 13, name: 'DSP' },
];

/**
 * 12 parti var. En fazla 13 renk olabilecek. Bunun için 13 farklı renk ve bunlara ait toplamda 3 farklı tonu
 * https://yeun.github.io/open-color/
 */

export const COLORS: Array<PartyColors> = [
  { partyId: 0, light: '#B9770E', normal: '#9C640C', dark: '#784212' }, // Gray
  { partyId: 1, light: '#bac8ff', normal: '#5c7cfa', dark: '#3b5bdb' }, // Indigo
  { partyId: 2, light: '#99e9f2', normal: '#22b8cf', dark: '#0c8599' }, // Cyan
  { partyId: 3, light: '#37b24d', normal: '#2f9e44', dark: '#2b8a3e' }, // Lime
  { partyId: 4, light: '#f06595', normal: '#d6336c', dark: '#a61e4d' }, // Pink
  { partyId: 5, light: '#96f2d7', normal: '#20c997', dark: '#099268' }, // Teal
  { partyId: 7, light: '#fa5252', normal: '#e03131', dark: '#c92a2a' }, // Red
  { partyId: 8, light: '#ffd43b', normal: '#fcc419', dark: '#fab005' }, // Yellow
  { partyId: 9, light: '#eebefa', normal: '#cc5de8', dark: '#9c36b5' }, // Grape
  { partyId: 10, light: '#339af0', normal: '#1c7ed6', dark: '#1864ab' }, // Blue
  { partyId: 11, light: '#ffc078', normal: '#ff922b', dark: '#e8590c' }, // Orange
  { partyId: 12, light: '#be4bdb', normal: '#ae3ec9', dark: '#862e9c' }, // Green
  { partyId: 13, light: '#d0bfff', normal: '#845ef7', dark: '#6741d9' }, // Voilet
];

/**
 * Oy oranı farklarının belirlenmesi
 * Bu oranlara göre atama yapılacak
 * Aşağıdaki değerlere en yüksek oy oranına sahip ilk iki parti arasındaki fark 5 ten küçükse light, 10' dan küçükse normal, 10'dan büyükse dark renk atanacak
 */

export const RATE_DIFFERENCE_FOR_LIGHT = 5;
export const RATE_DIFFERENCE_FOR_NORMAL = 10;
