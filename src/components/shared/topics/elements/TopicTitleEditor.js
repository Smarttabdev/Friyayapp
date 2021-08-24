import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { func, object, string } from 'prop-types';
import { updateTopic } from 'Src/newRedux/database/topics/thunks';
import FormInput from 'Components/shared/forms/FormInput';

class TopicTitleEditor extends PureComponent {
  static propTypes = {
    topic: object.isRequired,
    updateTopic: func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      topicTitle: props.topic.title || props.topic.attributes.title
    };
  }

  handleUpdateTopic = async () => {
    const {
      state: { topicTitle },
      props: { onFinishEditing, topic, updateTopic }
    } = this;
    const attributes = { title: topicTitle };
    updateTopic({ id: toId(topic.id), attributes });
    onFinishEditing(topicTitle);
  };

  handleSetTopicTitle = topicTitle => {
    this.setState({ topicTitle });
  };

  handleKeyDown = e => {
    (e.key == 'Escape' || e.keyCode == 27) && this.props.onFinishEditing();
  };

  render() {
    const { additionalClasses = '', topic, setFormWidth, color } = this.props;
    const { topicTitle } = this.state;

    return (
      <FormInput
        additionalClasses={additionalClasses}
        autoFocus
        defaultValue={topicTitle}
        onChange={this.handleSetTopicTitle}
        onSubmit={this.handleUpdateTopic}
        placeholder="Board title"
        onKeyPress={this.handleKeyDown}
        onKeyDown={this.handleKeyDown}
        setFormWidth={setFormWidth}
        onBlur={this.handleUpdateTopic}
        color={color}
      />
    );
  }
}

const mapDispatch = {
  updateTopic
};
export default connect(undefined, mapDispatch)(TopicTitleEditor);
