import type { MouseEvent } from "react";
import type { Locale, SiteContent } from "../../shared/config/site-content";
import { applicationsCatalog, type Application } from "./applications-catalog";
import "./applications.css";

export function ApplicationsFloor({
  locale,
  copy,
  onLaunch,
}: {
  locale: Locale;
  copy: SiteContent;
  onLaunch: (event: MouseEvent<HTMLAnchorElement>, app: Application) => void;
}) {
  return (
    <section
      id="applications-catalog"
      className="applications-floor"
      aria-label={copy.applications}
    >
      {applicationsCatalog(locale).map((app) => (
        <article
          key={app.slug}
          className="application-card"
          aria-labelledby={`${app.slug}-title`}
        >
          <div className="application-art">
            <img src={app.image} width="960" height="960" alt="" />
          </div>
          <div className="application-copy">
            <p className="application-category">{app.category}</p>
            <h2 id={`${app.slug}-title`}>{app.title}</h2>
            <p className="application-description">{app.description}</p>
            <ol className="application-steps">
              {app.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <a
              className="play-button"
              href={app.url}
              onClick={(event) => onLaunch(event, app)}
            >
              {copy.openApplication}
              <span aria-hidden="true">↗</span>
            </a>
            <p className="application-note">{app.note}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
