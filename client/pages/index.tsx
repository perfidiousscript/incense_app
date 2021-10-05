import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Incense Hermitage</title>
      </Head>
      <div>
        <a href="https://fontmeme.com/japanese/">
          <img
            src="https://fontmeme.com/permalink/211003/2729eb11a2152ed2ad1241437cb12e3c.png"
            alt="japanese"
            border="0"
          />
        </a>
      </div>
      <div>
        Welcome to the Incense Hermitage, a place to explore, rate and review
        incense from around the world.
        <br />
        Incense Hermitage currently lists X,000 different Incense from X00
        Brands
      </div>
    </div>
  );
};

export default Home;
