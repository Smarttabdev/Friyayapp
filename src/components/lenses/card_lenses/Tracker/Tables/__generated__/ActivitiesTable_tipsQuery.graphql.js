/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type ActivitiesTable_tipsQuery$ref: FragmentReference;
declare export opaque type ActivitiesTable_tipsQuery$fragmentType: ActivitiesTable_tipsQuery$ref;
export type ActivitiesTable_tipsQuery = {|
  +tips: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: string,
        +title: ?string,
      |}
    |}>
  |},
  +$refType: ActivitiesTable_tipsQuery$ref,
|};
export type ActivitiesTable_tipsQuery$data = ActivitiesTable_tipsQuery;
export type ActivitiesTable_tipsQuery$key = {
  +$data?: ActivitiesTable_tipsQuery$data,
  +$fragmentRefs: ActivitiesTable_tipsQuery$ref,
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
  "name": "ActivitiesTable_tipsQuery",
  "selections": [
    {
      "alias": "tips",
      "args": [
        {
          "kind": "Literal",
          "name": "filter",
          "value": "title != ''"
        },
        {
          "kind": "Variable",
          "name": "topicsParams",
          "variableName": "topicsParams"
        }
      ],
      "concreteType": "TipConnection",
      "kind": "LinkedField",
      "name": "__ActivitiesTable_tips_connection",
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
(node/*: any*/).hash = 'bef411deea64ed5f685ecb565bda91ac';

module.exports = node;
