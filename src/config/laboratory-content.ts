export type LaboratoryContact = Readonly<{
  label: string;
  value: string;
  href: `mailto:${string}` | `tel:${string}` | `https://${string}`;
}>;

export type LaboratoryPhoto = Readonly<{
  src: `/images/${string}`;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}>;

export type LaboratorySpace = Readonly<{
  name: string;
  description: string;
}>;

export type LaboratoryContent = Readonly<{
  contacts: readonly LaboratoryContact[];
  photos: readonly LaboratoryPhoto[];
  spaces: readonly LaboratorySpace[];
}>;

// Preencher somente com dados reais fornecidos e autorizados para publicação.
// Coleções vazias não geram seções nem textos provisórios na página pública.
export const laboratoryContent: LaboratoryContent = {
  contacts: [],
  photos: [],
  spaces: [],
};
