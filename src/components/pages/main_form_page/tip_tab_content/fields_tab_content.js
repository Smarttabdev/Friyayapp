import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import GenericDragDropListing from 'Components/shared/drag_and_drop/GenericDragDropListing';
import { dragItemTypes } from 'Components/shared/drag_and_drop/_index';
import Popup from 'Src/components/shared/Popup';
import FieldsDropdown from './fields_tab_content/fields_dropdown';
import Field from './fields_tab_content/field';

import './fields_tab_content/styles.module.scss';
import { mutations } from 'src/graphql/index';
import ReactSelectCustom from 'Components/shared/ReactSelectCustom';

const FieldsTabContent = ({
  card,
  topic,
  currentDomain,
  topicQuery,
  tip,
  handleFieldsChange,
  cardType
}) => {
  useEffect(() => {
    const disposers = [];
    if (currentDomain) {
      disposers.push(
        requestSubscription({
          subscription: graphql`
            subscription fieldsTabContentDomainUpdatedSubscription($id: ID!) {
              domainUpdated(id: $id) {
                domain {
                  id
                  activeFields(sort: "position asc, created_at asc") {
                    id
                    position
                    customField {
                      id
                      name
                      fieldType
                    }
                  }
                  inactiveFields(sort: "field_type asc") {
                    id
                    name
                    fieldType
                  }
                }
              }
            }
          `,
          vars: { id: currentDomain.id }
        })
      );
      currentDomain.activeFields.forEach(activeField => {
        disposers.push(
          subscriptions.customFieldUpdated({
            id: activeField.customField.id
          })
        );
      });
    }
    return () => disposers.forEach(d => d.dispose());
  }, [currentDomain]);

  useEffect(() => {
    const disposers = [];
    if (topicQuery) {
      disposers.push(
        requestSubscription({
          subscription: graphql`
            subscription fieldsTabContentTopicUpdatedSubscription($id: ID!) {
              topicUpdated(id: $id) {
                topic {
                  id
                  activeFields(sort: "position asc, created_at asc") {
                    id
                    position
                    customField {
                      id
                      name
                      fieldType
                    }
                  }
                  inactiveFields(sort: "field_type asc") {
                    id
                    name
                    fieldType
                  }
                }
              }
            }
          `,
          vars: { id: topicQuery.id }
        })
      );
      topicQuery.activeFields.forEach(activeField => {
        disposers.push(
          subscriptions.customFieldUpdated({
            id: activeField.customField.id
          })
        );
      });
    }
    return () => disposers.forEach(d => d.dispose());
  }, [topicQuery]);

  useEffect(() => {
    const disposers = [];
    if (tip) {
      disposers.push(
        requestSubscription({
          subscription: graphql`
            subscription fieldsTabContentTipUpdatedSubscription($id: ID!) {
              tipUpdated(id: $id) {
                tip {
                  id
                  customFieldValues {
                    id
                    value
                    customField {
                      id
                    }
                  }
                }
              }
            }
          `,
          vars: { id: tip.id }
        })
      );
      tip.customFieldValues.forEach(customFieldValue => {
        disposers.push(
          subscriptions.customFieldValueUpdated({
            id: customFieldValue.id
          })
        );
      });
    }
    return () => disposers.forEach(d => d.dispose());
  }, [tip]);

  const [inactiveFieldsPopupOpen, setInactiveFieldsPopupOpen] = useState(false);

  const activeFields = get(topicQuery || currentDomain, 'activeFields', []);

  const inactiveFields = get(topicQuery || currentDomain, 'inactiveFields', []);

  const canUpdateTopic = get(
    topicQuery || currentDomain,
    'abilities.self.canUpdate',
    false
  );

  const getFieldValue = fieldId => {
    const fv =
      tip && tip.customFieldValues.find(fv => fv.customField.id == fieldId);
    return fv && fv.value;
  };

  const handleCreateField = async () => {
    const data = await mutations.createCustomField({
      name: 'New field',
      fieldType: 'text'
    });
    await mutations.createActiveField({
      ownerId: topic ? topicQuery.id : currentDomain.id,
      customFieldId: data.createCustomField.customField.id
    });
  };

  const handleInactiveFieldOptionClick = item => {
    mutations.createActiveField({
      ownerId: topic ? topicQuery.id : currentDomain.id,
      customFieldId: item.field.id
    });
  };

  const handleDeactivateField = field => {
    const activeField = activeFields.find(af => af.customField.id == field.id);
    if (activeField) {
      mutations.deleteActiveField({ id: activeField.id });
    }
  };

  const handleChangeFieldName = (field, name) => {
    mutations.updateCustomField({
      id: field.id,
      name
    });
  };

  const handleChangeFieldType = (field, fieldType) => {
    mutations.updateCustomField({
      id: field.id,
      fieldType
    });
  };

  const handleChangeFieldValue = (field, value) => {
    if (tip) {
      const customFieldValue = tip.customFieldValues.find(fv => {
        return fv.customField.id == field.id;
      });
      if (!customFieldValue) {
        mutations.createCustomFieldValue({
          ownerId: tip.id,
          customFieldId: field.id,
          value
        });
      } else {
        mutations.updateCustomFieldValue({
          id: customFieldValue.id,
          value
        });
      }
    }
  };

  const handleDropField = ({ itemOrder }) => {
    updateStore(store => {
      const topic = store.get((currentDomain || topicQuery).id);
      const vars = { sort: 'position asc, created_at asc' };
      const list = topic.getLinkedRecords('activeFields', vars);
      const newList = itemOrder.map(item =>
        list.find(x => x.getDataID() == item.id)
      );
      topic.setLinkedRecords(newList, 'activeFields', vars);
    });
    itemOrder.forEach((item, i) => {
      const activeField = activeFields[i];
      if (item.id != activeField.id) {
        mutations.updateActiveField({
          id: item.id,
          position: activeField.position
        });
      }
    });
  };

  const cardTypeOptions = [
    { value: 'CARD', label: 'Card' },
    { value: 'TASK', label: 'Task Card' },
    { value: 'NOTES', label: ' Notes Card' }
  ];

  return (
    <div styleName="fields-tab-content">
      <div styleName="fields-tab-content__header">
        <h4>Active fields</h4>
        {canUpdateTopic && (
          <Popup
            open={inactiveFieldsPopupOpen}
            onOpen={() => setInactiveFieldsPopupOpen(true)}
            onClose={() => setInactiveFieldsPopupOpen(false)}
            on="click"
            position="bottom right"
            arrow={false}
            trigger={
              <a styleName="fields-tab-content__inactive-fields-btn">
                Inactive fields
              </a>
            }
          >
            <FieldsDropdown
              inactiveFields={inactiveFields}
              onClick={handleInactiveFieldOptionClick}
            />
          </Popup>
        )}
      </div>
      <GenericDragDropListing
        itemList={activeFields}
        itemType={dragItemTypes.FIELD}
        onDropItem={handleDropField}
        renderItem={activeField => (
          <Field
            key={activeField.customField.id}
            field={{
              ...activeField.customField,
              value: getFieldValue(activeField.customField.id)
            }}
            readOnly={!card}
            canDeactivate={canUpdateTopic}
            onChangeName={handleChangeFieldName}
            onChangeValue={handleChangeFieldValue}
            onChangeFieldType={handleChangeFieldType}
            onDeactivateField={handleDeactivateField}
          />
        )}
      />
      <div styleName="set-card-type">
        <p>Card type</p>
        <div styleName="card-type-select">
          <ReactSelectCustom
            value={{
              value: cardType,
              label:
                cardType === 'CARD'
                  ? 'Card'
                  : cardType === 'TASK'
                  ? 'Task Card'
                  : 'Notes Card'
            }}
            options={cardTypeOptions}
            onChange={e => handleFieldsChange({ cardType: e.value })}
          />
        </div>
      </div>
      {canUpdateTopic && (
        <div styleName="fields-tab-content__footer">
          <a onClick={handleCreateField}>Add field</a>
        </div>
      )}
    </div>
  );
};

