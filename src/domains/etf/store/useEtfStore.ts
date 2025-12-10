import { create } from "zustand";
import type { Etf } from "../types";

interface EtfStore {
  etfs: Etf[];
  addEtf: (etf: Omit<Etf, "id">) => void;
  updateEtf: (id: string, etf: Partial<Etf>) => void;
  removeEtf: (id: string) => void;
}

export const useEtfStore = create<EtfStore>((set) => ({
  etfs: [],
  addEtf: (etf) =>
    set((state) => ({
      etfs: [...state.etfs, { ...etf, id: Date.now().toString() }],
    })),
  updateEtf: (id, updatedEtf) =>
    set((state) => ({
      etfs: state.etfs.map((etf) =>
        etf.id === id ? { ...etf, ...updatedEtf } : etf
      ),
    })),
  removeEtf: (id) =>
    set((state) => ({
      etfs: state.etfs.filter((etf) => etf.id !== id),
    })),
}));
