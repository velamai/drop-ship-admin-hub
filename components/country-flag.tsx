import Image from "next/image";

interface CountryFlagProps {
  countryCode: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: { width: 16, height: 12 },
  md: { width: 20, height: 15 },
  lg: { width: 24, height: 18 },
};

export function CountryFlag({ countryCode, size = "md", className = "" }: CountryFlagProps) {
  const { width, height } = sizes[size];

  return (
    <div
      className={`relative inline-block overflow-hidden rounded-[1.5px] ${className}`}
      style={{ width, height }}
    >
      <Image
        src={`https://flagcdn.com/${countryCode.toLowerCase()}.svg`}
        alt={`${countryCode} flag`}
        width={width}
        height={height}
        className="h-full w-full object-cover"
        loading="lazy"
      />
    </div>
  );
}
