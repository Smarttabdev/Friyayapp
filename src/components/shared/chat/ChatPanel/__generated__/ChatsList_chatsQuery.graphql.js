/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type ChatListItem_chat$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type ChatsList_chatsQuery$ref: FragmentReference;
declare export opaque type ChatsList_chatsQuery$fragmentType: ChatsList_chatsQuery$ref;
export type ChatsList_chatsQuery = {|
  +chats: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: string,
        +$fragmentRefs: ChatListItem_chat$ref,
      |}
    |}>
  |},
  +$refType: ChatsList_chatsQuery$ref,
|};
export type ChatsList_chatsQuery$data = ChatsList_chatsQuery;
export type ChatsList_chatsQuery$key = {
  +$data?: ChatsList_chatsQuery$data,
  +$fragmentRefs: ChatsList_chatsQuery$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "chatsFilter"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "cursor"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "topicId"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": null,
        "cursor": "cursor",
        "direction": "forward",
        "path": [
          "chats"
        ]
      }
    ]
  },
  "name": "ChatsList_chatsQuery",
  "selections": [
    {
      "alias": "chats",
      "args": [
        {
          "kind": "Literal",
          "name": "chatUnreads",
          "value": true
        },
        {
          "kind": "Variable",
          "name": "filter",
          "variableName": "chatsFilter"
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "chat_unreads desc, last_chat_message_date desc"
        },
        {
          "kind": "Literal",
          "name": "subtopics",
          "value": true
        },
        {
          "kind": "Variable",
          "name": "topicId",
          "variableName": "topicId"
        }
      ],
      "concreteType": "TipConnection",
      "kind": "LinkedField",
      "name": "__ChatList_chats_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "TipEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Tip",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
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
                  "name": "__typename",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ChatListItem_chat"
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = '4c6347f7a3c32682e617bdda1475a7b6';

module.exports = node;
