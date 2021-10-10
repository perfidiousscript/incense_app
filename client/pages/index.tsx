import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Incense Hermitage</title>
      </Head>
      <div className={styles.landingPage}>
        <div className={styles.landingPagecontentContainer}>
          <div>
            <Image src="/images/incense_kanji.png" width={650} height={150} />
          </div>
          <div className={styles.landingText}>
            <p>
              Welcome to the Incense Hermitage, a place to explore, rate and
              review incense from around the world. Incense Hermitage currently
              lists X,000 different Incense from X00 Brands.
            </p>
            <p>
              Don't have an account? <Link href="/sign-up">Sign Up Here!</Link>
            </p>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Home;
