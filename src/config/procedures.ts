export type ProcedureDocument = Readonly<{
  id: string;
  title: string;
  version: string;
  elaboratedAt: `${number}-${number}-${number}`;
  pages: number;
  fileName: `${string}.pdf`;
  sizeBytes: number;
  sha256: string;
  applicationNote?: string;
}>;

// Catálogo de documentos reais; os arquivos originais ficam em public/documents/.
export const procedures: readonly ProcedureDocument[] = [
  {
    id: "gerenciamento-descarte-residuos",
    title: "Gerenciamento e descarte seguro de resíduos",
    version: "01",
    elaboratedAt: "2026-10-19",
    pages: 4,
    fileName: "POP_LABS_ENF_UnB_.pdf",
    sizeBytes: 150290,
    sha256: "fc2276351426f5a40e87e4bc809738bef1bdf5b00798c99d2e2ad20c67b10a72",
    applicationNote: "A adequação desse fluxo deverá ser validada com a SeMA/CGR antes da implementação definitiva deste POP.",
  },
];

export function procedureFileUrl(document: ProcedureDocument) {
  return `/documents/${encodeURIComponent(document.fileName)}`;
}
