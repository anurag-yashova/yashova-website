import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-surface-line/60 bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="font-display text-xl font-semibold tracking-tight text-ink">
              yashova
            </div>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gold">
              Not Loud. Unignorable.
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
              Performance marketing systems that track spend, qualify leads,
              and maximize ROI. Faridabad, Delhi NCR.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink">Company</h3>
            <ul className="mt-4 space-y-3 text-sm text-ink-muted">
              <li><Link href="/about" className="hover:text-ink">About</Link></li>
              <li><Link href="/case-studies" className="hover:text-ink">Case Studies</Link></li>
              <li><Link href="/for-colleges" className="hover:text-ink">For Colleges</Link></li>
              <li><Link href="/blog" className="hover:text-ink">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink">Tools</h3>
            <ul className="mt-4 space-y-3 text-sm text-ink-muted">
              <li><Link href="/roi-calculator" className="hover:text-ink">ROI Calculator</Link></li>
              <li><Link href="/ai-audit" className="hover:text-ink">Free Growth Audit</Link></li>
              <li><Link href="/refund-policy" className="hover:text-ink">Refund Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink">Get in touch</h3>
            <ul className="mt-4 space-y-3 text-sm text-ink-muted">
              <li>
                <a href="tel:+919818086846" className="hover:text-ink">+91 981 808 6846</a>
              </li>
              <li>
                <a href="mailto:anurag@yashova.com" className="hover:text-ink">anurag@yashova.com</a>
              </li>
              <li>741, Sector-23, Faridabad</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-surface-line/60 pt-6 text-xs text-ink-muted md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Yashova. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="https://linkedin.com" className="hover:text-ink" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://facebook.com" className="hover:text-ink" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://instagram.com" className="hover:text-ink" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
