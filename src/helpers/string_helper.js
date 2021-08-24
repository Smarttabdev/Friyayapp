import AppHelper from './app_helper';
import { toGid } from 'Lib/utilities';
import {
  getBoardTypeAttributes,
  getCardTypeIconAttribute
} from 'src/utils/icons';
const StringHelper = {
  truncate(str, length) {
    return str?.length > length ? str.substring(0, length - 3) + '...' : str;
  },

  simpleFormat(str, itemTypes = []) {
    let $str;
    // replace search name atwho attr with empty string
    str = str.replace(/data-atwho-at-query="@/g, '');
    let formatted_str = /tribute-container__icon/.test(str)
      ? str
      : AppHelper.autoLink(str);
    formatted_str = $.trim(formatted_str);
    $str = $("<div class='tip-body'>" + formatted_str + '</div>');
    $str.find('style, script').remove();

    $str.find('a').map(function() {
      const noLinkText =
        this.href === this.innerHTML || this.href === `${this.innerHTML}/`;
      const isCurrentDomainLink = this.host === window.location.host;
      // find the last slug in href and split it into an id and a title
      const [, id, title] = this.href.match(/^.*\/(\d+)-(.*)$/) || [];

      if (noLinkText && isCurrentDomainLink && id && title) {
        const formattedTitle = title.split('-').join(' ');
        const capitalizedTitle =
          formattedTitle[0].toUpperCase() + formattedTitle.slice(1);

        if (itemTypes?.length > 0) {
          const isBoard = this.pathname.startsWith('/boards/');

          const formattedId = isBoard ? toGid('Topic', id) : toGid('Tip', id);
          const itemType = itemTypes.find(x => x.id === formattedId);
          const itemTypeIconAttributes = isBoard
            ? getBoardTypeAttributes(itemType?.itemType)
            : getCardTypeIconAttribute(itemType?.itemType);

          const { icon, color, defaultColor } = itemTypeIconAttributes || {};
          this.style.display = 'flex';
          this.style.alignItems = 'center';
          return (this.innerHTML =
            isBoard && icon === 'hashtag'
              ? `<i style="font-size: 14px; margin-right: 5px; color: #9B51E0;"
          class="fa fa-hashtag" aria-hidden="true"></i> ${capitalizedTitle}`
              : `<i style="font-size: 18px; margin-right: 5px; color: ${color ||
                  defaultColor}" class="material-icons-outlined">${icon}</i> ${capitalizedTitle}`);
        }

        return (this.innerHTML = `#${id} ${capitalizedTitle}`);
      } else if (noLinkText) {
        return (this.innerHTML = StringHelper.truncate(this.innerHTML, 50));
      }
    });

    str = $str.html();
    return str;
  },

  extractContent(str) {
    return str.replace(/<.+?>/g, '').replace(/(&.+?;)+/, ' ');
  }
};

export default StringHelper;
