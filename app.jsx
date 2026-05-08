// Root app — fetches data.json, then composes the sections and mounts to #root.

function App() {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const stored = (() => { try { return localStorage.getItem('theme'); } catch (e) { return null; } })();
    if (stored) document.documentElement.dataset.theme = stored;

    fetch('data.json', { cache: 'no-cache' })
      .then(r => {
        if (!r.ok) throw new Error(`data.json: HTTP ${r.status}`);
        return r.json();
      })
      .then(d => {
        window.PORTFOLIO_DATA = d;
        setData(d);
      })
      .catch(err => {
        console.error('Failed to load portfolio data:', err);
        setError(err.message);
      });
  }, []);

  if (error) {
    return (
      <div style={{ padding: 32, fontFamily: 'system-ui, sans-serif' }}>
        <p>Couldn't load <code>data.json</code>: {error}</p>
      </div>
    );
  }

  if (!data) return null;

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
