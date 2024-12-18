export const NICKNAME = "Ray";
export const FULL_NAME = "Rayhan Noufal Arayilakath";
export const ALIAS = "rayhanadev";

export const EMAIL_ADDRESS = "me@rayhanadev.com";
export const PHONE_NUMBER = "+1 (817) 470-7345";
export const SOCIALS = {
    twitter: "https://twitter.com/rayhanadev",
    github: "https://github.com/rayhanadev",
    linkedin: "https://www.linkedin.com/in/rayhanadev",
};

export const JSONLD = {
    "@context": "http://www.schema.org",
    "@type": "person",
    name: FULL_NAME,
    alternateName: ALIAS,
    description: "Developer",
    disambiguatingDescription: "Software Engineer",
    jobTitle: "Software Engineer",
    gender: "male",
    url: import.meta.env.SITE,
    sameAs: Object.values(SOCIALS),
    image: "https://www.rayhanadev.com/headshot.png",
    address: {
        "@type": "PostalAddress",
        addressRegion: "Texas",
        addressCountry: "United States of America",
    },
    email: EMAIL_ADDRESS,
    birthDate: "2006-06-24",
};

export const BLOG_TITLE = "THOUGHTS: a blog written by Ray 🪴";
export const BLOG_DESCRIPTION =
    "Various pieces written and composed by Ray, related to software engineering and life.";
