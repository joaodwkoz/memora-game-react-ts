import { forwardRef, type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size?: string | null,
    variant?: string | null,
    children?: React.ReactNode,
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        { 
            size = 'md', 
            variant = 'primary', 
            className, 
            children, 
            ...props 
        }, 
        ref
    ) => {
        let sizeClasses;

        switch (size) {
            case 'custom':
                sizeClasses = '';
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
            case 'interactive':
                variantClasses = 'bg-surface-interactive'
                break;
            default:
                variantClasses = 'bg-surface'
                break;
        }

        const customClass = `cursor-pointer group ${sizeClasses} ${variantClasses} ${className || ''}`

        return (
            <button 
                ref={ref}
                className={customClass}
                {...props}
            >
                { children }
            </button>
        )
    }
);