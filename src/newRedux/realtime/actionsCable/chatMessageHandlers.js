import { get, set } from 'lodash';

import { stateMappings } from 'Src/newRedux/stateMappings';
import { changeCard } from 'Src/newRedux/database/cards/actions';
import { getCard } from 'Src/newRedux/database/cards/thunks';
// import { showDesktopNotification } from 'Src/newRedux/database/notifications/actions';
// import { makeDesktopNotificationBody } from 'Src/newRedux/database/notifications/util';

export default (message, dispatch, getState) => ({
  chat_message_created: async () => {
    // console.log('chat message create', message);
    const {
      data: { attributes: chatMessage }
    } = message.data;
    const sm = stateMappings(getState());
    const { chat } = sm;
    let cards = sm.cards;

    if (!cards[chatMessage.tip_id]) {
      await dispatch(getCard(chatMessage.tip_id));
      cards = stateMappings(getState()).cards;
    }

    const card = cards[chatMessage.tip_id];

    const chatMessages = get(card, 'attributes.chat_messages', []);

    if (chatMessages.find(m => m.id == chatMessage.id)) {
      return;
    }

    chatMessages.unshift(chatMessage);

    set(card, 'attributes.chat_messages', chatMessages);

    dispatch(changeCard(card));

    // show desktop notifcation
    // dispatch(
    //   showDesktopNotification(
    //     makeDesktopNotificationBody({
    //       tag: chatMessage.id,
    //       title: `New message in ${get(card, 'attributes.title')}`,
    //       body: get(chatMessage, 'body')
    //     })
    //   )
    // );

    const typingUser = get(chat, [
      'chats',
      card.id,
      'users',
      chatMessage.user_id
    ]);
  },
  chat_message_updated: async () => {
    const {
      data: { attributes: chatMessage }
    } = message.data;
    const sm = stateMappings(getState());
    const { chat } = sm;
    let cards = sm.cards;

    if (!cards[chatMessage.tip_id]) {
      await dispatch(getCard(chatMessage.tip_id));
      cards = stateMappings(getState()).cards;
    }

    const card = cards[chatMessage.tip_id];

    const chatMessages = get(card, 'attributes.chat_messages', []);

    if (chatMessages.find(msg => msg.id == chatMessage.id)) {
      const updatedCard = {
        ...card,
        attributes: {
          ...card.attributes,
          chat_messages: chatMessages.map(msg => {
            return msg.id == chatMessage.id ? chatMessage : msg;
          })
        }
      };
      dispatch(changeCard(updatedCard));
    }

    const typingUser = get(chat, [
      'chats',
      card.id,
      'users',
      chatMessage.user_id
    ]);
  },
  chat_message_deleted: async () => {
    const { tip_id: cardId, chat_message_id: chatMessageId } = message.data;
    const sm = stateMappings(getState());
    let cards = sm.cards;

    if (!cards[cardId]) {
      await dispatch(getCard(cardId));
      cards = stateMappings(getState()).cards;
    }

    const card = cards[cardId];

    const chatMessages = get(card, 'attributes.chat_messages', []);

    if (chatMessages.find(msg => msg.id == chatMessageId)) {
      const updatedCard = {
        ...card,
        attributes: {
          ...card.attributes,
          chat_messages: chatMessages.filter(msg => msg.id != chatMessageId)
        }
      };
      dispatch(changeCard(updatedCard));
    }
  }
});
