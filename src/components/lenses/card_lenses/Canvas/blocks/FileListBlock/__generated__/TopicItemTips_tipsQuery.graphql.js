/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type TipItem_tip$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type TopicItemTips_tipsQuery$ref: FragmentReference;
declare export opaque type TopicItemTips_tipsQuery$fragmentType: TopicItemTips_tipsQuery$ref;
export type TopicItemTips_tipsQuery = {|
  +tips: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: string,
        +$fragmentRefs: TipItem_tip$ref,
      |}
    |}>
  |},
  +$refType: TopicItemTips_tipsQuery$ref,
|};
export type TopicItemTips_tipsQuery$data = TopicItemTips_tipsQuery;
export type TopicItemTips_tipsQuery$key = {
  +$data?: TopicItemTips_tipsQuery$data,
  +$fragmentRefs: TopicItemTips_tipsQuery$ref,
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
  "name": "TopicItemTips_tipsQuery",
  "selections": [
    {
      "alias": "tips",
      "args": [
        {
          "kind": "Literal",
          "name": "haveFiles",
          "value": true
        },
        {
          "kind": "Variable",
          "name": "root",
          "variableName": "root"
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
      "name": "__TopicItemTips_tips_connection",
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
                  "name": "TipItem_tip"
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
(node/*: any*/).hash = '2192b984ac15f010f498a029e18a7f9c';

module.exports = node;
