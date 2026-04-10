import type { StaticImageData } from 'next/image';
import komercja from '../../photos/komercja.jpg';
import kuchnia from '../../photos/kuchnia.jpg';
import materialy01 from '../../photos/materialy_01.jpg';
import materialy02 from '../../photos/materialy_02.webp';
import materialy03 from '../../photos/materialy_03.webp';
import materialy04 from '../../photos/materialy_04.jpg';
import realizacje01 from '../../photos/realizacje_01.jpg';
import realizacje02 from '../../photos/realizacje_02.jpg';
import realizacje03 from '../../photos/realizacje_03.jpg';
import realizacje04 from '../../photos/realizacje_04.jpg';
import realizacje05 from '../../photos/realizacje_05.jpg';
import realizacje06 from '../../photos/realizacje_06.jpg';
import salon from '../../photos/salon.jpg';
import showroom from '../../photos/showroom.jpg';
import szafa from '../../photos/szafa.jpg';
import warsztat from '../../photos/warsztat.jpg';
import wycena01 from '../../photos/wycena_01.jpg';
import wycena02 from '../../photos/wycena_02.jpg';
import wycena03 from '../../photos/wycena_03.jpg';
import fornirNaturalny from '../../photos/FornirNaturalny_01.jpg';
import spiekCeramiczny from '../../photos/SpiekCeramiczny_02.jpg';
import lakierGlebokiMat from '../../photos/LakierGlebokiMat_03.webp';
import aluminiumAnodowane from '../../photos/AluminiumAnodowane_04.jpg';
import szkloTechniczne from '../../photos/SzkloTechniczne_05.jpg';
import kamienNaturalny from '../../photos/KamienNaturalny_06.webp';

export type AssetMap = Record<string, StaticImageData>;

export const assets = {
  komercja,
  kuchnia,
  materialy01,
  materialy02,
  materialy03,
  materialy04,
  realizacje01,
  realizacje02,
  realizacje03,
  realizacje04,
  realizacje05,
  realizacje06,
  salon,
  showroom,
  szafa,
  warsztat,
  wycena01,
  wycena02,
  wycena03,
  fornirNaturalny,
  spiekCeramiczny,
  lakierGlebokiMat,
  aluminiumAnodowane,
  szkloTechniczne,
  kamienNaturalny,
} satisfies AssetMap;
