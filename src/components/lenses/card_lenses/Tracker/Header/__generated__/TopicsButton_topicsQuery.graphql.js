/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type TopicsButton_topicsQuery$ref: FragmentReference;
declare export opaque type TopicsButton_topicsQuery$fragmentType: TopicsButton_topicsQuery$ref;
export type TopicsButton_topicsQuery = {|
  +topics: ?{|
    +totalCount: number
  |},
  +$refType: TopicsButton_topicsQuery$ref,
|};
export type TopicsButton_topicsQuery$data = TopicsButton_topicsQuery;
export type TopicsButton_topicsQuery$key = {
  +$data?: TopicsButton_topicsQuery$data,
  +$fragmentRefs: TopicsButton_topicsQuery$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "assignedId"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "assignedToType"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "parentId"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "tagged"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "TopicsButton_topicsQuery",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "assignedTo",
          "variableName": "assignedId"
        },
        {
          "kind": "Variable",
          "name": "assignedToType",
          "variableName": "assignedToType"
        },
        {
          "kind": "Variable",
          "name": "parentId",
          "variableName": "parentId"
        },
        {
          "kind": "Variable",
          "name": "tagged",
          "variableName": "tagged"
        }
      ],
      "concreteType": "TopicConnection",
      "kind": "LinkedField",
      "name": "topics",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "totalCount",
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
(node/*: any*/).hash = '690a05bd011b5fff7ff6c0dfe3f9e21c';

module.exports = node;
