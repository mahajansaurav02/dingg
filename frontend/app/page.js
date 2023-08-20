"use client"
import { Router, useRouter } from 'next/navigation';
import styles from './styles/page.module.css'




export default function Home() {
  const router = useRouter()

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Welcome to ShoppyCart</h1>
      </header>
      <button className={styles.button} onClick={e => router.push("/login")}>Go to login</button>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} My Next.js App</p>
      </footer>
    </div>
  )
}
