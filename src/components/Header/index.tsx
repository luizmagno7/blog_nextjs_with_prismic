import Link, { LinkProps } from "next/link"

import { Logo } from "../Logo";

import styles from './header.module.scss'

export default function Header() {
  return (
    <header role="navigation" className={styles.headerContent}>
      <Link href="/">
        <a>
          <div className={styles.brand}>
            <Logo />

            <span>Square.News</span>
          </div>
        </a>
      </Link>

      <nav aria-label="Main Menu">
        <Link href="/">
          <a>Home</a>
        </Link>
      </nav>
    </header>
  )
}
