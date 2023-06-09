import { useState } from "react";
import Head from "next/head";
import axios from "axios";

import Header from "../components/Header";
import Result from "../components/Result";
import Spinner from "../components/Spinner";
import Error from "../components/Error";

import styles from "../styles/Home.module.scss";

let theme;
if (typeof window !== "undefined") {
  const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
  theme = !darkThemeMq.matches;
}

const api = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const Home = ({ initialData }) => {
  //true for light and false for dark
  const [displayMode, setDisplayMode] = useState(theme);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("dictionary");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fonts, setFonts] = useState("serif");

  const handleSubmit = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const newData = await getData(query);
      setData(() => {
        setIsLoading(false);
        return newData;
      });
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>E-Dictionary - Free Online English Dictionary</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <div
        className={styles.wrapper}
        style={{
          backgroundColor: displayMode ? "#fff" : "#000",
          color: displayMode ? "#000" : "#fff",
          fontFamily: fonts,
        }}
      >
        <div className={styles.container}>
          <Header
            displayMode={displayMode}
            setDisplayMode={setDisplayMode}
            query={query}
            setQuery={setQuery}
            handleSubmit={handleSubmit}
            setFonts={setFonts}
          />

          {error ? (
            <Error error={error} />
          ) : isLoading ? (
            <div className={styles.loader}>
              <Spinner size={"3rem"} />
            </div>
          ) : (
            <main>
              {data.length
                ? data.map((word, index) => <Result key={index} data={word} />)
                : initialData.map((word, index) => (
                    <Result key={index} data={word} />
                  ))}
            </main>
          )}
        </div>
      </div>
    </>
  );
};

const getData = async (word) => {
  const result = await axios.get(api + word);
  return result.data;
};

export async function getStaticProps() {
  const data = await getData("dictionary");
  return { props: { initialData: data } };
}

export default Home;
