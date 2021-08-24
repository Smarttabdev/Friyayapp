/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type ActivitiesButton_tipsQuery$ref: FragmentReference;
declare export opaque type ActivitiesButton_tipsQuery$fragmentType: ActivitiesButton_tipsQuery$ref;
export type ActivitiesButton_tipsQuery = {|
  +tips: ?{|
    +totalCount: number
  |},
  +$refType: ActivitiesButton_tipsQuery$ref,
|};
export type ActivitiesButton_tipsQuery$data = ActivitiesButton_tipsQuery;
export type ActivitiesButton_tipsQuery$key = {
  +$data?: ActivitiesButton_tipsQuery$data,
  +$fragmentRefs: ActivitiesButton_tipsQuery$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [
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
  "metadata": null,
  "name": "ActivitiesButton_tipsQuery",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "filter",
          "value": "title != ''"
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
      "name": "tips",
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
(node/*: any*/).hash = '858dd6ac8d89e84d18cf0cda5b69e13c';

module.exports = node;
