import MenuBlock from "../components/menu-block";
import PageHero from "../components/page-hero";
import {
  MODIFIERS,
  SOFT_SERVE_SCOOPS,
  itemsByCategory,
  type MenuItem as MenuItemData,
  type Modifier,
} from "../data/menu";

/** Category header images. Per-item photography is not shot yet. */
const CATEGORY_IMAGES = {
  drinks: "/images/menu-drinks.png",
  desserts: "/images/menu-desserts.png",
  softServe: "/images/menu-soft-serve.png",
} as const;

function formatPrice(price: number) {
  return `$${Number.isInteger(price) ? price : price.toFixed(2)}`;
}

function formatModifierPrice(price: number) {
  return `+${formatPrice(price)}`;
}

export default function MenuPage() {
  const drinks = itemsByCategory("drinks");
  const desserts = itemsByCategory("desserts");
  const softServe = itemsByCategory("soft-serve");

  const drinkAddOns = MODIFIERS.filter((modifier) =>
    modifier.appliesTo.includes("drinks"),
  );
  const softServeToppings = MODIFIERS.filter((modifier) =>
    modifier.appliesTo.includes("soft-serve"),
  );

  return (
    <main className="text-[#F7F3ED]">
      <PageHero title="Our Menu" />

      <section className="page-shell space-y-24 py-24">
        <MenuBlock
          image={CATEGORY_IMAGES.drinks}
          alt="Whisked matcha in a sakura-stamped ceramic bowl beside a bamboo whisk"
          imageSide="left"
        >
          <h2 className="mb-8 text-4xl font-serif">Signature Drinks</h2>

          {drinks.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}

          <hr className="my-8 border-[#1F1814]/40" />

          <h3 className="mb-6 text-2xl font-serif">Drink Add-ons</h3>

          {drinkAddOns.map((modifier) => (
            <ModifierRow key={modifier.id} modifier={modifier} />
          ))}
        </MenuBlock>

        <MenuBlock
          image={CATEGORY_IMAGES.desserts}
          alt="Matcha mille crepe slice and a pink sakura nerikiri on a ceramic plate"
          imageSide="right"
        >
          <h2 className="mb-8 text-4xl font-serif">Bloom Desserts</h2>

          {desserts.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </MenuBlock>

        <MenuBlock
          image={CATEGORY_IMAGES.softServe}
          alt="Sakura, matcha, and ube scoops in a ceramic bowl"
          imageSide="left"
        >
          <h2 className="mb-8 text-4xl font-serif">Bloom Soft Serve</h2>

          <p className="mb-2">Choose Your Scoops</p>
          {SOFT_SERVE_SCOOPS.map(({ scoops, price }) => (
            <SmallItem
              key={scoops}
              name={scoops === 1 ? "1 Scoop" : `${scoops} Scoops`}
              price={formatPrice(price)}
            />
          ))}

          <div className="mt-6">
            <p>Flavors</p>
            <ul className="ml-6 list-disc font-semibold">
              {softServe.map((item) => (
                <li key={item.id}>{item.name.replace(" Soft Serve", "")}</li>
              ))}
            </ul>
          </div>

          <hr className="my-8 border-[#1F1814]/40" />

          <h3 className="mb-6 text-2xl font-serif">Soft Serve Toppings</h3>

          {softServeToppings.map((modifier) => (
            <ModifierRow key={modifier.id} modifier={modifier} />
          ))}
        </MenuBlock>
      </section>
    </main>
  );
}

function MenuItem({ item }: { item: MenuItemData }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between gap-8 font-bold">
        <h3>{item.name}</h3>
        <span>{formatPrice(item.price)}</span>
      </div>
      <p className="leading-relaxed">{item.description}</p>
    </div>
  );
}

function ModifierRow({ modifier }: { modifier: Modifier }) {
  return (
    <div className="mb-3 flex justify-between gap-8 font-bold">
      <span>{modifier.name}</span>
      <span>{formatModifierPrice(modifier.price)}</span>
    </div>
  );
}

function SmallItem({ name, price }: { name: string; price: string }) {
  return (
    <div className="mb-3 flex justify-between gap-8 font-bold">
      <span>{name}</span>
      <span>{price}</span>
    </div>
  );
}
