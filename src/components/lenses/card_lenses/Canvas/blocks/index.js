import ParagraphBlock from './ParagraphBlock';
import CardBlock from './CardBlock';
import BoardBlock from './BoardBlock';
import ChatBlock from './ChatBlock';
import VideoChatBlock from './VideoChatBlock';
import CardListBlock from './CardListBlock';
import BoardListBlock from './BoardListBlock';
import ChatListBlock from './ChatListBlock';
import VideoChatListBlock from './VideoChatListBlock';
import CardTaskListBlock from './CardTaskListBlock';
import FileBlock from './FileBlock';
import FileListBlock from './FileListBlock';
import GoalsBlock from './GoalsBlock';
import ProjectsBlock from './ProjectsBlock';
import GoalDescriptionBlock from './GoalDescriptionBlock';
import ProjectDescriptionBlock from './ProjectDescriptionBlock';
import SprintBarBlock from './SprintBarBlock';
import TeamListBlock from './TeamListBlock';

const blocks = {
  paragraph: ParagraphBlock,
  card: CardBlock,
  board: BoardBlock,
  chat: ChatBlock,
  videoChat: VideoChatBlock,
  cardList: CardListBlock,
  boardList: BoardListBlock,
  chatList: ChatListBlock,
  videoChatList: VideoChatListBlock,
  cardTaskList: CardTaskListBlock,
  file: FileBlock,
  fileList: FileListBlock,
  goalList: GoalsBlock,
  projectList: ProjectsBlock,
  goalDescription: GoalDescriptionBlock,
  projectDescription: ProjectDescriptionBlock,
  sprintBar: SprintBarBlock,
  teamList: TeamListBlock
};

export default blocks;
