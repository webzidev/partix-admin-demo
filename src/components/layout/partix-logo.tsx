interface PartixLogoProps {
  className?: string
}

export function PartixLogo({ className = 'size-4' }: PartixLogoProps) {
  return (
    <img 
      src="/images/logo-icon.svg" 
      alt="Partix.ai Logo" 
      className={className}
    />
  )
}