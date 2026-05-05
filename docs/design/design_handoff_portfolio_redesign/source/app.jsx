// Root app — composes everything.

const { useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakSelect } = window;

const PORTFOLIO_TWEAKS_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark",
  "accent": "#C96442",
  "heroFont": "caveat"
}/*EDITMODE-END*/;

const HERO_FONTS = {
  fraunces:   { label: "Fraunces (current)",     stack: '"Fraunces", Georgia, serif' },
  playfair:   { label: "Playfair Display",        stack: '"Playfair Display", Georgia, serif' },
  cormorant:  { label: "Cormorant Garamond",      stack: '"Cormorant Garamond", Georgia, serif' },
  dmserif:    { label: "DM Serif Display",        stack: '"DM Serif Display", Georgia, serif' },
  crimson:    { label: "Crimson Pro",             stack: '"Crimson Pro", Georgia, serif' },
  instrument: { label: "Instrument Serif",        stack: '"Instrument Serif", Georgia, serif' },
  bricolage:  { label: "Bricolage Grotesque",     stack: '"Bricolage Grotesque", Inter, sans-serif' },
  caveat:     { label: "Caveat (handwritten)",    stack: '"Caveat", cursive' },
};

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

  React.useEffect(() => {
    const f = HERO_FONTS[tweaks.heroFont] || HERO_FONTS.fraunces;
    document.documentElement.style.setProperty('--font-hero', f.stack);
  }, [tweaks.heroFont]);

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
        <TweakSection title="Typography">
          <TweakSelect
            label="Hero name font"
            value={tweaks.heroFont}
            onChange={v => setTweak('heroFont', v)}
            options={Object.entries(HERO_FONTS).map(([value, { label }]) => ({ value, label }))}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
