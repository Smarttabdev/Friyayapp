import LargeTopicHeader from 'Components/lenses/header_lenses/LargeTopicHeader';
import SmallTopicHeader from 'Components/lenses/header_lenses/SmallTopicHeader';
import TopicHeader from 'Components/lenses/header_lenses/TopicHeader';
import TopicsHeader from 'Components/lenses/header_lenses/TopicsHeader';
import UserHeader from 'Components/lenses/header_lenses/UserHeader';
import WorkspaceHeader from 'Components/lenses/header_lenses/WorkspaceHeader';

const headerViews = {
  WORKSPACE_HOME: {
    key: 'WORKSPACE_HOME',
    name: 'Workspace Home',
    viewComponent: TopicHeader
  },
  LARGE_TOPIC: {
    key: 'LARGE_TOPIC',
    name: 'Large Topic',
    viewComponent: LargeTopicHeader
  },
  SMALL_TOPIC: {
    key: 'SMALL_TOPIC',
    name: 'Small Topic',
    viewComponent: SmallTopicHeader
  },
  TOPIC: {
    key: 'TOPIC',
    name: 'Topic',
    viewComponent: TopicHeader
  },
  TOPICS: {
    key: 'TOPICS',
    name: 'Topics',
    viewComponent: TopicsHeader
  },
  USER: {
    key: 'USER',
    name: 'User',
    viewComponent: UserHeader
  }
};

export default headerViews;
