type HttpsUrl = `https://${string}`;
export type SitePath = "/" | "/agendamento" | "/calendario" | "/pops" | "/emprestimos" | "/sobre";

type NavigationItem = Readonly<{
  href: SitePath;
  label: string;
  description: string;
}>;

type ServiceItem = Readonly<{
  href: Exclude<SitePath, "/" | "/sobre">;
  title: string;
  description: string;
}>;

type SiteConfig = Readonly<{
  name: string;
  identity: Readonly<{ prefix: string; subject: string; unit: string }>;
  institution: string;
  unit: string;
  location: string;
  description: string;
  language: "pt-BR";
  institutionalEmailDomain: "@unb.br";
  links: Readonly<{
    scheduling: HttpsUrl;
    calendar: HttpsUrl;
    loans: HttpsUrl;
  }>;
  navigation: readonly NavigationItem[];
  services: readonly ServiceItem[];
}>;

const identity = { prefix: "Laboratório de", subject: "Enfermagem", unit: "FS" } as const;

export const siteConfig = {
  name: `${identity.prefix} ${identity.subject}/${identity.unit}`,
  identity,
  institution: "Universidade de Brasília",
  unit: "Faculdade de Ciências da Saúde",
  location: "Campus UnB Asa Norte",
  description: "Consulte a disponibilidade, solicite agendamentos de atividades práticas e empréstimos de materiais e acesse os POPs do laboratório.",
  language: "pt-BR",
  institutionalEmailDomain: "@unb.br",
  links: {
    scheduling: "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=oZs17AtjK024M8jm1I-AWTkrZBLET_hFqD2qWSep34xUQjU4SDJZM0hZRlFRSjJZS1JLWDBaSlRQRS4u",
    calendar: "https://outlook.office365.com/owa/calendar/1f55ee17a1df4a88b43911ee2e6e16a3@unb.br/0532916ae588446d914aea293c0d36226926018211775067093/calendar.html",
    loans: "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=oZs17AtjK024M8jm1I-AWTkrZBLET_hFqD2qWSep34xUM0hSVVZMUElSTkJZNUdDVlg1NkVXSjg1NC4u",
  },
  navigation: [
    { href: "/", label: "Início", description: "Conheça os serviços do laboratório." },
    { href: "/agendamento", label: "Agendamento", description: "Solicite o agendamento de atividades práticas pelo formulário institucional." },
    { href: "/calendario", label: "Calendário", description: "Consulte a disponibilidade de horários e os títulos das atividades." },
    { href: "/pops", label: "POPs", description: "Encontre os procedimentos operacionais padrão do laboratório." },
    { href: "/emprestimos", label: "Empréstimos", description: "Acesse o formulário para solicitar empréstimos de materiais." },
    { href: "/sobre", label: "Sobre o laboratório", description: "Veja a identificação institucional e a localização do laboratório." },
  ],
  services: [
    { href: "/calendario", title: "Consultar disponibilidade", description: "Veja os horários e os títulos das atividades no calendário antes de solicitar uma atividade prática." },
    { href: "/agendamento", title: "Solicitar agendamento", description: "Acesse o formulário institucional para solicitar uma atividade prática no laboratório." },
    { href: "/pops", title: "Consultar POPs", description: "Consulte e baixe os Procedimentos Operacionais Padrão disponíveis em sua versão original." },
    { href: "/emprestimos", title: "Solicitar empréstimo", description: "Encontre o formulário específico para solicitar empréstimos de materiais." },
  ],
} as const satisfies SiteConfig;
