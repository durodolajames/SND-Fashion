import { getDb } from "../api/queries/connection";
import { categories, products } from "./schema";

async function seed() {
  const db = getDb();
  console.log("Seeding database...");

  // ── Categories ────────────────────────────────────────────────
  const parentCats = [
    { name: "Women", slug: "women", description: "Elegant African fashion for women", sortOrder: 1 },
    { name: "Men", slug: "men", description: "Bold African fashion for men", sortOrder: 2 },
    { name: "New Arrivals", slug: "new-arrivals", description: "Fresh drops just in", sortOrder: 3 },
    { name: "Fabrics", slug: "fabrics", description: "Premium Ankara and Adire fabrics", sortOrder: 4 },
  ];

  for (const cat of parentCats) {
    await db.insert(categories).values(cat);
  }

  const womenCat = await db.query.categories.findFirst({ where: (c, { eq }) => eq(c.slug, "women") });
  const menCat = await db.query.categories.findFirst({ where: (c, { eq }) => eq(c.slug, "men") });

  const childCats = [
    { name: "Dresses", slug: "dresses", description: "Stunning African print dresses", parentId: womenCat!.id, sortOrder: 5 },
    { name: "Two-Piece Sets", slug: "two-piece-sets", description: "Coordinated sets for effortless style", parentId: womenCat!.id, sortOrder: 6 },
    { name: "Agbada & Kaftan", slug: "agbada-kaftan", description: "Traditional and modern flowing robes", parentId: menCat!.id, sortOrder: 7 },
    { name: "Shirts & Jackets", slug: "shirts-jackets", description: "Tailored African print shirts and jackets", parentId: menCat!.id, sortOrder: 8 },
  ];

  for (const cat of childCats) {
    await db.insert(categories).values(cat);
  }

  console.log("Inserted categories:", parentCats.length + childCats.length);

  const allCats = await db.query.categories.findMany();
  const catMap = new Map(allCats.map(c => [c.slug, c.id]));

  // ── Products ──────────────────────────────────────────────────
  const prods: typeof products.$inferInsert[] = [
    {
      name: "Adunni Ankara Midi Dress",
      slug: "adunni-ankara-midi-dress",
      description: "Bold prints meet effortless elegance in this midi-length Ankara dress. Features a fitted bodice with a flowing skirt, perfect for both daytime events and evening gatherings. The vibrant geometric patterns are carefully sourced from premium Nigerian textile mills.",
      shortDescription: "Bold prints. Effortless elegance.",
      price: "45000.00",
      images: ["/images/products/adunni-dress.jpg"],
      categoryId: catMap.get("dresses")!,
      inventory: 25,
      rating: "4.8",
      reviewCount: 124,
      isFeatured: "yes",
      isNew: "no",
      sizes: ["XS", "S", "M", "L", "XL"],
      tags: ["dress", "ankara", "women", "midi"],
    },
    {
      name: "Oba Classic Agbada",
      slug: "oba-classic-agbada",
      description: "Tradition tailored to perfection. This three-piece Agbada set includes the flowing outer robe, matching inner shirt, and trousers. Hand-embroidered details on the chest and sleeves showcase master craftsmanship. Made from premium cotton with silk thread embroidery.",
      shortDescription: "Tradition, tailored to perfection.",
      price: "85000.00",
      images: ["/images/products/oba-agbada.jpg"],
      categoryId: catMap.get("agbada-kaftan")!,
      inventory: 12,
      rating: "4.9",
      reviewCount: 87,
      isFeatured: "yes",
      isNew: "no",
      sizes: ["M", "L", "XL", "XXL"],
      tags: ["agbada", "men", "traditional", "embroidered"],
    },
    {
      name: "Zuri Two-Piece Set",
      slug: "zuri-two-piece-set",
      description: "Modern cut meets timeless print. This coordinated two-piece set features a crop top with matching high-waisted trousers. The Ankara fabric features a stunning blend of coral, gold, and navy patterns that flatter every skin tone.",
      shortDescription: "Modern cut. Timeless print.",
      price: "52000.00",
      images: ["/images/products/zuri-set.jpg"],
      categoryId: catMap.get("two-piece-sets")!,
      inventory: 30,
      rating: "4.5",
      reviewCount: 200,
      isFeatured: "yes",
      isNew: "no",
      sizes: ["S", "M", "L", "XL"],
      tags: ["two-piece", "women", "coord-set", "modern"],
    },
    {
      name: "Zara Ankara Jumpsuit",
      slug: "zara-ankara-jumpsuit",
      description: "Power, tailored beautifully. This statement jumpsuit features a wide-leg silhouette with a fitted waist and V-neckline. The striking monochrome Ankara print makes it versatile for both office and social settings.",
      shortDescription: "Power, tailored beautifully.",
      price: "49500.00",
      images: ["/images/products/zara-jumpsuit.jpg"],
      categoryId: catMap.get("dresses")!,
      inventory: 18,
      rating: "4.9",
      reviewCount: 78,
      isFeatured: "yes",
      isNew: "yes",
      sizes: ["S", "M", "L", "XL"],
      tags: ["jumpsuit", "women", "ankara", "power-dressing"],
    },
    {
      name: "Ife Two-Piece Ensemble",
      slug: "ife-two-piece-ensemble",
      description: "Confidence, coordinated. A sophisticated blouse and wrapper set featuring hand-woven Aso-Oke fabric with modern geometric patterns. The structured peplum top pairs perfectly with the draped wrapper skirt for a look that commands attention.",
      shortDescription: "Confidence, coordinated.",
      price: "62000.00",
      images: ["/images/products/ife-ensemble.jpg"],
      categoryId: catMap.get("two-piece-sets")!,
      inventory: 15,
      rating: "4.8",
      reviewCount: 189,
      isFeatured: "yes",
      isNew: "no",
      sizes: ["S", "M", "L", "XL"],
      tags: ["two-piece", "women", "aso-oke", "elegant"],
    },
    {
      name: "Emeka Senator Wear",
      slug: "emeka-senator-wear",
      description: "Clean lines, distinguished presence. This modern senator-style outfit features a sleek, collarless top with matching trousers. Minimalist embroidery along the placket adds subtle detail to the premium cotton fabric.",
      shortDescription: "Clean lines. Distinguished presence.",
      price: "58000.00",
      images: ["/images/products/emeka-senator.jpg"],
      categoryId: catMap.get("agbada-kaftan")!,
      inventory: 20,
      rating: "4.7",
      reviewCount: 95,
      isFeatured: "yes",
      isNew: "yes",
      sizes: ["M", "L", "XL", "XXL"],
      tags: ["senator", "men", "minimalist", "modern"],
    },
    {
      name: "Ngozi Maxi Gown",
      slug: "ngozi-maxi-gown",
      description: "Grace in every step. This floor-length maxi gown features a sweetheart neckline and flowing A-line skirt. The rich burgundy and gold Ankara print creates a regal silhouette perfect for weddings and special occasions.",
      shortDescription: "Grace in every step.",
      price: "55000.00",
      images: ["/images/products/ngozi-maxi.jpg"],
      categoryId: catMap.get("dresses")!,
      inventory: 22,
      rating: "4.6",
      reviewCount: 156,
      isFeatured: "no",
      isNew: "yes",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      tags: ["maxi", "women", "gown", "wedding"],
    },
    {
      name: "Tunde Dashiki Shirt",
      slug: "tunde-dashiki-shirt",
      description: "Heritage reimagined. This contemporary dashiki shirt features intricate embroidery along the neckline and chest pocket. The relaxed fit and breathable cotton make it perfect for both casual and semi-formal occasions.",
      shortDescription: "Heritage reimagined.",
      price: "32000.00",
      images: ["/images/products/tunde-dashiki.jpg"],
      categoryId: catMap.get("shirts-jackets")!,
      inventory: 35,
      rating: "4.4",
      reviewCount: 112,
      isFeatured: "no",
      isNew: "no",
      sizes: ["S", "M", "L", "XL", "XXL"],
      tags: ["dashiki", "men", "shirt", "embroidered"],
    },
    {
      name: "Amina Wrap Dress",
      slug: "amina-wrap-dress",
      description: "Versatility meets tradition. This wrap-style dress flatters every figure with its adjustable tie waist and flutter sleeves. The teal and orange Ankara print transitions effortlessly from day to night.",
      shortDescription: "Versatility meets tradition.",
      price: "42000.00",
      images: ["/images/products/amina-wrap.jpg"],
      categoryId: catMap.get("dresses")!,
      inventory: 28,
      rating: "4.7",
      reviewCount: 143,
      isFeatured: "no",
      isNew: "yes",
      sizes: ["XS", "S", "M", "L", "XL"],
      tags: ["wrap-dress", "women", "versatile", "floral"],
    },
    {
      name: "Chidi Ankara Blazer",
      slug: "chidi-ankara-blazer",
      description: "Sharp style, African soul. This tailored blazer combines Western silhouette with vibrant Ankara fabric. The structured shoulders and slim fit create a commanding presence, while the bold print tells a cultural story.",
      shortDescription: "Sharp style, African soul.",
      price: "48000.00",
      images: ["/images/products/chidi-blazer.jpg"],
      categoryId: catMap.get("shirts-jackets")!,
      inventory: 16,
      rating: "4.5",
      reviewCount: 67,
      isFeatured: "no",
      isNew: "yes",
      sizes: ["S", "M", "L", "XL"],
      tags: ["blazer", "men", "ankara", "tailored"],
    },
    {
      name: "Yemi Palazzo Set",
      slug: "yemi-palazzo-set",
      description: "Comfort elevated. This breezy palazzo pant set features a loose-fitting top with wide-leg trousers in a calming blue and white adire pattern. Perfect for resort wear, brunches, and art gallery openings.",
      shortDescription: "Comfort elevated.",
      price: "47000.00",
      images: ["/images/products/yemi-palazzo.jpg"],
      categoryId: catMap.get("two-piece-sets")!,
      inventory: 24,
      rating: "4.6",
      reviewCount: 88,
      isFeatured: "no",
      isNew: "no",
      sizes: ["S", "M", "L", "XL"],
      tags: ["palazzo", "women", "adire", "resort-wear"],
    },
    {
      name: "Premium Ankara Fabric - 6 Yards",
      slug: "premium-ankara-fabric-6yards",
      description: "The foundation of African fashion. This 6-yard length of premium Ankara wax print fabric features vibrant, colorfast patterns on 100% cotton. Perfect for custom tailoring your own unique piece.",
      shortDescription: "The foundation of African fashion.",
      price: "15000.00",
      images: ["/images/products/ankara-fabric.jpg"],
      categoryId: catMap.get("fabrics")!,
      inventory: 100,
      rating: "4.8",
      reviewCount: 245,
      isFeatured: "no",
      isNew: "no",
      sizes: ["One Size"],
      tags: ["fabric", "ankara", "cotton", "diy"],
    },
  ];

  for (const p of prods) {
    await db.insert(products).values(p);
  }
  console.log("Inserted products:", prods.length);

  console.log("Seed complete!");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
