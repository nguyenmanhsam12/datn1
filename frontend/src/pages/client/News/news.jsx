
import BannerNews from './bannerNews';
import MainNews from './mainNews';
import MenuNews from './menu';


const News = () => {
  
  return (
    <div className='wrapper bg-dark-white'>
    <BannerNews/>
    <MenuNews/>
    <MainNews/>
    </div>
  )
}

export default News