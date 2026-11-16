import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
export default function JourneyBand({ title, text, href, label }: { title: string; text: string; href: string; label: string }) {
  return <section className="journey-band"><Image src="/images/hoi-an.jpg" alt="" fill sizes="100vw" quality={75} /><div className="journey-band-shade" /><div className="journey-band-content"><div><span className="eyebrow">KẾT NỐI NHỮNG GIÁ TRỊ BẢN ĐỊA</span><h2>{title}</h2><p>{text}</p></div><Link href={href} className="button travel-button">{label}<ArrowUpRight size={19} /></Link></div></section>;
}
