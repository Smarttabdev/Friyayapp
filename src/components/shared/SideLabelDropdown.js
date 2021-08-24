import React, { Component, useRef } from 'react';
import { array, object, func, bool } from 'prop-types';
import Icon from 'Components/shared/Icon';
import { connect } from 'react-redux';
import { getLabelsInAlphaOrder } from 'Src/newRedux/database/labels/selectors';
import { setRightMenuOpenForMenu } from 'Src/newRedux/interface/menus/actions';
import { updateCard } from 'Src/newRedux/database/cards/thunks';
import IconButton from 'Components/shared/buttons/IconButton';
import { useOutsideAlerter } from 'Src/lib/hooks';

class RenderSideLabelDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labelSelected: []
    };
  }

  static propTypes = {
    cardLabelsData: array
  };

  handleSelectLabel = (label, i) => {
    const { updateCard, card, cardLabelsData, onSelectLabel } = this.props;
    const { labelSelected } = this.state;

    if (onSelectLabel) {
      onSelectLabel(label);
      return;
    }

    if (!cardLabelsData.includes(label.id)) {
      updateCard({
        id: card.id,
        relationships: { labels: { data: [...cardLabelsData, label.id] } }
      });
      this.setState({
        cardLabelsData: [...cardLabelsData, label.id],
        labelSelected: [...labelSelected, i]
      });
    } else {
      let labelIndex = cardLabelsData.indexOf(label.id);
      if (labelIndex !== -1) cardLabelsData.splice(labelIndex, 1);
      let labelStateIndex = labelSelected.indexOf(i);
      if (labelStateIndex !== -1) labelSelected.splice(labelStateIndex, 1);
      updateCard({
        id: card.id,
        relationships: { labels: { data: [...cardLabelsData] } }
      });
      this.setState({
        cardLabelsData: [...cardLabelsData],
        labelSelected: [...labelSelected]
      });
    }
  };

  render() {
    let {
      props: { labels, setRightMenuOpenForMenu, card, selectedLabels },
      state: { labelSelected }
    } = this;
    labels = labels.filter(e => e.attributes.kind != 'system');

    return (
      <div className="card-show-side-labels dropdown-menu">
        Select Label(s)
        <hr />
        {labels.length === 0
          ? 'No Public Label'
          : labels.map((label, i) => (
              <div key={i} className="card-label_container">
                <div
                  className={` card-label color-${label.attributes.color}`}
                  style={{ backgroundColor: label.attributes.color }}
                  onClick={() => this.handleSelectLabel(label, i)}
                >
                  <span className="card-label_title">
                    {label.attributes.name}
                  </span>
                  <IconButton
                    icon="edit"
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      setRightMenuOpenForMenu('Filters_Labels');
                    }}
                    fontSize="20px"
                  />
                </div>
                {(selectedLabels ? (
                  selectedLabels.map(lab => lab.id).includes(label.id)
                ) : (
                  card.relationships.labels.data.includes(label.id) ||
                  labelSelected.includes(i)
                )) ? (
                  <Icon icon="check" fontSize="20px" />
                ) : null}

                {/* {card.relationships.labels.data.includes(label.id) ||
                labelSelected.includes(i) ? (
                  <Icon icon="check" fontSize="20px" />
                ) : null} */}
              </div>
            ))}
        <div
          className="create_label"
          onClick={() => setRightMenuOpenForMenu('Filters_Labels')}
        >
          Create Public Label
          <Icon icon="add" fontSize="20px" />
        </div>
      </div>
    );
  }
}

const SideLabelDropdown = props => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props.onClose);

  return (
    <div ref={wrapperRef}>
      <RenderSideLabelDropdown {...props} />
    </div>
  );
};

const mapState = state => ({
  labels: getLabelsInAlphaOrder(state)
});

const mapDispatch = {
  updateCard,
  setRightMenuOpenForMenu
};

export default connect(mapState, mapDispatch)(SideLabelDropdown);
