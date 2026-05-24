import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
		keywords: z
			.union([
				z.array(z.string()),
				z.string().transform((s) => (s.trim() ? [s.trim()] : [])),
			])
			.optional()
			.default([]),
		layout: z.string().optional(),
	}),
});

export const collections = { blog };
