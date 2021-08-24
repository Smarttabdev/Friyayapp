/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type TeamPlanLens_activeTopicsOrderQuery$ref: FragmentReference;
declare export opaque type TeamPlanLens_activeTopicsOrderQuery$fragmentType: TeamPlanLens_activeTopicsOrderQuery$ref;
export type TeamPlanLens_activeTopicsOrderQuery = {|
  +activeTopicsOrder: ?{|
    +id: string,
    +name: ?string,
    +order: ?$ReadOnlyArray<string>,
  |},
  +$refType: TeamPlanLens_activeTopicsOrderQuery$ref,
|};
export type TeamPlanLens_activeTopicsOrderQuery$data = TeamPlanLens_activeTopicsOrderQuery;
export type TeamPlanLens_activeTopicsOrderQuery$key = {
  +$data?: TeamPlanLens_activeTopicsOrderQuery$data,
  +$fragmentRefs: TeamPlanLens_activeTopicsOrderQuery$ref,
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
  "name": "TeamPlanLens_activeTopicsOrderQuery",
  "selections": [
    {
      "alias": "activeTopicsOrder",
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
          "value": "topics"
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
(node/*: any*/).hash = '450f7883ec7a13064415d177c03154bf';

module.exports = node;
