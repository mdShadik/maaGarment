"use client"
import withAuth from '@/hoc/withAuth'
import { pageEndPoints } from '@/utils/constants/appConstants'
import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '@/store'
import styles from './Home.module.scss'

const HomePage = () => {

  const dispatch = useAppDispatch();

  return (
    <div className={styles.mainContent}>
      <span>Main page</span>
    </div>
  )
}

export default withAuth(HomePage, pageEndPoints.login)