FieldsTabContent.propTypes = {
  card: PropTypes.object,
  topic: PropTypes.object
};

export default QueryRenderer({
  query: graphql`
    query fieldsTabContentQuery(
      $isDomain: Boolean!
      $isTip: Boolean!
      $topicId: ID
      $tipId: ID!
    ) {
      currentDomain @include(if: $isDomain) {
        id
        activeFields(sort: "position asc, created_at asc") {
          id
          position
          customField {
            id
            name
            fieldType
          }
        }
        inactiveFields(sort: "field_type asc") {
          id
          name
          fieldType
        }
        abilities {
          self {
            canUpdate
          }
        }
      }
      topicQuery: topic(id: $topicId) @skip(if: $isDomain) {
        id
        activeFields(sort: "position asc, created_at asc") {
          id
          position
          customField {
            id
            name
            fieldType
          }
        }
        inactiveFields(sort: "field_type asc") {
          id
          name
          fieldType
        }
        abilities {
          self {
            canUpdate
          }
        }
      }
      tip(id: $tipId) @include(if: $isTip) {
        id
        customFieldValues {
          id
          value
          customField {
            id
          }
        }
        abilities {
          self {
            canUpdate
          }
        }
      }
    }
  `,
  vars: props => ({
    isDomain: !props.topic,
    isTip: !!props.card,
    topicId: props.topic && toGid('Topic', props.topic.id),
    tipId: props.card ? toGid('Tip', props.card.id) : ''
  }),
  component: FieldsTabContent
});
