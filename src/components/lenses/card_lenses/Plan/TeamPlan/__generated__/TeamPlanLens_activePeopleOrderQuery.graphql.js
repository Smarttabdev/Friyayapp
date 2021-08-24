/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type TeamPlanLens_activePeopleOrderQuery$ref: FragmentReference;
declare export opaque type TeamPlanLens_activePeopleOrderQuery$fragmentType: TeamPlanLens_activePeopleOrderQuery$ref;
export type TeamPlanLens_activePeopleOrderQuery = {|
  +activePeopleOrder: ?{|
    +id: string,
    +name: ?string,
    +order: ?$ReadOnlyArray<string>,
  |},
  +$refType: TeamPlanLens_activePeopleOrderQuery$ref,
|};
export type TeamPlanLens_activePeopleOrderQuery$data = TeamPlanLens_activePeopleOrderQuery;
export type TeamPlanLens_activePeopleOrderQuery$key = {
  +$data?: TeamPlanLens_activePeopleOrderQuery$data,
  +$fragmentRefs: TeamPlanLens_activePeopleOrderQuery$ref,
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
  "name": "TeamPlanLens_activePeopleOrderQuery",
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
(node/*: any*/).hash = 'ca13140a0f90b61694775a5c3099afaa';

module.exports = node;
