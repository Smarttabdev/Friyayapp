/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type ChatUserNames_chat$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type ChatListItem_chat$ref: FragmentReference;
declare export opaque type ChatListItem_chat$fragmentType: ChatListItem_chat$ref;
export type ChatListItem_chat = {|
  +id: string,
  +title: ?string,
  +chatUnreads: ?number,
  +$fragmentRefs: ChatUserNames_chat$ref,
  +$refType: ChatListItem_chat$ref,
|};
export type ChatListItem_chat$data = ChatListItem_chat;
export type ChatListItem_chat$key = {
  +$data?: ChatListItem_chat$data,
  +$fragmentRefs: ChatListItem_chat$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChatListItem_chat",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "chatUnreads",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ChatUserNames_chat"
    }
  ],
  "type": "Tip",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = '52aed5081c1b7fc6cc960a096ba5eed1';

module.exports = node;
