import MenuBlock from "../components/menu-block";
import PageHero from "../components/page-hero";

const BLOCK_STAGGER_MS = 160;

export default function MenuPage() {
  return (
    <main className="text-[#F7F3ED]">
      <PageHero title="Our Menu" />

      <section className="page-shell space-y-24 py-24">
        <MenuBlock
          image="https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=1200&auto=format&fit=crop"
          alt="Matcha drink"
          imageSide="left"
          delay={0}
        >
          <h2 className="mb-8 text-4xl font-serif">Signature Drinks</h2>

          <MenuItem name="Sakura Bloom Latte" price="$7">
            Ceremonial-grade matcha blended with milk and topped with delicate
            sakura cream foam.
          </MenuItem>

          <MenuItem name="Strawberry Sakura Matcha" price="$8">
            Fresh strawberry puree layered with creamy matcha and cherry blossom
            cold foam.
          </MenuItem>

          <MenuItem name="Cloud Matcha" price="$7">
            Smooth matcha latte finished with soft vanilla cream cloud.
          </MenuItem>

          <MenuItem name="Hojicha Blossom Latte" price="$7">
            Roasted hojicha with floral cream and a subtle sakura sweetness.
          </MenuItem>

          <MenuItem name="Ube Bloom Fusion" price="$8">
            Creamy ube and premium matcha swirled together for a rich earthy
            flavor.
          </MenuItem>

          <hr className="my-8 border-[#1F1814]/40" />

          <h3 className="mb-6 text-2xl font-serif">Drink Add-ons</h3>

          <SmallItem name="Oat Milk" price="+$1" />
          <SmallItem name="Matcha Shot" price="+$1.5" />
          <SmallItem name="Sakura Cream Foam" price="+$1" />
        </MenuBlock>

        <MenuBlock
          image="https://images.unsplash.com/photo-1579888944880-d98341245702?q=80&w=1200&auto=format&fit=crop"
          alt="Sakura desserts"
          imageSide="right"
          delay={BLOCK_STAGGER_MS}
        >
          <h2 className="mb-8 text-4xl font-serif">Bloom Desserts</h2>

          <MenuItem name="Sakura Shortcake" price="$8">
            Light vanilla sponge layered with fresh strawberries and sakura
            cream.
          </MenuItem>

          <MenuItem name="Matcha Mille Crepe" price="$9">
            Delicate layers of crepes with rich ceremonial matcha cream.
          </MenuItem>

          <MenuItem name="Sakura Nerikiri" price="$7">
            Handcrafted Japanese wagashi shaped like blooming sakura flowers
            with delicate sweet bean filling.
          </MenuItem>

          <MenuItem name="Momo Nerikiri" price="$7">
            Elegant peach-shaped nerikiri served as a soft seasonal tea dessert
            with subtle floral sweetness.
          </MenuItem>
        </MenuBlock>

        <MenuBlock
          image="https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1200&auto=format&fit=crop"
          alt="Bloom soft serve"
          imageSide="left"
          delay={BLOCK_STAGGER_MS * 2}
        >
          <h2 className="mb-8 text-4xl font-serif">Bloom Soft Serve</h2>

          <p className="mb-2">Choose Your Scoops</p>
          <SmallItem name="1 Scoop" price="$5" />
          <SmallItem name="2 Scoops" price="$8" />
          <SmallItem name="3 Scoops" price="$11" />

          <div className="mt-6">
            <p>Flavors</p>
            <ul className="ml-6 list-disc font-semibold">
              <li>Sakura Matcha</li>
              <li>Hojicha</li>
              <li>Ube Blossom</li>
            </ul>
          </div>

          <hr className="my-8 border-[#1F1814]/40" />

          <h3 className="mb-6 text-2xl font-serif">Soft Serve Toppings</h3>

          <SmallItem name="Mochi Bites" price="+$1.5" />
          <SmallItem name="Strawberry Drizzle" price="+$1" />
        </MenuBlock>
      </section>
    </main>
  );
}

function MenuItem({
  name,
  price,
  children,
}: {
  name: string;
  price: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <div className="flex justify-between gap-8 font-bold">
        <h3>{name}</h3>
        <span>{price}</span>
      </div>
      <p className="leading-relaxed">{children}</p>
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
