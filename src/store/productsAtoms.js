import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const defaultProductsList = [
        { nome: "Cubison", kcal_ml: 1.00, cho_g_l: 130.0, lip_g_l: 33, ptn_g_l: 55.00, ep_ratio: 18.181818 },
        { nome: "Diason", kcal_ml: 1.00, cho_g_l: 110.0, lip_g_l: 42, ptn_g_l: 43.00, ep_ratio: 23.255814 },
        { nome: "Diason Energy HP", kcal_ml: 1.50, cho_g_l: 120.0, lip_g_l: 77, ptn_g_l: 77.00, ep_ratio: 19.480519 },
        { nome: "Diben", kcal_ml: 1.00, cho_g_l: 92.5, lip_g_l: 46, ptn_g_l: 46.00, ep_ratio: 21.739130 },
        { nome: "Diben 1,5", kcal_ml: 1.50, cho_g_l: 131.0, lip_g_l: 70, ptn_g_l: 75.00, ep_ratio: 20.000000 },
        { nome: "Fresubin 2 kcal", kcal_ml: 2.00, cho_g_l: 168.0, lip_g_l: 100, ptn_g_l: 100.00, ep_ratio: 20.000000 },
        { nome: "Fresubin Energy", kcal_ml: 1.50, cho_g_l: 188.0, lip_g_l: 58, ptn_g_l: 56.00, ep_ratio: 26.785714 },
        { nome: "Fresubin Energy Fibre", kcal_ml: 1.50, cho_g_l: 180.0, lip_g_l: 58, ptn_g_l: 56.00, ep_ratio: 26.785714 },
        { nome: "Fresubin Hepa", kcal_ml: 1.30, cho_g_l: 174.0, lip_g_l: 47, ptn_g_l: 40.00, ep_ratio: 32.500000 },
        { nome: "Fresubin HP Energy", kcal_ml: 1.50, cho_g_l: 170.0, lip_g_l: 58, ptn_g_l: 75.00, ep_ratio: 20.000000 },
        { nome: "Fresubin Lipid", kcal_ml: 1.50, cho_g_l: 118.0, lip_g_l: 67, ptn_g_l: 100.00, ep_ratio: 15.000000 },
        { nome: "Fresubin Original", kcal_ml: 1.00, cho_g_l: 138.0, lip_g_l: 34, ptn_g_l: 38.00, ep_ratio: 26.315789 },
        { nome: "Fresubin Original Fibre", kcal_ml: 1.00, cho_g_l: 130.0, lip_g_l: 34, ptn_g_l: 38.00, ep_ratio: 26.315789 },
        { nome: "Fresubin Soya Fibre", kcal_ml: 1.00, cho_g_l: 121.0, lip_g_l: 36, ptn_g_l: 38.00, ep_ratio: 26.315789 },
        { nome: "Glucerna 1,5", kcal_ml: 1.50, cho_g_l: 130.0, lip_g_l: 75, ptn_g_l: 75.00, ep_ratio: 20.000000 },
        { nome: "Glucerna RTH", kcal_ml: 1.00, cho_g_l: 81.0, lip_g_l: 54, ptn_g_l: 42.00, ep_ratio: 23.809524 },
        { nome: "Impact", kcal_ml: 1.00, cho_g_l: 130.0, lip_g_l: 28, ptn_g_l: 65.00, ep_ratio: 15.384615 },
        { nome: "Impact 1.5", kcal_ml: 1.50, cho_g_l: 139.0, lip_g_l: 63, ptn_g_l: 94.00, ep_ratio: 15.957447 },
        { nome: "Isosource 1,5", kcal_ml: 1.50, cho_g_l: 150.0, lip_g_l: 68, ptn_g_l: 63.00, ep_ratio: 23.809524 },
        { nome: "Isosource Fiber MIX", kcal_ml: 1.00, cho_g_l: 168.0, lip_g_l: 40, ptn_g_l: 42.00, ep_ratio: 23.809524 },
        { nome: "Jevity Hi Cal", kcal_ml: 1.50, cho_g_l: 203.0, lip_g_l: 48, ptn_g_l: 64.00, ep_ratio: 23.437500 },
        { nome: "Jevity Plus RTH", kcal_ml: 1.20, cho_g_l: 157.0, lip_g_l: 39, ptn_g_l: 55.00, ep_ratio: 21.818182 },
        { nome: "Novasource GC HP", kcal_ml: 1.00, cho_g_l: 105.0, lip_g_l: 40, ptn_g_l: 55.00, ep_ratio: 18.181818 },
        { nome: "Novasource GI Control", kcal_ml: 1.50, cho_g_l: 180.0, lip_g_l: 60, ptn_g_l: 60.00, ep_ratio: 25.000000 },
        { nome: "Novasource Renal", kcal_ml: 2.00, cho_g_l: 200.0, lip_g_l: 100, ptn_g_l: 75.00, ep_ratio: 26.666667 },
        { nome: "Novasource Senior", kcal_ml: 1.20, cho_g_l: 160.0, lip_g_l: 40, ptn_g_l: 53.00, ep_ratio: 22.641509 },
        { nome: "Novasource Standard", kcal_ml: 1.23, cho_g_l: 170.0, lip_g_l: 41, ptn_g_l: 44.00, ep_ratio: 27.954545 },
        { nome: "Nutri Diabetic", kcal_ml: 1.00, cho_g_l: 98.0, lip_g_l: 51, ptn_g_l: 39.00, ep_ratio: 25.641026 },
        { nome: "Nutri Enteral", kcal_ml: 1.20, cho_g_l: 174.0, lip_g_l: 33, ptn_g_l: 51.00, ep_ratio: 23.529412 },
        { nome: "Nutri Enteral 1.5", kcal_ml: 1.50, cho_g_l: 210.0, lip_g_l: 42, ptn_g_l: 64.00, ep_ratio: 23.437500 },
        { nome: "Nutri Enteral Soya", kcal_ml: 1.20, cho_g_l: 170.0, lip_g_l: 37, ptn_g_l: 48.00, ep_ratio: 25.000000 },
        { nome: "Nutri Enteral Soya Fiber", kcal_ml: 1.20, cho_g_l: 170.0, lip_g_l: 37, ptn_g_l: 48.00, ep_ratio: 25.000000 },
        { nome: "Nutri Fiber", kcal_ml: 1.20, cho_g_l: 170.0, lip_g_l: 33, ptn_g_l: 50.00, ep_ratio: 24.000000 },
        { nome: "Nutri Fiber 1.5", kcal_ml: 1.50, cho_g_l: 220.0, lip_g_l: 42, ptn_g_l: 62.00, ep_ratio: 24.193548 },
        { nome: "Nutri Liver", kcal_ml: 1.40, cho_g_l: 230.0, lip_g_l: 39, ptn_g_l: 38.00, ep_ratio: 36.842105 },
        { nome: "Nutri Renal", kcal_ml: 2.00, cho_g_l: 320.0, lip_g_l: 67, ptn_g_l: 33.00, ep_ratio: 60.606061 },
        { nome: "Nutri Renal D", kcal_ml: 2.00, cho_g_l: 280.0, lip_g_l: 66, ptn_g_l: 75.00, ep_ratio: 26.666667 },
        { nome: "Nutricomp Energy HN", kcal_ml: 1.50, cho_g_l: 190.0, lip_g_l: 50, ptn_g_l: 75.00, ep_ratio: 20.000000 },
        { nome: "Nutricomp Energy HN Fiber", kcal_ml: 1.50, cho_g_l: 190.0, lip_g_l: 50, ptn_g_l: 75.00, ep_ratio: 20.000000 },
        { nome: "Nutricomp Stand. Fiber", kcal_ml: 1.00, cho_g_l: 140.0, lip_g_l: 33, ptn_g_l: 38.00, ep_ratio: 26.315789 },
        { nome: "Nutricomp Standard", kcal_ml: 1.00, cho_g_l: 140.0, lip_g_l: 33, ptn_g_l: 38.00, ep_ratio: 26.315789 },
        { nome: "Nutriflex Lipid Plus", kcal_ml: 1.00, cho_g_l: 120.0, lip_g_l: 40, ptn_g_l: 48.00, ep_ratio: 20.833333 },
        { nome: "Nutriflex Lipid Special", kcal_ml: 1.18, cho_g_l: 144.0, lip_g_l: 40, ptn_g_l: 57.44, ep_ratio: 20.543175 },
        { nome: "NutriFlex Plus", kcal_ml: 0.79, cho_g_l: 150.0, lip_g_l: 40, ptn_g_l: 48.00, ep_ratio: 16.458333 },
        { nome: "Nutrison", kcal_ml: 1.00, cho_g_l: 120.0, lip_g_l: 39, ptn_g_l: 40.00, ep_ratio: 25.000000 },
        { nome: "Nutrison advanced Protison", kcal_ml: 1.28, cho_g_l: 160.0, lip_g_l: 38, ptn_g_l: 75.00, ep_ratio: 17.066667 },
        { nome: "Nutrison Energy", kcal_ml: 1.50, cho_g_l: 180.0, lip_g_l: 58, ptn_g_l: 60.00, ep_ratio: 25.000000 },
        { nome: "Nutrison Energy MF", kcal_ml: 1.50, cho_g_l: 180.0, lip_g_l: 58, ptn_g_l: 60.00, ep_ratio: 25.000000 },
        { nome: "Nutrison Multi Fiber", kcal_ml: 1.00, cho_g_l: 120.0, lip_g_l: 39, ptn_g_l: 40.00, ep_ratio: 25.000000 },
        { nome: "Nutrison Protein Plus Energy", kcal_ml: 1.50, cho_g_l: 170.0, lip_g_l: 58, ptn_g_l: 75.00, ep_ratio: 20.000000 },
        { nome: "Nutrison Protein Plus MF", kcal_ml: 1.25, cho_g_l: 140.0, lip_g_l: 49, ptn_g_l: 63.00, ep_ratio: 19.841270 },
        { nome: "Olimel N12", kcal_ml: 0.95, cho_g_l: 73.3, lip_g_l: 35, ptn_g_l: 76.00, ep_ratio: 12.500000 },
        { nome: "Olimel N7", kcal_ml: 1.14, cho_g_l: 140.0, lip_g_l: 40, ptn_g_l: 44.30, ep_ratio: 25.733634 },
        { nome: "Olimel N9", kcal_ml: 1.07, cho_g_l: 110.0, lip_g_l: 40, ptn_g_l: 54.00, ep_ratio: 19.814815 },
        { nome: "Osmolite HiCal", kcal_ml: 1.50, cho_g_l: 204.0, lip_g_l: 49, ptn_g_l: 63.00, ep_ratio: 23.809524 },
        { nome: "Osmolite HN", kcal_ml: 1.00, cho_g_l: 136.0, lip_g_l: 34, ptn_g_l: 40.00, ep_ratio: 25.000000 },
        { nome: "Osmolite plus HN", kcal_ml: 1.20, cho_g_l: 158.0, lip_g_l: 39, ptn_g_l: 56.00, ep_ratio: 21.428571 },
        { nome: "Peptamen HN", kcal_ml: 1.30, cho_g_l: 160.0, lip_g_l: 49, ptn_g_l: 66.00, ep_ratio: 19.696970 },
        { nome: "Peptamen 1,5", kcal_ml: 1.50, cho_g_l: 184.0, lip_g_l: 55, ptn_g_l: 68.00, ep_ratio: 22.058824 },
        { nome: "Peptamen AF", kcal_ml: 1.20, cho_g_l: 110.0, lip_g_l: 55, ptn_g_l: 76.00, ep_ratio: 15.789474 },
        { nome: "Peptamen Intense", kcal_ml: 1.00, cho_g_l: 72.0, lip_g_l: 38, ptn_g_l: 93.00, ep_ratio: 10.752688 },
        { nome: "Peptamen Prebio", kcal_ml: 1.10, cho_g_l: 140.0, lip_g_l: 40, ptn_g_l: 44.00, ep_ratio: 25.000000 },
        { nome: "Peptisorb", kcal_ml: 1.00, cho_g_l: 180.0, lip_g_l: 17, ptn_g_l: 40.00, ep_ratio: 25.000000 },
        { nome: "Perative", kcal_ml: 1.30, cho_g_l: 175.0, lip_g_l: 36, ptn_g_l: 65.00, ep_ratio: 20.000000 },
        { nome: "Reconvan", kcal_ml: 1.00, cho_g_l: 120.0, lip_g_l: 33, ptn_g_l: 55.00, ep_ratio: 18.181818 },
        { nome: "Survimed OPD", kcal_ml: 1.00, cho_g_l: 143.0, lip_g_l: 28, ptn_g_l: 45.00, ep_ratio: 22.222222 }
    ];

export const defaultProductsAtom = atom(defaultProductsList);

export const userProductsAtom = atomWithStorage('userProducts', []);

export const allProductsAtom = atom(
  (get) => {
    const defaultProducts = get(defaultProductsAtom);
    const userProducts = get(userProductsAtom);
    return [...defaultProducts, ...userProducts];
  }
);