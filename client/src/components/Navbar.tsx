import { Link } from 'react-router-dom';
//import RegistrationForm from './RegistrationForm';
//import LoginForm from './LoginForm';
/*
<div >
<LoginForm  />
</div>
<div >
<RegistrationForm  />
</div>
*/
const Navbar = () => {

  return (
    <section >
      <header >
        <div>
          <Link to="/moviespage" className="m-0">Movies</Link>
        </div>
        <div >
          <Link to="/profilepage" className="m-0">My Watchlist</Link>
        </div>
      </header>
    </section>
  )
}

export default Navbar;