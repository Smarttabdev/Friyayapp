import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { Rnd } from 'react-rnd';

import { stateMappings } from 'Src/newRedux/stateMappings';
import ChatPanel from './ChatPanel';

import './ChatModal.module.scss';
import useViewport from 'Src/hooks/useViewport';
import {
  getExpandedChatModal,
  getMinimizedChatModal
} from 'Src/newRedux/interface/modals/selectors';

const getChatWindowPosition = ({ screenHeight, screenWidth }) => ({
  chatWindowX: screenWidth * 0.68,
  // chatWindowX: screenWidth - 350,
  chatWindowY: screenHeight * 0.3
});

const getChatWindowDimensions = ({ screenHeight, screenWidth }) => ({
  width: screenWidth * 0.3,
  // width: 336,
  height: screenHeight * 0.7
});

const TOOLBAR_HEIGHT = 50;

const ChatModal = ({ isOpen, expandChatModal, minimizeChatModal }) => {
  const { width: screenWidth, height: screenHeight } = useViewport();

  const [initialChatWindowPosition, setInitialChatWindowPosition] = useState(
    getChatWindowPosition({ screenHeight, screenWidth })
  );

  const [initialChatWindowDimension, setInitialChatWindowDimension] = useState(
    getChatWindowDimensions({ screenHeight, screenWidth })
  );

  // const PLAYER_X = screenWidth - 750;
  // const PLAYER_Y = screenHeight * 0.3;

  const [chatWindowSize, setChatWindowSize] = useState({
    width: initialChatWindowDimension.width,
    height: initialChatWindowDimension.height
  });

  const [chatWindowPosition, setChatWindowPosition] = useState({
    x: initialChatWindowPosition.chatWindowX,
    y: initialChatWindowPosition.chatWindowY
  });

  useEffect(() => {
    setInitialChatWindowDimension(
      getChatWindowDimensions({
        screenHeight,
        screenWidth
      })
    );
    setInitialChatWindowPosition(
      getChatWindowPosition({
        screenHeight,
        screenWidth
      })
    );
  }, [
    screenHeight,
    screenWidth,
    setInitialChatWindowDimension,
    setInitialChatWindowPosition
  ]);

  // console.log(playerPosition, playerSize);

  useEffect(() => {
    if (expandChatModal) {
      setChatWindowSize({
        width: '100%',
        height: '100%'
      });
      setChatWindowPosition({
        x: 15,
        y: 48
      });
    } else if (minimizeChatModal) {
      setChatWindowSize({
        width: '25%',
        height: TOOLBAR_HEIGHT
      });
      setChatWindowPosition({
        x: initialChatWindowPosition.chatWindowX,
        y: screenHeight - TOOLBAR_HEIGHT
      });
    } else {
      setChatWindowSize({
        width: initialChatWindowDimension.width,
        height: initialChatWindowDimension.height
      });
      setChatWindowPosition({
        x: initialChatWindowPosition.chatWindowX,
        y: initialChatWindowPosition.chatWindowY
      });
    }
  }, [
    expandChatModal,
    setChatWindowPosition,
    setChatWindowSize,
    initialChatWindowDimension,
    initialChatWindowPosition,
    minimizeChatModal
  ]);

  const enableObject = {
    bottom: false,
    bottomLeft: false,
    bottomRight: false,
    left: false,
    right: false,
    top: false,
    topLeft: !expandChatModal,
    topRight: false
  };

  return (
    isOpen && (
      <Rnd
        // default={{
        //   x: PLAYER_X,
        //   y: PLAYER_Y,
        // }}
        styleName={cn('rnd-top')}
        size={chatWindowSize}
        position={chatWindowPosition}
        // bounds={bounds}
        lockAspectRatio={false}
        disableDragging={true}
        enableResizing={enableObject}
        minHeight={TOOLBAR_HEIGHT}
        minWidth={'25%'}
        // className={classes.playerOuterContainer}
        // onDragStop={(e, d) => {
        //   setPlayerPosition({ x: d.x, y: d.y });
        // }}
        onResizeStop={(e, direction, ref, delta, position) => {
          setChatWindowPosition(position);

          setChatWindowSize({
            width: ref.style.width,
            height: ref.style.height
          });
        }}
      >
        <div styleName={cn('chat-modal', expandChatModal && 'expanded')}>
          {!expandChatModal && <span styleName="icon-size" />}
          <ChatPanel />
        </div>
      </Rnd>
    )
  );
};

const mapState = state => {
  const {
    modals: {
      displayChatModal: { isOpen }
      // expandChatModal
    }
  } = stateMappings(state);
  const expandChatModal = getExpandedChatModal(state);
  const minimizeChatModal = getMinimizedChatModal(state);
  return {
    isOpen,
    expandChatModal,
    minimizeChatModal
  };
};

export default connect(mapState)(ChatModal);
