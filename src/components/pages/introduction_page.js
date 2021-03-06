import React, { Component } from 'react';
import IntroGIDBFNotice from './introduction_page/intro_gidbf_notice';
import IntroInitialSetup from './introduction_page/intro_initial_setup';
import IntroChooseDesign from './introduction_page/intro_choose_design';
import IntroCreateCards from './introduction_page/intro_create_cards';
import GidbfGuide1 from './introduction_page/gidbf_guide_1';
import GidbfGuide2 from './introduction_page/gidbf_guide_2';
import GidbfGuide3 from './introduction_page/gidbf_guide_3';
import GidbfGuide4 from './introduction_page/gidbf_guide_4';
import GidbfGuide5 from './introduction_page/gidbf_guide_5';
import GidbfGuide6 from './introduction_page/gidbf_guide_6';
import IntroPromptContent from './introduction_page/intro_prompt_content';
import IntroductionPreviewImg from './introduction_slides/introduction_preview_img';
import IntroCreateHiveContent from './introduction_page/intro_create_hive_content';
import IntroExploreTopicsContent from './introduction_page/intro_explore_topics_content';
import IntroInviteFriendsContent from './introduction_page/intro_invite_friends_content';
import IntroExplorePeopleContent from './introduction_page/intro_explore_people_content';
import IntroTeamContent from './introduction_page/intro_team_content';
import Auth from '../../lib/auth';
import tiphive from '../../lib/tiphive';
import PropTypes from 'prop-types';
import AddBoardTypes from './introduction_page/AddBoardTypes';
import CreateFewBoards from './introduction_page/CreateFewBoards';
import AddCardsToBoards from './introduction_page/AddCardsToBoards';
import PinToolsToBoards from './introduction_page/PinToolsToBoards';

class IntroductionPage extends Component {
  constructor(props) {
    super(props);

    this.getStarted = this.getStarted.bind(this);
  }

  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

  UNSAFE_componentWillMount() {
    window.currentUser = Auth.getUser();
  }

  componentDidMount() {
    tiphive.detectScrollEnd();
    $('#app-container').css('height', '100%');
  }

  getStarted() {
    const {
      props: { history }
    } = this;

    history.push('/');
  }

  render() {
    const step = this.props.match.params.step;
    const userFirstName = localStorage.getItem('user_first_name') || '';
    let introductionContent;
    let productExplanation = {
      topic: {
        title: [
          'Done! This is going great. The fun part is to add Boards to your workspace.',
          'A Board lets you organize your work in infinite ways - all in one place.'
        ],
        img_url: '/images/intro/what_is_an_yay.jpg',
        alt: 'topic preview',
        actionText: 'Add cards to your Board',
        action: '/introduction/get_started',
        actionType: 'url'
      },
      views: {
        title: [
          "We're super excited you have joined!",
          "Here's a small gift of appreciation..."
        ],
        textContent: 'Enjoy one month free use of all power features',
        img_url: '/images/intro/gift.png',
        alt: 'Board preview',
        actionText: 'Nice. Let me in',
        // action:"/introduction/explain_piles",
        action: this.getStarted,
        actionType: 'function',
        actionButtonClass: 'buttonShape6'
      },
      piles: {
        title: ['You can now pile it on with Piles'],
        topExplanation: '',
        img_url: '/images/intro/piles_demo_image.png',
        img_url_2: '/images/new-icon.png',
        alt: 'piles preview',
        bottomExplanation: '',
        actionText: 'Cool. Got it',
        action: this.getStarted,
        actionType: 'function',
        actionButtonClass: 'buttonShape6'
      }
    };

    switch (step) {
      case undefined:
      case 'prompt':
        introductionContent = (
          <IntroPromptContent userFirstName={userFirstName} />
        );
        break;
      case 'explain_yay':
        introductionContent = (
          <IntroductionPreviewImg
            productExplanation={productExplanation.topic}
          />
        );
        break;
      case 'create_views':
        introductionContent = (
          <IntroCreateHiveContent
            history={this.props.history}
            userFirstName={userFirstName}
          />
        );
        break;
      case 'intro_gidbf_notice':
        introductionContent = <IntroGIDBFNotice history={this.props.history} />;
        break;
      case 'initial_setup':
        introductionContent = (
          <IntroInitialSetup history={this.props.history} />
        );
        break;
      case 'choose_design':
        introductionContent = (
          <IntroChooseDesign history={this.props.history} />
        );
        break;
      case 'create_boards':
        introductionContent = <CreateFewBoards history={this.props.history} />;
        break;
      case 'add_board_types':
        introductionContent = <AddBoardTypes history={this.props.history} />;
        break;
      case 'pin_tools_to_boards':
        introductionContent = <PinToolsToBoards history={this.props.history} />;
        break;
      case 'add_cards_to_boards':
        introductionContent = <AddCardsToBoards history={this.props.history} />;
        break;
      case 'create_cards':
        introductionContent = <IntroCreateCards history={this.props.history} />;
        break;
      case 'gidbf_guide_1':
        introductionContent = <GidbfGuide1 history={this.props.history} />;
        break;
      case 'gidbf_guide_2':
        introductionContent = <GidbfGuide2 history={this.props.history} />;
        break;
      case 'gidbf_guide_3':
        introductionContent = <GidbfGuide3 history={this.props.history} />;
        break;
      case 'gidbf_guide_4':
        introductionContent = <GidbfGuide4 history={this.props.history} />;
        break;
      case 'gidbf_guide_5':
        introductionContent = <GidbfGuide5 history={this.props.history} />;
        break;
      case 'gidbf_guide_6':
        introductionContent = <GidbfGuide6 history={this.props.history} />;
        break;
      case 'explain_views':
        introductionContent = (
          <IntroductionPreviewImg
            productExplanation={productExplanation.views}
          />
        );
        break;
      case 'explain_piles':
        introductionContent = (
          <IntroductionPreviewImg
            productExplanation={productExplanation.piles}
          />
        );
        break;
      case 'explore_views':
        introductionContent = <IntroExploreTopicsContent />;
        break;
      case 'invite_friends':
        introductionContent = <IntroInviteFriendsContent />;
        break;
      case 'explore_people':
        introductionContent = (
          <IntroExplorePeopleContent history={this.props.history} />
        );
        break;
      case 'team':
        introductionContent = (
          <IntroTeamContent
            history={this.props.history}
            userFirstName={userFirstName}
          />
        );
        break;
    }

    return (
      <div className="container-fluid page-container-full introduction-page">
        {introductionContent}
      </div>
    );
  }
}

export default IntroductionPage;
