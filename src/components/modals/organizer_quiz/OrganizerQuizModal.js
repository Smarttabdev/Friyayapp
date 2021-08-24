import React, { useState } from 'react';
import { connect } from 'react-redux';
import Modal from 'Components/shared/Modal';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { setOrganizerQuizModal } from 'Src/newRedux/interface/modals/actions';
import OrganizerQuizIntro from './OrganizerQuizIntro';
import OrganizerQuizHeader from './OrganizerQuizHeader';
import OrganizerQuizScreenOne from './OrganizerQuizScreenOne';
import OrganizerQuizScreenTwo from './OrganizerQuizScreenTwo';
import OrganizerQuizScreenThree from './OrganizerQuizScreenThree';
import OrganizerQuizScreenFour from './OrganizerQuizScreenFour';
import OrganizerQuizScreenFive from './OrganizerQuizScreenFive';
import OrganizerQuizScreenSix from './OrganizerQuizScreenSix';
import OrganizerQuizScreenSeven from './OrganizerQuizScreenSeven';
import OrganizerQuizScreenEight from './OrganizerQuizScreenEight';
import OrganizerQuizScreenNine from './OrganizerQuizScreenNine';
import OrganizerQuizEndScreen from './OrganizerQuizEndScreen';

const OrganizerQuizModal = ({ user, isOpen, setOrganizerQuizModal }) => {
  const [slideNumber, setSlideNumber] = useState(0);

  const startQuiz = () => {
    setSlideNumber(1);
  };

  const showNextScreen = () => {
    setSlideNumber(prev => prev + 1);
  };

  const showPrevScreen = () => {
    setSlideNumber(prev => prev - 1);
  };
  return (
    <Modal
      styles={{
        content: {
          minHeight: 750,
          minWidth: 1150,
          maxWidth: 1250,
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)'
        }
      }}
      open={isOpen}
      onClose={() => setOrganizerQuizModal({ isOpen: false })}
    >
      <div className="organizer-quiz">
        {slideNumber > 0 && (
          <OrganizerQuizHeader
            slideNumber={slideNumber}
            next={showNextScreen}
            prev={showPrevScreen}
          />
        )}
        {slideNumber === 0 && <OrganizerQuizIntro start={startQuiz} />}
        {slideNumber === 1 && <OrganizerQuizScreenOne user={user} />}
        {slideNumber === 2 && <OrganizerQuizScreenTwo user={user} />}
        {slideNumber === 3 && <OrganizerQuizScreenThree user={user} />}
        {slideNumber === 4 && <OrganizerQuizScreenFour user={user} />}
        {slideNumber === 5 && <OrganizerQuizScreenFive user={user} />}
        {slideNumber === 6 && <OrganizerQuizScreenSix user={user} />}
        {slideNumber === 7 && <OrganizerQuizScreenSeven user={user} />}
        {slideNumber === 8 && <OrganizerQuizScreenEight user={user} />}
        {slideNumber === 9 && <OrganizerQuizEndScreen />}
      </div>
    </Modal>
  );
};

const mapState = state => {
  const sm = stateMappings(state);
  const {
    user,
    modals: { organizerQuizModal }
  } = sm;
  return {
    user,
    isOpen: organizerQuizModal.isOpen
  };
};

const mapDispatch = {
  setOrganizerQuizModal
};

export default connect(mapState, mapDispatch)(OrganizerQuizModal);
