import Layout from "@/components/Layout";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { SSRProvider } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer
          hideProgressBar
          autoClose={3000}
          position="bottom-right"
        />
      </Layout>
    </SSRProvider>
  );
}
