import { z } from 'zod';

type Team = {
  nome: string;
  sigla: string;
  ataque: number;
  defesa: number;
};

const teamInputSchema = z.object({
  nome: z.string().min(1, "nome é obrigatório e deve ser uma string não vazia"),
  sigla: z.string().regex(/^[A-Z]{2,3}$/, "Sigla é obrigatória e deve ter 2-3 letras maiúsculas (ex: BRA)"),
  ataque: z.number().positive("Ataque é obrigatório e deve ser um número positivo"),
  defesa: z.number().positive("Defesa é obrigatória e deve ser um número positivo"),
});

export { Team, teamInputSchema };