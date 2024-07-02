import Image from "next/image";

export default function CircularImage() {
  return (
    <Image
      style={{
        borderRadius: "50%",
      }}
      src="/assets/images/users/medium.png"
      alt="username"
      height={32}
      width={32}
    />
  );
}
