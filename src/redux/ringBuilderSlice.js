import { createSlice } from "@reduxjs/toolkit";

const load = (key, fallback = null) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const persist = (key, value) => {
  try {
    if (value === null || value === undefined) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
  } catch {}
};

const initialState = {
  currentStep: 1,
  selectedSetting: load("selectedSetting", null),
  selectedStone: load("selectedStone", null),
  mode: load("rb_mode", null),
  ui: {
    choiceModalOpen: false,
  },
};

const slice = createSlice({
  name: "ringBuilder",
  initialState,
  reducers: {
    setCurrentStep(state, action) {
      state.currentStep = action.payload;
    },
    setMode(state, action) {
      state.mode = action.payload;
      persist("rb_mode", state.mode);
    },
    clearMode(state) {
      state.mode = null;
      persist("rb_mode", null);
    },
    setSelectedSetting(state, action) {
      state.selectedSetting = action.payload;
      persist("selectedSetting", state.selectedSetting);

      state.selectedStone = null;
      persist("selectedStone", null);
      state.mode = null;
      persist("rb_mode", null);
      state.currentStep = 2;
    },
    clearSelectedSetting(state) {
      state.selectedSetting = null;
      persist("selectedSetting", null);

      state.selectedStone = null;
      persist("selectedStone", null);
      state.mode = null;
      persist("rb_mode", null);
      state.currentStep = 1;
    },
    setSelectedStone(state, action) {
      state.selectedStone = action.payload;
      persist("selectedStone", state.selectedStone);
      state.currentStep = 4;
    },
    clearSelectedStone(state) {
      state.selectedStone = null;
      persist("selectedStone", null);
      state.currentStep = 3;
    },
    openChoiceModal(state) {
      state.ui.choiceModalOpen = true;
    },
    closeChoiceModal(state) {
      state.ui.choiceModalOpen = false;
    },

    hydrateFromStorage(state) {
      state.selectedSetting = load("selectedSetting", null);
      state.selectedStone = load("selectedStone", null);
      state.mode = load("rb_mode", null);

      if (!state.selectedSetting) state.currentStep = 1;
      else if (state.selectedSetting && !state.selectedStone)
        state.currentStep = 2;
      else if (state.selectedSetting && state.selectedStone)
        state.currentStep = 4;
    },
  },
});

export const {
  setCurrentStep,
  setMode,
  clearMode,
  setSelectedSetting,
  clearSelectedSetting,
  setSelectedStone,
  clearSelectedStone,
  openChoiceModal,
  closeChoiceModal,
  hydrateFromStorage,
} = slice.actions;

export default slice.reducer;
