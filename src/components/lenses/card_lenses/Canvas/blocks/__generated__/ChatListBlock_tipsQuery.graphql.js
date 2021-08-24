/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type ChatItem_chat$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type ChatListBlock_tipsQuery$ref: FragmentReference;
declare export opaque type ChatListBlock_tipsQuery$fragmentType: ChatListBlock_tipsQuery$ref;
export type ChatListBlock_tipsQuery = {|
  +tips: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: string,
        +title: ?string,
        +slug: string,
        +$fragmentRefs: ChatItem_chat$ref,
      |}
    |}>
  |},
  +$refType: ChatListBlock_tipsQuery$ref,
|};
export type ChatListBlock_tipsQuery$data = ChatListBlock_tipsQuery;
export type ChatListBlock_tipsQuery$key = {
  +$data?: ChatListBlock_tipsQuery$data,
  +$fragmentRefs: ChatListBlock_tipsQuery$ref,
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
      "name": "root"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "subtopics"
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
          "tips"
        ]
      }
    ]
  },
  "name": "ChatListBlock_tipsQuery",
  "selections": [
    {
      "alias": "tips",
      "args": [
        {
          "kind": "Literal",
          "name": "isChat",
          "value": true
        },
        {
          "kind": "Variable",
          "name": "root",
          "variableName": "root"
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "created_at asc"
        },
        {
          "kind": "Variable",
          "name": "subtopics",
          "variableName": "subtopics"
        },
        {
          "kind": "Variable",
          "name": "topicId",
          "variableName": "topicId"
        }
      ],
      "concreteType": "TipConnection",
      "kind": "LinkedField",
      "name": "__ChatListBlock_tips_connection",
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
                  "name": "title",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "slug",
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
                  "name": "ChatItem_chat"
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
(node/*: any*/).hash = '0e02f084b8ebaab608a4de8de9056bcd';

module.exports = node;
