import React, { Component } from 'react';
import { func } from 'prop-types';
import classNames from 'classnames';
import PageModal from '../pages/page_modal';
import { setCopyTopicModalOpen } from 'Src/newRedux/interface/modals/actions';
import { connect } from 'react-redux';
import {
  copyTopic,
  createTopic,
  viewTopic
} from 'Src/newRedux/database/topics/thunks';
import { getSortedFilteredTopicsByParentTopic } from 'Src/newRedux/database/topics/selectors';

class CopyTopicModal extends Component {
  constructor(props) {
    super(props);
    this.modalRef = React.createRef();
    this.state = {
      toggleTemplateState: [],
      includeSubviews: false,
      includeCards: false,
      includeNestedCards: false
    };
  }

  static propTypes = {
    setCopyTopicModalOpen: func.isRequired
  };

  componentDidMount() {
    const dropdown = this.modalRef.current;
    this.hidePopupOnClickOut(dropdown);
    document.addEventListener('keydown', this.handleEscPressed);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscPressed);
  }

  isVisible = elem => {
    !!elem &&
      !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
  };

  hidePopupOnClickOut = element => {
    const outsideClickListener = event => {
      if (!event.defaultPrevented) {
        if (!element.contains(event.target) || this.isVisible(element)) {
          this.props.setCopyTopicModalOpen(false);
          removeClickListener();
        }
      }
    };
    const removeClickListener = () => {
      document.removeEventListener('click', outsideClickListener);
    };
    document.addEventListener('click', outsideClickListener);
  };

  handleEscPressed = e => {
    switch (e.keyCode) {
      case 27:
        this.props.setCopyTopicModalOpen(false);
        break;
      default:
        break;
    }
  };

  copyIncludes = i => {
    const { toggleTemplateState } = this.state;
    if (toggleTemplateState.includes(i)) {
      const index = toggleTemplateState.indexOf(i);
      if (index > -1) {
        toggleTemplateState.splice(index, 1);
      }
      this.setState({
        toggleTemplateState: toggleTemplateState
      });
    } else {
      this.setState({
        toggleTemplateState: [...toggleTemplateState, i]
      });
    }
  };

  handleCopyTopic = async () => {
    const {
      topic,
      copyTopic,
      createTopic,
      viewTopic,
      setCopyTopicModalOpen
    } = this.props;
    const { toggleTemplateState } = this.state;
    const includeOptions = {
      subviews: false,
      cards_in_view: false,
      nested_cards: false,
      existing_topic_id: topic.id
    };

    const copy = await copyTopic(topic.id);
    let { attributes, relationships } = copy;

    relationships.topic_permission.data.id = null;
    attributes.is_template = false;
    attributes.title = attributes.title + ' - copy';

    if (toggleTemplateState.includes(0)) includeOptions.subviews = true;
    if (toggleTemplateState.includes(1)) includeOptions.cards_in_view = true;
    if (toggleTemplateState.includes(2)) includeOptions.nested_cards = true;

    const newTopic = await createTopic(
      { attributes, relationships },
      includeOptions
    );
    setCopyTopicModalOpen(false);
    viewTopic({ topicId: newTopic.data.data.id });
  };

  render() {
    const { toggleTemplateState } = this.state;
    const { setCopyTopicModalOpen } = this.props;
    const options = [
      {
        title: 'SubBoard of this Board'
      },
      {
        title: 'Cards in this Board'
      },
      {
        title: 'Nested Cards'
      }
    ];
    const toggleClass = i =>
      classNames('fa', 'icon', {
        'fa-toggle-on': toggleTemplateState.includes(i),
        'fa-toggle-off': !toggleTemplateState.includes(i),
        green: toggleTemplateState.includes(i)
      });

    return (
      <PageModal keyboard={false} size={null}>
        <div ref={this.modalRef} className="copy_modal">
          <div>Include in this copy:</div>
          <ul>
            {options.map((option, i) => (
              <li key={i}>
                {option.title}
                <a onClick={() => this.copyIncludes(i)}>
                  <i className={toggleClass(i)} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <a onClick={() => setCopyTopicModalOpen(false)}>Cancel</a>
          <a onClick={this.handleCopyTopic}>Proceed</a>
        </div>
      </PageModal>
    );
  }
}

const mapDispatch = {
  setCopyTopicModalOpen,
  copyTopic,
  createTopic,
  viewTopic
};

export default connect(undefined, mapDispatch)(CopyTopicModal);
