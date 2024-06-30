import { TAGTYPE } from '@prisma/client';

export type tag = { id: string; tagename: string; tagtype?: TAGTYPE | null; createdAt?: Date };
