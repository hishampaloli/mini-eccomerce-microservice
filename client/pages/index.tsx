import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout/Layout'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import Router from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const dispatch = useDispatch();

  const { user, error } = useSelector((state: any) => state.user);

  console.log(user);
  console.log(error);

  useEffect(() => {
    console.log(3434343433443);

    if (user?.email === "admin@gmail.com") {
      Router.push("/admin");
    }
  }, []);
  return (
    <>
     <Layout title={"Shopit"} >
<h1>yguhbsdmn</h1>
     </Layout>
    </>
  )
}
