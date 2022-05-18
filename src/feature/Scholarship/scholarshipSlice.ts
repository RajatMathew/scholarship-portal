import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Initiator } from "../../api/Initiator";
import { Scholarship } from "../../api/Scholarship";
import type { RootState } from "../../store/store";

interface ScholarshipState {
  scholarshipDetails: Scholarship | null;
  initiatorDetails: Initiator[] | null;
}

const initialState: ScholarshipState = {
  scholarshipDetails: null,
  initiatorDetails: null,
};

export const scholarshipSlice = createSlice({
  name: "scholarship",
  initialState,
  reducers: {
    updateScholarshipDetails: (state, action: PayloadAction<Scholarship>) => {
      return { ...state, scholarshipDetails: action.payload };
    },
    updateInitiatorDetails: (state, action: PayloadAction<Initiator[]>) => {
      return { ...state, initiatorDetails: [...action.payload] };
    },
  },
});

export const { updateScholarshipDetails, updateInitiatorDetails } =
  scholarshipSlice.actions;
export const selectScholarship = (state: RootState) =>
  state.scholarship.scholarshipDetails;
export const selectInitiator = (state: RootState) =>
  state.scholarship.initiatorDetails;

export default scholarshipSlice.reducer;
