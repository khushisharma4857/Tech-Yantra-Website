# Security notes

Configuration for whichever host this ends up on. Apply **one** of:

| Host              | Files used                                          |
| ----------------- | --------------------------------------------------- |
| Vercel            | `vercel.json`                                       |
| Netlify           | `netlify.toml` + `public/_headers`, `public/_redirects` |
| Cloudflare Pages  | `public/_headers` + `public/_redirects`             |
| Nginx / Apache    | Translate the header table below by hand            |

Unused config files are ignored by the host that doesn't read them, so it is
safe to keep all of them in the repo.

## Headers applied

| Header | Value | Why |
| --- | --- | --- |
| `Content-Security-Policy` | see below | Limits where scripts, styles, fonts and images may load from. The main defence against XSS and injected third-party content. |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Forces HTTPS for two years, blocking SSL-strip downgrade attacks. |
| `X-Content-Type-Options` | `nosniff` | Stops browsers guessing a file's type and executing a non-script as script. |
| `X-Frame-Options` | `DENY` | Blocks clickjacking via `<iframe>` embedding (legacy counterpart to `frame-ancestors`). |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Stops full URLs leaking to third parties in the `Referer` header. |
| `Permissions-Policy` | camera/mic/geolocation etc. `()` | Denies powerful browser APIs the site never uses. |
| `Cross-Origin-Opener-Policy` | `same-origin` | Isolates the browsing context from cross-origin popups. |

### The CSP, explained

```
default-src 'self';
script-src 'self';
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com data:;
img-src 'self' data: blob:;
connect-src 'self';
frame-src 'none';
object-src 'none';
base-uri 'self';
form-action 'self';
frame-ancestors 'none';
upgrade-insecure-requests
```

Notes:

- `style-src` needs `'unsafe-inline'` because React inline `style` attributes and
  GSAP's tweening both write inline styles. This is normal for a React + GSAP
  site and is far lower risk than `script-src 'unsafe-inline'`, which is **not**
  granted here.
- `fonts.googleapis.com` / `fonts.gstatic.com` are allowed for the Google Fonts
  used in `index.html`. Self-hosting the fonts would let you drop both entries
  and remove a third-party dependency.
- The JSON-LD structured data block is `type="application/ld+json"`, which
  browsers treat as data rather than executable script, so it does not require a
  CSP exception.

### If you connect the contact form

`connect-src 'self'` will block the request. Add the provider's origin, e.g.

```
connect-src 'self' https://api.web3forms.com;
```

Update this in **all** of `vercel.json`, `netlify.toml` and `public/_headers`.

## Verifying

After deploying, check the headers actually arrive:

```bash
curl -sI https://techyantra.org | grep -iE 'content-security|strict-transport|x-frame|x-content|referrer|permissions'
```

Or scan at <https://securityheaders.com>.

## Application-level notes

- **Contact form** — validates length and format client-side, and includes a
  honeypot field to absorb basic spam bots. It is **not yet connected to a
  backend**; see the TODO block at the top of `src/components/ContactForm.jsx`.
  Client-side validation is a UX affordance only — whatever backend you connect
  must re-validate and rate-limit server-side.
- **Secrets** — no API keys are currently committed. Any key added for the form
  must go in `.env` (already git-ignored) as a `VITE_`-prefixed variable, and
  must be treated as public: anything prefixed `VITE_` is inlined into the
  JavaScript bundle and readable by anyone. Restrict such keys by domain in the
  provider's dashboard.
- **External links** — all `target="_blank"` links carry `rel="noopener noreferrer"`,
  preventing the opened page from reaching back via `window.opener`.
- **No `dangerouslySetInnerHTML`** is used anywhere in the codebase, so there is
  no HTML-injection sink in the React tree.
