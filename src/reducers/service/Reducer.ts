import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ServiceModele } from "../../modeles/Service";

const initialState: {
  followModal: boolean;
  editModal: boolean;
  showModal: boolean;
  deliverModal: boolean;
  refetchable: boolean;
  service: ServiceModele;
} = {
  followModal: false,
  editModal: false,
  showModal: false,
  deliverModal: false,
  refetchable: false,
  service: null,
};
const follow = createSlice({
  name: "serviceModal",
  initialState: initialState,
  reducers: {
    followModalToggle: (state) => {
      state.followModal = !state.followModal;
    },
    editModalToggle: (state) => {
      state.editModal = !state.editModal;
    },
    showModalToggle: (state) => {
      state.showModal = !state.showModal;
    },
    deliverModalToggle: (state) => {
      state.deliverModal = !state.deliverModal;
    },
    refetchableToggle: (state) => {
      state.refetchable = !state.refetchable;
    },
    currentService: (state, action: PayloadAction<ServiceModele>) => {
      state.service = action.payload;
    },
  },
});

export const {
  followModalToggle,
  editModalToggle,
  showModalToggle,
  deliverModalToggle,
  refetchableToggle,
  currentService,
} = follow.actions;

export default follow.reducer;
