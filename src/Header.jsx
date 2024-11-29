const Header = (props) =>{
  return (
    <header className="flex flex-row justify-between px-3 mt-2.5 pb-4 mb-5 border-b border-stone-200">
      <h1 className="text-2xl md:text-3xl tracking-wide text-stone-800 pl-2">
        <span className="text-green-600">K</span>an
        <span className="text-green-600">B</span>an Board
      </h1>
    </header>
  );
};

export default Header;