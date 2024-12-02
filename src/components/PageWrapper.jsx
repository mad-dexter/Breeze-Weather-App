import PageNav from "./PageNav";
import styles from "./PageWrapper.module.css";

function PageWrapper({ children }) {
  return (
    <div className={styles.wrapperHome}>
      <PageNav />
      {children}
    </div>
  );
}

export default PageWrapper;
