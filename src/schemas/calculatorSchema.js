import { z } from 'zod';
import i18n from '../i18n/index.js';

const t = i18n.t;

export const calculatorSchema = z.object({
  // Campos opcionais conforme solicitado
  weight: z.string().optional(),
  height: z.string().optional(),
  age: z.string().optional(),
  gender: z.string().optional(),
  
  // Método de cálculo e campos relacionados
  calculationMethod: z.enum(['harris-benedict', 'pocket-formula']),
  kcalPerKg: z.string().optional(),
  
  // Campos obrigatórios
  product: z.string().min(1, () => t('nenpt.validation.selectProduct')),
  volume: z.string().min(1, () => t('nenpt.validation.volumeRequired')),
  
  // Campos opcionais
  infusionTime: z.string().optional(),
  proteinModule: z.string().optional(),
  otherModule: z.string().optional(),
}).superRefine((data, ctx) => {
  // Validação condicional para kcalPerKg
  if (data.calculationMethod === 'pocket-formula' && !data.kcalPerKg) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: t('nenpt.validation.kcalKgRequired'),
      path: ['kcalPerKg']
    });
  }
});