import { create } from "zustand";
import type { Sale } from "../types";

interface SaleStore {
  sales: Sale[];
  addSale: (sale: Omit<Sale, "id">) => void;
  updateSale: (id: string, sale: Partial<Sale>) => void;
  removeSale: (id: string) => void;
  getSalesByEtfId: (etfId: string) => Sale[];
}

export const useSaleStore = create<SaleStore>((set, get) => ({
  sales: [],
  addSale: (sale) =>
    set((state) => ({
      sales: [...state.sales, { ...sale, id: Date.now().toString() }],
    })),
  updateSale: (id, updatedSale) =>
    set((state) => ({
      sales: state.sales.map((sale) =>
        sale.id === id ? { ...sale, ...updatedSale } : sale
      ),
    })),
  removeSale: (id) =>
    set((state) => ({
      sales: state.sales.filter((sale) => sale.id !== id),
    })),
  getSalesByEtfId: (etfId) => {
    return get().sales.filter((sale) => sale.etfId === etfId);
  },
}));
