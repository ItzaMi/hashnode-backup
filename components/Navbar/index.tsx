import Logo from '../Logo'

const Navbar = () => {
  return (
    <nav className="py-4 px-4 bg-white border-b-[1px] border-slate-200">
      <a href="www.hashnode.com" className="block w-36">
        <Logo />
      </a>
    </nav>
  )
}

export default Navbar
