export type IconName = "calendar" | "book" | "box" | "arrow" | "external" | "info" | "menu" | "close" | "building" | "clipboard" | "download";

const paths: Record<IconName, React.ReactNode> = {
  download: <><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 11h18M8 15h2M14 15h2" /></>,
  book: <><path d="M12 6c-3-2-6-2-10-1v15c4-1 7-1 10 1 3-2 6-2 10-1V5c-4-1-7-1-10 1Zm0 0v15" /><path d="M6 9h2m8 0h2M6 13h2m8 0h2" /></>,
  box: <><path d="m12 3 9 5-9 5-9-5 9-5Zm-9 5v10l9 5 9-5V8M12 13v10M7.5 5.5l9 5" /></>,
  arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
  external: <><path d="M14 3h7v7M21 3 10 14" /><path d="M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7h.01" /></>,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  building: <><path d="m3 9 9-6 9 6M5 10v11h14V10M9 21v-5h6v5M9 10h.01M15 10h.01" /></>,
  clipboard: <><path d="M9 5H6a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3" /><rect x="9" y="2" width="6" height="5" rx="1" /><path d="M8 12h8M8 16h5" /></>,
};

export function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  return <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{paths[name]}</svg>;
}
