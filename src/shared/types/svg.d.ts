// each *.svg?react file exports a React component.
declare module '*.svg?react' {
  import * as React from 'react'
  // The default export from such a module is a React functional component
  // that accepts the same props as an ordinary <svg> element—width, height,
  // fill, className, etc. And optionally a title prop.
  const ReactComponent: React.FunctionComponent<
    // The optional title prop is used to add an accessible title inside the SVG markup.
    React.SVGProps<SVGSVGElement> & { title?: string }
  >
  export default ReactComponent
}