/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type ChatUserNames_chat$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type ChatItem_chat$ref: FragmentReference;
declare export opaque type ChatItem_chat$fragmentType: ChatItem_chat$ref;
export type ChatItem_chat = {|
  +id: string,
  +title: ?string,
  +chatUnreads: ?number,
  +$fragmentRefs: ChatUserNames_chat$ref,
  +$refType: ChatItem_chat$ref,
|};
export type ChatItem_chat$data = ChatItem_chat;
export type ChatItem_chat$key = {
  +$data?: ChatItem_chat$data,
  +$fragmentRefs: ChatItem_chat$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChatItem_chat",
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
(node/*: any*/).hash = '6e6a424379865954dcdd9be5f74761f0';

module.exports = node;
