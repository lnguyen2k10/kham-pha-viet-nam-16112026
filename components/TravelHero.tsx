import Image from 'next/image';
import { Breadcrumb } from './Cards';
import type { ReactNode } from 'react';

type Crumb = { name: string; href?: string };
export default function TravelHero({ image, imageAlt, eyebrow, title, subtitle, crumbs, children, note }: {
  image: string; imageAlt: string; eyebrow: string; title: ReactNode; subtitle: string;
  crumbs: Crumb[]; children?: ReactNode; note?: string;
}) {
  return <section className="travel-hero">
    <Image src={image} alt={imageAlt} fill priority sizes="100vw" quality={85} />
    <div className="travel-hero-shade" />
    <div className="travel-hero-content">
      <Breadcrumb items={crumbs} />
      <div className="travel-hero-copy"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{subtitle}</p>{children && <div className="travel-hero-actions">{children}</div>}</div>
      {note && <small className="travel-image-note">{note}</small>}
    </div>
  </section>;
}
