import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useFBX } from "@react-three/drei";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
