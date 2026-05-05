// Root app — composes everything.

const { useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor } = window;

const PORTFOLIO_TWEAKS_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "accent": "#C96442"
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = useTweaks(PORTFOLIO_TWEAKS_DEFAULTS);

  React.useEffect(() => {
    const stored = (() => { try { return localStorage.getItem('theme'); } catch (e) { return null; } })();
    document.documentElement.dataset.theme = stored || tweaks.theme || 'light';
  }, []);

  React.useEffect(() => {
    if (tweaks.theme) {
      document.documentElement.dataset.theme = tweaks.theme;
      try { localStorage.setItem('theme', tweaks.theme); } catch (e) {}
    }
  }, [tweaks.theme]);

  React.useEffect(() => {
    if (tweaks.accent) document.documentElement.style.setProperty('--accent', tweaks.accent);
  }, [tweaks.accent]);

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
      <TweaksPanel title="Tweaks">
        <TweakSection title="Theme">
          <TweakRadio
            label="Mode"
            value={tweaks.theme}
            onChange={v => setTweak('theme', v)}
            options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]}
          />
          <TweakColor
            label="Accent"
            value={tweaks.accent}
            onChange={v => setTweak('accent', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
