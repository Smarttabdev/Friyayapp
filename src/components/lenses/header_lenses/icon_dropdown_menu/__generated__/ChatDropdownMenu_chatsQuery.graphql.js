/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type ChatUserNames_chat$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type ChatDropdownMenu_chatsQuery$ref: FragmentReference;
declare export opaque type ChatDropdownMenu_chatsQuery$fragmentType: ChatDropdownMenu_chatsQuery$ref;
export type ChatDropdownMenu_chatsQuery = {|
  +chats: ?{|
    +totalCount: number,
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: string,
        +title: ?string,
        +$fragmentRefs: ChatUserNames_chat$ref,
      |}
    |}>,
  |},
  +$refType: ChatDropdownMenu_chatsQuery$ref,
|};
export type ChatDropdownMenu_chatsQuery$data = ChatDropdownMenu_chatsQuery;
export type ChatDropdownMenu_chatsQuery$key = {
  +$data?: ChatDropdownMenu_chatsQuery$data,
  +$fragmentRefs: ChatDropdownMenu_chatsQuery$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [
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
  "name": "ChatDropdownMenu_chatsQuery",
  "selections": [
    {
      "alias": "chats",
      "args": [
        {
          "kind": "Literal",
          "name": "filter",
          "value": "is_chat = TRUE"
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "created_at asc"
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
      "name": "__ChatDropdownMenu_chats_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "totalCount",
          "storageKey": null
        },
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
                  "name": "title",
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
                  "name": "ChatUserNames_chat"
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
(node/*: any*/).hash = 'a5ace593605797f7716617100eb9f028';

module.exports = node;
