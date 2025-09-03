import type { SVGProps } from "react";

export function Icons({
  ...props
}: (SVGProps<SVGSVGElement> & { name: "google" }) | (SVGProps<SVGSVGElement> & { name: "github" })) {
  if (props.name === "google") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12.24 10.28c.14-.29.23-.61.23-.96 0-.35-.09-.67-.23-.96H12v1.92h.24z"/>
        <path d="M15.42 12.3c-.31.91-1.14 1.54-2.18 1.54-.35 0-.67-.09-.96-.23v.23h.96c1.14 0 2.18.82 2.18 1.96 0 1.14-1.04 1.96-2.18 1.96a2.18 2.18 0 0 1-2.18-1.96v-5.9c0-1.14 1.04-1.96 2.18-1.96s2.18.82 2.18 1.96c0 .35-.09.67-.23.96h-1.95v-1.92h3.9c.29 0 .54.09.72.23.36.23.54.54.54.96s-.18.72-.54.96z"/>
        <path d="M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10z"/>
      </svg>
    )
  }
  if (props.name === "github") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    )
  }
  return <div />;
}
