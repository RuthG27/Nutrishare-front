export type Nutrition = {
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  fiber_g: number;
  sugar_g: number;
  sodium_mg: number;
};

export type Recipe = {
  id: string;
  title: string;
  subtitle: string;
  servings: number;
  prepMinutes: number;
  cookMinutes: number;
  ingredients: string[];
  steps: string[];
  nutritionPerServing: Nutrition;
  images: {
    coverUrl: string; // portada
    dishUrl: string; // plato final
  };
};

export const MOCK_RECIPE: Recipe = {
  id: 'receta-001',
  title: 'Bowl proteico de pollo y quinoa',
  subtitle: 'Rápida, saciante y perfecta para meal prep',
  servings: 2,
  prepMinutes: 10,
  cookMinutes: 15,
  ingredients: [
    '150 g de pechuga de pollo',
    '120 g de quinoa cocida',
    '1/2 aguacate',
    '1 tomate mediano',
    '1/2 pepino',
    '1 cda de aceite de oliva virgen extra',
    'Zumo de 1/2 limón',
    'Sal, pimienta y pimentón al gusto',
  ],
  steps: [
    'Cocina la quinoa (si no la tienes lista) y deja templar.',
    'Corta el pollo en tiras, salpimienta y dóralo en sartén con un chorrito de aceite.',
    'Pica tomate y pepino; corta el aguacate en láminas.',
    'Monta el bowl: base de quinoa, añade pollo y verduras.',
    'Aliña con aceite + limón + especias y sirve.',
  ],
  nutritionPerServing: {
    calories: 540,
    protein_g: 42,
    carbs_g: 44,
    fat_g: 22,
    fiber_g: 10,
    sugar_g: 6,
    sodium_mg: 620,
  },
  // Usando URLs de imágenes que permiten CORS
  images: {
    coverUrl: 'https://picsum.photos/seed/recipe-cover/400/300.jpg',
    dishUrl: 'https://picsum.photos/seed/recipe-dish/400/300.jpg',
  },
};
