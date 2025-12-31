import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    as?: React.ElementType;
}

export function Container({ as: Component = "div", className, ...props }: ContainerProps) {
    return (
        <Component
            // @ts-ignore
            className={cn("container mx-auto px-4 sm:px-6 lg:px-8", className)}
            {...props}
        />
    );
}

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    as?: React.ElementType;
}

export function Section({ as: Component = "section", className, ...props }: SectionProps) {
    return (
        <Component
            // @ts-ignore
            className={cn("py-16 md:py-24", className)}
            {...props}
        />
    );
}

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    subtitle?: string;
    align?: "left" | "center";
}

export function SectionHeader({
    title,
    subtitle,
    align = "left",
    className,
    ...props
}: SectionHeaderProps) {
    return (
        <div
            className={cn(
                "mb-12 space-y-4",
                align === "center" ? "text-center" : "text-left",
                className
            )}
            {...props}
        >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {title}
            </h2>
            {subtitle && (
                <p className="max-w-2xl text-lg text-muted-foreground">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
