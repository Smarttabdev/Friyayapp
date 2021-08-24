/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type AssignedLens_activePeopleOrderQuery$ref: FragmentReference;
declare export opaque type AssignedLens_activePeopleOrderQuery$fragmentType: AssignedLens_activePeopleOrderQuery$ref;
export type AssignedLens_activePeopleOrderQuery = {|
  +activePeopleOrder: ?{|
    +id: string,
    +name: ?string,
    +order: ?$ReadOnlyArray<string>,
  |},
  +$refType: AssignedLens_activePeopleOrderQuery$ref,
|};
export type AssignedLens_activePeopleOrderQuery$data = AssignedLens_activePeopleOrderQuery;
export type AssignedLens_activePeopleOrderQuery$key = {
  +$data?: AssignedLens_activePeopleOrderQuery$data,
  +$fragmentRefs: AssignedLens_activePeopleOrderQuery$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "lenseId"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "lenseKey"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "topicId"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "AssignedLens_activePeopleOrderQuery",
  "selections": [
    {
      "alias": "activePeopleOrder",
      "args": [
        {
          "kind": "Variable",
          "name": "lenseId",
          "variableName": "lenseId"
        },
        {
          "kind": "Variable",
          "name": "lenseKey",
          "variableName": "lenseKey"
        },
        {
          "kind": "Literal",
          "name": "orderType",
          "value": "people"
        },
        {
          "kind": "Variable",
          "name": "topicId",
          "variableName": "topicId"
        }
      ],
      "concreteType": "CustomOrder",
      "kind": "LinkedField",
      "name": "activeCustomOrder",
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
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "order",
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
(node/*: any*/).hash = '5e64e24b73d74e3ae80d506b3f3e563c';

module.exports = node;
