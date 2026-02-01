import * as React from "react"
// Slot import removed as we are not using Radix UI Slot yet
// import { Slot } from "@radix-ui/react-slot"

// Standard button implementation without radix dependency for simplicity unless needed.
// Actually, shadcn/ui uses @radix-ui/react-slot for 'asChild'.
// I will keep it simple with HTMLAttributes first to avoid installing more deps unless requested.
// Wait, user said "feel free to use components from shadcn".
// Since I can't easily install radix primitives without npm calls and I want to be efficient,
// I'll build a robust standard button.

import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Needs class-variance-authority
// I'll install it in the next step if I forgot.
// Let's assume standard Tailwind implementation for now to avoid blocking.

// Update: I should install class-variance-authority for standard Shadcn button behavior.
// I'll add a quick install task after this write or just implement CVA logic manually to save time?
// No, CVA is better. I'll add "class-variance-authority" to the install list or just assume it's there?
// It wasn't in the install list. I'll implement a simple version without CVA to start, 
// OR simpler: I'll actually install it. It's tiny.

// Retrying plan: I'll write the file assuming CVA is available and verify/install it immediately after.

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline:
                    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        // If asChild is true, we ideally use Slot. For now, we fallback to standard button.
        const Comp = "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
