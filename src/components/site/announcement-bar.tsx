import { PREORDER } from "@/lib/products";
import { hasDecor } from "@/lib/occasion";
import { Starburst } from "@/components/site/decor/starburst";

/** Thin top bar advertising the pre-order window. */
export function AnnouncementBar() {
  const stars = hasDecor("starbursts");
  const star = stars && <Starburst size={12} className="hidden text-bar-accent sm:mx-1.5 sm:block" />;

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-1 bg-bar px-4 py-2 text-center text-sm font-semibold leading-[1.45] text-bar-fg">
      {star}
      <span>{PREORDER.season} pre-orders are open.</span>
      {/* Short on phones so the bar stays one line and the hero photo keeps that height (DESIGN.md "Hero"). */}
      <span className="hidden font-medium text-bar-accent sm:inline">
        Orders ship from {PREORDER.shipsFrom}.
      </span>
      <span className="font-medium text-bar-accent sm:hidden">
        Ships from {PREORDER.shipsFromShort}.
      </span>
      {star}
    </div>
  );
}
