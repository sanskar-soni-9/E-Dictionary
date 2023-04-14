import styles from "../styles/Error.module.scss";

const Error = ({ error }) => {
  return (
    <div className={styles.error}>
      <h1>{error.message}</h1>
      <div>
        <h2>{error.response?.data?.title}</h2>
        <p>{error.response?.data?.message +" "+ error.response?.data?.resolution}</p>
      </div>
    </div>
  )
}

export default Error;
