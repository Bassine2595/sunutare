import { ImageModele } from "./Image";

export type ModeleModele = {
  canner: string;
  createdAt: Date;
  description: string;
  id: string;
  imageFile: [ImageModele];
  isArchived: boolean;
  name: string;
  nodeId: string;
  typeModele: string;
  updateAt: Date;
  workshopId: string;
};
