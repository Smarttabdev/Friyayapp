/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type StarterFilterToolList_query$ref: FragmentReference;
declare export opaque type StarterFilterToolList_query$fragmentType: StarterFilterToolList_query$ref;
export type StarterFilterToolList_query = {|
  +items: ?{|
    +totalCount: number
  |},
  +$refType: StarterFilterToolList_query$ref,
|};
export type StarterFilterToolList_query$data = StarterFilterToolList_query;
export type StarterFilterToolList_query$key = {
  +$data?: StarterFilterToolList_query$data,
  +$fragmentRefs: StarterFilterToolList_query$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "filters"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "itemTypes"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "topicId"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "StarterFilterToolList_query",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "filters",
          "variableName": "filters"
        },
        {
          "kind": "Variable",
          "name": "itemTypes",
          "variableName": "itemTypes"
        },
        {
          "kind": "Variable",
          "name": "topicId",
          "variableName": "topicId"
        }
      ],
      "concreteType": "ItemConnection",
      "kind": "LinkedField",
      "name": "items",
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
(node/*: any*/).hash = '019aa444fe605c43983cf98f76c68e7a';

module.exports = node;
