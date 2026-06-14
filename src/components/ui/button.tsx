import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center gap-2 rounded-full border font-sans font-bold whitespace-nowrap leading-none transition-[transform,background,box-shadow,filter,color] duration-150 ease-[var(--ease-gentle)] outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px disabled:pointer-events-none disabled:opacity-45 disabled:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[1.1em]",
  {
    variants: {
      variant: {
        primary:
          "border-transparent bg-primary text-cream-100 shadow-xs hover:brightness-95 hover:shadow-sm",
        cta: "border-transparent bg-[var(--red-500)] text-cream-100 shadow-xs hover:brightness-95 hover:shadow-sm",
        gold: "border-transparent bg-gold-500 text-ink-900 shadow-xs hover:brightness-95 hover:shadow-sm",
        secondary:
          "border-[var(--border-strong)] bg-transparent text-blue-700 hover:bg-cream-200",
        ghost:
          "border-transparent bg-transparent text-foreground hover:bg-cream-300",
        outline:
          "border-[var(--border-strong)] bg-card text-foreground hover:bg-cream-200",
      },
      size: {
        sm: "px-4 py-2 text-[13px]",
        md: "px-[22px] py-[11px] text-sm",
        lg: "px-[30px] py-[15px] text-base",
        icon: "size-[42px] p-0",
        "icon-sm": "size-8 p-0",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
)

function Button({
  className,
  variant,
  size,
  fullWidth,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, fullWidth, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
