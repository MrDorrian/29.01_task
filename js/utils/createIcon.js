const supportedSocialNetworks = new Map()
  .set('www.facebook.com', 'fa fa-facebook')
  .set('twitter.com', 'fa fa-twitter')
  .set('www.instagram.com', 'fa fa-instagram');


/**
 * @param {['string']} contacts
 * @returns {Array<HTMLAnchorElements>}
 */
function createIcon(contacts) {
  const arrayOfIconElements = contacts
    .map((contact) => {
      const { hostname } = new URL(contact);

      if (supportedSocialNetworks.has(hostname)) {
        const cssClasses = supportedSocialNetworks.get(hostname);

        const a = document.createElement('a');
        a.setAttribute('href', contact);
        a.setAttribute('class', cssClasses);
        return a;
      }
      return;
    })
    .filter(Boolean);

  return arrayOfIconElements;
}