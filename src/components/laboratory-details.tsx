import Image from "next/image";
import type { LaboratoryContent } from "@/config/laboratory-content";

export function LaboratoryDetails({ content }: { content: LaboratoryContent }) {
  return (
    <>
      {content.contacts.length > 0 && (
        <section className="content-section" aria-labelledby="contatos">
          <div className="section-heading"><h2 id="contatos">Contatos</h2></div>
          <dl className="info-grid surface">
            {content.contacts.map((contact) => (
              <div key={contact.href}><dt>{contact.label}</dt><dd><a className="text-link" href={contact.href}>{contact.value}</a></dd></div>
            ))}
          </dl>
        </section>
      )}
      {content.spaces.length > 0 && (
        <section className="content-section" aria-labelledby="espacos">
          <div className="section-heading"><h2 id="espacos">Espaços do laboratório</h2></div>
          <div className="details-grid">
            {content.spaces.map((space) => <article className="surface prose-block" key={space.name}><h3>{space.name}</h3><p>{space.description}</p></article>)}
          </div>
        </section>
      )}
      {content.photos.length > 0 && (
        <section className="content-section" aria-labelledby="fotos">
          <div className="section-heading"><h2 id="fotos">Fotos do laboratório</h2></div>
          <div className="details-grid">
            {content.photos.map((photo) => <figure className="laboratory-photo" key={photo.src}><Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(min-width: 768px) 50vw, 100vw" />{photo.caption && <figcaption>{photo.caption}</figcaption>}</figure>)}
          </div>
        </section>
      )}
    </>
  );
}
