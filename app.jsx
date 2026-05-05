// Root app — composes the sections and mounts to #root.

function App() {
  React.useEffect(() => {
    const stored = (() => { try { return localStorage.getItem('theme'); } catch (e) { return null; } })();
    if (stored) document.documentElement.dataset.theme = stored;
  }, []);

  return (
    <>
      <window.NavBar />
      <main className="app">
        <window.Hero />
        <window.About />
        <window.Skills />
        <window.Experience />
        <window.Projects />
        <window.Recommendations />
        <window.Resume />
        <window.Contact />
      </main>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
