import React from 'react'
import styles from '@/styles/components/loading.module.css'
import { Spin } from 'antd';
function Loading() {
  return (
    <div className={styles.loadingText}><Spin />Loading...</div>
  )
}

export default Loading