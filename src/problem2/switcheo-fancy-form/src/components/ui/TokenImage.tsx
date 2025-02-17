import Image, { ImageProps } from "next/image";

interface TokenImageProps extends Omit<ImageProps, "src" | "alt"> {
  token: string;
}

const TokenImage = ({ token, ...props }: TokenImageProps) => {
  const ICONS_URL =
    "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/";
  return (
    <Image
      {...props}
      src={`${ICONS_URL}${token}.svg`}
      alt={token}
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src = "/warning.svg";
      }}
    />
  );
};

export default TokenImage;
