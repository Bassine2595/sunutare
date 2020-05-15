import { ModeleModele } from "./Modele";
import { ImageModele } from "./Image";
import { CustomerModel } from "./Customer";

export type ServiceModele = {
  id: string;
  avance: number;
  comment: string;
  createdAt: Date;
  dateBegin: Date;
  dateFinish: Date;
  imageFile: [ImageModele];
  isDelivered: boolean;
  modeleId: string;
  nbStart: number;
  nodeId: string;
  price: number;
  typeTissu: string;
  updateAt: Date;
  workshopId: string;
  isCut: boolean;
  isOver: boolean;
  isStarded: boolean;
  code: string;
  progress: number;
  modele: ModeleModele;
  customer: CustomerModel;
};
