import { z } from 'zod';
import i18n from '../i18n/index.js';

const t = i18n.t;

export const calculatorSchema = z
  .object({
    // Campos opcionais conforme solicitado
    weight: z.string().optional(),
    height: z.string().optional(),
    age: z.string().optional(),
    gender: z.string().optional(),

    // Método de cálculo e campos relacionados
    calculationMethod: z.enum(['harris-benedict', 'pocket-formula']),
    kcalPerKg: z.string().optional(),

    // Campos obrigatórios - Fórmula 1
    product: z.string().min(1, () => t('nenpt.validation.selectProduct')),
    volume: z.string().min(1, () => t('nenpt.validation.volumeRequired')),

    // Campos opcionais - Fórmula 2
    product2: z.string().optional(),
    volume2: z.string().optional(),

    // Campos opcionais
    infusionTime: z.string().optional(),
    proteinModule: z.string().optional(),
    otherModule: z.string().optional(),

    // Calorias não-nutricionais
    citrato: z.boolean().optional(),
    propofol_ml: z.string().optional(),
    sg5_ml: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Validação condicional para kcalPerKg
    if (data.calculationMethod === 'pocket-formula' && !data.kcalPerKg) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t('nenpt.validation.kcalKgRequired'),
        path: ['kcalPerKg'],
      });
    }

    // Validação: Se volume2 preenchido, product2 é obrigatório
    if (data.volume2 && !data.product2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t('nenpt.validation.product2RequiredIfVolume2'),
        path: ['product2'],
      });
    }

    // Validação: Se product2 preenchido, volume2 é obrigatório
    if (data.product2 && !data.volume2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t('nenpt.validation.volume2RequiredIfProduct2'),
        path: ['volume2'],
      });
    }

    // Validação: Valores não-negativos para propofol_ml
    if (data.propofol_ml && parseFloat(data.propofol_ml) < 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t('nenpt.validation.nonNegativeValue'),
        path: ['propofol_ml'],
      });
    }

    // Validação: Valores não-negativos para sg5_ml
    if (data.sg5_ml && parseFloat(data.sg5_ml) < 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t('nenpt.validation.nonNegativeValue'),
        path: ['sg5_ml'],
      });
    }
  });
