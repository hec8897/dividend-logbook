import { create } from "zustand";
import type { Dividend } from "../types";

interface DividendStore {
  dividends: Dividend[];
  addDividend: (dividend: Omit<Dividend, "id">) => void;
  updateDividend: (id: string, dividend: Partial<Dividend>) => void;
  removeDividend: (id: string) => void;
  getDividendsByEtfId: (etfId: string) => Dividend[];
}

export const useDividendStore = create<DividendStore>((set, get) => ({
  dividends: [],
  addDividend: (dividend) =>
    set((state) => ({
      dividends: [
        ...state.dividends,
        { ...dividend, id: Date.now().toString() },
      ],
    })),
  updateDividend: (id, updatedDividend) =>
    set((state) => ({
      dividends: state.dividends.map((dividend) =>
        dividend.id === id ? { ...dividend, ...updatedDividend } : dividend
      ),
    })),
  removeDividend: (id) =>
    set((state) => ({
      dividends: state.dividends.filter((dividend) => dividend.id !== id),
    })),
  getDividendsByEtfId: (etfId) => {
    return get().dividends.filter((dividend) => dividend.etfId === etfId);
  },
}));
