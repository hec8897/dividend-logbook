import { create } from "zustand";
import type { PortfolioSummary } from "../types";

interface PortfolioStore {
  summary: PortfolioSummary | null;
  updateSummary: (summary: PortfolioSummary) => void;
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  summary: null,
  updateSummary: (summary) => set({ summary }),
}));
