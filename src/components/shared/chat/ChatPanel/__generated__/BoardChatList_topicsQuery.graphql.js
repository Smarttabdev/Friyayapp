/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type BoardChatList_topicsQuery$ref: FragmentReference;
declare export opaque type BoardChatList_topicsQuery$fragmentType: BoardChatList_topicsQuery$ref;
export type BoardChatList_topicsQuery = {|
  +chatTopics: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: string,
        +title: string,
      |}
    |}>
  |},
  +$refType: BoardChatList_topicsQuery$ref,
|};
export type BoardChatList_topicsQuery$data = BoardChatList_topicsQuery;
export type BoardChatList_topicsQuery$key = {
  +$data?: BoardChatList_topicsQuery$data,
  +$fragmentRefs: BoardChatList_topicsQuery$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [
    {
      "defaultValue": 15,
      "kind": "LocalArgument",
      "name": "count"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "cursor"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "havingTips"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "parentId"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "cursor",
        "direction": "forward",
        "path": [
          "chatTopics"
        ]
      }
    ]
  },
  "name": "BoardChatList_topicsQuery",
  "selections": [
    {
      "alias": "chatTopics",
      "args": [
        {
          "kind": "Literal",
          "name": "all",
          "value": true
        },
        {
          "kind": "Variable",
          "name": "havingTips",
          "variableName": "havingTips"
        },
        {
          "kind": "Variable",
          "name": "parentId",
          "variableName": "parentId"
        },
        {
          "kind": "Literal",
          "name": "subtopics",
          "value": true
        }
      ],
      "concreteType": "TopicConnection",
      "kind": "LinkedField",
      "name": "__BoardChatList_chatTopics_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "TopicEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Topic",
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
(node/*: any*/).hash = '088987d570c23c2129a97e1da51796a7';

module.exports = node;
