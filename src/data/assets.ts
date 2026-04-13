import type { StaticImageData } from 'next/image';

import Mercedes01 from '../../photos/Mercedes_01.jpg';
import Mercedes02 from '../../photos/Mercedes_02.jpg';
import Mercedes03 from '../../photos/Mercedes_03.jpg';
import Mercedes04 from '../../photos/Mercedes_04.jpg';
import Mercedes05 from '../../photos/Mercedes_05.jpg';
import Mercedes06 from '../../photos/Mercedes_06.jpg';
import Mercedes07 from '../../photos/Mercedes_07.jpg';
import Mercedes08 from '../../photos/Mercedes_08.jpg';
import Mercedes09 from '../../photos/Mercedes_09.jpg';
import Mercedes10 from '../../photos/Mercedes_10.jpg';
import Mercedes11 from '../../photos/Mercedes_11.jpg';
import Mercedes12 from '../../photos/Mercedes_12.jpg';
import Porsche01 from '../../photos/Porsche_01.jpg';
import Porsche02 from '../../photos/Porsche_02.jpg';
import Porsche09 from '../../photos/Porsche_09.jpg';
import Porsche10 from '../../photos/Porsche_10.jpg';
import Porsche11 from '../../photos/Porsche_11.jpg';

export type AssetMap = Record<string, StaticImageData>;

const sharedSubpageHero = Mercedes01;

export const assets = {
  heroMain: Mercedes01,
  heroOferta: sharedSubpageHero,
  heroOnas: sharedSubpageHero,
  heroKontakt: sharedSubpageHero,
  heroOdkup: sharedSubpageHero,
  sedan01: Mercedes01,
  sedan02: Mercedes02,
  suv01: Porsche09,
  suv02: Porsche11,
  sport01: Porsche01,
  sport02: Porsche02,
  electric01: Porsche10,
  showroom: Mercedes03,
  interior01: Mercedes04,
  interior02: Mercedes05,
  service: Mercedes06,
  detail01: Mercedes07,
  detail02: Mercedes08,
  handover: Mercedes09,
  luxury01: Mercedes10,
  luxury02: Mercedes11,
  luxury03: Mercedes12,
} satisfies AssetMap;
