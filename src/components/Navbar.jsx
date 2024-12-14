import {Link} from "react-router-dom"
import styles from "./navbar.module.css"


export default function Navbar(){
  return <nav className={styles.navbar}>
    <div className={styles.navbarBrand}>
      <Link className={styles.linkstyles}  to = "/">Movies</Link>
    </div>
    <div className={styles.navbarLinks}>
      <Link className={styles.linkstyles} to= "/">Home</Link>
      <Link className={styles.linkstyles} to= "/favorites">Favorites</Link>
    </div>
  </nav>
}