import { Link } from "react-router-dom"; // Link = <a> tag jaisa hai but page reload nahi karta

const Navbar = () => {
  return (
    // Flex layout: logo left mein, links right mein
    <div className="flex justify-between items-center py-5 px-10 bg-blue-900 text-2xl font-semibold ">
        {/* App ka title/logo - click pe home page pe jayega */}
        <Link to='/' className="font-medium text-2xl">Media Search</Link>

        {/* Navigation links */}
        <div className="flex items-center gap-5">
          {/* Search page ka link (home page) */}
          <Link className="active:scale-95" to="/">
            Search
          </Link>
          {/* Collection page ka link (saved items) */}
          <Link className="active:scale-95" to="/collection">
            Collection
          </Link>
        </div>
      </div>
  )
}

export default Navbar;
