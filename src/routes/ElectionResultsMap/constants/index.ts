import { Party, PartyColors } from '../types';

import chp from '../../../images/chp.png';
import akp from '../../../images/akp.png';
import bbp from '../../../images/bbp.png';
import btp from '../../../images/btp.png';
import hdp from '../../../images/hdp.png';
import mhp from '../../../images/mhp.png';
import saadet from '../../../images/saadet.png';
import tkp from '../../../images/tkp.png';
import vatan from '../../../images/vatan.png';
import iyiparti from '../../../images/iyiparti.png';
import dp from '../../../images/dp.png';
import dsp from '../../../images/dsp.png';
import tr from '../../../images/tr.png';

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

export const PARTY_PROPS: Array<PartyColors> = [
  { partyId: 0, light: '#B9770E', normal: '#9C640C', dark: '#784212', icon: tr }, // Gray
  { partyId: 1, light: '#bac8ff', normal: '#5c7cfa', dark: '#3b5bdb', icon: saadet }, // Indigo
  { partyId: 2, light: '#99e9f2', normal: '#22b8cf', dark: '#0c8599', icon: btp }, // Cyan
  { partyId: 3, light: '#37b24d', normal: '#2f9e44', dark: '#2b8a3e', icon: tkp }, // Lime
  { partyId: 4, light: '#f06595', normal: '#d6336c', dark: '#a61e4d', icon: vatan }, // Pink
  { partyId: 5, light: '#96f2d7', normal: '#20c997', dark: '#099268', icon: bbp }, // Teal
  { partyId: 7, light: '#fa5252', normal: '#e03131', dark: '#c92a2a', icon: chp }, // Red
  { partyId: 8, light: '#ffd43b', normal: '#fcc419', dark: '#fab005', icon: akp }, // Yellow
  { partyId: 9, light: '#eebefa', normal: '#cc5de8', dark: '#9c36b5', icon: dp }, // Grape
  { partyId: 10, light: '#339af0', normal: '#1c7ed6', dark: '#1864ab', icon: mhp }, // Blue
  { partyId: 11, light: '#ffc078', normal: '#ff922b', dark: '#e8590c', icon: iyiparti }, // Orange
  { partyId: 12, light: '#be4bdb', normal: '#ae3ec9', dark: '#862e9c', icon: hdp }, // Green
  { partyId: 13, light: '#d0bfff', normal: '#845ef7', dark: '#6741d9', icon: dsp }, // Voilet
];

/**
 * Oy oranı farklarının belirlenmesi
 * Bu oranlara göre atama yapılacak
 * Aşağıdaki değerlere en yüksek oy oranına sahip ilk iki parti arasındaki fark 5 ten küçükse light, 10' dan küçükse normal, 10'dan büyükse dark renk atanacak
 */

export const RATE_DIFFERENCE_FOR_LIGHT = 5;
export const RATE_DIFFERENCE_FOR_NORMAL = 10;
