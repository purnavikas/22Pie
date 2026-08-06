import Image from 'next/image';

export function Logo() {
  return (
    <span className="relative inline-flex h-12 w-36 items-center">
      <Image
        alt="22Pi.com"
        className="object-contain"
        fill
        priority
        sizes="144px"
        src="/images/logo-22pi.png"
      />
    </span>
  );
}
