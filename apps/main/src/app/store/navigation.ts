import { atomWithStorage } from 'jotai/utils';

export type NavigationType = 'pos' | 'accounting' | 'procurement';

export const currentNavigationAtom = atomWithStorage<NavigationType>('currentNavigation', 'pos');


