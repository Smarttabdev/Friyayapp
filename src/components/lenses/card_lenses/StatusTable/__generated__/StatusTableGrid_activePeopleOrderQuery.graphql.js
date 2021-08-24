/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type StatusTableGrid_activePeopleOrderQuery$ref: FragmentReference;
declare export opaque type StatusTableGrid_activePeopleOrderQuery$fragmentType: StatusTableGrid_activePeopleOrderQuery$ref;
export type StatusTableGrid_activePeopleOrderQuery = {|
  +activePeopleOrder: ?{|
    +id: string,
    +name: ?string,
    +order: ?$ReadOnlyArray<string>,
  |},
  +$refType: StatusTableGrid_activePeopleOrderQuery$ref,
|};
export type StatusTableGrid_activePeopleOrderQuery$data = StatusTableGrid_activePeopleOrderQuery;
export type StatusTableGrid_activePeopleOrderQuery$key = {
  +$data?: StatusTableGrid_activePeopleOrderQuery$data,
  +$fragmentRefs: StatusTableGrid_activePeopleOrderQuery$ref,
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
  "name": "StatusTableGrid_activePeopleOrderQuery",
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
(node/*: any*/).hash = '2b524b57bd25b66ddefcdd1d360355dc';

module.exports = node;
