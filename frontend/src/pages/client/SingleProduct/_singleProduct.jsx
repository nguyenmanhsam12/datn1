import React from 'react'
import BannerSingle from './banner'
import MainSingle from './mainSingle'
import TabContent from './tabContent'
import AuthBanner from '../Authentication/AuthBanner'

const SingGle = () => {
  return (
    <div className='wrapper bg-dark-white'>
      <BannerSingle/>
      <MainSingle/>
      <TabContent/>
    </div>
  )
}

export default SingGle