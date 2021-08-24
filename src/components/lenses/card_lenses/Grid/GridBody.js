import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import ItemContentDocuments from 'Src/components/pages/item_page/item_content_documents.js';
import ItemContentTipLinks from 'Src/components/pages/item_page/item_content_tip_links.js';
import ItemImagesPreview from 'Src/components/shared/items_container/item_images_preview.js';
import StringHelper from 'Src/helpers/string_helper';
import GridPlanButtons from 'Src/components/shared/cards/elements/assemblies/GridPlanButtons';
import { getCardUrl } from 'Src/newRedux/database/cards/thunks';
import { fetchQuery } from 'Lib/relay';
import { getLinkItemTypes } from 'src/lib/utilities';

const GridBody = ({ item, getCardUrl }) => {
  const [linkItemTypes, setLinkItemTypes] = useState([]);
  let {
    attributes: { body },
    relationships: {
      attachments: { data: documents }
    }
  } = item;
  documents = documents ? documents : [];
  const { images = [], tip_links = [] } = item.attributes.attachments_json;

  useEffect(() => {
    (async function() {
      const results = await getLinkItemTypes(tip_links, getType);
      setLinkItemTypes(results);
    })();
  }, [tip_links]);

  const getType = ({ isBoard, isCard, id }) => {
    let result = {};
    if (isBoard) {
      result = fetchQuery(
        graphql`
          query GridBodyQuery($topicIds: [ID!]) {
            topics(ids: $topicIds) {
              edges {
                node {
                  id
                  title
                  tagList
                }
              }
            }
          }
        `,
        {
          topicIds: [toId(id)]
        }
      );
    } else if (isCard) {
      result = fetchQuery(
        graphql`
          query GridBodyGetTypeQuery($tipIds: [ID!]) {
            tips(ids: $tipIds) {
              edges {
                node {
                  id
                  title
                  cardType
                }
              }
            }
          }
        `,
        {
          tipIds: [toId(id)]
        }
      );
    }

    return result;
  };

  function fetchBody(body, length) {
    const string = (body && body.toString()) || '';

    return string.length > length
      ? `${string.substring(0, length).replace(/^\s+|\s+$/g, '')}...`
      : string;
  }

  const firstImage = images.length > 0 ? [images[0]] : [];
  const firstLink = tip_links.length > 0 ? [tip_links[0]] : [];

  const formattedBody = fetchBody(body, 500);
  const bodyClass = classNames({
    'item-text': true,
    'item-text-expandable': firstLink.length > 0
  });

  let preview = (
    <div
      className={bodyClass}
      dangerouslySetInnerHTML={{
        __html: StringHelper.simpleFormat(formattedBody, linkItemTypes)
      }}
    />
  );

  if (!formattedBody && documents.length > 0) {
    if (documents.length < 3) {
      preview = (
        <ItemContentDocuments item={item} documents={documents} isGrid />
      );
    } else {
      preview = [
        <ItemContentDocuments
          key={`docs-${item.id}`}
          item={item}
          documents={documents.slice(0, 2)}
          isGrid
        />,
        <ItemContentDocuments
          key={`docs-collpased-${item.id}`}
          item={item}
          documents={documents.slice(2)}
          isGrid
        />
      ];
    }
  } else if (!formattedBody && firstLink.length > 0) {
    preview = <ItemContentTipLinks item={item} tipLinks={firstLink} isGrid />;
  } else if (!formattedBody && firstImage.length > 0) {
    preview = <ItemImagesPreview item={item} images={firstImage} />;
  }

  return (
    <div className="grid-card_content-panel">
      <Link
        className="grid-card_body-link"
        to={getCardUrl({ cardSlug: item.attributes.slug })}
      >
        <div className="grid-card_content-body fr-view">{preview}</div>
      </Link>

      <GridPlanButtons card={item} />
    </div>
  );
};

export default connect(undefined, { getCardUrl })(GridBody);
