/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type ActivitiesSheet_tipsQuery$ref: FragmentReference;
declare export opaque type ActivitiesSheet_tipsQuery$fragmentType: ActivitiesSheet_tipsQuery$ref;
export type ActivitiesSheet_tipsQuery = {|
  +tips: ?{|
    +totalCount: number,
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: string,
        +jsonApi: ?any,
      |}
    |}>,
  |},
  +$refType: ActivitiesSheet_tipsQuery$ref,
|};
export type ActivitiesSheet_tipsQuery$data = ActivitiesSheet_tipsQuery;
export type ActivitiesSheet_tipsQuery$key = {
  +$data?: ActivitiesSheet_tipsQuery$data,
  +$fragmentRefs: ActivitiesSheet_tipsQuery$ref,
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
      "name": "tipsFilter"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "topicId"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "topicsParams"
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
  "name": "ActivitiesSheet_tipsQuery",
  "selections": [
    {
      "alias": "tips",
      "args": [
        {
          "kind": "Variable",
          "name": "filter",
          "variableName": "tipsFilter"
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
        },
        {
          "kind": "Variable",
          "name": "topicsParams",
          "variableName": "topicsParams"
        }
      ],
      "concreteType": "TipConnection",
      "kind": "LinkedField",
      "name": "__ActivitiesSheet_tips_connection",
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
                  "name": "jsonApi",
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
(node/*: any*/).hash = 'fefa89441fc0adaa6a84d48b7362e4b2';

module.exports = node;
