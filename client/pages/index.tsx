import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { useAuth } from "lib/auth";

const Home: NextPage = () => {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <Head>
        <title>Incense Hermitage</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
};

export default Home;
