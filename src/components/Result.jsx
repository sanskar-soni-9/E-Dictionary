import { useState, useEffect } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import Spinner from "./Spinner";

import styles from "../styles/Result.module.scss";

const Result = ({ data }) => {
  const [audio, setAudio] = useState(null);

  const audioURL = data?.phonetics.find(phonetic => phonetic.audio !== "")?.audio;

  useEffect(() => {
    const newAudio = new Audio(audioURL);
    newAudio.addEventListener("canplaythrough", function addAudio() {
      setAudio(newAudio);
      this.removeEventListener("canplaythrough", addAudio);
    })
    return (() => setAudio(null));
  }, [audioURL])

  return (
    <>
      <header className={styles.header}>
        <div>
          <h1>{data.word}</h1>
          <p>{data.phonetic ? data.phonetic : data?.phonetics.find(phonetic => phonetic.text && phonetic.text !== "")?.text}</p>
        </div>
        {audioURL ? (audio ? 
          <BsFillPlayFill className={styles.playBtn} size={"3rem"} onClick={() => audio.play()} /> : <Spinner size={"1.5rem"} className={styles.playSpinner} />) : ""
        }
      </header>
      {
        data.meanings.map((meaning, index) => {
          return (
            <main key={index} className={styles.main}>
              <div className={styles.partOfSpeech}>
                <h3>{meaning.partOfSpeech}</h3>
                <div className={styles.line}></div>
              </div>
              <p className={styles.subHeading}>Meaning</p>
              <ul>
                {
                  meaning.definitions.map((definition, index) =>
                    <li key={index}>{definition.definition}</li>
                  )
                }
              </ul>
              { meaning.antonyms.length ?
                (
                <div className={styles.antonyms}>
                  <p className={styles.subHeading}>Antonyms </p>
                  {
                    meaning.antonyms.map((antonym, index) => <span key={index} className={styles.valueItems}> {antonym} | </span>)
                  }
                </div>
                ) : ""
              }
              { meaning.synonyms.length ?
                (
                <div className={styles.synonyms}>
                  <p className={styles.subHeading}>Synonyms </p>
                  {
                    meaning.synonyms.map((synonym, index) => <span key={index} className={styles.valueItems}> {synonym} | </span>)
                  }
                </div>
                ) : ""
              }
            </main>  
          );
        })
      } 
      <footer className={styles.footer}>
        <p className={styles.subHeading}>Source {data.sourceUrls.map((src, index) => <a href={src} key={index}>{src} </a>)} </p>
      </footer>
    </>
  );
}

export default Result;
