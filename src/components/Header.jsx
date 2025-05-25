const Header = ({ title }) => {
  return (
    <header className="py-6 text-center shadow-md">
      <h1 className="text-4xl font-bold">{title}</h1>
    </header>
  );
};

export default Header;