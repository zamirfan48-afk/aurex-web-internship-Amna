function Header({ dark, onToggleTheme }) {
  return (
    <header className="topbar">

      <a className="brand" href="#top" aria-label="Deck home">
        <span className="brand-mark" aria-hidden="true">▰</span>
        <span>DECK</span>
      </a>

      <nav aria-label="Main navigation">
        <a href="#tasks">Tasks</a>
        <a href="#calendar">Calendar</a>
        <a href="#timer">Timer</a>
      </nav>

      <button className="theme-toggle" type="button" onClick={onToggleTheme} aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`}>
        {dark ? '◑' : '☼'}
      </button>
      
    </header>
  )
}

export default Header
