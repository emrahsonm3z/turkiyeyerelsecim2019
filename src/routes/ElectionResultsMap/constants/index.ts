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
  { partyId: 0, light: '#e9ecef', normal: '#ced4da', dark: '#868e96' }, // Gray
  { partyId: 1, light: '#bac8ff', normal: '#5c7cfa', dark: '#3b5bdb' }, // Indigo
  { partyId: 2, light: '#99e9f2', normal: '#22b8cf', dark: '#0c8599' }, // Cyan
  { partyId: 3, light: '#c0eb75', normal: '#94d82d', dark: '#66a80f' }, // Lime
  { partyId: 4, light: '#fcc2d7', normal: '#f06595', dark: '#c2255c' }, // Pink
  { partyId: 5, light: '#96f2d7', normal: '#20c997', dark: '#099268' }, // Teal
  { partyId: 7, light: '#ffc9c9', normal: '#ff6b6b', dark: '#e03131' }, // Red
  { partyId: 8, light: '#ffec99', normal: '#fcc419', dark: '#f08c00' }, // Yellow
  { partyId: 9, light: '#eebefa', normal: '#cc5de8', dark: '#9c36b5' }, // Grape
  { partyId: 10, light: '#ffc078', normal: '#ff922b', dark: '#e8590c' }, // Orange
  { partyId: 11, light: '#a5d8ff', normal: '#339af0', dark: '#1971c2' }, // Blue
  { partyId: 12, light: '#b2f2bb', normal: '#51cf66', dark: '#2f9e44' }, // Green
  { partyId: 13, light: '#d0bfff', normal: '#845ef7', dark: '#6741d9' }, // Voilet
];

/**
 * Oy oranı farklarının belirlenmesi
 * Bu oranlara göre atama yapılacak
 * Aşağıdaki değerlere en yüksek oy oranına sahip ilk iki parti arasındaki fark 5 ten küçükse light, 10' dan küçükse normal, 10'dan büyükse dark renk atanacak
 */

export const RATE_DIFFERENCE_FOR_LIGHT = 5;
export const RATE_DIFFERENCE_FOR_NORMAL = 10;
