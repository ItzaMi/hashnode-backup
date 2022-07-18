import Logo from '../Logo'

const Navbar = () => {
  return (
    <nav className="py-4 px-4 bg-white border-b-[1px] border-slate-200">
      <div className="px-4 mx-auto max-w-7xl xl:px-0">
        <a href="www.hashnode.com" className="block w-36">
          <Logo />
        </a>
      </div>
    </nav>
  )
}

export default Navbar
