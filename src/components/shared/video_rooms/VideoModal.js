/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { Rnd } from 'react-rnd';

import { stateMappings } from 'Src/newRedux/stateMappings';
import VideoPanel from './VideoPanel';

import './VideoModal.module.scss';
import useViewport from 'Src/hooks/useViewport';
import usePreviousState from 'Src/hooks/usePreviousState';

import { getExpandVideoRoomModal } from 'Src/newRedux/interface/modals/selectors';
import JitsiContext from './JitsiContext';
import { setDefaultCustomOrder } from 'src/graphql/mutations/index';

const getPlayerPosition = ({ screenHeight, screenWidth }) => ({
  playerX: screenWidth * 0.45,
  playerY: screenHeight * 0.3
});

const getPlayerDimensions = ({ screenHeight, screenWidth }) => ({
  width: screenWidth * 0.51,
  height: screenHeight * 0.7
});

const VideoModal = ({ isOpen, expandVideoRoomModal, chatModalIsOpen }) => {
  // return (
  //   isOpen && (
  //     <div styleName={cn('video-modal', expandVideoRoomModal && 'expanded')}>
  //       <VideoPanel />
  //     </div>
  //   )
  const [jitsiApi, setJitsiApi] = useState(null);
  const { width: screenWidth, height: screenHeight } = useViewport();

  const [initialPlayerPosition, setInitialPlayerPosition] = useState(
    getPlayerPosition({
      screenHeight,
      screenWidth
    })
  );

  const [initialPlayerDimension, setInitialPlayerDimension] = useState(
    getPlayerDimensions({
      screenHeight,
      screenWidth
    })
  );
  const previousScreenWidth = usePreviousState(screenWidth);
  // const PLAYER_X = screenWidth - 750;
  // const PLAYER_Y = screenHeight * 0.3;

  const [playerSize, setPlayerSize] = useState({
    width: initialPlayerDimension.width,
    height: initialPlayerDimension.height
  });

  const [playerPosition, setPlayerPosition] = useState({
    x: initialPlayerPosition.playerX,
    y: initialPlayerPosition.playerY
  });

  useEffect(() => {
    setInitialPlayerDimension(
      getPlayerDimensions({
        screenHeight,
        screenWidth
      })
    );
    setInitialPlayerPosition(
      getPlayerPosition({
        screenHeight,
        screenWidth
      })
    );
  }, [
    screenHeight,
    screenWidth,
    setInitialPlayerDimension,
    setInitialPlayerPosition
  ]);

  // console.log(playerPosition, playerSize);

  useEffect(() => {
    if (chatModalIsOpen && !expandVideoRoomModal) {
      const adjustedWidth = previousScreenWidth - screenWidth;
      setPlayerPosition({
        x: playerPosition.x - adjustedWidth * 0.3,
        y: playerPosition.y
      });
    } else {
      setPlayerSize({
        width: initialPlayerDimension.width,
        height: initialPlayerDimension.height
      });
      setPlayerPosition({
        x: initialPlayerPosition.playerX,
        y: initialPlayerPosition.playerY
      });
    }
  }, [
    chatModalIsOpen,
    setPlayerPosition,
    setPlayerSize,
    screenWidth,
    initialPlayerPosition,
    initialPlayerDimension
  ]);

  useEffect(() => {
    if (chatModalIsOpen) {
      setPlayerPosition({
        x: playerPosition.x - screenWidth * 0.3,
        y: playerPosition.y
      });
    }
  }, [chatModalIsOpen]);

  useEffect(() => {
    if (expandVideoRoomModal) {
      setPlayerSize({
        width: '100%',
        height: '100%'
      });
      setPlayerPosition({
        x: 15,
        y: 48
      });
    } else {
      setPlayerSize({
        width: initialPlayerDimension.width,
        height: initialPlayerDimension.height
      });
      setPlayerPosition({
        x: initialPlayerPosition.playerX - screenWidth * 0.3,
        y: initialPlayerPosition.playerY
      });
    }
  }, [expandVideoRoomModal]);

  const enableObject = {
    bottom: false,
    bottomLeft: false,
    bottomRight: false,
    left: false,
    right: false,
    top: false,
    topLeft: !expandVideoRoomModal,
    topRight: false
  };

  return (
    <JitsiContext.Provider value={{ jitsiApi, setJitsiApi }}>
      {isOpen && (
        <Rnd
          // default={{
          //   x: PLAYER_X,
          //   y: PLAYER_Y,
          // }}
          // styleName={cn('video-modal', expandVideoRoomModal && 'expanded')}
          styleName={cn('rnd-top')}
          size={playerSize}
          position={playerPosition}
          // bounds={bounds}
          lockAspectRatio={false}
          disableDragging={true}
          enableResizing={enableObject}
          minHeight={60}
          minWidth={'30%'}
          // className={classes.playerOuterContainer}
          // onDragStop={(e, d) => {
          //   setPlayerPosition({ x: d.x, y: d.y });
          // }}
          onResizeStop={(e, direction, ref, delta, position) => {
            setPlayerPosition(position);

            setPlayerSize({
              width: ref.style.width,
              height: ref.style.height
            });
          }}
        >
          <div
            styleName={cn('video-modal', expandVideoRoomModal && 'expanded')}
          >
            {!expandVideoRoomModal && <span styleName="icon-size" />}
            <VideoPanel />
          </div>
        </Rnd>
      )}
    </JitsiContext.Provider>
  );
};

const mapState = state => {
  const {
    modals: {
      displayVideoRoomModal: { isOpen },
      displayChatModal
      // expandVideoRoomModal
    }
  } = stateMappings(state);
  const expandVideoRoomModal = getExpandVideoRoomModal(state);
  const chatModalIsOpen = displayChatModal.isOpen;
  return {
    isOpen,
    expandVideoRoomModal,
    chatModalIsOpen
  };
};

export default connect(mapState)(VideoModal);
