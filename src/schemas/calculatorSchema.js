import { z } from 'zod';

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
  product: z.string().min(1, "Selecione um produto"),
  volume: z.string().min(1, "Volume é obrigatório"),
  
  // Campos opcionais
  infusionTime: z.string().optional(),
  proteinModule: z.string().optional(),
  otherModule: z.string().optional(),
}).superRefine((data, ctx) => {
  // Validação condicional para kcalPerKg
  if (data.calculationMethod === 'pocket-formula' && !data.kcalPerKg) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Valor de kcal/kg é obrigatório para o método de fórmula de bolso",
      path: ['kcalPerKg']
    });
  }
});