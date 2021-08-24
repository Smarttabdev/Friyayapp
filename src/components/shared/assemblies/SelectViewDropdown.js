import React, { Component } from 'react';
import AddCardCard from 'Components/shared/cards/AddCardCard';
import LeftMenuNewTopicInput from 'Src/components/menus/left/elements/LeftMenuNewTopicInput';
import TopicsListDropdown from 'Components/shared/topics_list_dropdown';

class SelectViewDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTopicId: {},
      addNewView: false,
      selectedTopics: [],
      multipleTopicsId: []
    };
  }

  handleTopicSelected = list => {
    setTimeout(() => {
      this.setState({
        selectedTopicId: list[list.length - 1].value,
        selectedTopics: list,
        multipleTopicsId: list.map(topic => topic.value)
      });
    });
  };

  toggleSelectView = () => {
    this.setState(prevState => {
      return {
        showViewDropdown: !prevState.showViewDropdown
      };
    });
  };

  handleAddView = () => {
    setTimeout(() => {
      this.setState({ addNewView: true });
    });
  };

  onInputBlur = () => {
    setTimeout(() => {
      this.setState({ hideTopicSelector: true });
    });
  };

  onInputFocus = () => {
    setTimeout(() => {
      this.setState({
        hideTopicSelector: false
      });
    });
  };

  handleEscPressed = e => {
    switch (e.keyCode) {
      case 27:
        this.setState({ addNewView: false });
        break;
      default:
        break;
    }
  };

  onAddViewDismiss = () => {
    setTimeout(() => {
      this.setState({
        addNewView: false,
        showViewDropdown: false
      });
      this.setState({
        showViewDropdown: true
      });
    });
  };

  componentDidUpdate() {
    if (this.state.addNewView) {
      document.addEventListener('keydown', this.handleEscPressed);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscPressed);
  }

  render() {
    const { afterCardCreated, onDismiss, selectedCardType } = this.props;
    const {
      selectedTopics,
      hideTopicSelector,
      multipleTopicsId,
      selectedTopicId,
      showViewDropdown,
      addNewView
    } = this.state;

    return (
      <div>
        <div className="selectViewDropdown">
          <div onClick={this.toggleSelectView}>
            Select Board <span className="caret" />
          </div>
          {showViewDropdown && (
            <div
              className={`view_dropdown ${!hideTopicSelector && 'inputFocus'}`}
            >
              <TopicsListDropdown
                extraStyle={addNewView ? { top: '50px' } : {}}
                additionalClasses="invite-form-dropdown-menu"
                actionButtonLabel="Share selected Boards"
                actionButtonHandler={() => {
                  return false;
                }}
                actionButtonClass="btn-primary"
                path={null}
                startAt={null}
                hideHeader
                inputMode="list"
                disallowCreate
                multiple
                hideAddTopicLink
                hideTopicSelector={hideTopicSelector}
                skipConfirmation
                onInputBlur={this.onInputBlur}
                onInputFocus={this.onInputFocus}
                domain={window.currentDomain}
                onSelectTopic={list => this.handleTopicSelected(list)}
                selectedTopics={selectedTopics}
              />
              {addNewView ? (
                <LeftMenuNewTopicInput
                  parentTopicId={null}
                  noRedirect
                  onDismiss={this.onAddViewDismiss}
                />
              ) : (
                <div onClick={this.handleAddView}>+ Add Board</div>
              )}
            </div>
          )}
        </div>
        {Object.keys(selectedTopicId).length != 0 && (
          <AddCardCard
            multipleTopicsId={multipleTopicsId}
            afterCardCreated={afterCardCreated}
            inInputMode={true}
            onDismiss={onDismiss}
            topMenu={true}
            selectedCardType={selectedCardType}
          />
        )}
      </div>
    );
  }
}

export default SelectViewDropdown;
