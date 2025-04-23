import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

const actionIconVariants = cva(
  // Base styles that apply to all variants
  'flex items-center justify-center rounded-md transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-[#003399] hover:bg-[#003399] text-white',
        subtle: ' hover:bg-[#003399]/30 text-[#003399]',
        outline: 'border-2 border-primary text-primary hover:bg-primary-50',
        transparent: 'bg-transparent hover:bg-gray-100 text-gray-700',
        danger: 'bg-red-600 hover:bg-red-700 text-white',
        ghost: 'hover:bg-[#003399]/30 text-[#003399]',
      },
      size: {
        sm: 'p-1',
        md: 'p-2',
        lg: 'p-3',
      },
      isDisabled: {
        true: 'opacity-50 cursor-not-allowed pointer-events-none',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      isDisabled: false,
    },
  }
)

type ActionIconProps = {
  icon: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> &
  VariantProps<typeof actionIconVariants> & {
    disabled?: boolean;
  };

const ActionIcon: React.FC<ActionIconProps> = ({
  icon,
  variant,
  size,
  disabled,
  className,
  ...props
}) => {
  return (
    <button
      className={actionIconVariants({
        variant,
        size,
        isDisabled: disabled,
        className
      })}
      disabled={disabled}
      {...props}
    >
      {icon}
    </button>
  )
}

export default ActionIcon
