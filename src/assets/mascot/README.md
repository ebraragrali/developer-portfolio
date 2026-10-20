# Mascot poses

Source: `../maskot.png`, supplied by the portfolio owner. The source sheet remains unchanged.

- `welcome-wave.png`: crop (490, 575, 190, 285), retaining the largest connected opaque character component to exclude neighboring sheet artwork. Existing alpha is preserved.
- `front-idle.png`: crop (495, 32, 192, 350), preserving existing alpha.

No character was generated or redrawn. The UI imports these individual poses, never the full sprite sheet. The waving pose is shown on arrival for six seconds, followed by the front-facing idle pose. Reopening the welcome bubble repeats the greeting. CSS supplies a subtle rocking movement; these two supplied poses are not a frame-by-frame arm animation. Reduced-motion mode disables motion and transitions.
