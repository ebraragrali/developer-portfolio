/** Keep intact text for screen readers; all visible characters are game targets. */
export function EdibleText({ text }: { text: string }) {
  return <span aria-label={text}>{Array.from(text).map((letter,index)=><span aria-hidden="true" key={`${index}-${letter}`} data-edible-letter={/\S/u.test(letter)?'':undefined}>{letter}</span>)}</span>
}
