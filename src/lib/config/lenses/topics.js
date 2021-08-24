import HexLens from 'Components/lenses/topic_lenses/Hex/HexLens';
import SmallHexLens from 'Components/lenses/topic_lenses/Small_Hex/SmallHexLens';
import SmallTilesView from 'Components/lenses/topic_lenses/Tile/SmallTiles';
import TopicListLens from 'Components/lenses/topic_lenses/List/TopicListLens';
import RowView from 'Components/lenses/topic_lenses/Row';

const topicViews = {
  HEX: {
    key: 'HEX',
    name: 'Hex',
    icon: 'topic',
    category: 'topic',
    viewComponent: HexLens, //put your board component here
    defaultConfig: {
      header: false,
      topic: 'HEX',
      card: false
    }
  },
  TILE: {
    key: 'TILE',
    name: 'Tile',
    icon: 'view_module',
    category: 'topic',
    viewComponent: SmallTilesView, //put your board component here
    defaultConfig: {
      header: false,
      topic: 'TILE',
      card: false
    }
  },
  SMALL_HEX: {
    key: 'SMALL_HEX',
    name: 'Small Hex',
    icon: 'view_module',
    category: 'topic',
    viewComponent: SmallHexLens, //put your board component here
    defaultConfig: {
      header: false,
      topic: 'SMALL_HEX',
      card: false
    }
  },
  LIST: {
    key: 'LIST',
    name: 'List',
    icon: 'view_stream',
    category: 'topic',
    viewComponent: TopicListLens, //put your board component here
    defaultConfig: {
      header: false,
      topic: 'LIST',
      card: false
    }
  },
  ROW: {
    key: 'ROW',
    name: 'Row',
    icon: 'label',
    category: 'topic',
    viewComponent: RowView, //put your board component here
    defaultConfig: {
      header: false,
      topic: 'ROW',
      card: false
    }
  }
};

export default topicViews;
