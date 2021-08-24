import React, { useState, Fragment } from 'react';
import withDataManager from 'Src/dataManager/components/withDataManager';
import { stateMappings } from 'Src/newRedux/stateMappings';
import IconButton from 'Components/shared/buttons/IconButton';
import CardTitleLink from 'src/components/shared/cards/elements/CardTitleLink';
import AddCardCard from 'Components/shared/cards/AddCardCard';
import { setUserUiSettings, getUiSettings } from 'Src/helpers/user_config';
import { viewPayload } from 'Src/utils/views';
import { setUserLensPinSettings } from 'Src/newRedux/database/topics/thunks';

const TileFilesViewSegment = ({
  list,
  topicId,
  card_font_color,
  setUserUiSettings,
  uiSettings,
  setUserLensPinSettings
}) => {
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);

  const handleSelectedCardId = id => {
    setSelectedCardId(id);
  };

  const handleAddFile = () => setUploadFile(prev => !prev);

  const setLens = () => {
    let pinnedLenses = uiSettings.pinned_lenses || [];

    pinnedLenses = [...new Set(['PROJECT_HUB', ...pinnedLenses])];

    setUserLensPinSettings({
      ui_settings: {
        pinned_lenses: pinnedLenses
      }
    });
    setUserUiSettings(viewPayload('FILES'));
  };

  return (
    <div className="tile-view">
      <div
        className="tile-view__topic"
        style={{ borderColor: card_font_color || '#E2E2E2' }}
      >
        <div
          onClick={setLens}
          className="tile-view__topic-header-title-wrapper"
        >
          <IconButton
            icon="insert_drive_file"
            color={card_font_color || '#F2C94C'}
            outlined
            fontSize={20}
          />
          <h5 className="ml6">{list.title}</h5>
        </div>
        <div>
          <IconButton
            additionalClasses="grey-link"
            fontSize={14}
            icon="add"
            color={card_font_color}
            onClick={handleAddFile}
            tooltip="Add File"
            tooltipOptions={{ place: 'bottom' }}
          />
        </div>
      </div>
      <div>
        {list?.cards?.length > 0 &&
          list?.cards.map(card => (
            <Fragment key={card.id}>
              <div
                className="tile-view__topic-title-wrapper"
                style={{ borderColor: card_font_color || '#E2E2E2' }}
                onClick={() => handleSelectedCardId(card.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton
                    icon="insert_drive_file"
                    color={card_font_color || '#F2C94C'}
                    outlined
                    fontSize={20}
                  />

                  <CardTitleLink
                    additionalClasses="tile-card_title ml6"
                    card={card}
                    color={card_font_color}
                    truncate
                  />
                </div>
              </div>
            </Fragment>
          ))}
      </div>
      {uploadFile && (
        <AddCardCard
          inInputMode={true}
          topicId={topicId}
          addCardUI=" "
          placeholder={'Upload file'}
          containerClassName="add-card-list-container"
          newDesign
          hideItemTypeDropdown={true}
          uploadFileForm={true}
          projectHubLens
        />
      )}
    </div>
  );
};

const dataRequirements = () => ({});

const mapState = state => {
  const {
    page: { topicId },
    utilities: { active_design }
  } = stateMappings(state);

  const ui_settings = getUiSettings(state);

  return {
    uiSettings: ui_settings,
    topicId,
    card_font_color: active_design?.card_font_color || null
  };
};

const mapDispatch = {
  setUserUiSettings,
  setUserLensPinSettings
};

export default withDataManager(dataRequirements, mapState, mapDispatch, {
  dontShowLoadingIndicator: false
})(TileFilesViewSegment);
