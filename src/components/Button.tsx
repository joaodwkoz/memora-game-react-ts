interface ButtonProps {
    size?: string | null,
    variant?: string | null,
    className?: string | null,
    children?: React.ReactNode,
}

export function Button({ size = 'md', variant = 'primary', className, children }: ButtonProps) {
    let sizeClasses;

    switch (size) {
        case 'custom':
            sizeClasses = ''; // Precisa ser implementado.
            break;
        case 'sm':
            sizeClasses = 'py-0.5 px-1.5 rounded-sm';
            break;
        case 'md':
            sizeClasses = 'py-1.5 px-2.5 rounded-md';
            break;
        case 'lg': 
            sizeClasses = 'py-2.5 px-3.5 rounded-lg';
            break;
        case 'xl':
            sizeClasses = 'py-3.5 px-4.5 rounded-xl';
            break;
        default:
            sizeClasses = 'py-1.5 px-2.5 rounded-md';
            break;
    }

    let variantClasses;

    switch (variant) {
        case 'custom':
            variantClasses = '';
            break;
        case 'primary':
            variantClasses = 'bg-surface'
            break;
        case 'muted':
            variantClasses = 'bg-surface-interactive-muted hover:bg-surface-interactive'
            break;
        default:
            variantClasses = 'bg-surface'
            break;
    }

    const customClass = `cursor-pointer group ${sizeClasses} ${variantClasses} ${className}`

    return (
        <button className={customClass}>
            { children }
        </button>
    )
}