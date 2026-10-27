import hero from './hero.webp';
import card from './card.webp';
import t1 from './t1.webp';
import t2 from './t2.webp';
import cube from './cube.webp';
import phone from './phone.webp';
import s1 from './s1.webp';
import s2 from './s2.webp';
import s3 from './s3.webp';
import s4 from './s4.webp';

import oxton from '../../../../public/projects/oxton.png';
import tandem from '../../../../public/projects/tandem.png';
import playTennis from '../../../../public/projects/play-tennis.png';
import plantZone from '../../../../public/projects/plant-zone.png';
import mojoBlend from '../../../../public/projects/mojo-blend.png';
import spiritWise from '../../../../public/projects/spirit-wise.png';
export const images = { hero, card, t1, t2, cube, phone, s1, s2, s3, s4, oxton, tandem, playTennis, plantZone, mojoBlend, spiritWise } as const;
export type ImageKey = keyof typeof images;
