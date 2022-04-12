import{Link} from 'react-router-dom'
import rentCatagoryImage from '../assets/jpg/rentCategoryImage.jpg'
import sellCatagoryImage from '../assets/jpg/sellCategoryImage.jpg'

function Explore() {


  return (
    <section className='explore'>
      <header>
      <p className="pageHeader">Explore</p>      

      </header>
      <main>
        {/* Slider */}

        <p className="exploreCategoryHeading">Catagories</p>
        <div className="exploreCategories">
          <Link to='/category/rent'>
            <img src={rentCatagoryImage} alt="Rent" className="exploreCategoryImg" />
            <p className="exploreCategoryName">Placec For Rent</p>
          </Link>
          <Link to='/category/sale'>
            <img src={sellCatagoryImage} alt="Sale" className="exploreCategoryImg" />
            <p className="exploreCategoryName">Placec For Sale</p>
          </Link>
        </div>
      </main>
    </section>
  )
}

export default Explore